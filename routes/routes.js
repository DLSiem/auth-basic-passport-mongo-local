const express = require("express");
const router = express.Router();
const registerService = require("../services/register.service.ts");
const passport = require("passport");

router.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    res.send(
      `<h1>Welcome ${req.user.username}</h1><br><a href="/logout">Logout</a>`
    );
  } else {
    res.send(
      "<h1>Welcome to the homepage</h1><br><a href='/login'>Login</a><br><a href='/register'>Register</a>"
    );
  }
});

router.get("/register", (req, res) => {
  const form = `<h1>Register Page</h1><form method="post" action="/register">\
        Enter Username:<br><input type="text" name="username" required>\
        <br>Enter Password:<br><input type="password" name="password" required>\
        <br><br><input type="submit" value="Submit"></form>\
        If already registered,please <a href="/login">Login</a></p>`;
  res.send(form);
});

router.post("/register", registerService);

router.get("/login", (req, res) => {
  const form =
    '<h1>Login Page</h1><form method="POST" action="/login">\
    Enter Username:<br><input type="text" name="username" required>\
    <br>Enter Password:<br><input type="password" name="password" required>\
    <br><br><input type="submit" value="Submit"></form>';
  res.send(form);
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login-failure",
  }),
  (req, res) => {
    res.redirect("/");
  }
);

router.get("/login-failure", (req, res) => {
  console.log("login-failed");
  res.send(`<p>You entered the wrong password.<br>\
    <a href="/login">login</a><br>\
    <a href="/register">register</p>`);
});

router.get("/logout", (req, res, next) => {
  console.log("in");
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
});

module.exports = router;
