// import React, { useEffect, useState } from "react";
// import {getTeams, createTeam, addTeamMember, removeTeamMember, getUsers, assignTask, getTasksByTeam,
// } from "../../api/MANAGER/teamApi";

// const TeamManagement = () => {
//   const [activeTab, setActiveTab] = useState("create"); // 👈 new state

//   const [teams, setTeams] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [selectedTeam, setSelectedTeam] = useState(null);

//   // For new team
//   const [newTeamName, setNewTeamName] = useState("");
//   const [newTeamDesc, setNewTeamDesc] = useState("");
//   const [managerId, setManagerId] = useState("");

//   // For members
//   const [selectedUser, setSelectedUser] = useState("");

//   // For tasks
//   const [taskTitle, setTaskTitle] = useState("");
//   const [taskDesc, setTaskDesc] = useState("");
//   const [taskDue, setTaskDue] = useState("");
//   const [teamTasks, setTeamTasks] = useState([]);

//   useEffect(() => {
//     fetchTeams();
//     fetchUsers();
//   }, []);

//   const fetchTeams = async () => {
//     try {
//       const data = await getTeams();
//       setTeams(data);
//     } catch (err) {
//       console.error("Error fetching teams:", err);
//     }
//   };

//   const fetchUsers = async () => {
//     try {
//       const data = await getUsers();
//       setUsers(data);
//     } catch (err) {
//       console.error("Error fetching users:", err);
//     }
//   };

//   const fetchTeamTasks = async (teamId) => {
//     try {
//       const data = await getTasksByTeam(teamId);
//       setTeamTasks(data);
//     } catch (err) {
//       console.error("Error fetching team tasks:", err);
//     }
//   };

//   const handleCreateTeam = async () => {
//     if (!newTeamName || !managerId)
//       return alert("Enter team name and manager ID");
//     try {
//       await createTeam({
//         name: newTeamName,
//         description: newTeamDesc,
//         manager_id: managerId,
//       });
//       setNewTeamName("");
//       setNewTeamDesc("");
//       setManagerId("");
//       fetchTeams();
//     } catch (err) {
//       console.error("Error creating team:", err);
//     }
//   };

//   const handleAddMember = async () => {
//     if (!selectedTeam || !selectedUser) return;
//     try {
//       await addTeamMember(selectedTeam.id, selectedUser);
//       setSelectedUser("");
//       fetchTeams();
//     } catch (err) {
//       console.error("Error adding member:", err);
//     }
//   };

//   const handleRemoveMember = async (userId) => {
//     try {
//       await removeTeamMember(selectedTeam.id, userId);
//       fetchTeams();
//     } catch (err) {
//       console.error("Error removing member:", err);
//     }
//   };

//   const handleAssignTask = async () => {
//     if (!selectedTeam || !taskTitle) return;
//     try {
//       await assignTask({
//         title: taskTitle,
//         description: taskDesc,
//         due_date: taskDue,
//         team_id: selectedTeam.id,
//       });
//       setTaskTitle("");
//       setTaskDesc("");
//       setTaskDue("");
//       fetchTeamTasks(selectedTeam.id);
//     } catch (err) {
//       console.error("Error assigning task:", err);
//     }
//   };

//   return (
//     <div className="p-6 space-y-6">
//       {/* Tabs */}
//       <div className="flex space-x-4 mb-6">
//         <button
//           onClick={() => setActiveTab("create")}
//           className={`px-4 py-2 rounded ${
//             activeTab === "create"
//               ? "bg-blue-600 text-white"
//               : "bg-gray-200 text-gray-700"
//           }`}
//         >
//           Create Team
//         </button>
//         <button
//           onClick={() => setActiveTab("view")}
//           className={`px-4 py-2 rounded ${
//             activeTab === "view"
//               ? "bg-blue-600 text-white"
//               : "bg-gray-200 text-gray-700"
//           }`}
//         >
//           View Teams
//         </button>
//         <button
//           onClick={() => setActiveTab("assign")}
//           className={`px-4 py-2 rounded ${
//             activeTab === "assign"
//               ? "bg-blue-600 text-white"
//               : "bg-gray-200 text-gray-700"
//           }`}
//         >
//           Assign Task
//         </button>
//       </div>

