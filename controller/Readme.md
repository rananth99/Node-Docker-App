# __APPLICATION CONTROLLER__

## POST CONTROLLER

This file controls all the CRUD operations related to a blogpost such as :

1. Creation of Post

    ```js
    exports.createPost = async (req,res,next) => {
        try{
            // creating a post 
            const post = await Post.create(req.body);

            res.status(200).json({
                status: 'Created post successfully',
            });
        }catch(e) {
            res.status(400).json({
                status: 'Failed',
            });
        }
    };
    ```

2. Fetch all the Posts

    ```js
    exports.getAllPosts = async (req, res, next) => {
        try {
            // this helps us to find all the posts present in our database
            const posts = await Post.find();

            res.status(200).json({
                status: 'All the posts retrieved successfully',
                results: posts.length,
                data: {
                    posts
                }
            });
        }catch(e) {
            res.status(400).json({
                status: 'Failed',
            });
        }
    };
    ```

3. Fetch a particular Post

    ```js
    exports.getOnePost = async (req,res,next) => {
        try {
            // this helps us to find individual post based on the ID
            const post = await Post.findById(req.params.id);

            res.status(200).json({
                status: 'Post found successfully',
                data: {
                    post
                }
            });
        }catch(e) {
            res.status(400).json({
                status: 'Failed',
            });
        }
    };
    ```

4. Update an existing Post

    ```js
    exports.updatePost = async (req,res,next) => {
        try {
            // this helps us to find individual post based on the ID and update that particular post
            const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true,
            });

            res.status(200).json({
                status: 'Post updated successfully',
                data: {
                    post
                }
            });
        }catch(e) {
            res.status(400).json({
                status: 'Failed',
            });
        }
    };
    ```

5. Delete a Post

    ```js
    exports.deletePost = async (req,res,next) => {
        try {
            // this helps us to find individual post based on the ID and delete that post
            const post = await Post.findByIdAndDelete(req.params.id);

            res.status(200).json({
                status: 'Post deleted successfully',
                data: null
            });
        }catch(e) {
            res.status(400).json({
                status: 'Failed',
            });
        }
    };       
    ```

---

## USER AUTHENTICATION CONTROLLER

this file controls all the user authentication logic such as :

1. Sign Up

    ```js
    exports.signUp = async (req,res) => {
        const {username,password} = req.body
        try {
            const hashPassword = await bcrypt.hash(password, 12)
            const newUser = await User.create({
                username: username,
                password: hashPassword
            });
            // This basically writes the user details to our session which is
            // maintained in redis database
            req.session.user = newUser;
            res.status(201).json({
                status: "User created successfully",
                data: {
                    user: newUser,
                }
            });
        } catch(e) {
            res.status(400).json({
                status: "Failed"
            });
        }
    }
    ```

2. Login

    ```js
    exports.login = async (req,res) => {
        const {username,password} = req.body
        try {
            const user = await User.findOne({username})
            if (!user){
                return res.status(400).json({
                    status: "Failed",
                    message:"User not found",
                });
            }else{
                const isCorrect = await bcrypt.compare(password, user.password)
                // This basically writes the user details to our session which is
                // maintained in redis database
                req.session.user = user;
                if (isCorrect){
                    return res.status(200).json({
                        status: "Successful",
                        message:"Login Successful",
                    });
                }else{
                    return res.status(400).json({
                        status: "Failed",
                        message:"Incorrect password or username",
                    })
                }
                
            }
        } catch(e) {
            res.status(400).json({
                status: "Failed",
            });
        }
    }
    ```
