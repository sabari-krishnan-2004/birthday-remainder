import twilio from "twilio";



// The function now accepts a recipientNumber
export const sendWhatsAppMessage = async (personName, type, recipientNumber) => {
  // ... messageBody logic ...
  try {
    await client.messages.create({
      body: messageBody,
      from: process.env.TWILIO_WHATSAPP_NUMBER,
      to: recipientNumber, // Use the dynamic number here
    });
    // ...
  } catch (error) {
    // ...
  }
};