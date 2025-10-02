import express from 'express';
import {addBirthday, getallBirthday} from '../controllers/birthday.controller.js';
const router = express.Router();

router.route('/').post(addBirthday).get(getallBirthday);

export default router;