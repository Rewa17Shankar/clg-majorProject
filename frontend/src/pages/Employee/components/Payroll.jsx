import React, { useEffect, useState } from "react";

const Payroll = () => {
  const [payroll, setPayroll] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalSalary, setTotalSalary] = useState(0);

  useEffect(() => {
    fetchPayroll();
  }, []);

  const fetchPayroll = async () => {
    try {
      setLoading(true);
      const token = JSON.parse(localStorage.getItem("user"))?.token;
      
      const res = await fetch("http://localhost:5000/api/employee/payroll", {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      
      // ✅ FIX: Check if data is array
      if (Array.isArray(data)) {
        setPayroll(data);
        const total = data.reduce((sum, p) => sum + (p.total_salary || 0), 0);
        setTotalSalary(total);
      } else {
        console.error("Data is not an array:", data);
        setPayroll([]);
        setTotalSalary(0);
      }
    } catch (err) {
      console.error("Error fetching payroll:", err);
      setPayroll([]);
      setTotalSalary(0);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-gray-400 text-center py-8">Loading payroll...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-green-600/20 to-green-700/20 border border-green-500/50 rounded-lg p-6">
          <p className="text-sm text-green-200 mb-2">Total Earned</p>
          <p className="text-3xl font-bold text-white">₹{totalSalary.toLocaleString('en-IN')}</p>
        </div>
        
        <div className="bg-gradient-to-br from-blue-600/20 to-blue-700/20 border border-blue-500/50 rounded-lg p-6">
          <p className="text-sm text-blue-200 mb-2">Payroll Records</p>
          <p className="text-3xl font-bold text-white">{payroll.length}</p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-600/20 to-purple-700/20 border border-purple-500/50 rounded-lg p-6">
          <p className="text-sm text-purple-200 mb-2">Last Salary</p>
          <p className="text-3xl font-bold text-white">
            ₹{payroll[0]?.total_salary?.toLocaleString('en-IN') || '0'}
          </p>
        </div>
      </div>

      {/* Payroll Table */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg overflow-hidden">
        <div className="p-6 border-b border-gray-700/50">
          <h3 className="text-lg font-semibold text-white">💰 Payroll History</h3>
        </div>
        
        {!payroll || payroll.length === 0 ? (
          <div className="p-6 text-center text-gray-400">
            No payroll records found
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700/50">
                <tr>
                  <th className="px-6 py-3 text-left text-gray-300">Month/Year</th>
                  <th className="px-6 py-3 text-left text-gray-300">Base Salary</th>
                  <th className="px-6 py-3 text-left text-gray-300">Days Present</th>
                  <th className="px-6 py-3 text-left text-gray-300">Overtime Hours</th>
                  <th className="px-6 py-3 text-left text-gray-300">Total Salary</th>
                </tr>
              </thead>
              <tbody>
                {payroll.map((record) => (
                  <tr key={record.id} className="border-t border-gray-700/50 hover:bg-gray-700/30 transition">
                    <td className="px-6 py-4 text-gray-300">
                      {record.month}/{record.year}
                    </td>
                    <td className="px-6 py-4 font-semibold text-green-400">
                      ₹{record.base_salary?.toLocaleString('en-IN') || '0'}
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      {record.days_present || '0'}
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      {record.overtime_hours || '0'} hrs
                    </td>
                    <td className="px-6 py-4 font-bold text-white text-lg">
                      ₹{record.total_salary?.toLocaleString('en-IN') || '0'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payroll;
