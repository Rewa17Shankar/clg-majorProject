// import React, { useEffect, useState } from "react";
// import { fetchMeetings, createMeeting, deleteMeeting } from "../../api/MANAGER/meetingsApi";

// const Meetings = () => {
//   const [meetings, setMeetings] = useState([]);
//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     meeting_date: "",
//     start_time: "",
//     end_time: "",
//     manager_id: "",
//   });
//   const [activeTab, setActiveTab] = useState("new"); // 'new' or 'all'

//   const loadMeetings = async () => {
//     try {
//       const data = await fetchMeetings();
//       setMeetings(data);
//     } catch (err) {
//       console.error(err.message);
//     }
//   };

//   useEffect(() => {
//     loadMeetings();
//   }, []);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await createMeeting(form);
//       setForm({ title: "", description: "", meeting_date: "", start_time: "", end_time: "", manager_id: "" });
//       loadMeetings();
//       setActiveTab("all"); // Switch to all meetings after adding
//     } catch (err) {
//       console.error(err.message);
//     }
//   };

//   const handleDelete = async (id, meeting_date) => {
//     const now = new Date();
//     if (new Date(meeting_date) <= now) {
//       try {
//         await deleteMeeting(id);
//         loadMeetings();
//       } catch (err) {
//         console.error(err.message);
//       }
//     } else {
//       alert("You can only delete completed/past meetings.");
//     }
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Meetings</h1>

//       {/* Tabs */}
//       <div className="flex mb-4 border-b">
//         <button
//           className={`p-2 px-4 ${activeTab === "new" ? "border-b-2 border-blue-500 font-semibold" : "text-gray-500"}`}
//           onClick={() => setActiveTab("new")}
//         >
//           Start New Meeting
//         </button>
//         <button
//           className={`p-2 px-4 ${activeTab === "all" ? "border-b-2 border-blue-500 font-semibold" : "text-gray-500"}`}
//           onClick={() => setActiveTab("all")}
//         >
//           All Meetings
//         </button>
//       </div>

//       {/* Conditional rendering based on active tab */}
//       {activeTab === "new" && (
//         <section className="bg-gray-50 p-4 rounded-md shadow">
//           <form onSubmit={handleSubmit} className="space-y-2">
//             <input
//               type="text"
//               name="title"
//               placeholder="Meeting Title"
//               value={form.title}
//               onChange={handleChange}
//               className="border p-2 w-full rounded"
//               required
//             />
//             <textarea
//               name="description"
//               placeholder="Description"
//               value={form.description}
//               onChange={handleChange}
//               className="border p-2 w-full rounded"
//               required
//             />
//             <input
//               type="date"
//               name="meeting_date"
//               value={form.meeting_date}
//               onChange={handleChange}
//               className="border p-2 w-full rounded"
//               required
//             />
//             <input
//               type="time"
//               name="start_time"
//               value={form.start_time}
//               onChange={handleChange}
//               className="border p-2 w-full rounded"
//               required
//             />
//             <input
//               type="time"
//               name="end_time"
//               value={form.end_time}
//               onChange={handleChange}
//               className="border p-2 w-full rounded"
//               required
//             />
//             <input
//               type="number"
//               name="manager_id"
//               placeholder="Manager ID"
//               value={form.manager_id}
//               onChange={handleChange}
//               className="border p-2 w-full rounded"
//               required
//             />
//             <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600">
//               Add Meeting
//             </button>
//           </form>
//         </section>
//       )}

//       {activeTab === "all" && (
//         <section className="bg-gray-50 p-4 rounded-md shadow">
//           <table className="w-full border-collapse border border-gray-300">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="border p-2">Title</th>
//                 <th className="border p-2">Description</th>
//                 <th className="border p-2">Date</th>
//                 <th className="border p-2">Start</th>
//                 <th className="border p-2">End</th>
//                 <th className="border p-2">Manager ID</th>
//                 <th className="border p-2">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {meetings.map((m) => (
//                 <tr key={m.id}>
//                   <td className="border p-2">{m.title}</td>
//                   <td className="border p-2">{m.description}</td>
//                   <td className="border p-2">{new Date(m.meeting_date).toLocaleDateString()}</td>
//                   <td className="border p-2">{m.start_time}</td>
//                   <td className="border p-2">{m.end_time}</td>
//                   <td className="border p-2">{m.manager_id}</td>
//                   <td className="border p-2">
//                     <button
//                       onClick={() => handleDelete(m.id, m.meeting_date)}
//                       className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//               {meetings.length === 0 && (
//                 <tr>
//                   <td colSpan="7" className="text-center p-4">
//                     No meetings scheduled.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </section>
//       )}
//     </div>
//   );
// };

