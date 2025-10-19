import Birthday from "../models/birthday.model.js";
import { sendWhatsAppMessage } from "./whatsapp.service.js";

export const checkBirthdays = async () => {
  console.log("Cron job running: Checking for birthdays...");
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  try {
    
    // user document linked to each birthday.
    const birthdays = await Birthday.find({}).populate("user");

    // Loop through each birthday found in the database
    for (const person of birthdays) {
      // Ensure the user and their WhatsApp number exist before proceeding
      if (person.user && person.user.whatsappNumber) {
        const dob = new Date(person.dob);
        const recipientNumber = person.user.whatsappNumber; // Get the user-specific number

        // Check for birthdays happening today (match day and month)
        if (dob.getDate() === today.getDate() && dob.getMonth() === today.getMonth()) {
          console.log(`REMINDER: It's ${person.name}'s birthday today! Sending notification to ${recipientNumber}.`);
          // Call the WhatsApp function with the dynamic recipient number
          await sendWhatsAppMessage(person.name, "today", recipientNumber);
        }

        // Check for birthdays happening tomorrow (match day and month)
        if (dob.getDate() === tomorrow.getDate() && dob.getMonth() === tomorrow.getMonth()) {
          console.log(`REMINDER: It's ${person.name}'s birthday tomorrow! Sending notification to ${recipientNumber}.`);
          // Call the WhatsApp function with the dynamic recipient number
          await sendWhatsAppMessage(person.name, "tomorrow", recipientNumber);
        }
      }
    }
  } catch (error) {
    console.error("Error during birthday check:", error);
  }
};