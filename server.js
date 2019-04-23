const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const app = express();
//body parser
const bodyParser = require("body-parser");
// use bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const path = require("path");
const users = require("./routes/api/users");
const posts = require("./routes/api/posts");
const profile = require("./routes/api/profile");

//DB url
const db = require("./config/keys").mongoURI;
//connect to db
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected!"))
  .catch(err => {
    console.log(err);
  });

//passport middlewire
app.use(passport.initialize());
//passport config
require("./config/passport")(passport);
app.use("/api/users", users);
app.use("/api/posts", posts);
app.use("/api/profile", profile);

//server static asset if it in production
if (process.env.NODE_ENV == "production") {
  //set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
