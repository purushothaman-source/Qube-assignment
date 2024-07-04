const { faker } = require("@faker-js/faker");

const deviceStatuses = ["offline", "online"];
const downloadStatuses = ["failed", "cancelled", "downloading", "succeeded"];
const billingCycles = ["monthly", "quarterly", "annual"];

const generateDummyData = (numRecords) => {
  const dummyData = [];
  for (let i = 0; i < numRecords; i++) {
    const record = {
      serialNo: faker.string.alphanumeric(10).toUpperCase(),
      theatreName: faker.company.name(),
      location: {
        city: faker.location.city(),
        state: faker.location.state(),
        country: "India",
      },
      ispPaymentResponsibility: faker.company.name(),
      bandwidth: `${faker.number.int({ min: 1, max: 10 })} Gbps`,
      avgBandwidth: `${faker.number.int({ min: 100, max: 1000 })} Kbps`,
      planStartDate: faker.date.past().toISOString(),
      billingCycle: faker.helpers.arrayElement(billingCycles),
      deviceStatus: faker.helpers.arrayElement(deviceStatuses),
      downloadStatus: faker.helpers.arrayElement(downloadStatuses),
      osVersion: `${faker.number.int({ min: 1, max: 10 })}.${faker.number.int({
        min: 0,
        max: 10,
      })}.${faker.number.int({ min: 0, max: 10 })}`,
      storage: `${faker.number.int({ min: 100, max: 1000 })} GB`,
    };
    dummyData.push(record);
  }
  return dummyData;
};

module.exports = generateDummyData;
