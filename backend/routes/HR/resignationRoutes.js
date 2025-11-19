// routes/resignationRoutes.js
import express from "express";
import { getResignations, createResignation, updateStatus, getResignationsByUser } from "../../controllers/HR/resignationController.js";

const router = express.Router();

router.get("/", getResignations);
router.post("/", createResignation);
router.put("/:id/status", updateStatus);
router.get("/user/:user_id", getResignationsByUser);

export default router;
