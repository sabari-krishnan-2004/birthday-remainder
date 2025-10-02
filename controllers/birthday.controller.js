import Birthday from "../models/birthday.model.js";

export const addBirthday = async(req, res) => {
    try{
        const birthday = await Birthday.create(req.body);
        res.status(201).json(birthday);
    }catch(err){
        res.status(400).json({error: err.message});
    }
};

export const getallBirthday = async(req, res) => {
    try{
        const birthdays = await Birthday.find({});
        res.status(200).json(birthdays);
    }catch(err){
        res.status(500).json({error: err.message});
    }
};


