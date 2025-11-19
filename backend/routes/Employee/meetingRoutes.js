import express from "express";
import { getEmployeeMeetings } from "../../controllers/Employee/meetingController.js";

const router = express.Router();

router.get("/", getEmployeeMeetings);

export default router;
