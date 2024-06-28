const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    title: {type: String, required: false} ,
    description: String,
    price: {type: Number, min:[0,'wrong price'],required: false},
    discountPercentage: {type: Number, min:[0,'wrong min discount'], max:[50,'wrong max discount']},
    rating: {type: Number, min:[0,'wrong min rating'], max:[5,'wrong max rating'], default:0},
    brand: {type: String,required: false},
    category: {type: String, required: false},
   // thumbnail: {type: String, required: true},
    productImage: String
  });
  
const Product = mongoose.model('Product', productSchema);

module.exports = Product;