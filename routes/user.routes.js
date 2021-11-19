const router = require("express").Router(); 
const UserModel = require('../models/User.model') 
var bcrypt = require('bcryptjs'); 

let loggedInUser = {}

//sign in handlebar
router.get("/signin", (req,res,next) => {
    res.render("auth/signin.hbs")
})
//signup handlebar
router.get("/signup", (req,res,next)=>{
    res.render("auth/signup.hbs")
})

//get data!
router.post('/signup', (req, res, next) => {
    const {name, email, password} = req.body

    if (name == '' || email == '' || password == '') {
        res.render('auth/signup.hbs', {error: 'Please enter all fields'})
        return;
    }
//add email and password validation (do when finish testing)
//regex - need to REQUIRE! Done! Install. Done! Password is hashed now. Please remember password, fernanda
    var salt = bcrypt.genSaltSync(10);
    console.log("salt:", salt)
    var hash = bcrypt.hashSync(password, salt);
    console.log("hash:", hash)

//create the data in my mongoose. Check? Done. 
    UserModel.create({name, email, password:hash})
      .then(() => {
          res.redirect('/signin')
          console.log(name, email, password)
      })
      .catch((err) => {
        next(err)
      })


})


//sign in and redirect to HD
// VALIDADE
router.post("/signin", (req,res,next) => {
    const {email, password} = req.body
    
    ///.FIND IS A ARRAY
    UserModel.find({email})
    .then((emailResponse)=> {
            if (emailResponse.length){
            let userObj = emailResponse[0]
            // its an array
            let DoesitMatch = bcrypt.compareSync(password, userObj.password);
            
            if (DoesitMatch){
                req.session.myProperty = userObj
                res.redirect('/profile')
                //needs to change it!
                
            }
            else {
                res.render('auth/signin.hbs', {error: 'Password not matching'})
                
                return;
            }
            }
    
    else {
        res.render('auth/signin.hbs', {error: 'User email does not exist'})
        return;
        }


    })
    .catch((err) => {
        next(err)
      })
    
})

const checkLogIn = (req, res, next) =>{
    if (req.session.myProperty ) {
          next();
      }
      else {
        res.redirect('/signin')
      }  
}

//private handlebars... to be created

router.get('/profile', checkLogIn, (req,res,next)=>{
    let myUserInfo = req.session.myProperty  
    res.render('auth/profile.hbs', {name: myUserInfo.name})
})


router.get('/logout', (req, res, next) => {
    // Deletes the session
    // this will also automatically delete the session from the DB
    req.session.destroy()
    res.redirect('/')
})

module.exports = router;