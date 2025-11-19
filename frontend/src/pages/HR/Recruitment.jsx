// import React, { useEffect, useState } from "react";
// import { getJobs, createJob, getApplicants, updateApplicantStatus } from "../../api/HR/recruitmentApi";

// const Recruitment = () => {
//   const [jobs, setJobs] = useState([]);
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [applicants, setApplicants] = useState([]);
//   const [newJob, setNewJob] = useState({ title: "", description: "", department_id: "" });

//   useEffect(() => {
//     fetchJobs();
//   }, []);

//   const fetchJobs = async () => {
//     const res = await getJobs();
//     setJobs(res.data);
//   };

//   const fetchApplicants = async (jobId) => {
//     setSelectedJob(jobId);
//     const res = await getApplicants(jobId);
//     setApplicants(res.data);
//   };

//   const handleCreateJob = async () => {
//     await createJob(newJob);
//     setNewJob({ title: "", description: "", department_id: "" });
//     fetchJobs();
//   };

//   const handleUpdateStatus = async (id, status) => {
//     await updateApplicantStatus(id, status);
//     fetchApplicants(selectedJob);
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-bold mb-4">Recruitment & Hiring</h2>

//       {/* Create Job */}
//       <div className="mb-6">
//         <h3 className="text-lg font-semibold mb-2">Post a New Job</h3>
//         <input
//           type="text"
//           placeholder="Title"
//           value={newJob.title}
//           onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
//           className="border p-2 mr-2"
//         />
//         <input
//           type="text"
//           placeholder="Description"
//           value={newJob.description}
//           onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
//           className="border p-2 mr-2"
//         />
//         <input
//           type="number"
//           placeholder="Department ID"
//           value={newJob.department_id}
//           onChange={(e) => setNewJob({ ...newJob, department_id: e.target.value })}
//           className="border p-2 mr-2"
//         />
//         <button onClick={handleCreateJob} className="bg-blue-500 text-white px-4 py-2 rounded">
//           Create
//         </button>
//       </div>

//       {/* Job List */}
//       <div className="grid grid-cols-2 gap-6">
//         <div>
//           <h3 className="text-lg font-semibold mb-2">Jobs</h3>
//           <ul className="border p-4 rounded">
//             {jobs.map((job) => (
//               <li
//                 key={job.id}
//                 className="cursor-pointer hover:bg-gray-100 p-2"
//                 onClick={() => fetchApplicants(job.id)}
//               >
//                 {job.title}
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Applicants */}
//         <div>
//           <h3 className="text-lg font-semibold mb-2">Applicants</h3>
//           {applicants.length === 0 ? (
//             <p>No applicants yet.</p>
//           ) : (
//             <ul className="border p-4 rounded">
//               {applicants.map((a) => (
//                 <li key={a.id} className="flex justify-between items-center p-2 border-b">
//                   <div>
//                     <p className="font-medium">{a.name}</p>
//                     <p className="text-sm">{a.email}</p>
//                     <p className="text-sm">Status: {a.status}</p>
//                   </div>
//                   <div>
//                     <button
//                       onClick={() => handleUpdateStatus(a.id, "Approved")}
//                       className="bg-green-500 text-white px-2 py-1 rounded mr-2"
//                     >
//                       Approve
//                     </button>
//                     <button
//                       onClick={() => handleUpdateStatus(a.id, "Rejected")}
//                       className="bg-red-500 text-white px-2 py-1 rounded"
//                     >
//                       Reject
//                     </button>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Recruitment;


import React, { useEffect, useState } from "react";
import { getJobs, createJob, getApplicants, updateApplicantStatus } from "../../api/HR/recruitmentApi";

