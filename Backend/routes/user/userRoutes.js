const express = require("express");
const router = express.Router();
const { isAuth } = require("../../util");

// import all controllers
const controller = require("../../controllers/userController");

// POST method;
router.post("/register", controller.register); // register user
router.post("/login", controller.login); //login in app
router.post("/verify", controller.verifyUser, (_req, res) =>
  res.end()
); // authenticate user

//PUT methods
router.patch(
  "/updateUserPassword",
  isAuth,
  controller.updateUserPassword
); //use to update the user password

module.exports = router;
