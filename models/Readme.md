# __DATABASE TABLES - SCHEMA__

## POST SCHEMA

This file presents the schema of a Post that will be sent to the database.The schema is as shown :

```js
// creating the schema for our post.
// It should have a title and body
// We explicitly mention that both the title and the body should always be present while inserting a post into our database.
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
```

---

## USER SCHEMA

This file presents the schema of a User that will be sent to the database.The schema is as shown :

```js
// creating the schema for our user
// We specify that the username and passowrd is a must and also mention that the usernames must be unique and no repetitions.
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: [true, "User must have a valid username"],
        unique: true,
    },
    password: {
        type: String,
        require: [true, "User must have a valid password"]
    }
});

const User = mongoose.model("User",userSchema);

// exporting our User
module.exports = User;
```