// export default Meetings;

import React, { useEffect, useState } from "react";
import { fetchMeetings, createMeeting, deleteMeeting } from "../../api/MANAGER/meetingsApi";

const Meetings = () => {
  const [meetings, setMeetings] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    meeting_date: "",
    start_time: "",
    end_time: "",
    manager_id: "",
  });
  const [activeTab, setActiveTab] = useState("new");

  const loadMeetings = async () => {
    try {
      const data = await fetchMeetings();
      setMeetings(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    loadMeetings();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createMeeting(form);
      setForm({ title: "", description: "", meeting_date: "", start_time: "", end_time: "", manager_id: "" });
      loadMeetings();
      setActiveTab("all");
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleDelete = async (id, meeting_date) => {
    const now = new Date();
    if (new Date(meeting_date) <= now) {
      if (!window.confirm("Delete this meeting?")) return;
      try {
        await deleteMeeting(id);
        loadMeetings();
      } catch (err) {
        console.error(err.message);
      }
    } else {
      alert("You can only delete completed/past meetings.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Meetings</h2>
          <p className="text-gray-400 text-sm">
            Schedule and manage team meetings
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-3 mb-6 p-1 bg-gray-800/50 rounded-lg backdrop-blur-sm w-fit">
          <button
            onClick={() => setActiveTab("new")}
            className={`px-6 py-2.5 rounded-md font-medium transition-all duration-200 ${
              activeTab === "new"
                ? "bg-white text-gray-900 shadow-lg"
                : "text-gray-400 hover:text-white hover:bg-gray-700/50"
            }`}
          >
            Start New Meeting
          </button>
          <button
            onClick={() => setActiveTab("all")}
            className={`px-6 py-2.5 rounded-md font-medium transition-all duration-200 ${
              activeTab === "all"
                ? "bg-white text-gray-900 shadow-lg"
                : "text-gray-400 hover:text-white hover:bg-gray-700/50"
            }`}
          >
            All Meetings
          </button>
        </div>

        {/* New Meeting Form */}
        {activeTab === "new" && (
          <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
            <h3 className="text-lg font-semibold text-white mb-6">Schedule New Meeting</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Meeting Title"
                value={form.title}
                onChange={handleChange}
                className="bg-gray-700/50 border border-gray-600 text-white rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-white placeholder-gray-400"
                required
              />
              <textarea
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
                rows="4"
                className="bg-gray-700/50 border border-gray-600 text-white rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-white placeholder-gray-400"
                required
              />
              <div className="grid md:grid-cols-3 gap-4">
                <input
                  type="date"
                  name="meeting_date"
                  value={form.meeting_date}
                  onChange={handleChange}
                  className="bg-gray-700/50 border border-gray-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white"
                  required
                />
                <input
                  type="time"
                  name="start_time"
                  value={form.start_time}
                  onChange={handleChange}
                  className="bg-gray-700/50 border border-gray-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white"
                  required
                />
                <input
                  type="time"
                  name="end_time"
                  value={form.end_time}
                  onChange={handleChange}
                  className="bg-gray-700/50 border border-gray-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white"
                  required
                />
              </div>
              <input
                type="number"
                name="manager_id"
                placeholder="Manager ID"
                value={form.manager_id}
                onChange={handleChange}
                className="bg-gray-700/50 border border-gray-600 text-white rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-white placeholder-gray-400"
                required
              />
              <button
                type="submit"
                className="bg-white text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-150 w-full"
              >
                Schedule Meeting
              </button>
            </form>
          </div>
        )}

        {/* All Meetings Table */}
        {activeTab === "all" && (
          <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
            {meetings.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-500">No meetings scheduled</p>
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
                        Description
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Start Time
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        End Time
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Manager ID
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700/50">
                    {meetings.map((m) => (
                      <tr key={m.id} className="hover:bg-gray-700/30 transition-colors duration-150">
                        <td className="px-6 py-4 text-sm font-medium text-white">
                          {m.title}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-300 max-w-xs">
                          <p className="line-clamp-2">{m.description}</p>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-300">
                          {new Date(m.meeting_date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-300">
                          {m.start_time}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-300">
                          {m.end_time}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-300">
                          {m.manager_id}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleDelete(m.id, m.meeting_date)}
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

export default Meetings;


