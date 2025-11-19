import React, { useEffect, useState } from "react";
import { 
  getEmployeeAssets, 
  requestAsset, 
  getManagers 
} from "../../../api/EMPLOYEE/assetApi";
import { useAuthContext } from "../../../context/AuthContext";

const Status = ({ v }) => {
  const color = {
    Approved: "text-green-400",
    Pending: "text-yellow-400",
    Rejected: "text-red-400",
  };
  return <span className={`${color[v] ?? "text-gray-300"} font-semibold`}>{v}</span>;
};

const Asset = () => {
  const { user } = useAuthContext();
  const [assigned, setAssigned] = useState([]);
  const [requests, setRequests] = useState([]);
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [reqData, setReqData] = useState({
    asset_name: "",
    reason: "",
    manager_id: "",
    due_date: "",
  });

  // Load Employee Data + Managers
  useEffect(() => {
    if (!user || !user.userId) return;

    loadData();
    loadManagers();
  }, [user]);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await getEmployeeAssets(user.userId);

      setAssigned(data.assigned || []);
      setRequests(data.requests || []);
    } catch (err) {
      console.error("Asset Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

 const loadManagers = async () => {
  try {
    const data = await getManagers();
    setManagers(data);
  } catch (err) {
    console.error("Manager loading failed:", err);
  }
};

useEffect(() => {
  loadManagers();
}, []);


  // Submit new request
  const handleRequest = async (e) => {
    e.preventDefault();

    await requestAsset({
      user_id: user.userId,
      asset_name: reqData.asset_name,
      reason: reqData.reason,
      manager_id: reqData.manager_id,
      due_date: reqData.due_date,
    });

    setReqData({ asset_name: "", reason: "", manager_id: "", due_date: "" });
    loadData();
  };

  if (loading) return <p className="text-white p-6">Loading...</p>;

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">My Assets</h2>

      {/* Assigned Assets */}
      <div className="bg-gray-800 p-4 rounded-xl mb-6">
        <h3 className="text-xl font-semibold mb-3">Assigned Assets</h3>
        {assigned.length === 0 ? (
          <p className="text-gray-300">No assets assigned.</p>
        ) : (
          assigned.map((a) => (
            <div key={a.id} className="mb-2 p-3 border border-gray-600 rounded-lg">
              <p><b>Name:</b> {a.name}</p>
              <p><b>Status:</b> <Status v={a.status} /></p>
              <p><b>Return Date:</b> {a.return_date || "Not set"}</p>
            </div>
          ))
        )}
      </div>

      {/* Request New Asset */}
      <div className="bg-gray-800 p-4 rounded-xl mb-6">
        <h3 className="text-xl font-semibold mb-3">Request New Asset</h3>

        <form onSubmit={handleRequest} className="space-y-3">

          <input
            type="text"
            placeholder="Asset Name"
            value={reqData.asset_name}
            onChange={(e) => setReqData({ ...reqData, asset_name: e.target.value })}
            className="w-full bg-gray-700 p-3 rounded-lg"
            required
          />

          <textarea
            placeholder="Reason"
            value={reqData.reason}
            onChange={(e) => setReqData({ ...reqData, reason: e.target.value })}
            className="w-full bg-gray-700 p-3 rounded-lg"
            required
          />

          {/* Manager Dropdown */}
          <select
            className="w-full bg-gray-700 p-3 rounded-lg"
            value={reqData.manager_id}
            onChange={(e) => setReqData({ ...reqData, manager_id: e.target.value })}
            required
          >
            <option value="">Select Manager</option>
            {managers.map((m) => (
              <option key={m.id} value={m.id}>
                {m.username}
              </option>
            ))}
          </select>

          {/* Due Date */}
          <input
            type="date"
            className="w-full bg-gray-700 p-3 rounded-lg"
            value={reqData.due_date}
            onChange={(e) => setReqData({ ...reqData, due_date: e.target.value })}
          />

          <button className="bg-green-600 px-4 py-2 rounded-lg">
            Submit Request
          </button>

        </form>
      </div>

      {/* Request History */}
      <div className="bg-gray-800 p-4 rounded-xl">
        <h3 className="text-xl font-semibold mb-3">Request History</h3>

        {requests.map((r) => (
          <div key={r.id} className="mb-2 p-3 border border-gray-600 rounded-lg">
            <p><b>Asset:</b> {r.asset_name}</p>
            <p><b>Manager:</b> {r.manager_name || "N/A"}</p>
            <p><b>Status:</b> <Status v={r.status} /></p>
            <p><b>Requested:</b> {new Date(r.created_at).toLocaleString()}</p>
            <p><b>Due Date:</b> {r.due_date || "N/A"}</p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Asset;
