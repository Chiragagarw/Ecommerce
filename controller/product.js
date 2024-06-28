const fs = require('fs');
const Product = require('../model/product')
const mongoose = require('mongoose');
//const Product = model.Product;
//const ejs = require('ejs');
const path = require('path');




// Create
exports.createProduct = async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    console.log('Uploaded File:', req.file);
    const productData = new Product(req.body);
     // const productData = req.body;
     if (req.file) {
        productData.productImage = req.file.path;
        }
        const product = await productData.save();
        res.status(201).json({ status: 201,
          message: 'Product created successfully',
          data: product
          });
          } catch (error) {
            console.log(error);
            res.status(500).json({
              message: 'Error creating product',
              error
              });
              }};
/*
      // If a file was uploaded, add its path to the productData
      console.log(req.body);
      
      if (req.file) {
          productData.productImage = req.file.path; // Or any other field you want to store the image path
      }

      const product = new Product(productData);
      const savedProduct = await product.save();
      res.status(201).json(savedProduct);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }};*/
/*
  exports.getAllProducts = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 4;
      const skip = (page - 1) * limit;
  
      const totalProducts = await Product.countDocuments();
      const products = await Product.find().skip(skip).limit(limit);
  
      res.json({
        totalProducts,
        totalPages: Math.ceil(totalProducts / limit),
        currentPage: page,
        perPage: limit,
        products
      });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching products' });
    }
  };*/

  exports.getAllProducts = async (req, res) => {
    // Get page, limit, and search query from query params
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 4; // Default to 4 products per page
    const searchQuery = req.query.search || ''; // Default to empty string if no search query

    try {
        // Build search criteria
        const searchCriteria = searchQuery
            ? { title : { $regex: searchQuery, $options: 'i' } } // Case-insensitive search
            : {};

        // Calculate the starting index of the products to fetch
        const startIndex = (page - 1) * limit;

        // Fetch products with pagination and search criteria
        const products = await Product.find(searchCriteria)
            .skip(startIndex)
            .limit(limit);

        // Get total number of products matching the search criteria
        const totalProducts = await Product.countDocuments(searchCriteria);

        // Create pagination info
        const pagination = {
            currentPage: page,
            totalPages: Math.ceil(totalProducts / limit),
            perPage: limit,
            totalProducts: totalProducts,
        };

        // Return the products and pagination info
        res.status(200).json({status:200, message: 'Products',data:{ products, pagination} });
    } catch (error) {
        res.status(500).send().json({status: 500, message: error.message });
    }
};


exports.getProduct = async (req, res) => {
  const id = req.params.id;
  console.log({id})
  const product = await Product.findById(id);
  res.json(product);
};
exports.replaceProduct = async (req, res) => {
  const id = req.params.id;
  try{
  const doc = await Product.findOneAndReplace({_id:id},req.body,{new:true})
  res.status(201).json({status: 201, message: 'Replace successful',doc});
  }
  catch(err){
    console.log(err);
    res.status(400).json({status: 400,err});
  }
};
exports.updateProduct = async (req, res) => {
  const id = req.params.id;
  try{
  const doc = await Product.findOneAndUpdate({_id:id},req.body,{new:true})
  res.status(201).json({status: 201 ,message: 'Update successful', doc});
  }
  catch(err){
    console.log(err);
    res.status(400).json({status: 400,err});
  }
};
exports.deleteProduct = async (req, res) => {
  const id = req.params.id;
  try{
  const doc = await Product.findOneAndDelete({_id:id})
  res.status(201).json({status:200, doc});
  }
  catch(err){
    console.log(err);
    res.status(400).json(err);
  }
};





/*//view
exports.getAllProductsSSR = async (req, res) => {
  const products = await Product.find();
  ejs.renderFile(path.resolve(__dirname,'../pages/index.ejs'), {products:products}, function(err, str){
    res.send(str);
 });
  
};

exports.getAddForm = async (req, res) => {
  ejs.renderFile(path.resolve(__dirname,'../pages/add.ejs'), function(err, str){
    res.send(str);
 });
  
};
*/