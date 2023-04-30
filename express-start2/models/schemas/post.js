const mongoose  = require('mongoose');
const shortId = require('../types/short-id');

const PostSchema = new mongoose.Schema({
    shortId,
    title : String,
    content: String,
    author : String,

}, {
    timestamps : true
});



module.exports = PostSchema;


