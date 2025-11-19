// import React, { useEffect, useState } from "react";
// import { getGoalsTasks, addGoal } from "../../api/MANAGER/goalsTasksApi";

// const GoalsTasks = () => {
//   const [goals, setGoals] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [newGoal, setNewGoal] = useState({ 
//     user_id: "", 
//     title: "", 
//     description: "", 
//     due_date: "" 
//   });

//   useEffect(() => {
//     const fetchGoals = async () => {
//       try {
//         const data = await getGoalsTasks();
//         setGoals(data);
//       } catch (error) {
//         console.error("Error fetching goals:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchGoals();
//   }, []);

//   const handleAddGoal = async (e) => {
//     e.preventDefault();
//     try {
//       const created = await addGoal(newGoal);
//       setGoals((prev) => [...prev, created]);
//       setNewGoal({ user_id: "", title: "", description: "", due_date: "" });
//     } catch (error) {
//       console.error("Error adding goal:", error);
//     }
//   };

//   if (loading) return <p className="p-4">Loading goals...</p>;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-6">Goals & Tasks</h1>

//       {/* Add Goal Form */}
//       <form onSubmit={handleAddGoal} className="mb-6 space-y-3 bg-gray-50 p-4 rounded-lg shadow">
//         <input
//           type="text"
//           placeholder="User ID"
//           value={newGoal.user_id}
//           onChange={(e) => setNewGoal({ ...newGoal, user_id: e.target.value })}
//           className="border p-2 rounded w-full"
//           required
//         />
//         <input
//           type="text"
//           placeholder="Goal Title"
//           value={newGoal.title}
//           onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
//           className="border p-2 rounded w-full"
//           required
//         />
//         <textarea
//           placeholder="Description"
//           value={newGoal.description}
//           onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
//           className="border p-2 rounded w-full"
//         />
//         <input
//           type="date"
//           value={newGoal.due_date}
//           onChange={(e) => setNewGoal({ ...newGoal, due_date: e.target.value })}
//           className="border p-2 rounded w-full"
//         />
//         <button 
//           type="submit" 
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Add Goal
//         </button>
//       </form>

//       {/* Goals List */}
//       {goals.length === 0 ? (
//         <p>No goals assigned yet.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {goals.map((goal) => (
//             <div 
//               key={goal.id} 
//               className="bg-white shadow-md rounded-2xl hover:shadow-lg transition p-4"
//             >
//               <p className="font-semibold">Employee: {goal.users?.username || goal.user_id}</p>
//               <p className="text-lg">{goal.title}</p>
//               <p className="text-sm text-gray-600">{goal.description}</p>
//               <p className="text-sm">Status: {goal.status}</p>
//               <p className="text-sm">Due: {goal.due_date}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };
// frontend/src/pages/Manager/GoalsTasks.jsx
import React, { useEffect, useState } from "react";
import { getGoalsTasks, addGoal } from "../../api/MANAGER/goalsTasksApi";
import { getSubmittedTasks, updateSubmission } from "../../api/MANAGER/submissionApi";

const StatusPill = ({ value }) => {
  const base = "px-3 py-1 rounded-full text-xs font-semibold border ";

  if (!value)
    return <span className={base + "bg-gray-700 text-gray-300 border-gray-700"}>Unknown</span>;
  if (value === "Approved")
    return <span className={base + "bg-green-500/20 text-green-300 border-green-500/30"}>{value}</span>;
  if (value === "Rejected")
    return <span className={base + "bg-red-500/20 text-red-300 border-red-500/30"}>{value}</span>;
  if (value === "Completed")
    return <span className={base + "bg-green-500/20 text-green-300 border-green-500/30"}>{value}</span>;
  if (value === "In Progress")
    return <span className={base + "bg-blue-500/20 text-blue-300 border-blue-500/30"}>{value}</span>;

  return <span className={base + "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"}>{value}</span>;
};

