// import React, { useState, useEffect } from "react";
// import { getAllGrievances, createGrievance } from "../../api/MANAGER/feedbackGrievanceApi";

// const FeedbackGrievance = () => {
//   const [activeTab, setActiveTab] = useState("submit"); // "submit" or "all"
//   const [grievances, setGrievances] = useState([]);
//   const [form, setForm] = useState({
//     user_id: "",
//     title: "",
//     description: "",
//     manager_id: "",
//   });
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (activeTab === "all") fetchGrievances();
//   }, [activeTab]);

//   const fetchGrievances = async () => {
//     try {
//       const data = await getAllGrievances();
//       setGrievances(data);
//     } catch (err) {
//       console.error("Error fetching grievances:", err);
//     }
//   };

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await createGrievance(form);
//       setForm({ user_id: "", title: "", description: "", manager_id: "" });
//       setActiveTab("all"); // Switch to "All Feedbacks" after submission
//     } catch (err) {
//       console.error("Error creating grievance:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6">
      

//       {/* Tabs */}
//       <div className="flex gap-4 mb-6">
//         <button
//           className={`px-4 py-2 rounded ${
//             activeTab === "submit" ? "bg-blue-600 text-white" : "bg-gray-200"
//           }`}
//           onClick={() => setActiveTab("submit")}
//         >
//           Submit Feedback
//         </button>
//         <button
//           className={`px-4 py-2 rounded ${
//             activeTab === "all" ? "bg-blue-600 text-white" : "bg-gray-200"
//           }`}
//           onClick={() => setActiveTab("all")}
//         >
//           All Feedbacks
//         </button>
//       </div>

//       {/* Tab Content */}
//       {activeTab === "submit" ? (
//         <form
//           onSubmit={handleSubmit}
//           className="space-y-4 bg-gray-100 p-4 rounded-md shadow-md"
//         >
//           <input
//             type="number"
//             name="user_id"
//             placeholder="Employee User ID"
//             value={form.user_id}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             required
//           />
//           <input
//             type="text"
//             name="title"
//             placeholder="Title"
//             value={form.title}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             required
//           />
//           <textarea
//             name="description"
//             placeholder="Description"
//             value={form.description}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             required
//           />
//           <input
//             type="number"
//             name="manager_id"
//             placeholder="Manager ID"
//             value={form.manager_id}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             required
//           />
//           <button
//             type="submit"
//             disabled={loading}
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//           >
//             {loading ? "Submitting..." : "Submit"}
//           </button>
//         </form>
//       ) : (
//         <div className="space-y-4">
//           {grievances.length === 0 ? (
//             <p>No feedbacks submitted yet.</p>
//           ) : (
//             grievances.map((g) => (
//               <div key={g.id} className="p-4 border rounded shadow-sm bg-white">
//                 <h4 className="font-bold">{g.title}</h4>
//                 <p>{g.description}</p>
//                 <p>
//                   <strong>Employee ID:</strong> {g.user_id}
//                 </p>
//                 <p>
//                   <strong>Manager ID:</strong> {g.manager_id}
//                 </p>
//                 <p>
//                   <strong>Created At:</strong>{" "}
//                   {new Date(g.created_at).toLocaleString()}
//                 </p>
//               </div>
//             ))
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default FeedbackGrievance;


import React, { useState, useEffect } from "react";
import { getAllGrievances, createGrievance } from "../../api/MANAGER/feedbackGrievanceApi";

const FeedbackGrievance = () => {
  const [activeTab, setActiveTab] = useState("submit");
  const [grievances, setGrievances] = useState([]);
  const [form, setForm] = useState({
    user_id: "",
    title: "",
    description: "",
    manager_id: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeTab === "all") fetchGrievances();
  }, [activeTab]);

  const fetchGrievances = async () => {
    try {
      const data = await getAllGrievances();
      setGrievances(data);
    } catch (err) {
      console.error("Error fetching grievances:", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createGrievance(form);
      setForm({ user_id: "", title: "", description: "", manager_id: "" });
      setActiveTab("all");
    } catch (err) {
      console.error("Error creating grievance:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Feedback & Grievances</h2>
          <p className="text-gray-400 text-sm">
            Submit and manage employee feedback
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-3 mb-6 p-1 bg-gray-800/50 rounded-lg backdrop-blur-sm w-fit">
          <button
            onClick={() => setActiveTab("submit")}
            className={`px-6 py-2.5 rounded-md font-medium transition-all duration-200 ${
              activeTab === "submit"
                ? "bg-white text-gray-900 shadow-lg"
                : "text-gray-400 hover:text-white hover:bg-gray-700/50"
            }`}
          >
            Submit Feedback
          </button>
          <button
            onClick={() => setActiveTab("all")}
            className={`px-6 py-2.5 rounded-md font-medium transition-all duration-200 ${
              activeTab === "all"
                ? "bg-white text-gray-900 shadow-lg"
                : "text-gray-400 hover:text-white hover:bg-gray-700/50"
            }`}
          >
            All Feedbacks
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "submit" ? (
          <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
            <h3 className="text-lg font-semibold text-white mb-6">Submit New Feedback</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="number"
                name="user_id"
                placeholder="Employee User ID"
                value={form.user_id}
                onChange={handleChange}
                className="bg-gray-700/50 border border-gray-600 text-white rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-white placeholder-gray-400"
                required
              />
              <input
                type="text"
                name="title"
                placeholder="Title"
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
                rows="6"
                className="bg-gray-700/50 border border-gray-600 text-white rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-white placeholder-gray-400"
                required
              />
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
                disabled={loading}
                className="bg-white text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Submitting..." : "Submit Feedback"}
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-4">
            {grievances.length === 0 ? (
              <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 p-16 text-center">
                <p className="text-gray-500">No feedbacks submitted yet</p>
              </div>
            ) : (
              grievances.map((g) => (
                <div
                  key={g.id}
                  className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6"
                >
                  <h4 className="text-lg font-semibold text-white mb-2">{g.title}</h4>
                  <p className="text-gray-300 mb-4">{g.description}</p>
                  <div className="flex gap-6 text-sm text-gray-400">
                    <p>
                      <span className="font-medium">Employee ID:</span> {g.user_id}
                    </p>
                    <p>
                      <span className="font-medium">Manager ID:</span> {g.manager_id}
                    </p>
                    <p>
                      <span className="font-medium">Created:</span>{" "}
                      {new Date(g.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackGrievance;
