const router = require("express").Router();

const Users = require("./users-model.js");
const restritcted = require("../auth/restricted-mw.js");

router.get("/", restritcted, (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json({ data: users });
    })
    .catch(err => res.send(err));
});

router.put("/:id", restritcted, checkRole(["hr", "admin"]), (req, res) => {
  res.status(200).json({ hello: "ya made it" });
});

function checkRole(roles) {
  return function (req, res, next) {
    if (roles.includes(req.decodedToken.role)) {
      next();
    } else {
      res.status(403).json({ stop: "hammertime" });
    }
  };
}

module.exports = router;
