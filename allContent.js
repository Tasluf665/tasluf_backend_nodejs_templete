const asyncContent = `module.exports = function (handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res);
    } catch (ex) {
      next(ex);
    }
  };
};
`

const errorContent = `module.exports = function (err, req, res, next) {
  res.status(500).send("Something failed");
};
`

const gitignoreContent = `# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# production
/build

# misc
.DS_Store
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*
.vercel
`

const envContent = `PORT=
BASE_URL=

MONGODB_URL=
`

const indexContent = `const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const mongoose = require("mongoose");

const cors = require("cors");
const error = require("./middleware/error");

//Write the routes
// const auth = require("./routes/auth");

const app = express();
app.set("view engine", "ejs");

if (!process.env.MONGODB_URL) {
    console.error("FATAL ERROR: MONGODB_URL is not define");
    process.exit(1);
}

mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("Connected with mongodb"))
    .catch((err) => console.log("Could not connect to mongodb", err));

//Write all the origins for corsOptions    
// const origins = [
//     "http://localhost:3000",
// ];

const corsOptions = {
    origin: origins,
    credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

//Write the routes
//app.use("/api/auth", auth);

app.use(error);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log('Listening on port ', port, "..."));

`

const helpNoteContent = `npm install express cors dotenv ejs joi joi-objectid lodash mongoose`

module.exports = {
  asyncContent,
  errorContent,
  gitignoreContent,
  envContent,
  indexContent,
  helpNoteContent
};