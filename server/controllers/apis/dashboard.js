const passport = require("passport");
const express = require("express");
const dashboardService = require("../../services/dashboard/dashboard");

const router = express.Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  dashboardService.getDashboard
);

module.exports = router;
