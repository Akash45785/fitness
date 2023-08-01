const express = require("express");
const _ = require("lodash");
const bodyParser = require('body-parser');
const mongoose =require("mongoose");
const session = require('express-session');
const bcrypt = require('bcrypt');

// app functionality with express and body-parser
const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({  extended: true }));
app.use(express.static("public"));

// connecting mongoose
const mongoURL = 'mongodb://0.0.0.0:27017/users';

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
// mongoose.connect('mongodb://localhost:27017/users', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// Defining Schema
const loginSchema = new mongoose.Schema({
  userName: String,
  Password: String
});


var Exist = "";
// creatig a model
const User = mongoose.model('User', loginSchema);


app.post('/signup', async function( req , res ){
  const {name , password} = req.body;
  console.log( name);
  console.log(password);
  User.findOne({ userName : name , Password : password} ,async function(err , foundUser){
    if(foundUser){
      Exist = " User already exist sign-in to continue ";
      // alert("User already exist signin to continue");
      res.render('signin' , { Exist});
      Exist = "";
    }
    else{
      const newUser = new User({ userName : name, Password :password} );
      newUser.save();
      res.render('Home');
    }
  })
})
//
//
// //
    app.post('/signin', async function(req, res) {
      const {name ,  password } = req.body;
      User.findOne({ userName : name , Password : password} ,async function(err , foundUser){
        if(foundUser){
          Exist = " User already exist sign-in to continue ";
          // alert("User already exist signin to continue");
          res.render('Home');
        }
        else{
          Exist = " User doesn't exist sign-up to continue";
          res.render('Signup' , { Exist});
          Exist = "";
        }
      })

    });




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
  res.render('signup' , { Exist});
});
app.get('/signin', (req, res) => {
  res.render('signin', {Exist});
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
