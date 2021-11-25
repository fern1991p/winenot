const router = require("express").Router();
const UserModel = require("../models/User.model");
const Wine = require("../models/Wine.model");
var bcrypt = require("bcryptjs");

let loggedInUser = {};


router.get("/signin", (req, res, next) => {
  res.render("auth/signin.hbs");
});

router.get("/signup", (req, res, next) => {
  res.render("auth/signup.hbs");
});


router.post("/signup", (req, res, next) => {
  const { name, email, password } = req.body;

  if (name == "" || email == "" || password == "") {
    res.render("auth/signup.hbs", { error: "Please enter all fields" });
    return;
  }
 
  var salt = bcrypt.genSaltSync(10);

  var hash = bcrypt.hashSync(password, salt);


  UserModel.create({ name, email, password: hash })
    .then(() => {
      res.redirect("/signin");
    })
    .catch((err) => {
      next(err);
    });
});


router.post("/signin", (req, res, next) => {
  const { email, password } = req.body;

  UserModel.find({ email })
    .then((emailResponse) => {
      if (emailResponse.length) {
        let userObj = emailResponse[0];
        let DoesitMatch = bcrypt.compareSync(password, userObj.password);

        if (DoesitMatch) {
          req.session.myProperty = userObj;
          res.redirect("/profile");
        } else {
          res.render("auth/signin.hbs", { error: "Password not matching" });

          return;
        }
      } else {
        res.render("auth/signin.hbs", { error: "User email does not exist" });
        return;
      }
    })
    .catch((err) => {
      next(err);
    });
});

const checkLogIn = (req, res, next) => {
  if (req.session.myProperty) {
    next();
  } else {
    res.redirect("/signin");
  }
};

router.get("/profile", checkLogIn, (req, res, next) => {
  let myUserInfo = req.session.myProperty;
  const user = req.session.myProperty._id;
  Wine.find({ user }).then((wineCollection) => {
    res.render("wines/profile.hbs", {
      name: myUserInfo,
      wineCollection,
    });
    console.log(myUserInfo);
  });
});

router.get("/logout", (req, res, next) => {
  req.session.destroy();
  res.redirect("/");
});

// QUIZ, RANDOM AND COLLECTION:
router.get("/quiz", (req, res, next) => {
  res.render("wines/quiz.hbs");
});

router.get("/pinotn-result", (req, res, next) => {
  res.render("quizResult/pinotn-result.hbs");
}); 
router.get("/pinotg-result", (req, res, next) => {
  res.render("quizResult/pinotg-result.hbs");
}); 
router.get("/sauvignonblanc-result", (req, res, next) => {
  res.render("quizResult/sauvignonblanc-result.hbs");
}); 





module.exports = router;
