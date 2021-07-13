# __AUTHORIZATION MIDDLEWARE__

This file basically looks into the authorization aspect of the use and based on the login/signup status of the user this middleware routes the call to the different api calls.

This middleware looks if the session has user object, only if it contains user object it calls the next middleware present in the stack or else it sends an error message to the user.

```js
const protect = (req, res, next) => {
    const {user} = req.session
    if(!user){
        return res.status(401).json({
            "status": "Failed",
            "message": "User is not authorized",
        });
    }
    req.user = user;

    // when we call next() it just diverts the access to the next middleware in the stack
    next();
};

module.exports = protect;
```

This middleware checks if the user is logged in or signed up, only then it allows the user to access the further routes, else it cuts the request and responds back with 401 status and an error message.
