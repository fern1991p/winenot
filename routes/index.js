const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index", { style: "landing.css" });
});

module.exports = router;
