import express from "express";
import dotenv from "dotenv";
import birthdayRoutes from "./routes/birthday.routes.js";
import cron from 'node-cron';


dotenv.config();


import connectDB from "./config/database.js";
import { checkBirthdays } from "./services/reminder.service.js";

connectDB();

const app = express();


app.get("/", (req, res) => {
  res.send("Server is running and ready to connect!");
});

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/birthdays", birthdayRoutes);

cron.schedule(
  "0 0 * * *", // This means at minute 0 of hour 0 (midnight)
  () => {
    checkBirthdays();
  },
  {
    timezone: "Asia/Kolkata", // Specify the IST timezone
  }
);

app.listen(PORT, () => {
  console.log(` Server is listening on port ${PORT}`);
});