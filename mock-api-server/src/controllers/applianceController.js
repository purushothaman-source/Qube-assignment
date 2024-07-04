const generateData = require("../generateDummyData");

const appliances = generateData(100);

console.log(appliances.length);

const getAllAppliances = (req, res) => {
  const { deviceStatus, downloadStatus } = req.query;
  let result = appliances;

  if (deviceStatus) {
    result = result.filter(
      (appliance) => appliance.deviceStatus === deviceStatus
    );
  }

  if (downloadStatus) {
    result = result.filter(
      (appliance) => appliance.downloadStatus === downloadStatus
    );
  }

  res.status(200).json(result);
};

const getApplianceById = (req, res) => {
  const { applianceId } = req.params;
  const appliance = appliances.find((appl) => appl.serialNo === applianceId);

  if (appliance) {
    res.status(200).json(appliance);
  } else {
    res.status(404).json({
      httpStatus: 404,
      httpCode: "NOT_FOUND",
      requestId: applianceId,
      errors: [
        { code: "APPLIANCE_NOT_FOUND", message: "Appliance not found." },
      ],
    });
  }
};

module.exports = {
  getAllAppliances,
  getApplianceById,
};
