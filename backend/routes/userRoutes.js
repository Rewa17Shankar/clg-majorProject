import express from "express";
import { 
  addUser, 
  getUserCounts,  
  resetPassword, 
  loginUser, 
  updatePassword, 
  getUserProfile, 
  changeUserDepartment, 
  updateUserSalary,
  getAllUsers,
  getAllEmployees  // ✅ ADD THIS IMPORT
} from "../controllers/userController.js";

import { 
  getAllUsersWithDepartment, 
  updateUserDepartment, 
  updateUserDesignation
} from "../models/userModel.js";

const router = express.Router();

// ⚠️ IMPORTANT: Specific routes MUST come BEFORE generic routes like "/"
router.get("/counts", getUserCounts);

// ✅ ADD THIS ROUTE - For HR employees dropdown
router.get("/employees", getAllEmployees);

// Get all users with department (alternative endpoint)
router.get("/with-department", async (req, res) => {
  try {
    console.log("📥 GET /api/users/with-department");
    const users = await getAllUsersWithDepartment();
    console.log("✅ Successfully fetched users with department");
    res.json(users);
  } catch (err) {
    console.error("❌ Error in GET /api/users/with-department:");
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/:userId/profile", getUserProfile);

router.post("/add", addUser);
router.post("/:userId/reset", resetPassword);
router.post("/login", loginUser);
router.post("/update-password", updatePassword);

router.put("/update-department", changeUserDepartment);
router.put("/update-salary", updateUserSalary);

// Update user department
router.patch("/:userId/department", async (req, res) => {
  try {
    const { userId } = req.params;
    const { department_id } = req.body;
    console.log(`📥 PATCH /api/users/${userId}/department - dept: ${department_id}`);
    
    const updatedUser = await updateUserDepartment(parseInt(userId), department_id);
    console.log("✅ Successfully updated user department");
    res.json(updatedUser);
  } catch (err) {
    console.error(`❌ Error updating user ${req.params.userId}:`);
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Update user designation
router.patch("/:userId/designation", async (req, res) => {
  try {
    const { userId } = req.params;
    const { designation_id } = req.body;
    console.log(`📥 PATCH /api/users/${userId}/designation - designation: ${designation_id}`);
    
    const updatedUser = await updateUserDesignation(parseInt(userId), designation_id);
    console.log("✅ Successfully updated user designation");
    res.json(updatedUser);
  } catch (err) {
    console.error(`❌ Error updating user ${req.params.userId} designation:`);
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Get all users with department and role info
router.get("/", async (req, res) => {
  try {
    console.log("📥 GET /api/users - Fetching all users...");
    await getAllUsers(req, res);
  } catch (err) {
    console.error("❌ Error in GET /api/users:");
    console.error("Error message:", err.message);
    console.error("Error stack:", err.stack);
    console.error("Error details:", err);
    res.status(500).json({ 
      error: err.message,
      details: err.toString()
    });
  }
});

export default router;
