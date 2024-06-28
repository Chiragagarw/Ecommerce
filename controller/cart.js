const Cart = require('../model/cart');
const User = require('../model/user');
const Product = require('../model/product');
const mongoose = require('mongoose');

// Add to Cart
// exports.addToCart = async (req, res) => {
//     const userId = req.user.id; 
//     const { productId, quantity } = req.body;

//     console.log(`User ID: ${userId}`);
//     console.log(`Product ID: ${productId}`);
//     console.log(`Quantity: ${quantity}`);


//     if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(productId)) {
//         return res.status(400).json({ message: 'Invalid user or product ID' });
//     }

//     if (!Number.isInteger(quantity) || quantity <= 0) {
//         return res.status(400).json({ message: 'Invalid quantity' });
//     }

//     try {
//         const user = await User.findById(userId);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         const product = await Product.findById(productId);
//         if (!product) {
//             return res.status(404).json({ message: 'Product not found' });
//         }

//         let cart = await Cart.findOne({ user: userId });

//         if (!cart) {
//             cart = new Cart({ user: userId, cartItems: {} });
//         }

//         cart.cartItems = cart.cartItems || [];


//         const cartItemIndex = cart.cartItems.findIndex(item => item.product.toString() === productId);
//         if (cartItemIndex > -1) {
//             cart.cartItems[cartItemIndex].qty += quantity;
//         } else {
//             cart.cartItems.push({ product: productId, qty: quantity });
//         }

//         await cart.save();

//          // Extracting user details
//          const { firstname, lastname, email } = user;

//         res.status(200).json({ message: 'Product added to cart successfully', 
//         user:{ firstname, lastname, email },
//         cart: cart.cartItems });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error' });
//     }
// };
/*
exports.addToCart = async (req, res) => {
    const userId = req.user.id; 
    const { productId, quantity } = req.body;

    console.log(`User ID: ${userId}`);
    console.log(`Product ID: ${productId}`);
    console.log(`Quantity: ${quantity}`);

    // Validate userId and productId
    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ message: 'Invalid user or product ID' });
    }

    // Validate quantity
    if (!Number.isInteger(quantity) || quantity <= 0) {
        return res.status(400).json({ message: 'Invalid quantity' });
    }

    try {
        // Fetch user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Fetch product
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Fetch or create cart
        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = new Cart({ user: userId, cartItems: [] });
        }

        // Ensure cartItems is initialized
        cart.cartItems = cart.cartItems || [];

        // Find the cart item index
        const cartItemIndex = cart.cartItems.findIndex(item => item.product.toString() === productId);
        
        if (cartItemIndex > -1) {
            // Update quantity if item is found
            cart.cartItems[cartItemIndex].qty += quantity;
        } else {
            // Add new item to cart
            cart.cartItems.push({ product: productId, qty: quantity });
        }

        // Save the updated cart
        await cart.save();

        // Extract user details for response
        const { firstname, lastname, email } = user;

        // Send response
        res.status(200).json({
            message: 'Product added to cart successfully',
            user: { firstname, lastname, email },
            cart: cart.cartItems
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}; */
/*
exports.addToCart = async (req, res) => {
    const userId = req.user.id; 
    const { productId, quantity } = req.body;

    console.log(`User ID: ${userId}`);
    console.log(`Product ID: ${productId}`);
    console.log(`Quantity: ${quantity}`);

    // Validate userId and productId
    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ message: 'Invalid user or product ID' });
    }

    // Validate quantity
    if (!Number.isInteger(quantity) || quantity <= 0) {
        return res.status(400).json({ message: 'Invalid quantity' });
    }

    try {
        // Fetch user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Fetch product
        const product = await Product.findById(productId);
        console.log(product);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Fetch or create cart
        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = new Cart({ user: userId, cartItems: [] });
        }
        console.log(product.title,product.price);

        // Ensure cartItems is initialized
        cart.cartItems = cart.cartItems || [];
        cart.cartItems.map((item) => { console.log(item);
            return item;
            })
        // Find the cart item index
        const cartItemIndex = cart.cartItems.findIndex(item => item.product.toString() === productId);
        //const cartItemIndex = -1;
        if (cartItemIndex > -1) {
            // Update quantity if item is found
            cart.cartItems[cartItemIndex].qty += quantity;
        } 
        else {
           
            // Add new item to cart with product details
            cart.cartItems.push({
                // product: {
                //     _id: x._id,
                //     title: x.title,
                //     price: x.price,
                    //},
                title: product.title,    
                qty: quantity
                    });
        }
        console.log("cart.cartitems",cart.cartItems);

        // Save the updated cart
        await cart.save();

        // Extract user details for response
        const { firstname, lastname, email } = user;

        // Format the response with cart ID, user details, and cart items
        console.log(cart,"cart");
        let detai = cart.cartItems.map((item) => { console.log("detaai",item);
            return item;
            })
                
        
          console.log(detai);
        res.status(201).json({status:201,
            message: 'Product added to cart successfully',
            cartId: cart._id,
            data:{
            user: { firstname, lastname, email },
            cartItems: cart.cartItems.map(item => ({
                
                   // product_id: item.product._id,
                    title: item.title,
                   // price: item.product.price,
                    qty: item.qty
               
            }))
        }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({status: 500, message: 'Server error' });
    }
};*/


