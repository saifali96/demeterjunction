const express = require("express");
const indexService = require("../services/default/index");

const router = express.Router();

router.all("*", indexService.index);

module.exports = router;
