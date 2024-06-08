const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const operatorRoute = require("./routes/operator");
const dashboardRoute = require("./routes/dashboard");
const roleRoute =require("./routes/role");
const cors = require("cors");


mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/operators", operatorRoute);
app.use("/api/dashboards", dashboardRoute);
app.use("/api/roles", roleRoute);


app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});
