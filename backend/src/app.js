const express = require("express");
const app = express();
const aiRoutes = require("./routes/ai.routes");

app.use(express.json());   // ⭐ Important for POST later

app.get("/", (req, res) => {
  res.send("API running");
});

app.use("/ai", aiRoutes);

module.exports = app;