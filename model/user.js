
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    firstname: 
    { 
      type: String,
      required: true 
    },
    lastname: 
    { 
      type: String, 
      required: true 
    },
    profileimage: 
    {
      type: String
    },
    email: 
    { 
      type: String, 
      required: true, 
    },
    token: String,
    password: 
    { 
      type: String, 
      required: true 
    },
    cart: 
    [{
        productId: 
        { 
          type: Schema.Types.ObjectId, 
          ref: 'Product' 
        },
        quantity: 
        { 
          type: Number, 
          required: true, 
          default: 1 
        }
    }]
});

User = mongoose.model('User', userSchema);

module.exports = User;





















/*const mongoose = require('mongoose');
const { login } = require('../controller/user');
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: String,
  profileimage: String,
  email: {
    type: String,
    unique: true,
    validate: {
      validator: function (v) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
    required: true,
  },
  password: { type: String, minLength: 6, required: true },
  token: String,
  //cart: { type: Schema.Types.ObjectId, ref: 'Cart' },
  cart: [
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity: {
            type: Number,
            default: 1
        }
    }
]
});

console.log("hello25");
const User = mongoose.model('User', userSchema);
module.exports = User;*/