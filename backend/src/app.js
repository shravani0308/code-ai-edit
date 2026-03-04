const express = require("express");
const app = express();
const aiRoutes = require("./routes/ai.routes");
const cors = require('cors')

app.use(express.json()); 
app.use(cors())  // ⭐ Important for POST later

app.get("/", (req, res) => {
  res.send("API running");
});

app.use("/ai", aiRoutes);

module.exports = app;