const express = require("express");
const { collection } = require("../models/Wine.model");
const router = express.Router();
const uploader = require("../config/cloudinary.config.js");
const Wine = require("../models/Wine.model");

// ------------------------------CREATE-----------------------------------

//form in sidebar-toggle?

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

router.post("/profile/:id/edit", uploader.single("image"), (req, res, next) => {
  const { id } = req.params;
  const { name, sweetness, price, matches, comment } = req.body;

  let image = req.file.path;
  Wine.findByIdAndUpdate(
    id,
    { image, name, sweetness, price, matches, comment },
    { new: true }
  )
    .then(() => {
      res.redirect("/profile");
    })
    .catch((err) => next("You forgot to upload a picture"));
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
