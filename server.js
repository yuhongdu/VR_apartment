const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require('passport');
const User = require('./models/user');
const jwt = require('jsonwebtoken');
const app = express();
const morgan = require('morgan');
const PORT = process.env.PORT || 3001;
const jwtSecret = "a secret phrase!!";

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
// Serve up static assets
app.use(express.static("client/build"));
app.use(express.static("client/public"));
app.use(express.static("client/VR_Components/vr/build"))
//app.use(morgan())

// Add routes, both API and view
// app.use(routes);

// Set up promises with mongoose
mongoose.Promise = global.Promise;
// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/userDataBase")
  .then(() => console.log('connection succesful'))
  .catch((err) => console.error(err));

app.use(passport.initialize());


const localSignupStrategy = require('./passport/local-signup');
const localLoginStrategy = require('./passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);


// pass the authenticaion checker middleware
const authCheckMiddleware = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).end();
  }

  // get the last part from a authorization header string like "bearer token-value"
  const token = req.headers.authorization.split(' ')[1];

  // decode the token using a secret key-phrase
  return jwt.verify(token, jwtSecret, (err, decoded) => {
    // the 401 code is for unauthorized status
    if (err) { return res.status(401).end(); }

    const userId = decoded.sub;

    // check if a user exists
    return User.findById(userId, (userErr, user) => {
      if (userErr || !user) {
        return res.status(401).end();
      }

      return next();
    });
  });
}




app.use('/api', authCheckMiddleware);

// routes
const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api/api');
const vrRoutes = require('./routes/vr')
const sceneRoutes = require('./routes/scene')
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);
app.use('/vr', vrRoutes)
app.use('/scene', sceneRoutes)



// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