//       {/* Create New Team */}
//       {activeTab === "create" && (
//         <div className="bg-white shadow rounded-lg p-4">
//           <h2 className="text-xl font-bold mb-3">Create New Team</h2>
//           <input
//             type="text"
//             placeholder="Team Name"
//             value={newTeamName}
//             onChange={(e) => setNewTeamName(e.target.value)}
//             className="border p-2 rounded w-full mb-2"
//           />
//           <textarea
//             placeholder="Description"
//             value={newTeamDesc}
//             onChange={(e) => setNewTeamDesc(e.target.value)}
//             className="border p-2 rounded w-full mb-2"
//           />
//           <input
//             type="text"
//             placeholder="Manager ID"
//             value={managerId}
//             onChange={(e) => setManagerId(e.target.value)}
//             className="border p-2 rounded w-full mb-2"
//           />
//           <button
//             onClick={handleCreateTeam}
//             className="bg-blue-600 text-white px-4 py-2 rounded"
//           >
//             Create Team
//           </button>
//         </div>
//       )}

//       {/* View Teams */}
//       {activeTab === "view" && (
//         <div className="bg-white shadow rounded-lg p-4">
//           <h2 className="text-xl font-bold mb-3">Teams</h2>
//           <ul className="space-y-2">
//             {teams.map((team) => (
//               <li
//                 key={team.id}
//                 className={`p-2 border rounded cursor-pointer ${
//                   selectedTeam?.id === team.id ? "bg-blue-100" : ""
//                 }`}
//                 onClick={() => {
//                   setSelectedTeam(team);
//                   fetchTeamTasks(team.id);
//                 }}
//               >
//                 <div className="font-semibold">{team.name}</div>
//                 <div className="text-sm text-gray-500">{team.description}</div>
//                 <div className="text-xs text-gray-400">
//                   Manager ID: {team.manager_id}
//                 </div>
//               </li>
//             ))}
//           </ul>

//           {selectedTeam && (
//             <div className="mt-4 space-y-4">
//               {/* Members */}
//               <div>
//                 <h3 className="font-semibold">Members</h3>
//                 <ul className="space-y-1">
//                   {selectedTeam.members?.map((m) => (
//                     <li key={m.user_id} className="flex justify-between">
//                       <span>
//                         {m.username} ({m.role})
//                       </span>
//                       <button
//                         onClick={() => handleRemoveMember(m.user_id)}
//                         className="text-red-600"
//                       >
//                         Remove
//                       </button>
//                     </li>
//                   ))}
//                 </ul>
//                 <div className="mt-2 flex space-x-2">
//                   <select
//                     value={selectedUser}
//                     onChange={(e) => setSelectedUser(e.target.value)}
//                     className="border p-2 rounded"
//                   >
//                     <option value="">Select User</option>
//                     {users.map((u) => (
//                       <option key={u.id} value={u.id}>
//                         {u.username}
//                       </option>
//                     ))}
//                   </select>
//                   <button
//                     onClick={handleAddMember}
//                     className="bg-green-600 text-white px-3 py-1 rounded"
//                   >
//                     Add
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       )}

//       {/* Assign Task */}
//       {activeTab === "assign" && selectedTeam && (
//         <div className="bg-white shadow rounded-lg p-4">
//           <h2 className="text-xl font-bold mb-3">
//             Assign Task to {selectedTeam.name}
//           </h2>
//           <input
//             type="text"
//             placeholder="Task Title"
//             value={taskTitle}
//             onChange={(e) => setTaskTitle(e.target.value)}
//             className="border p-2 rounded w-full mb-2"
//           />
//           <textarea
//             placeholder="Task Description"
//             value={taskDesc}
//             onChange={(e) => setTaskDesc(e.target.value)}
//             className="border p-2 rounded w-full mb-2"
//           />
//           <input
//             type="date"
//             value={taskDue}
//             onChange={(e) => setTaskDue(e.target.value)}
//             className="border p-2 rounded w-full mb-2"
//           />
//           <button
//             onClick={handleAssignTask}
//             className="bg-purple-600 text-white px-3 py-2 rounded"
//           >
//             Assign Task
//           </button>

