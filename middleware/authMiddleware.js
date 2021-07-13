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