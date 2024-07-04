import { loader } from "graphql.macro";

const getAppliances = loader("./appliances/getAppliances.graphql");
const getAppliance = loader("./appliances/getAppliance.graphql");

export { getAppliance, getAppliances };
