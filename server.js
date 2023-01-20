const app = require("./app")
const dotenv = require("dotenv");
const cloudinary=require("cloudinary")
const connectDB = require("./config/database")
// //config env
 dotenv.config({ path: "./config/config.env" });
// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});
// // Config
// if (process.env.NODE_ENV !== "PRODUCTION") {
//   require("dotenv").config({ path: "config/config.env" });
// }

//cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
//connection
connectDB()
app.listen(process.env.PORT, () => {
    console.log(`app is runnig at http://localhost:${process.env.PORT}`)
})
// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});