import express from "express";
import { addBirthday, getallBirthday } from "../controllers/birthday.controller.js";
import { protect } from "../middlewares/auth.middleware.js"; // Import the middleware

const router = express.Router();

// By adding 'protect' here, these routes can only be accessed by logged-in users
router.route("/").get(protect, getallBirthday).post(protect, addBirthday);

export default router;