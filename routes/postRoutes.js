const express = require('express');

const postController = require('../controller/postController');
const protect = require('../middleware/authMiddleware');

// creating a new router
const router = express.Router();

// Example of the URL : 
// http://localhost:5050/{url for get}/{url for post}

// this particular route is going to fetch all the posts using {getAllPosts} and
// add them to our database using the {createPost}

router
    .route("/")
    .get(protect, postController.getAllPosts)
    .post(protect, postController.createPost);

// this particular route is going to take in {id} as a parameter to find the particular post and return it
// and update the post using the {updatePost} and delete the post usign {deletePost}
router
    .route("/:id")
    .get(protect, postController.getOnePost)
    .patch(protect, postController.updatePost)
    .delete(protect, postController.deletePost);

// to these routes we add the protect middleware which would first look into the authoriation status of the user,
// only then permit the user to access these routes

module.exports = router;