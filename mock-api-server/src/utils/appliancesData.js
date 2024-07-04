const appliances = [
  {
    serialNo: "JTD-512312",
    theatreName: "Kriplle Square",
    location: {
      city: "New Delhi",
      state: "Delhi",
      country: "India",
    },
    bandwidth: "1 Gbps",
    avgBandwidth: "812 Kbps",
    deviceStatus: "offline",
    downloadStatus: "failed",
    osVersion: "5.2.1.3",
  },
  {
    serialNo: "ABC-123456",
    theatreName: "Movie Magic",
    location: {
      city: "Mumbai",
      state: "Maharashtra",
      country: "India",
    },
    bandwidth: "500 Mbps",
    avgBandwidth: "450 Kbps",
    deviceStatus: "online",
    downloadStatus: "succeeded",
    osVersion: "5.2.1.4",
  },
];

module.exports = appliances;
