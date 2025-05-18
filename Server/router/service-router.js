const express = require("express");
const { getAllServices } = require("../controllers/service-controller");

const router = express.Router();

router.route("/service").get(getAllServices); 

module.exports = router;
