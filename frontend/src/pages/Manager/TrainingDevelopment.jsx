// import React, { useState, useEffect } from "react";
// import { getAllTrainings, createTraining } from "../../api/MANAGER/trainingApi";

// const TrainingDevelopment = () => {
//   const [trainings, setTrainings] = useState([]);
//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     user_id: "",
//     manager_id: "",
//     start_date: "",
//     end_date: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [activeTab, setActiveTab] = useState("assign"); // "assign" or "assigned"

//   // Fetch trainings when component mounts
//   useEffect(() => {
//     fetchTrainings();
//   }, []);

//   const fetchTrainings = async () => {
//     try {
//       const data = await getAllTrainings();
//       setTrainings(data);
//     } catch (err) {
//       console.error("Error fetching trainings:", err);
//     }
//   };

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await createTraining(form);
//       setForm({
//         title: "",
//         description: "",
//         user_id: "",
//         manager_id: "",
//         start_date: "",
//         end_date: "",
//       });
//       fetchTrainings(); // refresh list
//       setActiveTab("assigned"); // switch to assigned tab after adding
//     } catch (err) {
//       console.error("Error creating training:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-semibold mb-4">Training & Development</h2>

//       {/* Tabs */}
//       <div className="flex mb-4 border-b">
//         <button
//           onClick={() => setActiveTab("assign")}
//           className={`px-4 py-2 ${
//             activeTab === "assign"
//               ? "border-b-2 border-blue-600 font-semibold"
//               : ""
//           }`}
//         >
//           Assign Training
//         </button>
//         <button
//           onClick={() => setActiveTab("assigned")}
//           className={`px-4 py-2 ${
//             activeTab === "assigned"
//               ? "border-b-2 border-blue-600 font-semibold"
//               : ""
//           }`}
//         >
//           Assigned Trainings
//         </button>
//       </div>

//       {/* Tab Content */}
//       {activeTab === "assign" ? (
//         // Assign Training Form
//         <form
//           onSubmit={handleSubmit}
//           className="space-y-4 bg-gray-100 p-4 rounded-md shadow-md"
//         >
//           <input
//             type="text"
//             name="title"
//             placeholder="Training Title"
//             value={form.title}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             required
//           />
//           <textarea
//             name="description"
//             placeholder="Training Description"
//             value={form.description}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             required
//           />
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
//             type="number"
//             name="manager_id"
//             placeholder="Manager ID"
//             value={form.manager_id}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             required
//           />
//           <div className="flex gap-4">
//             <input
//               type="date"
//               name="start_date"
//               value={form.start_date}
//               onChange={handleChange}
//               className="p-2 border rounded w-1/2"
//               required
//             />
//             <input
//               type="date"
//               name="end_date"
//               value={form.end_date}
//               onChange={handleChange}
//               className="p-2 border rounded w-1/2"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//             disabled={loading}
//           >
//             {loading ? "Assigning..." : "Assign Training"}
//           </button>
//         </form>
//       ) : (
//         // Assigned Trainings List
//         <div className="space-y-4">
//           {trainings.length === 0 ? (
//             <p>No trainings assigned yet.</p>
//           ) : (
//             trainings.map((t) => (
//               <div
//                 key={t.id}
//                 className="p-4 border rounded shadow-sm bg-white"
//               >
//                 <h4 className="font-bold">{t.title}</h4>
//                 <p>{t.description}</p>
//                 <p>
//                   <strong>Employee ID:</strong> {t.user_id}
//                 </p>
//                 <p>
//                   <strong>Manager ID:</strong> {t.manager_id}
//                 </p>
//                 <p>
//                   <strong>Duration:</strong> {t.start_date} → {t.end_date}
//                 </p>
//               </div>
//             ))
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default TrainingDevelopment;


import React, { useState, useEffect } from "react";
import { getAllTrainings, createTraining } from "../../api/MANAGER/trainingApi";

