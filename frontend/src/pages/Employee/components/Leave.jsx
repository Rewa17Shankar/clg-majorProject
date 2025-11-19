import { useEffect, useMemo, useState } from "react";
import {
  getLeaveTypes,
  createLeaveRequest,
  getLeaveRequests,
} from "../../../api/HR/leaveApi";

const StatusPill = ({ value }) => {
  const cls = useMemo(() => {
    if (value === "Approved")
      return "bg-green-500/20 text-green-300 border-green-500/30";
    if (value === "Rejected")
      return "bg-red-500/20 text-red-300 border-red-500/30";
    return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
  }, [value]);
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold border ${cls}`}
    >
      {value}
    </span>
  );
};

export default function Leave() {
  const getUserId = () => {
    const userStr = localStorage.getItem("user");
    if (!userStr) return null;
    
    try {
      const user = JSON.parse(userStr);
      return user.userId;
    } catch (err) {
      return null;
    }
  };

  const userId = getUserId();

  const [types, setTypes] = useState([]);
  const [myRequests, setMyRequests] = useState([]);
  const [activeTab, setActiveTab] = useState("my-requests");
  const [form, setForm] = useState({
    leave_type_id: "",
    start_date: "",
    end_date: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userId) {
      loadData();
    }
  }, [userId]);

  const loadData = async () => {
    try {
      const typesRes = await getLeaveTypes();
      setTypes(typesRes.data?.data || typesRes.data || []);

      if (userId) {
        const reqRes = await getLeaveRequests({ user_id: userId });
        setMyRequests(reqRes.data?.data || reqRes.data || []);
      }
    } catch (err) {
      console.error("Error loading data:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { leave_type_id, start_date, end_date } = form;

      if (!leave_type_id || !start_date || !end_date) {
        alert("All fields required");
        setLoading(false);
        return;
      }

      if (!userId) {
        alert("User not found. Please login again.");
        setLoading(false);
        return;
      }

      const payload = {
        user_id: parseInt(userId),           // ✅ int
        leave_type_id: leave_type_id,        // ✅ uuid string
        start_date,
        end_date,
      };

      console.log("📤 Payload:", payload);

      await createLeaveRequest(payload);
      alert("✅ Leave request submitted successfully!");
      setForm({ leave_type_id: "", start_date: "", end_date: "" });
      loadData();
      setActiveTab("my-requests");
    } catch (err) {
      console.error("❌ Error:", err.response?.data);
      alert("Error: " + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  if (!userId) {
    return (
      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6">
        <p className="text-red-300">User not found. Please login again.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">
          Leave Management
        </h2>
        <p className="text-gray-400 text-sm">
          Apply and manage your leave requests
        </p>
      </div>

      <div className="flex gap-3 p-1 bg-gray-800/50 rounded-lg backdrop-blur-sm w-fit">
        <button
          onClick={() => setActiveTab("my-requests")}
          className={`px-6 py-2.5 rounded-md font-medium transition-all duration-200 ${
            activeTab === "my-requests"
              ? "bg-white text-gray-900 shadow-lg"
              : "text-gray-400 hover:text-white hover:bg-gray-700/50"
          }`}
        >
          My Requests
        </button>
        <button
          onClick={() => setActiveTab("apply")}
          className={`px-6 py-2.5 rounded-md font-medium transition-all duration-200 ${
            activeTab === "apply"
              ? "bg-white text-gray-900 shadow-lg"
              : "text-gray-400 hover:text-white hover:bg-gray-700/50"
          }`}
        >
          Apply Leave
        </button>
      </div>

      {activeTab === "my-requests" && (
        <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-700/50">
            <h3 className="text-lg font-semibold text-white">
              My Leave Requests
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-900/50">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Start Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    End Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Applied On
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/50">
                {myRequests && myRequests.length > 0 ? (
                  myRequests.map((req) => (
                    <tr
                      key={req.id}
                      className="hover:bg-gray-700/30 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-white">
                        {req.leave_types?.type || "N/A"}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {new Date(req.start_date).toLocaleDateString("en-IN")}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {new Date(req.end_date).toLocaleDateString("en-IN")}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {new Date(req.applied_at).toLocaleString("en-IN")}
                      </td>
                      <td className="px-6 py-4">
                        <StatusPill value={req.status} />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      className="px-6 py-16 text-gray-500 text-center"
                      colSpan="5"
                    >
                      No leave requests yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "apply" && (
        <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
          <h3 className="text-lg font-semibold text-white mb-6">
            Apply For Leave
          </h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Leave Type *
                </label>
                <select
                  value={form.leave_type_id}
                  onChange={(e) =>
                    setForm({ ...form, leave_type_id: e.target.value })
                  }
                  className="w-full bg-gray-700/50 border border-gray-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white"
                  required
                >
                  <option value="">-- Select Type --</option>
                  {types && types.length > 0 ? (
                    types.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.type}
                      </option>
                    ))
                  ) : (
                    <option disabled>No leave types available</option>
                  )}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Start Date *
                </label>
                <input
                  type="date"
                  value={form.start_date}
                  onChange={(e) =>
                    setForm({ ...form, start_date: e.target.value })
                  }
                  className="w-full bg-gray-700/50 border border-gray-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  End Date *
                </label>
                <input
                  type="date"
                  value={form.end_date}
                  onChange={(e) =>
                    setForm({ ...form, end_date: e.target.value })
                  }
                  className="w-full bg-gray-700/50 border border-gray-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white"
                  required
                />
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-semibold rounded-lg px-6 py-3 transition-all duration-200"
              >
                {loading ? "Submitting..." : "Submit Leave Request"}
              </button>
              <button
                type="button"
                onClick={() =>
                  setForm({
                    leave_type_id: "",
                    start_date: "",
                    end_date: "",
                  })
                }
                className="bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg px-6 py-3 transition-all duration-200"
              >
                Clear
              </button>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <p className="text-sm text-blue-200">
                Your leave request will be submitted to HR for approval.
              </p>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
