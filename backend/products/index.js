const express = require('express');
const router = express.Router();
const Product = require('./productSchema');

router.get('/', async (req, res) => {
 const { category } = req.query;
 const products = category ? await Product.find({ category }) : await Product.find();
 res.send(products);
});

module.exports = router;