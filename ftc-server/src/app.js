import express from "express";
import staffRoutes from "./routes/staff.routes.js";
import studentRoutes from "./routes/staff.routes.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import cors from "cors";

// Create express App
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/user", userRoutes);

app.use((err, _req, res, next) => {
  console.log(err.message);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
  next();
});

// Export app to import it in server.js
export default app;