//           {/* Show tasks */}
//           <h4 className="mt-4 font-semibold">Team Tasks</h4>
//           <ul className="space-y-1">
//             {teamTasks.map((t) => (
//               <li key={t.id} className="border rounded p-2">
//                 <div className="font-medium">{t.title}</div>
//                 <div className="text-sm text-gray-600">{t.description}</div>
//                 <div className="text-xs text-gray-400">Due: {t.due_date}</div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TeamManagement;



import React, { useEffect, useState } from "react";
import {
  getTeams,
  createTeam,
  addTeamMember,
  removeTeamMember,
  getUsers,
  assignTask,
  getTasksByTeam,
} from "../../api/MANAGER/teamApi";

const TeamManagement = () => {
  const [activeTab, setActiveTab] = useState("create");
  const [teams, setTeams] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);

  const [newTeamName, setNewTeamName] = useState("");
  const [newTeamDesc, setNewTeamDesc] = useState("");
  const [managerId, setManagerId] = useState("");

  const [selectedUser, setSelectedUser] = useState("");
  const [assignUser, setAssignUser] = useState("");

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [taskDue, setTaskDue] = useState("");

  const [teamTasks, setTeamTasks] = useState([]);

  // INITIAL LOAD
  useEffect(() => {
    fetchTeams();
    fetchUsers();
  }, []);

  const fetchTeams = async () => {
    try {
      const data = await getTeams();
      setTeams(data);
    } catch (err) {
      console.error("Error loading teams:", err);
    }
  };

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      console.error("Error loading users:", err);
    }
  };

  const fetchTeamTasks = async (teamId) => {
    try {
      const data = await getTasksByTeam(teamId);
      setTeamTasks(data);
    } catch (err) {
      console.error("Error loading tasks:", err);
    }
  };

  const handleCreateTeam = async () => {
    if (!newTeamName || !managerId)
      return alert("Team name and Manager ID required!");

    try {
      await createTeam({
        name: newTeamName,
        description: newTeamDesc,
        manager_id: managerId,
      });
      setNewTeamName("");
      setNewTeamDesc("");
      setManagerId("");
      fetchTeams();
      alert("Team created!");
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddMember = async () => {
    if (!selectedTeam || !selectedUser)
      return alert("Select a team and user!");

    try {
      await addTeamMember(selectedTeam.id, selectedUser);
      setSelectedUser("");
      fetchTeams();
      alert("Member added!");
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemoveMember = async (userId) => {
    try {
      await removeTeamMember(selectedTeam.id, userId);
      fetchTeams();
      alert("Member removed!");
    } catch (err) {
      console.error(err);
    }
  };

  const handleAssignTask = async () => {
    if (!selectedTeam) return alert("Select a team");
    if (!assignUser) return alert("Select an employee");
    if (!taskTitle) return alert("Task title required");

    try {
      await assignTask({
        title: taskTitle,
        description: taskDesc,
        due_date: taskDue,
        team_id: selectedTeam.id,
        assigned_to: assignUser, // FIXED
      });

      setTaskTitle("");
      setTaskDesc("");
      setTaskDue("");
      setAssignUser("");
      fetchTeamTasks(selectedTeam.id);
      alert("Task assigned!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
      <div className="max-w-6xl mx-auto text-white">

        {/* HEADER */}
        <h1 className="text-3xl font-bold mb-2">Team Management</h1>
        <p className="text-gray-400 mb-6">Create teams, manage members & assign tasks</p>

        {/* TABS */}
        <div className="flex gap-3 mb-8">
          {["create", "view", "assign"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-md capitalize ${
                activeTab === tab
                  ? "bg-white text-black font-semibold"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {tab === "create" ? "Create Team" : tab === "view" ? "View Teams" : "Assign Task"}
            </button>
          ))}
        </div>

        {/* CREATE TEAM */}
        {activeTab === "create" && (
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Create New Team</h2>

            <input
              className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 mb-3"
              placeholder="Team Name"
              value={newTeamName}
              onChange={(e) => setNewTeamName(e.target.value)}
            />

            <textarea
              className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 mb-3"
              placeholder="Team Description"
              value={newTeamDesc}
              onChange={(e) => setNewTeamDesc(e.target.value)}
            />

            <input
              className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 mb-3"
              placeholder="Manager ID"
              value={managerId}
              onChange={(e) => setManagerId(e.target.value)}
            />

            <button
              onClick={handleCreateTeam}
              className="bg-white text-black px-6 py-3 rounded-lg font-semibold"
            >
              Create Team
            </button>
          </div>
        )}

        {/* VIEW TEAM LIST */}
        {activeTab === "view" && (
          <div className="grid grid-cols-2 gap-6">

            {/* TEAM LIST */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Teams</h2>
              {teams.map((team) => (
                <div
                  key={team.id}
                  className={`p-4 rounded-lg cursor-pointer mb-2 ${
                    selectedTeam?.id === team.id
                      ? "bg-gray-700 border border-white/20"
                      : "bg-gray-700/40 hover:bg-gray-700"
                  }`}
                  onClick={() => {
                    setSelectedTeam(team);
                    fetchTeamTasks(team.id);
                  }}
                >
                  <div className="font-semibold">{team.name}</div>
                  <div className="text-sm text-gray-400">{team.description}</div>
                  <div className="text-xs text-gray-500">
                    Manager: {team.manager_id}
                  </div>
                </div>
              ))}
            </div>

            {/* MEMBERS */}
            {selectedTeam && (
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-4">
                  {selectedTeam.name} — Members
                </h2>

                {/* MEMBER LIST */}
                {selectedTeam.members?.map((m) => (
                  <div
                    key={m.user_id}
                    className="flex items-center justify-between bg-gray-700/40 p-3 rounded-lg mb-3"
                  >
                    <span>
                      {m.username}{" "}
                      <span className="text-gray-400 text-sm">({m.role})</span>
                    </span>
                    <button
                      onClick={() => handleRemoveMember(m.user_id)}
                      className="text-red-300 border border-red-500 px-3 py-1 rounded-lg hover:bg-red-500/20"
                    >
                      Remove
                    </button>
                  </div>
                ))}

                {/* ADD MEMBER */}
                <div className="flex gap-2">
                  <select
                    className="flex-1 px-4 py-3 bg-gray-700 rounded-lg border border-gray-600"
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(e.target.value)}
                  >
                    <option value="">Select Employee</option>
                    {users.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.username}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={handleAddMember}
                    className="px-6 py-3 bg-green-600/40 text-green-300 border border-green-500 rounded-lg"
                  >
                    Add
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ASSIGN TASK */}
        {activeTab === "assign" && (
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">

            {!selectedTeam ? (
              <p className="text-gray-400 text-center py-10">
                Select a team from "View Teams"
              </p>
            ) : (
              <>
                <h2 className="text-xl font-semibold mb-4">
                  Assign Task — {selectedTeam.name}
                </h2>

                {/* ASSIGN TO USER */}
                <select
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 mb-3"
                  value={assignUser}
                  onChange={(e) => setAssignUser(e.target.value)}
                >
                  <option value="">Assign To Employee</option>
                  {selectedTeam.members?.map((m) => (
                    <option key={m.user_id} value={m.user_id}>
                      {m.username}
                    </option>
                  ))}
                </select>

                <input
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 mb-3"
                  placeholder="Task Title"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                />

                <textarea
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 mb-3"
                  placeholder="Task Description"
                  value={taskDesc}
                  onChange={(e) => setTaskDesc(e.target.value)}
                />

                <input
                  type="date"
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 mb-3"
                  value={taskDue}
                  onChange={(e) => setTaskDue(e.target.value)}
                />

                <button
                  onClick={handleAssignTask}
                  className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold"
                >
                  Assign Task
                </button>

                {/* TASK LIST */}
                <h3 className="text-lg font-semibold mt-6 mb-2">
                  Team Tasks
                </h3>

                {teamTasks.map((t) => (
                  <div
                    key={t.id}
                    className="bg-gray-700/40 border border-gray-600 p-4 rounded-lg mb-3"
                  >
                    <div className="text-white font-semibold">{t.title}</div>
                    <div className="text-gray-300">{t.description}</div>
                    <div className="text-gray-500 text-sm">
                      Due: {t.due_date}
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamManagement;
