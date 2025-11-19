// // backend/routes/HR/payrollRoutes.js
// import express from "express";
// import { getPayrollForHR } from "../../controllers/HR/payrollController.js";

// const router = express.Router();

// // Remove authMiddleware
// router.get("/hr", getPayrollForHR);

// export default router;


//shrey
import express from "express";
import { 
  getPayrollForHR, 
  createPayroll 
} from "../../controllers/HR/payrollController.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";

const router = express.Router();

// ✅ Apply auth middleware to all routes
router.use(authMiddleware);

// ✅ GET all payroll records
router.get("/", getPayrollForHR);

// ✅ POST create new payroll
router.post("/", createPayroll);

export default router;
