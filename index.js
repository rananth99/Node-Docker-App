const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const redis = require('redis');
const cors = require('cors')

const {
    MONGO_USER,
    MONGO_PASSWORD,
    MONGO_IP,
    MONGO_PORT,
    REDIS_URL,
    REDIS_PORT,
    SESSION_SECRET
} = require("./config/config");

let RedisStore = require('connect-redis')(session);
let redisClient = redis.createClient({
    host: `${REDIS_URL}`,
    post: `${REDIS_PORT}`
})

const postRouter = require('./routes/postRoutes');
const userRouter = require('./routes/userRoutes');

const app = express()

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const connectWithRetry = () => {
    // connecting our express app with the mongo database with the help of mongoose library
    mongoose
        .connect(mongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        .then(() => console.log("Successfully Connected to Mongo DB"))
        .catch((e) => {
            console.log(e)
            setTimeout(connectWithRetry, 5000)
        });   
}

// calling the function which connects with our mongo database
connectWithRetry();

// we need to add this to make our express app trust all the headers Nginx adds to the request 
app.enable("trust proxy");

//  this is a middleware for using the cors
app.use(cors({}));

// this is a middleware for using the redis sessions
app.use(session({
    store: new RedisStore({
        client: redisClient
    }),
    secret: `${SESSION_SECRET}`,
    cookie: {
        secure: false,
        resave: false,
        saveUninitialized: false,
        httpOnly: true,
        maxAge: 600000,
    }
}))

// this is a middleware which allows the app to pass the body of the post as part of the request that
// is sent to our route. 
app.use(express.json());

// setting up a testing route
app.get("/api/v1", (req,res) => {
    res.send(
    "<h1>Hi Welcome to Docker-Node app 😎 !!! Welcome back !! \
    </h1><br /><h2>Testing route works successfully !!</h2>"
    );
    console.log("yeah it ran !!")
});

app.use("/api/v1/posts", postRouter);

app.use("/api/v1/users", userRouter);

// if the environment variable called PORT is already set then use default 3000 as the port
// and make the app listen to that port
const port = 5050;
app.listen(port, ()=>console.log(`Listening on port ${port}`));
