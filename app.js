// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// default value for title local
const projectName = "wineNot";
const capitalized = (string) =>
  string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)}`;

const session = require("express-session");
const MongoStore = require("connect-mongo");

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 24 * 60 * 60, // your cookie will be cleared after these seconds
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI || "mongodb://localhost/winenot",
      // Time to Live for sessions in DB. After that time it will delete it!
      ttl: 24 * 60 * 60, // your session will be cleared after these seconds
    }),
  })
);

// 👇 Start handling routes here
const index = require("./routes/index");
app.use("/", index);

const auth = require("./routes/user.routes");
app.use("/", auth);

const wine = require("./routes/wine.routes");
app.use("/", wine);

const api = require("./routes/api.routes");
app.use("/", api);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
