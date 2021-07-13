const mongoose = require('mongoose');

// creating the schema for our post.
// It should have a title and body
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        require: [true, "Post must have a title"]
    },
    body: {
        type: String,
        require: [true, "Post must have a body"]
    }
});

const Post = mongoose.model("Post", postSchema);

// exporting our Post
module.exports = Post;