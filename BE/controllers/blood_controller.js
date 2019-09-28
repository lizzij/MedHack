const mongoose = require('mongoose');
// const Product = require('../models/product');

exports.getIndex = (req, res, next) => {
    res.send('Hello World!');
};