exports.addToCart = async (req, res) => {
    const userId = req.user.id; 
    const { productId, quantity } = req.body;

    console.log(`User ID: ${userId}`);
    console.log(`Product ID: ${productId}`);
    console.log(`Quantity: ${quantity}`);

    // Validate userId and productId
    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ message: 'Invalid user or product ID' });
    }

    // Validate quantity
    if (!Number.isInteger(quantity) || quantity <= 0) {
        return res.status(400).json({ message: 'Invalid quantity' });
    }

    try {
        // Fetch user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Fetch product
        const product = await Product.findById(productId);
        console.log(product);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Fetch or create cart
        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = new Cart({ user: userId, cartItems: [] });
        }
        console.log(product.title, product.price,product._id);

        // Ensure cartItems is initialized
        cart.cartItems = cart.cartItems || [];

        // Find the cart item index
        const cartItemIndex = cart.cartItems.findIndex(item => item.product && item.product.toString() === productId);

        if (cartItemIndex > -1) {
            // Update quantity if item is found 
            cart.cartItems[cartItemIndex].qty += quantity;
        } else {
            // Add new item to cart with product details
            cart.cartItems.push({
                product: product._id,
                title: product.title,
                price: product.price,
                qty: quantity
            });
        }
        //console.log("cart.cartItems", cart.cartItems);

        // Save the updated cart
        await cart.save();

        // Extract user details for response
        const { firstname, lastname, email } = user;

        // Format the response with cart ID, user details, and cart items
        console.log(cart, "cart");
        res.status(201).json({
            status: 201,
            message: 'Product added to cart successfully',
            cartId: cart._id,
            data: {
                user: { firstname, lastname, email },
                cartItems: cart.cartItems.map(item => ({
                    product_id: item.product,
                    title: item.title,
                    price: item.price,
                    qty: item.qty
                }))
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: 'Server error' });
    }
};


