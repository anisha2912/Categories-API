const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    categoryname:String,
    categoryid:Number,
    products:Number
});

module.exports = mongoose.model('Category',CategorySchema);