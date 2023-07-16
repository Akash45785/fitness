const express = require("express");
const _ = require("lodash");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const session = require('express-session');
const bcrypt = require('bcrypt');

// app functionality with express and body-parser
const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));

// connecting mongoose
// mongoose.connect('mongodb://localhost:27017/logDB', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// Defining Schema
// const loginSchema = new mongoose.Schema({
//   userName: String,
//   Password: String
// });

// creatig a model
// const User = mongoose.model('User', loginSchema);

// // to check if user exist or not
// async function checkIfUserExists(username, password) {



// app.post('/signup', async function( req , res ){
//   const {name , password} = req.body;
//   User.findOne({ name : name , password : password} ,async function(err , foundUser){
//     if(foundUser){
//       res.render('Home');
//     }
//     else{
//       const newUser = new User({ name : name, password :password} );
//       newUser.save();
//       res.render('Home');
//     }
//   })
// })
//
//
// //
//     app.post('/signin', async function(req, res) {
//       const {
//         name,
//         password
//       } = req.body;
//       if (userExists) {
//         res.render('Home');
//       } else {
//         res.render('signup');
//       }
//       console.log(name);
//       console.log(password);
//     });

//  setting our app and ejs
app.set('view engine', 'ejs');
app.use(express.static("public"));


// Different  Route
app.get('/', (req, res) => {
  res.render('Home');
});
app.get('/Features', (req, res) => {
  res.render('Features');
});
app.get('/Home', (req, res) => {
  res.render('Home');
});
app.get('/Contactus', (req, res) => {
  res.render('Contactus');
});
app.get('/signup', (req, res) => {
  res.render('signup');
});
app.get('/signin', (req, res) => {
  res.render('signin');
});


// for bmi
app.post('/calculate', function(req, res) {
  const weight = parseFloat(req.body.weight);
  const height = parseFloat(req.body.height);
  const bmi = weight / (height * height);

  res.render('Features', { bmi :bmi});
});

// Start the server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
