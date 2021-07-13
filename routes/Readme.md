# __ROUTES__

## DEFINING THE ROUTE FOR POST OPERATIONS

This file basically mentions the routes for the different CRUD applications defined.

This code snippet defines the specific route for fethcing all the posts and for creating post.

```js
// this particular route is going to fetch all the posts using {getAllPosts} and
// add them to our database using the {createPost}

router
    .route("/")
    .get(protect, postController.getAllPosts)
    .post(protect, postController.createPost);
// to these routes we add the protect middleware which would first look into the authoriation status of the user, only then permit the user to access these routes

```

this code snippet defines the specific routes for fetching a particular post , updating a particular post or deleting a particular post based on the ID sent in the url of the route.

```js
// this particular route is going to take in {id} as a parameter to find the particular post and return it
// and update the post using the {updatePost} and delete the post usign {deletePost}
router
    .route("/:id")
    .get(protect, postController.getOnePost)
    .patch(protect, postController.updatePost)
    .delete(protect, postController.deletePost);
// to these routes we add the protect middleware which would first look into the authoriation status of the user, only then permit the user to access these routes
```

---

## DEFINING THE ROUTE FOR USER AUTHENTICATION OPERATIONS

This file basically mentions the routes for the different user authentication methods

This code snippet below defines the specific route details for user signup method and login method

```js
// Signup method
router.post("/signup", authController.signUp);

// Login method
router.post("/login", authController.login);
```
