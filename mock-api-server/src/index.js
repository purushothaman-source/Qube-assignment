const express = require("express");
const cors = require("cors");

const applianceRoutes = require("./routes/applianceRoutes");

const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_URL, // Allow only this origin
  methods: "GET,POST,DELETE,PUT", // Allow only GET and POST requests
};

app.use(cors(corsOptions));

const port = process.env.PORT || 3001;

app.use(express.json());

app.use("/api/v1", applianceRoutes);

app.listen(port, () => {
  console.log(`Mock API server running at http://localhost:${port}`);
});
