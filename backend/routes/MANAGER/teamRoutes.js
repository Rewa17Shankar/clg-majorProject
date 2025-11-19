// // backend/routes/teamRoutes.js
// import express from "express";
// import { getTeams, createTeam, addTeamMember, removeTeamMember, assignTask, getTeamTasks, getUsers,
// } from "../../controllers/MANAGER/teamController.js";

// const router = express.Router();

// // Teams
// router.get("/", getTeams);
// router.post("/", createTeam);

// // Members
// router.post("/:teamId/members", addTeamMember);
// router.delete("/:teamId/members/:userId", removeTeamMember);

// // Tasks
// router.post("/tasks", assignTask);
// router.get("/:teamId/tasks", getTeamTasks);

// // Users (for selection)
// router.get("/users/all", getUsers);

// export default router;
// backend/routes/MANAGER/teamRoutes.js
import express from "express";
import * as TeamController from "../../controllers/MANAGER/teamController.js";

const router = express.Router();

// Users selection
router.get("/users/all", TeamController.getUsers);

// Teams
router.get("/", TeamController.getTeams);
router.post("/", TeamController.createTeam);
router.get("/:teamId", TeamController.getTeamById);

// Members
router.get("/:teamId/members", TeamController.getTeamMembers);
router.post("/:teamId/members", TeamController.addTeamMember);
router.delete("/:teamId/members/:userId", TeamController.removeTeamMember);

// Tasks
router.get("/:teamId/tasks", TeamController.getTasksByTeam);
router.post("/:teamId/tasks", TeamController.createTask);

export default router;
