// import React, { useEffect, useState } from "react";
// import { fetchSkills, createSkill, deleteSkill, fetchUsers } from "../../api/MANAGER/skillsApi";

// const Skills = () => {
//   const [skills, setSkills] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [form, setForm] = useState({ user_id: "", skill_name: "", proficiency: "Beginner" });

//   const loadSkills = async () => {
//     try {
//       const data = await fetchSkills();
//       setSkills(data);
//     } catch (err) {
//       console.error(err.message);
//     }
//   };

//   const loadUsers = async () => {
//     try {
//       const data = await fetchUsers();
//       setUsers(data);
//     } catch (err) {
//       console.error(err.message);
//     }
//   };

//   useEffect(() => {
//     loadSkills();
//     loadUsers();
//   }, []);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await createSkill(form);
//       setForm({ user_id: "", skill_name: "", proficiency: "Beginner" });
//       loadSkills();
//     } catch (err) {
//       console.error(err.message);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await deleteSkill(id);
//       loadSkills();
//     } catch (err) {
//       console.error(err.message);
//     }
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Skills Management</h1>

//       <form onSubmit={handleSubmit} className="mb-6 bg-gray-100 p-4 rounded-md">
//         <select
//           name="user_id"
//           value={form.user_id}
//           onChange={handleChange}
//           className="border p-2 w-full mb-2"
//           required
//         >
//           <option value="">Select Employee</option>
//           {users.map((u) => (
//             <option key={u.id} value={u.id}>{u.username}</option>
//           ))}
//         </select>

//         <input
//           type="text"
//           name="skill_name"
//           placeholder="Skill Name"
//           value={form.skill_name}
//           onChange={handleChange}
//           className="border p-2 w-full mb-2"
//           required
//         />

//         <select
//           name="proficiency"
//           value={form.proficiency}
//           onChange={handleChange}
//           className="border p-2 w-full mb-2"
//         >
//           <option value="Beginner">Beginner</option>
//           <option value="Intermediate">Intermediate</option>
//           <option value="Advanced">Advanced</option>
//         </select>

//         <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
//           Add Skill
//         </button>
//       </form>

//       <table className="w-full border-collapse border border-gray-300">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="border p-2">Employee</th>
//             <th className="border p-2">Skill</th>
//             <th className="border p-2">Proficiency</th>
//             <th className="border p-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {skills.map((s) => (
//             <tr key={s.id}>
//               <td className="border p-2">{s.user_id.username || s.user_id}</td>
//               <td className="border p-2">{s.skill_name}</td>
//               <td className="border p-2">{s.proficiency}</td>
//               <td className="border p-2">
//                 <button
//                   onClick={() => handleDelete(s.id)}
//                   className="bg-red-500 text-white p-1 rounded"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//           {skills.length === 0 && (
//             <tr>
//               <td colSpan="4" className="text-center p-4">
//                 No skills found.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Skills;






import React, { useEffect, useState } from "react";
import { fetchSkills, createSkill, deleteSkill, fetchUsers } from "../../api/MANAGER/skillsApi";

const ProficiencyPill = ({ level }) => {
  const getStyles = () => {
    if (level === "Advanced") return "bg-green-500/20 text-green-300 border-green-500/30";
    if (level === "Intermediate") return "bg-blue-500/20 text-blue-300 border-blue-500/30";
    return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
  };
  
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStyles()}`}>
      {level}
    </span>
  );
};

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ user_id: "", skill_name: "", proficiency: "Beginner" });
  const [loading, setLoading] = useState(true);

  const loadSkills = async () => {
    try {
      const data = await fetchSkills();
      setSkills(data);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadUsers = async () => {
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    loadSkills();
    loadUsers();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createSkill(form);
      setForm({ user_id: "", skill_name: "", proficiency: "Beginner" });
      loadSkills();
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this skill?")) return;
    try {
      await deleteSkill(id);
      loadSkills();
    } catch (err) {
      console.error(err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-white border-r-transparent mb-4"></div>
          <p className="text-gray-400">Loading skills...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Skills Management</h2>
          <p className="text-gray-400 text-sm">
            Track and manage employee skills and proficiency levels
          </p>
        </div>

        {/* Add Skill Form */}
        <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 mb-6">
          <h3 className="text-lg font-semibold text-white mb-6">Add New Skill</h3>
          <form onSubmit={handleSubmit} className="grid md:grid-cols-4 gap-4">
            <select
              name="user_id"
              value={form.user_id}
              onChange={handleChange}
              className="bg-gray-700/50 border border-gray-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white"
              required
            >
              <option value="">Select Employee</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>{u.username}</option>
              ))}
            </select>

            <input
              type="text"
              name="skill_name"
              placeholder="Skill Name"
              value={form.skill_name}
              onChange={handleChange}
              className="bg-gray-700/50 border border-gray-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white placeholder-gray-400"
              required
            />

            <select
              name="proficiency"
              value={form.proficiency}
              onChange={handleChange}
              className="bg-gray-700/50 border border-gray-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>

            <button
              type="submit"
              className="bg-white text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-150"
            >
              Add Skill
            </button>
          </form>
        </div>

        {/* Skills Table */}
        <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
          {skills.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500">No skills found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-900/50">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Employee
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Skill
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Proficiency
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700/50">
                  {skills.map((s) => (
                    <tr key={s.id} className="hover:bg-gray-700/30 transition-colors duration-150">
                      <td className="px-6 py-4 text-sm font-medium text-white">
                        {s.user_id.username || `ID: ${s.user_id}`}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {s.skill_name}
                      </td>
                      <td className="px-6 py-4">
                        <ProficiencyPill level={s.proficiency} />
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleDelete(s.id)}
                          className="px-4 py-2 bg-red-500/20 text-red-300 rounded-lg text-sm font-medium border border-red-500/30 hover:bg-red-500/30 transition-colors duration-150"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Skills;
