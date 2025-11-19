
// // export default Announcements;
// import React, { useEffect, useState } from "react";
// import { fetchAnnouncements, createAnnouncement, deleteAnnouncement } from "../../api/MANAGER/announcementsApi";

// const Announcements = () => {
//   const [announcements, setAnnouncements] = useState([]);
//   const [form, setForm] = useState({ title: "", message: "", created_by: "" });
//   const [activeTab, setActiveTab] = useState("add"); // "add" or "all"

//   // Load all announcements
//   const loadAnnouncements = async () => {
//     try {
//       const data = await fetchAnnouncements();
//       // Sort latest first based on created_at
//       data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
//       setAnnouncements(data);
//     } catch (err) {
//       console.error(err.message);
//     }
//   };

//   useEffect(() => {
//     loadAnnouncements();
//   }, []);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await createAnnouncement(form);
//       setForm({ title: "", message: "", created_by: "" });
//       loadAnnouncements();
//       setActiveTab("all"); // Switch to view after adding
//     } catch (err) {
//       console.error(err.message);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await deleteAnnouncement(id);
//       loadAnnouncements();
//     } catch (err) {
//       console.error(err.message);
//     }
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Announcements</h1>

//       {/* Tabs */}
//       <div className="flex mb-4">
//         <button
//           className={`px-4 py-2 rounded-t ${activeTab === "add" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
//           onClick={() => setActiveTab("add")}
//         >
//           Add Announcement
//         </button>
//         <button
//           className={`px-4 py-2 rounded-t ${activeTab === "all" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
//           onClick={() => setActiveTab("all")}
//         >
//           All Announcements
//         </button>
//       </div>

//       {/* Add Announcement Form */}
//       {activeTab === "add" && (
//         <form onSubmit={handleSubmit} className="mb-6 bg-gray-100 p-4 rounded-md">
//           <input
//             type="text"
//             name="title"
//             placeholder="Title"
//             value={form.title}
//             onChange={handleChange}
//             className="border p-2 w-full mb-2"
//             required
//           />
//           <textarea
//             name="message"
//             placeholder="Description"
//             value={form.message}
//             onChange={handleChange}
//             className="border p-2 w-full mb-2"
//             required
//           />
//           <input
//             type="number"
//             name="created_by"
//             placeholder="Manager ID"
//             value={form.created_by}
//             onChange={handleChange}
//             className="border p-2 w-full mb-2"
//             required
//           />
//           <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
//             Add Announcement
//           </button>
//         </form>
//       )}

//       {/* All Announcements Table */}
//       {activeTab === "all" && (
//         <table className="w-full border-collapse border border-gray-300">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="border p-2">Title</th>
//               <th className="border p-2">Description</th>
//               <th className="border p-2">Manager ID</th>
//               <th className="border p-2">Created At</th>
//               <th className="border p-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {announcements.map((a) => (
//               <tr key={a.id}>
//                 <td className="border p-2">{a.title}</td>
//                 <td className="border p-2">{a.message}</td>
//                 <td className="border p-2">{a.created_by}</td>
//                 <td className="border p-2">{new Date(a.created_at).toLocaleString()}</td>
//                 <td className="border p-2">
//                   <button
//                     onClick={() => handleDelete(a.id)}
//                     className="bg-red-500 text-white p-1 rounded"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//             {announcements.length === 0 && (
//               <tr>
//                 <td colSpan="5" className="text-center p-4">
//                   No announcements found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default Announcements;


import React, { useEffect, useState } from "react";
import { fetchAnnouncements, createAnnouncement, deleteAnnouncement } from "../../api/MANAGER/announcementsApi";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [form, setForm] = useState({ title: "", message: "", created_by: "" });
  const [activeTab, setActiveTab] = useState("add");
  const [loading, setLoading] = useState(false);

  const loadAnnouncements = async () => {
    try {
      const data = await fetchAnnouncements();
      data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setAnnouncements(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createAnnouncement(form);
      setForm({ title: "", message: "", created_by: "" });
      loadAnnouncements();
      setActiveTab("all");
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this announcement?")) return;
    try {
      await deleteAnnouncement(id);
      loadAnnouncements();
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Announcements</h2>
          <p className="text-gray-400 text-sm">
            Create and manage company announcements
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-3 mb-6 p-1 bg-gray-800/50 rounded-lg backdrop-blur-sm w-fit">
          <button
            onClick={() => setActiveTab("add")}
            className={`px-6 py-2.5 rounded-md font-medium transition-all duration-200 ${
              activeTab === "add"
                ? "bg-white text-gray-900 shadow-lg"
                : "text-gray-400 hover:text-white hover:bg-gray-700/50"
            }`}
          >
            Add Announcement
          </button>
          <button
            onClick={() => setActiveTab("all")}
            className={`px-6 py-2.5 rounded-md font-medium transition-all duration-200 ${
              activeTab === "all"
                ? "bg-white text-gray-900 shadow-lg"
                : "text-gray-400 hover:text-white hover:bg-gray-700/50"
            }`}
          >
            All Announcements
          </button>
        </div>

        {/* Add Announcement Form */}
        {activeTab === "add" && (
          <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
            <h3 className="text-lg font-semibold text-white mb-6">Create New Announcement</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="title"
                  placeholder="Announcement Title"
                  value={form.title}
                  onChange={handleChange}
                  className="bg-gray-700/50 border border-gray-600 text-white rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-white placeholder-gray-400"
                  required
                />
              </div>
              <div>
                <textarea
                  name="message"
                  placeholder="Announcement Message"
                  value={form.message}
                  onChange={handleChange}
                  rows="6"
                  className="bg-gray-700/50 border border-gray-600 text-white rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-white placeholder-gray-400"
                  required
                />
              </div>
              <div>
                <input
                  type="number"
                  name="created_by"
                  placeholder="Manager ID"
                  value={form.created_by}
                  onChange={handleChange}
                  className="bg-gray-700/50 border border-gray-600 text-white rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-white placeholder-gray-400"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-white text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Creating..." : "Create Announcement"}
              </button>
            </form>
          </div>
        )}

        {/* All Announcements Table */}
        {activeTab === "all" && (
          <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
            {announcements.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-500">No announcements found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-900/50">
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Message
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Manager ID
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Created At
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700/50">
                    {announcements.map((a) => (
                      <tr key={a.id} className="hover:bg-gray-700/30 transition-colors duration-150">
                        <td className="px-6 py-4 text-sm font-medium text-white">
                          {a.title}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-300 max-w-md">
                          <p className="line-clamp-2">{a.message}</p>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-300">
                          {a.created_by}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-300">
                          {new Date(a.created_at).toLocaleString()}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleDelete(a.id)}
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
        )}
      </div>
    </div>
  );
};

export default Announcements;
