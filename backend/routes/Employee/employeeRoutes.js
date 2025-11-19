import express from 'express';
import * as AttendanceController from '../../controllers/Employee/attendanceController.js';
import * as LeaveController from '../../controllers/Employee/leaveController.js';
import * as PayrollController from '../../controllers/Employee/payrollController.js';
import { getManagersList } from '../../controllers/Employee/assetController.js';
import { authMiddleware } from '../../middlewares/authMiddleware.js';

const router = express.Router();

/* ---------------- PUBLIC ROUTES ---------------- */

// Manager list without auth (employee ko chahiye)
router.get("/managers/list", getManagersList);

/* ---------------- PROTECTED ROUTES ---------------- */

router.use(authMiddleware);

router.get('/attendance', AttendanceController.getMyAttendance);
router.get('/leaves', LeaveController.getMyLeaves);
router.post('/apply-leave', LeaveController.applyLeave);
router.get('/leave-types', LeaveController.getLeaveTypes);

router.get('/payroll', PayrollController.getMyPayroll);



export default router;
