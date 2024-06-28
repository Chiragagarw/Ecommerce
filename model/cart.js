const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartItemSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  qty: { type: Number, required: true },
  _id: {type: String},
  title: {type: String},
  price:{type: Number}
});

const cartSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  cartItems: [cartItemSchema]
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;










/*const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  qty: { type: Number, required: true },
  
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;*/
