const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors=require("cors")
const express = require("express")
const fileupload=require("express-fileupload")
const errorMiddleware = require("./middleware/error")



const path = require("path");

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "./config/config.env" });
}
const app = express()
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb" }));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({extended:true, limit: '10mb' }));
app.use(fileupload());
app.use(cookieParser());
app.use(cors());
//routes
const product = require("./routes/productRouter")
const user = require("./routes/userRouter")
const order = require("./routes/orderRoute")
const payment = require("./routes/paymentRoute");
//errors
app.get("/", (req, res) => {
  res.json({message:"Hello Alhamdulillah I am Live Now"})
})
app.use(errorMiddleware)
app.use("/api/v1", product)
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);
// //hosting
 app.use(express.static(path.join(__dirname, "./frontend/build")));

 app.get("*", (req, res) => {
   res.sendFile(path.resolve(__dirname, "./frontend/build/index.html"));
 });
//middleware
app.use(errorMiddleware)
module.exports=app