const StatusPill = ({ value }) => {
  const getStyles = () => {
    if (value === "Approved") return "bg-green-500/20 text-green-300 border-green-500/30";
    if (value === "Rejected") return "bg-red-500/20 text-red-300 border-red-500/30";
    return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
  };
  
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStyles()}`}>
      {value}
    </span>
  );
};

const Recruitment = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [newJob, setNewJob] = useState({ title: "", description: "", department_id: "" });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const res = await getJobs();
    setJobs(res.data);
  };

  const fetchApplicants = async (jobId) => {
    setSelectedJob(jobId);
    const res = await getApplicants(jobId);
    setApplicants(res.data);
  };

  const handleCreateJob = async () => {
    if (!newJob.title || !newJob.description || !newJob.department_id) {
      alert("Please fill all fields");
      return;
    }
    await createJob(newJob);
    setNewJob({ title: "", description: "", department_id: "" });
    setShowForm(false);
    fetchJobs();
  };

  const handleUpdateStatus = async (id, status) => {
    await updateApplicantStatus(id, status);
    fetchApplicants(selectedJob);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Recruitment & Hiring</h2>
          <p className="text-gray-400 text-sm">
            Manage job postings and candidate applications
          </p>
        </div>

        {/* Create Job Section */}
        <div className="mb-6">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-white text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-150"
          >
            {showForm ? "Cancel" : "Post New Job"}
          </button>

          {showForm && (
            <div className="mt-4 bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Create Job Posting</h3>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Job Title"
                  value={newJob.title}
                  onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                  className="bg-gray-700/50 border border-gray-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white placeholder-gray-400"
                />
                <input
                  type="number"
                  placeholder="Department ID"
                  value={newJob.department_id}
                  onChange={(e) => setNewJob({ ...newJob, department_id: e.target.value })}
                  className="bg-gray-700/50 border border-gray-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white placeholder-gray-400"
                />
              </div>
              <textarea
                placeholder="Job Description"
                value={newJob.description}
                onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                rows="4"
                className="w-full bg-gray-700/50 border border-gray-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white placeholder-gray-400 mb-4"
              />
              <button
                onClick={handleCreateJob}
                className="bg-blue-500/20 text-blue-300 px-6 py-3 rounded-lg font-medium border border-blue-500/30 hover:bg-blue-500/30 transition-colors duration-150"
              >
                Create Job
              </button>
            </div>
          )}
        </div>

        {/* Jobs and Applicants Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Job List */}
          <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-700/50">
              <h3 className="text-lg font-semibold text-white">Active Jobs</h3>
            </div>
            <div className="p-4 max-h-[600px] overflow-y-auto">
              {jobs.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-gray-500">No jobs posted yet</p>
                </div>
              ) : (
                <ul className="space-y-2">
                  {jobs.map((job) => (
                    <li
                      key={job.id}
                      onClick={() => fetchApplicants(job.id)}
                      className={`cursor-pointer p-4 rounded-lg transition-all duration-150 ${
                        selectedJob === job.id
                          ? "bg-white/10 border border-white/20"
                          : "bg-gray-700/30 hover:bg-gray-700/50"
                      }`}
                    >
                      <h4 className="font-medium text-white mb-1">{job.title}</h4>
                      <p className="text-sm text-gray-400 line-clamp-2">{job.description}</p>
                      <p className="text-xs text-gray-500 mt-2">Dept ID: {job.department_id}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Applicants List */}
          <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-700/50">
              <h3 className="text-lg font-semibold text-white">
                {selectedJob ? "Applicants" : "Select a Job"}
              </h3>
            </div>
            <div className="p-4 max-h-[600px] overflow-y-auto">
              {!selectedJob ? (
                <div className="text-center py-16">
                  <p className="text-gray-500">Select a job to view applicants</p>
                </div>
              ) : applicants.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-gray-500">No applicants yet</p>
                </div>
              ) : (
                <ul className="space-y-3">
                  {applicants.map((a) => (
                    <li
                      key={a.id}
                      className="p-4 bg-gray-700/30 rounded-lg border border-gray-700/50"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-medium text-white">{a.name}</p>
                          <p className="text-sm text-gray-400">{a.email}</p>
                        </div>
                        <StatusPill value={a.status} />
                      </div>
                      {a.status === "Pending" && (
                        <div className="flex gap-2 mt-3">
                          <button
                            onClick={() => handleUpdateStatus(a.id, "Approved")}
                            className="flex-1 px-4 py-2 bg-green-500/20 text-green-300 rounded-lg text-sm font-medium border border-green-500/30 hover:bg-green-500/30 transition-colors duration-150"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleUpdateStatus(a.id, "Rejected")}
                            className="flex-1 px-4 py-2 bg-red-500/20 text-red-300 rounded-lg text-sm font-medium border border-red-500/30 hover:bg-red-500/30 transition-colors duration-150"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recruitment;