exports.updateCartItem = async (req, res) => {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    console.log(`User ID: ${userId}`);
    console.log(`Product ID: ${productId}`);
    console.log(`Quantity: ${quantity}`);

    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({status: 400, message: 'Invalid user or product ID' });
    }

    if (!Number.isInteger(quantity) || quantity <= 0) {
        return res.status(400).json({status: 400, message: 'Invalid quantity' });
    }

    try {
        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({status: 404, message: 'Cart not found' });
        }

        const cartItemIndex = cart.cartItems.findIndex(item => item.product.toString() === productId);
        if (cartItemIndex > -1) {
            cart.cartItems[cartItemIndex].qty = quantity;
            await cart.save();
            res.status(200).json({status: 200, message: 'Cart item updated', cart });
        } else {
            res.status(404).json({status: 404, message: 'Product not found in cart' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({status: 500, message: 'Server error' });
    }
};

exports.removeCartItem = async (req, res) => {
    const userId = req.user.id;
    const { productId } = req.body;

    console.log(`User ID: ${userId}`);
    console.log(`Product ID: ${productId}`);

    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({status: 400, message: 'Invalid user or product ID' });
    }

    try {
        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({status: 404, message: 'Cart not found' });
        }

        cart.cartItems = cart.cartItems.filter(item => item.product.toString() !== productId);
        await cart.save();
        res.status(200).json({status: 200, message: 'Cart item removed', cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({status: 500, message: 'Server error' });
    }
};


/*exports.getUserCart = async (req, res) => {
    const userId = req.user.id;

    console.log(`User ID: ${userId}`);

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({status: 400, message: 'Invalid user ID' });
    }
    // Get page and limit from query parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;



    try {
        const cart = await Cart.findOne({ user: userId })
            .populate('user', 'firstname lastname email')
            .populate('cartItems.product', 'title price');
            
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Pagination logic
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const paginatedCartItems = cart.cartItems.slice(startIndex, endIndex).map(item => ({
            _id: item.product._id,
            title: item.product.title,
            price: item.product.price,
            qty: item.qty
        }));


        res.status(200).json({status: 200,message: "Display my cart",
           // cart: {
                Cart_id: cart._id,
                data : { user: {
                    firstname: cart.user.firstname,
                    lastname: cart.user.lastname,
                    email: cart.user.email
                },
                cartItems: paginatedCartItems},
               
           // },
            totalItems: cart.cartItems.length,
            currentPage: page,
            totalPages: Math.ceil(cart.cartItems.length / limit)
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({status: 500, message: 'Server error' });
    }
};*/



exports.getUserCart = async (req, res) => {
    const userId = req.user.id;

    console.log(`User ID: ${userId}`);

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ status: 400, message: 'Invalid user ID' });
    }

    // Get page and limit from query parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    try {
        const startIndex = (page - 1) * limit;

        const cartAggregation = await Cart.aggregate([
            { $match: { user: new mongoose.Types.ObjectId(userId) } },
            {
                $lookup: {
                    from: 'users',
                    localField: 'user',
                    foreignField: '_id',
                    as: 'userDetails'
                }
            },
            { $unwind: '$userDetails' },
            {
                $lookup: {
                    from: 'products',
                    localField: 'cartItems.product',
                    foreignField: '_id',
                    as: 'productDetails'
                }
            },
            {
                $addFields: {
                    user: {
                        firstname: '$userDetails.firstname',
                        lastname: '$userDetails.lastname',
                        email: '$userDetails.email'
                    },
                    cartItems: {
                        $map: {
                            input: '$cartItems',
                            as: 'item',
                            in: {
                                qty: '$$item.qty',
                                product: {
                                    $arrayElemAt: [
                                        {
                                            $filter: {
                                                input: '$productDetails',
                                                as: 'product',
                                                cond: { $eq: ['$$product._id', '$$item.product'] }
                                            }
                                        },
                                        0
                                    ]
                                }
                            }
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 1,
                    user: 1,
                    cartItems: {
                        $slice: ['$cartItems', startIndex, limit]
                    },
                    totalItems: { $size: '$cartItems' }
                }
            }
        ]);

        if (!cartAggregation.length) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const cart = cartAggregation[0];
        const totalItems = cart.totalItems;
        const totalPages = Math.ceil(totalItems / limit);

        const paginatedCartItems = cart.cartItems.map(item => ({
            _id: item.product._id,
            title: item.product.title,
            price: item.product.price,
            qty: item.qty
        }));

        res.status(200).json({
            status: 200,
            message: "Display my cart",
            Cart_id: cart._id,
            data: {
                user: {
                    firstname: cart.user.firstname,
                    lastname: cart.user.lastname,
                    email: cart.user.email
                },
                cartItems: paginatedCartItems
            },
            totalItems,
            currentPage: page,
            totalPages
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: 'Server error' });
    }
};
