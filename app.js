const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors=require("cors")
const express = require("express")
const fileupload=require("express-fileupload")
const errorMiddleware = require("./middleware/error")
const morgan=require("morgan")


const path = require("path");

// Config

  require("dotenv").config({ path: "./config/config.env" });

const app = express()
app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ limit: "500mb" }));
app.use(bodyParser.json({ limit: "500mb" }));
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    limit: "500mb",
    extended: true,
  })
);
app.use(fileupload());
app.use(cookieParser());
app.use(cors());
app.use(morgan("dev"));
//routes
const product = require("./routes/productRouter")
const user = require("./routes/userRouter")
const order = require("./routes/orderRoute")
const payment = require("./routes/paymentRoute");
const like = require("./routes/like");
const comment = require("./routes/comment");
const commentRouter = require("./routes/commentRouter");
const categoryRouter = require("./routes/categoryRouter");
const notificationRouter = require("./routes/notificationRouter");


//errors

app.use(errorMiddleware)
app.use("/api/v1", product)
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);
app.use("/api/v1", like);
app.use("/api/v1", commentRouter);
app.use("/api/v1", categoryRouter);
app.use("/api/v1", notificationRouter);
// //hosting
 app.use(express.static(path.join(__dirname, "./frontend/build")));

 app.get("*", (req, res) => {
   res.sendFile(path.resolve(__dirname, "./frontend/build/index.html"));
 });
//middleware
app.use(errorMiddleware)
module.exports=app