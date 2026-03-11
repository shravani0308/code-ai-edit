const express = require("express");
const app = express();
const aiRoutes = require("./routes/ai.routes");
const cors = require("cors");
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")

const userRoutes = require("./routes/user.routes");

try{
   mongoose.connect(process.env.MONGODB_URI)
    console.log('db connected')
}catch(error){
    console.log(error)
}

app.use(express.json());
app.use(cors({
  origin:process.env.FRONTEND_URL,
  credentials:true,
  methods:"GET,POST,PUT,DELETE",
  allowedHeaders:["Content-Type","Authorization"]
}))
app.use(cookieParser()); 

app.get("/", (req, res) => {
  res.send("API running");
});

app.use("/user", userRoutes);
console.log("user routes working");

app.use("/ai", aiRoutes);
console.log("ai route working");

module.exports = app;
