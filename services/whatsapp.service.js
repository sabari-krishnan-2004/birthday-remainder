
import twilio from 'twilio';

// Debug: Print env variables to check if they are loaded (keep for troubleshooting)
console.log('DEBUG: TWILIO_ACCOUNT_SID:', process.env.TWILIO_ACCOUNT_SID);
console.log('DEBUG: TWILIO_AUTH_TOKEN:', process.env.TWILIO_AUTH_TOKEN);
console.log('DEBUG: TWILIO_WHATSAPP_NUMBER:', process.env.TWILIO_WHATSAPP_NUMBER);
console.log('DEBUG: RECIPIENT_WHATSAPP_NUMBER:', process.env.RECIPIENT_WHATSAPP_NUMBER);

export const sendWhatsAppMessage = async (personName,type) => {
        // Create the Twilio client here to ensure env vars are loaded
        const client = twilio(
            process.env.TWILIO_ACCOUNT_SID,
            process.env.TWILIO_AUTH_TOKEN
        );
    let messageBody = "";

    if(type == "today"){
        messageBody = `its  Birthday of, ${personName}! Hope you wish them an wonderful day!`;
    }else if(type =="tomorrow"){
        messageBody = `🎈 Birthday Reminder: It's ${personName}'s birthday tomorrow!`;
    }

    try{
        await client.messages.create({
            body: messageBody,
            from: process.env.TWILIO_WHATSAPP_NUMBER, // Twilio Sandbox Number
            to: process.env.RECIPIENT_WHATSAPP_NUMBER,   // Your Personal WhatsApp Number
        });
        console.log(` WhatsApp reminder sent for ${personName}`);
    }catch (error) {
    console.error(` Failed to send WhatsApp message: ${error.message}`);
  }
}