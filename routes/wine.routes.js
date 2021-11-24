const express = require("express");
const { collection } = require("../models/Wine.model");
const router = express.Router();
const uploader = require("../config/cloudinary.config.js");
const Wine = require("../models/Wine.model");

// ------------------------------CREATE-----------------------------------

//form in sidebar-toggle?
router.get("/profile", (req, res, next) => {
  res.render("wines/wine-collection.hbs");
});

router.post("/profile", uploader.single("image"), (req, res, next) => {
  console.log("file is: ", req.file);
  req.body.user = req.session.myProperty._id;

  Wine.create({ image: req.file.path, ...req.body })
    .then(() => {
      res.redirect("/profile");
    })
    .catch((err) => console.log("Err while creating new wine: ", err));
});

// Modal Wine card?
router.get("/profile/:id/edit", (req, res, next) => {
  const { id } = req.params;

  Wine.findById(id)
    .then((oneWine) => res.render("wines/edit-wine-form.hbs", { oneWine }))
    .catch((err) => console.log("Err while getting one wines: ", err));
});

router.post("/profile/:id/edit", (req, res, next) => {
  const { id } = req.params;
  const { image, name, sweetness, price, matches, comment } = req.body;

  Wine.findByIdAndUpdate(
    id,
    { image, name, sweetness, price, matches, comment },
    { new: true }
  )
    .then(() => {
      res.redirect("/profile");
    })
    .catch((err) => console.log("Err while editing a wine: ", err));
});

router.get("/profile/:id/delete", (req, res, next) => {
  const { id } = req.params;

  Wine.findByIdAndDelete(id)

    .then(() => {
      res.redirect("/profile");
    })
    .catch((err) => console.log("Err while deleting a wine: ", err));
});

// // FERN quiz below (similar to luise, carefull when merging)
// const SPOONACULAR_KEY = process.env.SPOONACULAR_KEY;

//  const wines = [
//    "merlot",
//    "pinot_noir",
//    "chardonnay",
//    "riesling",
//  ];

//  router.get("/collection", (req, res, next) => {
//    let myPromises = [];
//    for (i = 0; i < wines.length; i++) {
//      myPromises.push(
//        fetch(
//          `https//:api.spoonacular.com/food/wine/recommendation?wine=${wines[i]}&number=1&apiKey=${process.env.SPOONACULAR_KEY}`
//        )

//      );
//    }
//    Promise.all(myPromises)
//      .then((responses) => {
//        let merge = [];
//        responses.forEach((eachResp) => {
//          console.log(merge.length);
//          merge = [...merge, ...eachResp.data.recommendedWines];
//        });
       
//        //You will get an array of responses
//        re.redirect("wines/suggestion.hbs", {
//          recommendedWines: merge,
//        });
//      })
//      .catch((err) => {
//        next(err);
//      });
//  });

//recommendedWines API nested obj
// FERN quiz below:







module.exports = router;
