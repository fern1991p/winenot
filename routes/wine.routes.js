const express = require("express");
const { collection } = require("../models/Wine.model");
const router = express.Router();
const Wine = require("../models/Wine.model");

// ------------------------------CREATE-----------------------------------

//form in sidebar-toggle?
router.get("/profile", (req, res, next) => {
  res.render("wines/wine-collection.hbs", {
    customstyle: `<link rel="stylesheet" href="/stylesheets/collection.css">`,
  });
});

router.post("/profile", (req, res, next) => {
  req.body.user = req.session.myProperty._id;
  Wine.create(req.body)
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

module.exports = router;
