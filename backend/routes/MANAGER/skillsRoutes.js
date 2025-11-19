import express from "express";
import { getSkills, addSkill, removeSkill, getUsers } from "../../controllers/MANAGER/skillsController.js";

const router = express.Router();

router.get("/", getSkills);
router.post("/", addSkill);
router.delete("/:id", removeSkill);
router.get("/users", getUsers); // for dropdown

export default router;
