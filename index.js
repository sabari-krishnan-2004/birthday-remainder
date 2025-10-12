

import dotenv from "dotenv";
dotenv.config();

// Debug: Print all TWILIO_ and RECIPIENT_WHATSAPP_NUMBER env variables
console.log('DEBUG: Environment variables loaded:');
Object.keys(process.env)
  .filter(key => key.startsWith('TWILIO_') || key === 'RECIPIENT_WHATSAPP_NUMBER')
  .forEach(key => console.log(key + ':', process.env[key]));

import express from "express";
import cron from 'node-cron';
import birthdayRoutes from "./routes/birthday.routes.js";
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

// Temporarily change to this for testing
// cron.schedule("* * * * *", () => {
//   checkBirthdays();
// });

app.listen(PORT, () => {
  console.log(` Server is listening on port ${PORT}`);
});