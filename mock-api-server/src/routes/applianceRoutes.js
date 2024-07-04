const express = require("express");
const router = express.Router();
const applianceController = require("../controllers/applianceController");

router.get("/appliances", applianceController.getAllAppliances);
router.get(
  "/appliance/:applianceId/info",
  applianceController.getApplianceById
);

module.exports = router;
