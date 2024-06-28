//const fs = require('fs');
const User = require('../model/user');
const mongoose = require('mongoose');
//const User = model.User;
//const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { find } = require('../model/product');

/*exports.createUser = async(req, res) => {
    console.log(req.body,"hello1");
    const newUser = new User(req.body);
    var token = jwt.sign({ email: req.body.email }, process.env.SECRET);
    newUser.token = token;

      try{
          const userdata =await newUser.save();
          res.status(201).json(userdata);
        
      }catch(error){
          res.status(400).json({message: error.message});
      }
     
  };*/
  exports.createUser = async (req, res) => {
    try {
      let findUser = await User.findOne({email: req.body.email});
      if (findUser)
        {
          return res.status(201).json({status:201, message: "Email is already exist" });
        }
        console.log(req.body, "hello1");
        if (!req.body.password) {
          return res.status(400).json({status:400, message: "Password is required" });
        }
        console.log(req.body.password, "Password from request");

        // Hash the password
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);

        // Create a new user object with the hashed password
        const newUser = new User({
            ...req.body,
            password: hashedPassword
        });
        // If a file was uploaded, add its path to the user data
        if (req.file) {
          newUser.profileimage = req.file.path; // Or any other field you want to store the image path
      }

        // Generate a token
        // var token = jwt.sign({ email: req.body.email }, process.env.SECRET);
        // newUser.token = token;

        // Save the user
        const userdata = await newUser.save();
        res.status(201).json({status: 201, message: "User created successfully", user: userdata});

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
  
/*exports.getAllUser = async (req, res) => {
  // Get page and limit from query params, set default values if not provided
  const page = parseInt(req.query.page) || 1; // Default to page 1
  const limit = parseInt(req.query.limit) || 10; // Default to 10 users per page

  try {
      // Calculate the starting index of the users to fetch
      const startIndex = (page - 1) * limit;

      // Fetch users with pagination
      const users = await User.find()
          .skip(startIndex)
          .limit(limit);

      // Get total number of users for pagination info
      const totalUsers = await User.countDocuments();

      // Create pagination info
      const pagination = {
          currentPage: page,
          totalPages: Math.ceil(totalUsers / limit),
          pageSize: limit,
          totalUsers: totalUsers,
      };

      // Return the users and pagination info
      res.json({ users, pagination });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};
*/

exports.getAllUser = async (req, res) => {
    // Get page, limit, and search query from query params
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 10; // Default to 10 users per page
    const searchQuery = req.query.search || ''; // Default to empty string if no search query

    try {
        // Build search criteria
        const searchCriteria = searchQuery
            ? { firstname: { $regex: searchQuery, $options: 'i' } } // Case-insensitive search
            : {};

        // Calculate the starting index of the users to fetch
        const startIndex = (page - 1) * limit;

        // Fetch users with pagination and search criteria
        const users = await User.find(searchCriteria)
            .skip(startIndex)
            .limit(limit);

        // Get total number of users matching the search criteria
        const totalUsers = await User.countDocuments(searchCriteria);

        // Create pagination info
        const pagination = {
            currentPage: page,
            totalPages: Math.ceil(totalUsers / limit),
            pageSize: limit,
            totalUsers: totalUsers,
        };

        // Return the users and pagination info
        res.status(200).json({status: 200 , message: 'Get User', data:{ users, pagination }});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



  exports.getUser = async (req, res) => {
    const id = req.params.id;
    console.log({id})
    const user = await User.findById(id);
    res.json(user);
  };
  exports.replaceUser = async (req, res) => {
    const id = req.params.id;
    try{
    const doc = await User.findOneAndReplace({_id:id},req.body,{new:true})
    res.status(201).json({status: 201, message:"User replace successfully", user:doc});
    }
    catch(err){
      console.log(err);
      res.status(400).json(err);
    }
  };
  exports.updateUser = async (req, res) => {
    const id = req.params.id;
    try{
    const doc = await User.findOneAndUpdate({_id:id},req.body,{new:true})
    res.status(201).json({status:201, message:"User update successfully", user: doc});
    }
    catch(err){
      console.log(err);
      res.status(400).json(err);
    }
  };
  exports.deleteUser = async (req, res) => {
    const id = req.params.id;
    try{
    const doc = await User.findOneAndDelete({_id:id})
    res.status(201).json({status: 201, message:"User deleted successfully", user: doc});
    }
    catch(err){
      console.log(err);
      res.status(400).json(err);
    }
  };

  exports.login = async (req, res) => {
    try {
        console.log("Login attempt");

        // Find the user by email
        const user = await User.findOne({ email: req.body.email });
        console.log("User lookup result:", user);

        if (!user) {
            console.log("User not found");
            return res.status(401).json({status: 401, message: 'User not found' }); // User not found
        }

        // Validate the password
        const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
        console.log("Password validation result:", isPasswordValid);

        if (!isPasswordValid) {
            console.log("Incorrect password");
            return res.status(401).json({status: 401, message: 'Incorrect password' }); // Incorrect password
        }

        // Generate a JWT token
        console.log("Generating token...");
        const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: '1d' });

        // Save the token to the user
        user.token = token;
        const updatedUser = await user.save();

        // Return the user data with the token
        res.json({status:200,
            message: 'Login successful',data:{
            user_id: updatedUser._id,
            email: updatedUser.email,
            token: updatedUser.token}
            // Add other user fields if necessary
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({status: 500, message: 'Internal server error' });
    }
};
  
  