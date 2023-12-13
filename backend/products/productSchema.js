const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
 name: String,
 description: String,
 price: Number,
 image: String,
 category: String,
 favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
 
});

module.exports = mongoose.model('Product', ProductSchema);
