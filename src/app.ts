import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import mongo from "connect-mongo";
import mongoose from "mongoose";
import bluebird from "bluebird";
import passport from "passport";
import { MONGODB_URI, SESSION_SECRET } from "./util/secrets";

const MongoStore = mongo(session);

// Controllers (route handlers)
import * as apiController from "./controllers/v1/api";
import * as usersController from "./controllers/v1/users";

// API keys and Passport configuration
import * as passportConfig from "./config/passport";

// Create Express server
const app = express();

// Connect to MongoDB
const mongoUrl = MONGODB_URI;
mongoose.Promise = bluebird;

mongoose.connect(mongoUrl, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true } ).then(
  () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
).catch(err => {
  console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
  // process.exit();
});

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: SESSION_SECRET,
  store: new MongoStore({
    url: mongoUrl,
    autoReconnect: true
  })
}));
app.use(passport.initialize());
app.use(passport.session());

app.get("/api/v1", apiController.getApi);
app.post("/api/v1/signup", usersController.signup);
// TODO: set your mail credentials
// app.post("/api/v1/signup_with_mail_activation", usersController.signupWithMailActivation);
// app.get("/api/v1/account/activation", usersController.activateAccount);
app.post("/api/v1/login", usersController.login);
app.get("/api/v1/logout", passportConfig.isAuthenticated, usersController.logout);
app.delete("/api/v1/account/delete", passportConfig.isAuthenticated, usersController.deleteAccount);

export default app;
