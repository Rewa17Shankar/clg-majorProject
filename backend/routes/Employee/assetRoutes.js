import express from "express";
import { 
  getEmployeeAssets, 
  requestAsset, 
  getEmployeeRequests 
} from "../../controllers/Employee/assetController.js";
import { getManagersList } from "../../controllers/Employee/assetController.js";

const router = express.Router();

//manager list
router.get("/managers/list", getManagersList);

// 1️⃣ Request new asset
router.post("/request", requestAsset);

// 2️⃣ Get ALL requests by user
router.get("/requests/:user_id", getEmployeeRequests);

// 3️⃣ Assigned assets + history
router.get("/:user_id", getEmployeeAssets);

export default router;
