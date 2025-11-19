import { useState, useEffect } from "react";
import {
  CalendarCheck, FileText, DollarSign, GraduationCap,
  Megaphone, Package, Clock, Briefcase, LogOut, UserCircle, CheckSquare
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

import Attendance from "./components/Attendance";
import Leave from "./components/Leave";
import Payroll from "./components/Payroll";
import Training from "./components/Training";
import Announcement from "./components/Announcement";
import AssetAllocation from "./components/AssetAllocation";
import Meeting from "./components/Meeting";
import Designation from "./components/Designation";
import Tasks from "./components/Tasks";

const Employee = () => {
  const [user, setUser] = useState(null);
  const [isClockedIn, setIsClockedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // 👇 FIXED USER + TOKEN LOADING
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) return;

      const parsed = JSON.parse(storedUser);
      const userId = parsed?.userId;
      const token = parsed?.token;

      if (!userId || !token) return;

      fetch(`http://localhost:5000/api/users/${userId}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setUser(data))
        .catch((err) => console.error("Error fetching user:", err));
    } catch (err) {
      console.error("LocalStorage parse error:", err);
    }
  }, []);

  const getCurrentTab = () => {
    const path = location.pathname;
    if (path === "/employee" || path === "/employee/") {
      return "attendance";
    }
    const parts = path.split("/");
    return parts[parts.length - 1] || "attendance";
  };

  const activeTab = getCurrentTab();

  const handleClockIn = () => {
    setIsClockedIn(true);
    alert("✓ Clocked in successfully!");
  };

  const handleClockOut = () => {
    setIsClockedIn(false);
    alert("✓ Clocked out successfully!");
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
  };

  const handleTabClick = (tabKey) => {
    navigate(`/employee/${tabKey}`);
  };

  const menuItems = [
    { key: "attendance", label: "Attendance", icon: CalendarCheck },
    { key: "leave", label: "Leaves", icon: FileText },
    { key: "tasks", label: "Tasks", icon: CheckSquare },   // ✅ ADDED
    { key: "payroll", label: "Payroll", icon: DollarSign },
    { key: "training", label: "Training", icon: GraduationCap },
    { key: "announcement", label: "Announcements", icon: Megaphone },
    { key: "asset", label: "Assets", icon: Package },
    { key: "meeting", label: "Meetings", icon: Clock },
    { key: "designation", label: "Designation", icon: Briefcase },
  ];

  return (
    <div className="flex h-screen w-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900/50 backdrop-blur-sm border-r border-gray-700/50 p-6 flex flex-col">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-1">Employee</h2>
          <p className="text-xs text-gray-400">Personal Dashboard</p>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto">
          {menuItems.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => handleTabClick(key)}
              className={`flex items-center w-full px-4 py-3 rounded-lg transition-all duration-200 ${
                activeTab === key
                  ? "bg-white text-gray-900 shadow-lg"
                  : "text-gray-400 hover:text-white hover:bg-gray-700/50"
              }`}
            >
              <Icon className="mr-3 h-5 w-5" />
              <span className="font-medium">{label}</span>
            </button>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-3 mt-4 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-200"
        >
          <LogOut className="mr-3 h-5 w-5" />
          <span className="font-medium">Logout</span>
        </button>
      </aside>

      {/* Main Section */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-gray-900/30 backdrop-blur-sm border-b border-gray-700/50 flex items-center justify-between px-6">
          <div>
            <h1 className="text-xl font-semibold text-white">
              {menuItems.find((item) => item.key === activeTab)?.label ||
                "Employee Dashboard"}
            </h1>
          </div>

          <div className="flex items-center gap-6">
            {!isClockedIn ? (
              <button
                onClick={handleClockIn}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-all duration-200"
              >
                Clock In
              </button>
            ) : (
              <button
                onClick={handleClockOut}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all duration-200"
              >
                Clock Out
              </button>
            )}

            <div className="flex items-center gap-2">
              <div
                className={`h-3 w-3 rounded-full ${
                  isClockedIn ? "bg-emerald-500" : "bg-gray-500"
                }`}
              ></div>
              <span className="text-sm text-gray-400">
                {isClockedIn ? "Clocked In" : "Not Clocked In"}
              </span>
            </div>

            <div className="flex items-center gap-3 pl-6 border-l border-gray-700/50">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <UserCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">
                  {user?.username || "Employee"}
                </p>
                <p className="text-xs text-gray-400">Employee</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === "attendance" && <Attendance />}
          {activeTab === "leave" && <Leave />}
          {activeTab === "tasks" && <Tasks />} {/* ⭐ FIXED */}
          {activeTab === "payroll" && <Payroll />}
          {activeTab === "training" && <Training />}
          {activeTab === "announcement" && <Announcement />}
          {activeTab === "asset" && <AssetAllocation />}
          {activeTab === "meeting" && <Meeting />}
          {activeTab === "designation" && <Designation />}
        </div>
      </main>
    </div>
  );
};

export default Employee;
