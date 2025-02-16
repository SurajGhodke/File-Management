// server.js - API Gateway
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(express.urlencoded({ extended: true }));
// app.use((req, res, next) => {
//   console.log("Incoming Request:", req.method, req.url);
//   console.log("Request Body:", req.body);
//   next();
// });
// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Import Routes from Microservices
const userRoutes = require("./services/users/routes");
const folderRoutes = require("./services/hierarchy/routes");
const documentRoutes = require("./services/versions/routes");

app.use("/api/users", userRoutes);
app.use("/api/hierarchy", folderRoutes);
app.use("/api/documents", documentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`));