export default function GoalsTasks() {
  const [activeTab, setActiveTab] = useState("goals");

  const [goals, setGoals] = useState([]);
  const [submissions, setSubmissions] = useState([]);

  const [newGoal, setNewGoal] = useState({
    user_id: "",
    title: "",
    description: "",
    due_date: "",
  });

  const [loadingGoals, setLoadingGoals] = useState(true);
  const [loadingSubs, setLoadingSubs] = useState(true);
  const [adding, setAdding] = useState(false);
  const [actionLoading, setActionLoading] = useState({});

  useEffect(() => {
    loadGoals();
    loadSubmissions();
  }, []);

  // -------------------------
  // LOAD GOALS
  // -------------------------
  const loadGoals = async () => {
    setLoadingGoals(true);
    try {
      const data = await getGoalsTasks();
      setGoals(Array.isArray(data) ? data : data?.data ?? []);
    } catch (err) {
      console.error("Failed to load goals:", err);
      setGoals([]);
    } finally {
      setLoadingGoals(false);
    }
  };

  // -------------------------
  // LOAD SUBMISSIONS
  // -------------------------
  const loadSubmissions = async () => {
    setLoadingSubs(true);
    try {
      const data = await getSubmittedTasks();
      console.log("📌 Loaded Submissions:", data);
      setSubmissions(Array.isArray(data) ? data : data?.data ?? []);
    } catch (err) {
      console.error("Failed to load submissions:", err);
      setSubmissions([]);
    } finally {
      setLoadingSubs(false);
    }
  };

  // -------------------------
  // ADD GOAL
  // -------------------------
  const handleAddGoal = async (e) => {
    e.preventDefault();
    if (!newGoal.title || !newGoal.user_id) {
      return alert("Please enter title & employee ID");
    }

    setAdding(true);
    try {
      const created = await addGoal(newGoal);
      const item = created?.id ? created : created?.data ?? created;

      setGoals((prev) => [item, ...prev]);
      setNewGoal({ user_id: "", title: "", description: "", due_date: "" });
      setActiveTab("goals");
    } catch (err) {
      console.error("Add goal failed:", err);
      alert("Failed to add goal.");
    } finally {
      setAdding(false);
    }
  };

  // -------------------------
  // UPDATE SUBMISSION STATUS
  // -------------------------
  const handleStatusChange = async (submissionId, status) => {
    setActionLoading((s) => ({ ...s, [submissionId]: true }));
    try {
      await updateSubmission(submissionId, status);

      // FORCE RELOAD (fix for delayed UI update)
      setTimeout(() => loadSubmissions(), 300);
    } catch (err) {
      console.error("Update submission failed:", err);
      alert("Failed to update status.");
    } finally {
      setActionLoading((s) => ({ ...s, [submissionId]: false }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
      <div className="max-w-6xl mx-auto">

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white">Goals & Tasks</h1>
          <p className="text-gray-400 mt-1">Create goals and review submitted tasks</p>
        </div>

        {/* Tab Buttons */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab("goals")}
            className={`px-6 py-2 rounded-md font-medium ${activeTab === "goals" ? "bg-white text-gray-900 shadow" : "bg-gray-800 text-gray-300"}`}
          >
            Goals
          </button>

          <button
            onClick={() => setActiveTab("addgoal")}
            className={`px-6 py-2 rounded-md font-medium ${activeTab === "addgoal" ? "bg-white text-gray-900 shadow" : "bg-gray-800 text-gray-300"}`}
          >
            Add Goal
          </button>

          <button
            onClick={() => setActiveTab("submissions")}
            className={`px-6 py-2 rounded-md font-medium ${activeTab === "submissions" ? "bg-white text-gray-900 shadow" : "bg-gray-800 text-gray-300"}`}
          >
            Submitted Tasks
          </button>
        </div>

        {/* GOALS TAB */}
        {activeTab === "goals" && (
          <div>
            {loadingGoals ? (
              <div className="p-6 bg-gray-800 rounded-lg text-gray-300">Loading goals...</div>
            ) : goals.length === 0 ? (
              <div className="p-8 bg-gray-800 rounded-lg text-gray-400">No goals added yet.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {goals.map((g) => (
                  <div key={g.id} className="bg-gray-800/60 p-6 rounded-xl border border-gray-700">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-xl font-semibold text-white">{g.title}</h3>
                        <p className="text-sm text-gray-300 mt-2">{g.description}</p>
                      </div>
                      <StatusPill value={g.status ?? "Pending"} />
                    </div>
                    <div className="text-sm text-gray-400">
                      <div><strong>Employee:</strong> {g.users?.username ?? `ID: ${g.user_id}`}</div>
                      <div className="mt-2"><strong>Due:</strong> {g.due_date ? new Date(g.due_date).toLocaleDateString() : "No due date"}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ADD GOAL TAB */}
        {activeTab === "addgoal" && (
          <form onSubmit={handleAddGoal} className="bg-gray-800/60 p-6 rounded-xl border border-gray-700 max-w-2xl">
            <h3 className="text-lg font-semibold text-white mb-4">Create New Goal</h3>

            <input
              type="text"
              placeholder="Employee ID"
              value={newGoal.user_id}
              onChange={(e) => setNewGoal({ ...newGoal, user_id: e.target.value })}
              className="w-full bg-gray-700/40 border border-gray-600 text-white rounded-lg px-4 py-3 mb-3"
              required
            />

            <input
              type="text"
              placeholder="Title"
              value={newGoal.title}
              onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
              className="w-full bg-gray-700/40 border border-gray-600 text-white rounded-lg px-4 py-3 mb-3"
              required
            />

            <textarea
              placeholder="Description"
              value={newGoal.description}
              onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
              rows={4}
              className="w-full bg-gray-700/40 border border-gray-600 text-white rounded-lg px-4 py-3 mb-3"
            />

            <input
              type="date"
              value={newGoal.due_date}
              onChange={(e) => setNewGoal({ ...newGoal, due_date: e.target.value })}
              className="w-full bg-gray-700/40 border border-gray-600 text-white rounded-lg px-4 py-3 mb-4"
            />

            <div className="flex gap-3 justify-end">
              <button type="button" onClick={() => setNewGoal({ user_id: "", title: "", description: "", due_date: "" })}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg">
                Reset
              </button>

              <button type="submit" disabled={adding}
                className="px-4 py-2 bg-white text-gray-900 font-medium rounded-lg">
                {adding ? "Adding..." : "Add Goal"}
              </button>
            </div>
          </form>
        )}

        {/* SUBMISSIONS TAB */}
        {activeTab === "submissions" && (
          <div>
            {loadingSubs ? (
              <div className="p-6 bg-gray-800 rounded-lg text-gray-300">Loading submissions...</div>
            ) : submissions.length === 0 ? (
              <div className="p-8 bg-gray-800 rounded-lg text-gray-400">No submissions yet.</div>
            ) : (
              <div className="space-y-4">
                {submissions.map((s) => {
                  const id = s.id ?? s.uuid;

                  return (
                    <div key={id} className="bg-gray-800/60 p-6 rounded-xl border border-gray-700">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-xl font-semibold text-white">{s.tasks?.title ?? "Task"}</h3>
                          <p className="text-sm text-gray-300 mt-1">{s.completion_note}</p>
                          <p className="text-xs text-gray-400 mt-2">
                            Submitted by: <b className="text-gray-200">{s.users?.username ?? `ID: ${s.employee_id}`}</b>
                          </p>
                        </div>

                        <div className="text-right">
                          <div className="mb-2">
                            <StatusPill value={s.status ? s.status : "Pending"} />
                          </div>
                          <div className="text-xs text-gray-400">
                            {s.submitted_at ? new Date(s.submitted_at).toLocaleString() : ""}
                          </div>
                        </div>
                      </div>

                      {s.attached_url && (
                        <a href={s.attached_url} target="_blank" rel="noreferrer" className="text-blue-400 underline">
                          View attachment
                        </a>
                      )}

                      <div className="flex gap-3 mt-4">
                        <button
                          onClick={() => handleStatusChange(id, "Approved")}
                          disabled={actionLoading[id]}
                          className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
                        >
                          {actionLoading[id] ? "..." : "Approve"}
                        </button>

                        <button
                          onClick={() => handleStatusChange(id, "Rejected")}
                          disabled={actionLoading[id]}
                          className="px-4 py-2 bg-red-600 text-white rounded disabled:opacity-50"
                        >
                          {actionLoading[id] ? "..." : "Reject"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
