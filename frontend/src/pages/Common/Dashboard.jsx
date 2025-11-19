
import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import SuperAdmin from "../SuperAdmin/SuperAdminDashboard";
import HR from "../HR/HR";
import Manager from "../Manager/Manager";
import Employee from "../Employee/Employee";

const Dashboard = () => {
  const { role, user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to role-specific routes instead of rendering components directly
    if (role === "hr") {
      navigate("/hr/employees", { replace: true });
    } else if (role === "manager") {
      navigate("/manager", { replace: true });
    } else if (role === "employee") {
      navigate("/employee", { replace: true });
    } else if (role === "superadmin") {
      navigate("/admin", { replace: true });
    }
  }, [role, navigate]);

  if (!role) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-center text-lg font-medium text-gray-700 bg-white px-6 py-4 rounded-xl shadow-md">
          ⚠️ No role selected!
        </p>
      </div>
    );
  }

  // This fallback should rarely be seen due to the useEffect redirect
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <p className="text-center text-lg font-medium text-gray-700 bg-white px-6 py-4 rounded-xl shadow-md">
        Redirecting to dashboard...
      </p>
    </div>
  );
};

export default Dashboard;