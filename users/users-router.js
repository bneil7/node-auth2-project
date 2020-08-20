const router = require("express").Router();

const Users = require("./users-model.js");
const restricted = require("../auth/restricted-mw.js");

router.get("/", restricted, (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json({ data: users });
    })
    .catch(err => res.send(err));
});

router.put("/:id", restricted, checkRole(["hr", "admin"]), (req, res) => {
  res.status(200).json({ hey: "ya made it" });
});

function checkRole(roles) {
  return function (req, res, next) {
    console.log("jwt: ", req.decodedToken);
    if (roles.includes(req.decodedToken.role)) {
      next();
    } else {
      res.status(403).json({ stop: "hammertime" });
    }
  };
}

module.exports = router;
