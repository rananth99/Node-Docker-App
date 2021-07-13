const Post = require('../models/postModel');

exports.createPost = async (req,res,next) => {
    try{
        // creating a post 
        const post = await Post.create(req.body);

        res.status(200).json({
            status: "Successful",
            message: "Post created successfully"
        });
    }catch(e) {
        res.status(400).json({
            status: "Failed",
            message: "Post not created",
        });
    }
};

exports.getAllPosts = async (req, res, next) => {
    try {
        // this helps us to find all the posts present in our database
        const posts = await Post.find();

        res.status(200).json({
            status: "Successful",
            message: "All the posts retrieved successfully",
            results: posts.length,
            data: {
                posts
            }
        });
    }catch(e) {
        res.status(400).json({
            status: "Failed",
            message: "Posts not retrieved",
        });
    }
};

exports.getOnePost = async (req,res,next) => {
    try {
        // this helps us to find individual post based on the ID
        const post = await Post.findById(req.params.id);

        res.status(200).json({
            status: "Successful",
            message: "Post found successfully",
            data: {
                post
            }
        });
    }catch(e) {
        res.status(400).json({
            status: "Failed",
            message: "Post not found",
        });
    }
};

exports.updatePost = async (req,res,next) => {
    try {
        // this helps us to find individual post based on the ID and update that particular post
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            status: "Successful",
            message: "Post updated successfully",
            data: {
                post
            }
        });
    }catch(e) {
        res.status(400).json({
            status: "Failed",
            message: "Post could not be udated",

        });
    }
};

exports.deletePost = async (req,res,next) => {
    try {
        // this helps us to find individual post based on the ID and delete that post
        const post = await Post.findByIdAndDelete(req.params.id);

        res.status(200).json({
            status: "Successful",
            message: "Post deleted successfully",
            data: null
        });
    }catch(e) {
        res.status(400).json({
            status: "Failed",
            message: "Post could not be deleted",
        });
    }
};