const express = require("express");
const router = express.Router();
const axios = require("axios");

const SPOONACULAR_KEY = process.env.SPOONACULAR_KEY;
const wines = [
  "merlot",
  "pinot_noir",
  "shiraz",
  "malbec",
  "bordeaux",
  "gewurztraminer",
  "chardonnay",
  "riesling",
  "sauvignon_blanc",
  "pinot_grigio",
];

router.get("/collection", (req, res, next) => {
  let myPromises = [];
  for (i = 0; i < wines.length; i++) {
    myPromises.push(
      axios.get(
        `https://api.spoonacular.com/food/wine/recommendation?wine=${wines[i]}&number=30&apiKey=${process.env.SPOONACULAR_KEY}`
      )
    );
  }
  Promise.all(myPromises)
    .then((responses) => {
      let merge = [];
      responses.forEach((eachResp) => {
        console.log(merge.length);
        merge = [...merge, ...eachResp.data.recommendedWines];
      });
      //You will get an array of responses
      res.render("wines/collection.hbs", {
        recommendedWines: merge,
      });
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
