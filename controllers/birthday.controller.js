import Birthday from "../models/birthday.model.js";

// Now only adds a birthday for the logged-in user
export const addBirthday = async (req, res) => {
  try {
    const birthday = await Birthday.create({
      name: req.body.name,
      dob: req.body.dob,
      user: req.user.id, // Get user ID from the auth middleware
    });
    res.status(201).json(birthday);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Now only gets birthdays for the logged-in user
export const getallBirthday = async (req, res) => {
  try {
    const birthdays = await Birthday.find({ user: req.user.id });
    res.status(200).json(birthdays);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};