import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoute from "./routes/auth.js";
import tourRoute from "./routes/tours.js";
import userRoute from "./routes/users.js";
import reviewRoute from "./routes/reviews.js";
import bookingRoute from "./routes/bookings.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

const allowedOrigins = [
  "http://localhost:3000",
  "https://voyago-tour.vercel.app",
];

const corsOptions = {
  origin: "https://voyago-tour.vercel.app",
  credentials: true,
};

// Database connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB database connected"))
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1); // Exit process with failure
  });

// Middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

// Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/tours", tourRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/reviews", reviewRoute);
app.use("/api/v1/bookings", bookingRoute);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port} or http://localhost:${port}`);
});
