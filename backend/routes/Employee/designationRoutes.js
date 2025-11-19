import express from "express";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { getMyDesignationController } from "../../controllers/Employee/designationController.js";

const router = express.Router();

router.get("/", authMiddleware, getMyDesignationController);

export default router;
