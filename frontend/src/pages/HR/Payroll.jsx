// import React, { useEffect, useState } from "react";
// import { fetchPayrollAPI } from "../../api/HR/payrollApi";

// const Payroll = () => {
//   const [payroll, setPayroll] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await fetchPayrollAPI();
//         setPayroll(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) return <p>Loading payroll...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div>
//       <h2>HR Payroll</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Employee</th>
//             <th>Salary</th>
//             <th>Month</th>
//           </tr>
//         </thead>
//         <tbody>
//           {payroll.map((p) => (
//             <tr key={p.id}>
//               <td>{p.username}</td>
//               <td>{p.total_salary}</td>
//               <td>{p.month}/{p.year}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Payroll;

// ///rewa
// import React, { useEffect, useState } from "react";
// import { fetchPayrollAPI } from "../../api/HR/payrollApi";

// const Payroll = () => {
//   const [payroll, setPayroll] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await fetchPayrollAPI();
//         setPayroll(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
//         <div className="text-center">
//           <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-white border-r-transparent mb-4"></div>
//           <p className="text-gray-400">Loading payroll...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
//         <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-6 text-center">
//           <p className="text-red-300">Error: {error}</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <h2 className="text-3xl font-bold text-white mb-2">HR Payroll</h2>
//           <p className="text-gray-400 text-sm">
//             View and manage employee payroll information
//           </p>
//         </div>

//         {/* Content Card */}
//         <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="bg-gray-900/50">
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
//                     Employee
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
//                     Salary
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
//                     Month/Year
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-700/50">
//                 {payroll.map((p) => (
//                   <tr 
//                     key={p.id}
//                     className="hover:bg-gray-700/30 transition-colors duration-150"
//                   >
//                     <td className="px-6 py-4 text-sm font-medium text-white">
//                       {p.username}
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-300">
//                       ${p.total_salary?.toLocaleString()}
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-300">
//                       {p.month}/{p.year}
//                     </td>
//                   </tr>
//                 ))}
//                 {!payroll.length && (
//                   <tr>
//                     <td className="px-6 py-16 text-gray-500 text-center" colSpan="3">
//                       No payroll records found.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Payroll;

import React, { useEffect, useState } from "react";
import { fetchPayrollAPI, createPayrollAPI, getEmployeesAPI } from "../../api/HR/payrollApi";

const Payroll = () => {
  const [payroll, setPayroll] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    employee_id: "",
    base_salary: "",
    days_present: "",
    overtime_hours: "",
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [payData, empData] = await Promise.all([
        fetchPayrollAPI(),
        getEmployeesAPI(),
      ]);
      setPayroll(payData);
      setEmployees(empData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.employee_id || !formData.base_salary || !formData.days_present) {
      alert("❌ Fill all required fields");
      return;
    }

    try {
      const totalSalary = (parseFloat(formData.base_salary) / 30) * formData.days_present + 
                         (parseFloat(formData.overtime_hours) || 0) * 500;

      await createPayrollAPI({
        user_id: formData.employee_id,
        base_salary: parseFloat(formData.base_salary),
        days_present: parseInt(formData.days_present),
        overtime_hours: parseFloat(formData.overtime_hours) || 0,
        month: formData.month,
        year: formData.year,
        total_salary: totalSalary,
      });

      alert("✅ Payroll created successfully!");
      setFormData({
        employee_id: "",
        base_salary: "",
        days_present: "",
        overtime_hours: "",
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
      });
      fetchData();
    } catch (err) {
      alert("❌ Error: " + err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-white border-r-transparent mb-4"></div>
          <p className="text-gray-400">Loading payroll...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-6 text-center">
          <p className="text-red-300">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">💰 HR Payroll</h2>
          <p className="text-gray-400 text-sm">Add and manage employee payroll information</p>
        </div>

        {/* Add Payroll Form */}
        <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
          <h3 className="text-lg font-semibold text-white mb-6">➕ Add Employee Salary</h3>
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-300 mb-2">Select Employee *</label>
              <select
                value={formData.employee_id}
                onChange={(e) => setFormData({...formData, employee_id: e.target.value})}
                className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white"
                required
              >
                <option value="">-- Select Employee --</option>
                {employees.map(emp => (
                  <option key={emp.id} value={emp.id}>{emp.username || emp.email}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">Base Salary (Monthly) *</label>
              <input
                type="number"
                placeholder="e.g., 50000"
                value={formData.base_salary}
                onChange={(e) => setFormData({...formData, base_salary: e.target.value})}
                className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">Days Present (Max 31) *</label>
              <input
                type="number"
                placeholder="e.g., 28"
                min="1"
                max="31"
                value={formData.days_present}
                onChange={(e) => setFormData({...formData, days_present: e.target.value})}
                className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">Overtime Hours</label>
              <input
                type="number"
                placeholder="e.g., 5"
                value={formData.overtime_hours}
                onChange={(e) => setFormData({...formData, overtime_hours: e.target.value})}
                className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">Month</label>
              <select
                value={formData.month}
                onChange={(e) => setFormData({...formData, month: e.target.value})}
                className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white"
              >
                {[1,2,3,4,5,6,7,8,9,10,11,12].map(m => (
                  <option key={m} value={m}>
                    {new Date(2024, m-1).toLocaleString('en-IN', {month: 'long'})}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">Year</label>
              <input
                type="number"
                placeholder="2025"
                value={formData.year}
                onChange={(e) => setFormData({...formData, year: e.target.value})}
                className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white"
              />
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg"
              >
                ✅ Create Payroll
              </button>
            </div>
          </form>
        </div>

        {/* Payroll List */}
        <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-700/50">
            <h3 className="text-lg font-semibold text-white">📋 Payroll Records</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-900/50">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Employee</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Base Salary</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Days</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">OT Hours</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Total</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Month/Year</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/50">
                {payroll.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-700/30">
                    <td className="px-6 py-4 text-sm text-white">{p.users?.username || p.username || 'N/A'}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">₹{p.base_salary?.toLocaleString('en-IN')}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{p.days_present}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{p.overtime_hours || '0'} hrs</td>
                    <td className="px-6 py-4 text-sm font-bold text-green-400">₹{p.total_salary?.toLocaleString('en-IN')}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{p.month}/{p.year}</td>
                  </tr>
                ))}
                {!payroll.length && (
                  <tr>
                    <td className="px-6 py-16 text-gray-500 text-center" colSpan="6">No payroll records found. Create one above! 👆</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payroll;
