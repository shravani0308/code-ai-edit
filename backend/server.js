const dotenv = require("dotenv");
dotenv.config();

const app = require("./src/app");

app.listen(3000, () => {
 console.log("server listening on port 3000")
})

// const app =require("./src/app");
// const dotenv =require("dotenv");
// dotenv.config();



// app.listen(3000,()=>{
//     console.log("serverlisting")
// })