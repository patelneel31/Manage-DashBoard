const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth-controller");
const validate = require("../midddlewares/validate-middleware.js");
const signupSchema = require("../validators/auth-validator.js");
const authMiddleware = require("../midddlewares/auth-middleware.js");

router.route("/").get(authController.home);
router.route("/register").post(validate(signupSchema), authController.register);

router.route("/login").post(authController.login);

router.route("/user").get(authMiddleware,authController.user)

module.exports = router;
