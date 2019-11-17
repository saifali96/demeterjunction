const express = require("express");

const v1ApiController = require("./v1");

const router = express.Router();

router.use("/", v1ApiController); // Mount all the routes on the parent endpoint

module.exports = router;
