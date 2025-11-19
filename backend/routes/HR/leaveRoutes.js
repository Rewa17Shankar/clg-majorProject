// backend/routes/leaveRoutes.js
import express from "express";
import {listLeaveTypes, addLeaveType, editLeaveType, removeLeaveType, createRequest, listRequests,   getRequest, setRequestStatus, removeRequest, } from "../../controllers/HR/leaveController.js";

const router = express.Router();

/** Leave Types */
router.get("/types", listLeaveTypes);
router.post("/types", addLeaveType);
router.put("/types/:id", editLeaveType);
router.delete("/types/:id", removeLeaveType);

/** Leave Requests */
router.get("/", listRequests);                 // ?status=Pending&user_id=123
router.post("/", createRequest);
router.get("/:id", getRequest);
router.patch("/:id/status", setRequestStatus); // { status: 'Approved' | 'Rejected' | 'Pending' }
router.delete("/:id", removeRequest);

export default router;
