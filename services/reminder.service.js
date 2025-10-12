import Birthday from "../models/birthday.model.js";
import { sendWhatsAppMessage } from "./whatsapp.service.js";

export const checkBirthdays = async() => {
    console.log("Checking for today's birthdays...");
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    try{
        const birthdays = await Birthday.find({});

        for(const person of birthdays){
            const dob = new Date(person.dob);
            if(dob.getDate() === today.getDate() && dob.getMonth() === today.getMonth()){
                console.log(`Today is ${person.name}'s birthday!`);
                await sendWhatsAppMessage(person.name, "today");
            }
            if(dob.getDate() === tomorrow.getDate() && dob.getMonth() === tomorrow.getMonth()){
                console.log(`Tomorrow is ${person.name}'s birthday!`);
                await sendWhatsAppMessage(person.name, "tomorrow");
            }
            
        }
    }catch(err){
        console.error("Error checking birthdays:", err);
    }
        

}