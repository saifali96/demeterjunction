const passport = require("passport");
const express = require("express");
const analysisService = require("../../services/analysis/analysis");
const resultService = require("../../services/analysis/result");

const router = express.Router();

// router.post(
//   "/",
//   passport.authenticate("jwt", { session: false }),
//   analysisService.postAnalysis
// );
// router.get(
//   "/:uid",
//   passport.authenticate("jwt", { session: false }),
//   resultService.getAnalysis
// );

module.exports = router;
