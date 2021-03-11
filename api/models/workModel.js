var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var work = new Schema({
    text: String,
    link: String,
    status: Number,
})

var Works = mongoose.model('Works', work);

module.exports = Works; 