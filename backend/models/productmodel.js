const mongoose = require('mongoose');
const maxArraySize=100000;
const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    rating: {
        type: [Number],
        validate: {
          validator: function(array) {
            return array.length <= maxArraySize;
          },
          message: `Rating array exceeds the maximum size of ${maxArraySize}`
        }
      },
      review: {
        type: [String],
        validate: {
          validator: function(array) {
            return array.length <= maxArraySize;
          },
          message: `Review array exceeds the maximum size of ${maxArraySize}`
        }
      },
    image: {
        type: String,
        default: './images/No.png'
    }
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