const TrainingDevelopment = () => {
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("assign");

  const [form, setForm] = useState({
    title: "",
    description: "",
    user_id: "",
    manager_id: "",
    start_date: "",
    end_date: "",
    material_link: "",
  });

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = async () => {
    try {
      const data = await getAllTrainings();
      setTrainings(data);
    } catch (err) {
      console.error("Error fetching:", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createTraining(form);

      setForm({
        title: "",
        description: "",
        user_id: "",
        manager_id: "",
        start_date: "",
        end_date: "",
        material_link: "",
      });

      fetchTrainings();
      setActiveTab("assigned");
    } catch (err) {
      console.error("Error creating training:", err);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
      <div className="max-w-7xl mx-auto">

        {/* HEADING */}
        <h2 className="text-3xl font-bold text-white mb-2">Training & Development</h2>
        <p className="text-gray-400 mb-8 text-sm">Assign & manage employee training programs</p>

        {/* TABS */}
        <div className="flex gap-3 mb-6 p-1 bg-gray-800/50 rounded-lg w-fit">
          <button
            onClick={() => setActiveTab("assign")}
            className={`px-6 py-2.5 rounded-md font-medium ${
              activeTab === "assign"
                ? "bg-white text-gray-900 shadow-lg"
                : "text-gray-400 hover:text-white hover:bg-gray-700/50"
            }`}
          >
            Assign Training
          </button>

          <button
            onClick={() => setActiveTab("assigned")}
            className={`px-6 py-2.5 rounded-md font-medium ${
              activeTab === "assigned"
                ? "bg-white text-gray-900 shadow-lg"
                : "text-gray-400 hover:text-white hover:bg-gray-700/50"
            }`}
          >
            Assigned Trainings
          </button>
        </div>

        {/* ====================== ASSIGN TRAINING FORM ====================== */}
        {activeTab === "assign" ? (
          <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 p-8 max-w-3xl">

            <h3 className="text-xl font-semibold text-white mb-6">Assign New Training</h3>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Title */}
              <div>
                <label className="text-gray-300 text-sm">Training Title</label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Enter training title"
                  className="w-full bg-gray-900/50 border border-gray-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-gray-300 text-sm">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Describe the training"
                  className="w-full bg-gray-900/50 border border-gray-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-400"
                  required
                ></textarea>
              </div>

              {/* IDs */}
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="text-gray-300 text-sm">Employee User ID</label>
                  <input
                    type="number"
                    name="user_id"
                    value={form.user_id}
                    onChange={handleChange}
                    placeholder="Employee ID"
                    className="w-full bg-gray-900/50 border border-gray-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>

                <div>
                  <label className="text-gray-300 text-sm">Manager ID</label>
                  <input
                    type="number"
                    name="manager_id"
                    value={form.manager_id}
                    onChange={handleChange}
                    placeholder="Manager ID"
                    className="w-full bg-gray-900/50 border border-gray-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>
              </div>

              {/* Dates */}
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="text-gray-300 text-sm">Start Date</label>
                  <input
                    type="date"
                    name="start_date"
                    value={form.start_date}
                    onChange={handleChange}
                    className="w-full bg-gray-900/50 border border-gray-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>

                <div>
                  <label className="text-gray-300 text-sm">End Date</label>
                  <input
                    type="date"
                    name="end_date"
                    value={form.end_date}
                    onChange={handleChange}
                    className="w-full bg-gray-900/50 border border-gray-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>
              </div>

              {/* Resource Link */}
              <div>
                <label className="text-gray-300 text-sm">Resource Link (PDF / Video)</label>
                <input
                  type="text"
                  name="material_link"
                  value={form.material_link}
                  onChange={handleChange}
                  placeholder="Paste resource URL"
                  className="w-full bg-gray-900/50 border border-gray-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
                disabled={loading}
              >
                {loading ? "Assigning..." : "Assign Training"}
              </button>

            </form>
          </div>
        ) : (
          /* ====================== ASSIGNED TRAININGS LIST ====================== */
          <div className="space-y-4">
            {trainings.length === 0 ? (
              <div className="text-center text-gray-400 py-20 bg-gray-800/40 border border-gray-700/50 rounded-xl">
                No trainings assigned yet.
              </div>
            ) : (
              trainings.map((t) => (
                <div
                  key={t.id}
                  className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6"
                >
                  <div className="flex justify-between">
                    <h4 className="text-lg font-semibold text-white">{t.title}</h4>
                    <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-xs font-semibold border border-green-500/30">
                      Active
                    </span>
                  </div>

                  <p className="text-gray-300 mt-2 mb-4">{t.description}</p>

                  <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-400">
                    <p><span className="text-gray-300">Employee ID:</span> {t.user_id}</p>
                    <p><span className="text-gray-300">Manager ID:</span> {t.manager_id}</p>
                    <p><span className="text-gray-300">Start:</span> {t.start_date}</p>
                    <p><span className="text-gray-300">End:</span> {t.end_date}</p>

                    {t.material_link && (
                      <p>
                        <span className="text-gray-300">Resource:</span>{" "}
                        <a href={t.material_link} target="_blank" className="text-blue-400 underline">
                          Open Resource
                        </a>
                      </p>
                    )}
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

export default TrainingDevelopment;
  