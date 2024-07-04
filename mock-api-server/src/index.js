const express = require("express");

const applianceRoutes = require("./routes/applianceRoutes");

const app = express();

const port = process.env.PORT || 3001;

app.use(express.json());

app.use("/api/v1", applianceRoutes);

app.listen(port, () => {
  console.log(`Mock API server running at http://localhost:${port}`);
});
