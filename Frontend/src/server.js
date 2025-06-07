require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const MicrosoftStrategy = require("passport-microsoft").Strategy;

const app = express();
const port = 3000;

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new MicrosoftStrategy(
    {
      clientID: process.env.MICROSOFT_CLIENT_ID,
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/microsoft/callback",
      scope: ["user.read"],
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

app.get("/auth/microsoft", passport.authenticate("microsoft"));

app.get(
  "/auth/microsoft/callback",
  passport.authenticate("microsoft", { failureRedirect: "/" }),
  (req, res) => res.redirect("/admin.html")
);

app.get("/api/data", (req, res) => {
  if (!req.isAuthenticated()) return res.sendStatus(401);
});

app.use(express.static("../public"));

function validarEmailMaua(email) {
  const regex = /^[a-zA-Z0-9.\-_]+@maua\.br$/;
  return regex.test(email);
}

app.get("/admin.html", (req, res, next) => {
  if (!req.isAuthenticated()) return res.redirect("/");
  if (!validarEmailMaua(req.user._json.mail)) return res.redirect("/");
  next();
});

app.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
