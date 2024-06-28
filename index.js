require('dotenv').config();
const express = require("express");
const morgan = require("morgan");
const multer = require('multer');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const productRouter = require('./routes/product');
const userRouter = require('./routes/user');
const cartRouter = require('./routes/cart');

const createMulterStorage = require('./multer/multerConfig');

const server = express();

// Middleware to handle form data
const uploadProfileImage = createMulterStorage('uploads/user/');
const uploadProductImage = createMulterStorage('uploads/product/');

console.log('env', process.env.DB_PASSWORD, process.env.MONGO_URL);

// Database connection
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Database Connected');
}

// Middleware
server.use(express.json());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(morgan('default'));
server.use(express.static(path.resolve(__dirname, process.env.SECRET)));

// Routes
server.use('/cart', cartRouter);
server.use('/products', uploadProductImage.single("productImage"), productRouter);
server.use('/users/signUp', uploadProfileImage.single("profileimage"), userRouter);
server.use('/users', userRouter);

server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});












/*require('dotenv').config();
const express = require("express");
const morgan = require("morgan");
const multer = require('multer');
const server = express();
const createMulterStorage = require('./multer/multerconfig');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//const { protect, admin } = require('./middlewares/authMiddleware');
const path = require('path');
const productRouter = require('./routes/product');
const userRouter = require('./routes/user');
const cartRouter = require('./routes/cart');

//const fs = require('fs');
//const publicKey = fs.readFileSync(path.resolve(__dirname,'./public.key'),'utf-8')
const jwt = require('jsonwebtoken');

const uploadProfileImage = createMulterStorage('uploads/user/', 'profileimage');
const uploadProductImage = createMulterStorage('uploads/product/', 'productImage');
console.log(uploadProductImage.getFilename, "uygu");
console.log(uploadProductImage.getDestination, "yauysg");



console.log('env',process.env.DB_PASSWORD,process.env.MONGO_URL);

//db connect
//mongoose.connect('mongodb://127.0.0.1:27017/test');
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect(process.env.MONGO_URL)
    console.log('database Connected');
}

//body Parser
  
server.use(express.json());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));
server.use(morgan('default'));
server.use(express.static(path.resolve(__dirname,process.env.SECRET)));

server.use('/cart', cartRouter);
server.use('/products',productRouter);
server.use('/products', uploadProductImage.single("productImage"));
server.use('/users/signUp',uploadProfileImage.single("profileimage"));
server.use('/users',userRouter);
// server.use('*',(req,res)=>{
  //     res.sendFile(path.resolve(__dirname,'build','index.html'))
  // })
  
  
  server.listen(process.env.PORT, () => {
    console.log("Server is running on port 8080");
  });









  
  //server.use(upload.single("profileimage"));
  //server.use('/upload-product-image', uploadProduct);
*/