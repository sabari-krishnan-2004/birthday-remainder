import express from "express";
import dotenv from "dotenv";
import birthdayRoutes from "./routes/birthday.routes.js";

// ✅ Load environment variables FIRST!
dotenv.config();

// Now import other modules that use those variables
import connectDB from "./config/database.js";

// Connect to the database
connectDB();

const app = express();

// A simple route to check if the server is running
app.get("/", (req, res) => {
  res.send("Server is running and ready to connect!");
});

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/birthdays", birthdayRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server is listening on port ${PORT}`);
});