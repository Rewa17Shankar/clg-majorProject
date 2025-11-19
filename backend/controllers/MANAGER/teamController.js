// // backend/controllers/teamController.js
// import * as TeamModel from "../../models/MANAGER/teamModel.js";

// export const getTeams = async (req, res) => {
//   try {
//     const teams = await TeamModel.getAllTeams();
//     res.json(teams);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// export const createTeam = async (req, res) => {
//   try {
//     const { name, description, manager_id } = req.body;
//     const team = await TeamModel.createTeam({ name, description, manager_id });
//     res.json(team);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// export const addTeamMember = async (req, res) => {
//   try {
//     const { teamId } = req.params;
//     const { userId, role } = req.body;
//     const member = await TeamModel.addMember(teamId, userId, role);
//     res.json(member);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// export const removeTeamMember = async (req, res) => {
//   try {
//     const { teamId, userId } = req.params;
//     await TeamModel.removeMember(teamId, userId);
//     res.json({ success: true });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// export const assignTask = async (req, res) => {
//   try {
//     const { title, description, due_date, team_id, created_by } = req.body;
//     const task = await TeamModel.createTask({ title, description, due_date, team_id, created_by });
//     res.json(task);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// export const getTeamTasks = async (req, res) => {
//   try {
//     const { teamId } = req.params;
//     const tasks = await TeamModel.getTasksByTeam(teamId);
//     res.json(tasks);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// export const getUsers = async (req, res) => {
//   try {
//     const users = await TeamModel.getAllUsers();
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };// backend/controllers/MANAGER/teamController.js
import * as TeamModel from "../../models/MANAGER/teamModel.js";

/* --------------------
   TEAMS
   -------------------- */
export const getTeams = async (req, res) => {
  try {
    const teams = await TeamModel.getAllTeams();

    // Optionally fetch members for each team to show in the UI:
    // (If teams are many, consider paginating. For now small dataset OK.)
    const teamsWithMembers = await Promise.all(
      teams.map(async (t) => {
        const members = await TeamModel.getTeamMembers(t.id).catch(() => []);
        return { ...t, members };
      })
    );

    res.json({ data: teamsWithMembers, count: teamsWithMembers.length });
  } catch (err) {
    console.error("❌ Error in getAllTeams:", err.message || err);
    res.status(500).json({ error: err.message || "Server error" });
  }
};

export const getTeamById = async (req, res) => {
  try {
    const { teamId } = req.params;
    const team = await TeamModel.getTeamById(teamId);
    if (!team) return res.status(404).json({ error: "Team not found" });

    const members = await TeamModel.getTeamMembers(teamId).catch(() => []);
    const tasks = await TeamModel.getTasksByTeam(teamId).catch(() => []);
    res.json({ data: { ...team, members, tasks } });
  } catch (err) {
    console.error("❌ Error in getTeamById:", err.message || err);
    res.status(500).json({ error: err.message || "Server error" });
  }
};

export const createTeam = async (req, res) => {
  try {
    const { name, description, manager_id } = req.body;
    if (!name || !manager_id) return res.status(400).json({ error: "name and manager_id required" });

    const team = await TeamModel.createTeam({ name, description, manager_id });
    res.status(201).json({ data: team, message: "Team created successfully" });
  } catch (err) {
    console.error("❌ Error creating team:", err.message || err);
    res.status(500).json({ error: err.message || "Server error" });
  }
};

/* --------------------
   MEMBERS
   -------------------- */
export const getTeamMembers = async (req, res) => {
  try {
    const { teamId } = req.params;
    const members = await TeamModel.getTeamMembers(teamId);
    res.json({ data: members, count: members.length });
  } catch (err) {
    console.error("❌ Error in getTeamMembers:", err.message || err);
    res.status(500).json({ error: err.message || "Server error" });
  }
};

export const addTeamMember = async (req, res) => {
  try {
    const { teamId } = req.params;
    const { userId, role } = req.body;
    if (!userId) return res.status(400).json({ error: "userId required" });

    const member = await TeamModel.addMember(teamId, userId, role || "Member");
    res.status(201).json({ data: member, message: "Member added successfully" });
  } catch (err) {
    console.error("❌ Error in addTeamMember:", err.message || err);
    res.status(500).json({ error: err.message || "Server error" });
  }
};

export const removeTeamMember = async (req, res) => {
  try {
    const { teamId, userId } = req.params;
    if (!userId) return res.status(400).json({ error: "userId required" });

    await TeamModel.removeMember(teamId, userId);
    res.json({ message: "Member removed successfully" });
  } catch (err) {
    console.error("❌ Error in removeTeamMember:", err.message || err);
    res.status(500).json({ error: err.message || "Server error" });
  }
};

/* --------------------
   TASKS
   -------------------- */
export const createTask = async (req, res) => {
  try {
    const { title, description, due_date, assigned_to } = req.body;
    const { teamId } = req.params;
    const created_by = req.body.created_by || null; // adapt per your auth

    if (!title || !teamId) return res.status(400).json({ error: "title and teamId required" });

    const task = await TeamModel.createTask({
      title,
      description,
      due_date,
      team_id: teamId,
      created_by,
      assigned_to: assigned_to ?? null,
    });

    res.status(201).json({ data: task, message: "Task created successfully" });
  } catch (err) {
    console.error("❌ Error in createTask:", err.message || err);
    res.status(500).json({ error: err.message || "Server error" });
  }
};

export const getTasksByTeam = async (req, res) => {
  try {
    const { teamId } = req.params;
    const tasks = await TeamModel.getTasksByTeam(teamId);
    res.json({ data: tasks, count: tasks.length });
  } catch (err) {
    console.error("❌ Error in getTasksByTeam:", err.message || err);
    res.status(500).json({ error: err.message || "Server error" });
  }
};

/* --------------------
   UTIL - Users list
   -------------------- */
export const getUsers = async (req, res) => {
  try {
    const users = await TeamModel.getAllUsers();
    res.json({ data: users, count: users.length });
  } catch (err) {
    console.error("❌ Error in getUsers:", err.message || err);
    res.status(500).json({ error: err.message || "Server error" });
  }
};
