// // import express from "express";
// // import { getAllDepartments, addDepartment } from "../../models/HR/departmentModel.js";
// // import { getDepartments, getDesignationsByDept } from "../../controllers/HR/departmentController.js";
// // const router = express.Router();


// // router.get("/", getDepartments);
// // router.get("/:deptId/designations", getDesignationsByDept);

// // // Get all departments
// // router.get("/", async (req, res) => {
// //   try {
// //     const departments = await getAllDepartments();
// //     res.json(departments);
// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // });

// // // Add new department
// // router.post("/", async (req, res) => {
// //   try {
// //     const { department_name } = req.body;
// //     const newDept = await addDepartment(department_name);
// //     res.json(newDept);
// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // });

// // export default router;



// import express from "express";
// import { getAllDepartments, addDepartment } from "../../models/HR/departmentModel.js";
// import { getDepartments, getDesignationsByDept, getUsersWithDepartments } from "../../controllers/HR/departmentController.js";
// const router = express.Router();

// // Get all departments
// router.get("/", getDepartments);

// // Get designations by department
// router.get("/:deptId/designations", getDesignationsByDept);

// // ✅ Get users with their department names
// router.get("/users-with-departments", getUsersWithDepartments);

// // Add new department
// router.post("/", async (req, res) => {
//   try {
//     const { department_name } = req.body;
//     const newDept = await addDepartment(department_name);
//     res.json(newDept);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// export default router;


import express from "express";
import { 
  getAllDepartments, 
  addDepartment, 
  updateDepartment, 
  deleteDepartment,
  getDesignationsByDept 
} from "../../models/HR/departmentModel.js";

const router = express.Router();

// Get all departments
router.get("/", async (req, res) => {
  try {
    const departments = await getAllDepartments();
    res.json(departments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get designations by department
router.get("/:deptId/designations", async (req, res) => {
  try {
    const { deptId } = req.params;
    const designations = await getDesignationsByDept(parseInt(deptId));
    res.json(designations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new department
router.post("/", async (req, res) => {
  try {
    const { department_name } = req.body;
    const newDept = await addDepartment(department_name);
    res.json(newDept);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update department
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { department_name } = req.body;
    const updatedDept = await updateDepartment(parseInt(id), department_name);
    res.json(updatedDept);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete department
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteDepartment(parseInt(id));
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
