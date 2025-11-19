
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Landing from "./pages/Landing/Landing";
// import RoleSelect from "./pages/Auth/RoleSelect";
// import Login from "./pages/Auth/Login";
// import ResetPassword from "./pages/Auth/ResetPassword";
// import Dashboard from "./pages/Common/Dashboard";
// import SuperAdmin from "./pages/SuperAdmin/SuperAdmin";
// import HR from "./pages/HR/HR";
// import Manager from "./pages/Manager/Manager";
// import Employee from "./pages/Employee/Employee";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Main Routes */}
//         <Route path="/" element={<Landing />} />
        
//         <Route path="/role-select" element={<RoleSelect />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/admin" element={<SuperAdmin />} />
//         <Route path="/reset-password/:userId" element={<ResetPassword />} />

//         {/* Dashboard Routes by Role */}
//         <Route path="/dashboard" element={<Dashboard />} />
        
//         {/* HR Routes - Direct routes instead of nested */}
//         <Route path="/hr" element={<HR />} />
//         <Route path="/hr/employees" element={<HR />} />
//         <Route path="/hr/departments" element={<HR />} />
//         <Route path="/hr/designations" element={<HR />} />
//         <Route path="/hr/attendance" element={<HR />} />
//         <Route path="/hr/leaves" element={<HR />} />
//         <Route path="/hr/recruitment" element={<HR />} />
//         <Route path="/hr/payroll" element={<HR />} />
//         <Route path="/hr/resignations" element={<HR />} />

//         {/* Manager Routes */}
//         <Route path="/manager/*" element={<Manager />} />
//         {/* <Route path="/manager/Announcements" element={<Manager />} />
//         <Route path="/manager/Assets" element={<Manager />} />
//         <Route path="/manager/AttendanceShift" element={<Manager />} />
//         <Route path="/manager/FeedbackGrievance" element={<Manager />} />
//         <Route path="/manager/GoalsTasks" element={<Manager />} />
//         <Route path="/manager/Meetings" element={<Manager />} />
//         <Route path="/manager/Performance" element={<Manager />} />
//         <Route path="/manager/Skills" element={<Manager />} />
//         <Route path="/manager/TeamManagement" element={<Manager />} />
//         <Route path="/manager/TrainingDevelopment" element={<Manager />} /> */}

//         {/* <Route path="/manager/announcements" element={<Manager />} />
//         <Route path="/manager/assets" element={<Manager />} />
//         <Route path="/manager/attendanceshift" element={<Manager />} />
//         <Route path="/manager/feedbackgrievance" element={<Manager />} />
//         <Route path="/manager/goalstasks" element={<Manager />} />
//         <Route path="/manager/meetings" element={<Manager />} />
//         <Route path="/manager/performance" element={<Manager />} />
//         <Route path="/manager/skills" element={<Manager />} />
//         <Route path="/manager/teammanagement" element={<Manager />} />
//         <Route path="/manager/trainingdevelopment" element={<Manager />} /> */}

//         {/* <Route path="/manager/team" element={<Manager />} />
//         <Route path="/manager/attendance" element={<Manager />} />
//         <Route path="/manager/performance" element={<Manager />} />
//         <Route path="/manager/goals" element={<Manager />} />
//         <Route path="/manager/training" element={<Manager />} />
//         <Route path="/manager/skills" element={<Manager />} />
//         <Route path="/manager/assets" element={<Manager />} />
//         <Route path="/manager/announcements" element={<Manager />} />
//         <Route path="/manager/feedback" element={<Manager />} />
//         <Route path="/manager/meetings" element={<Manager />} /> */}

//         {/* Employee Routes */}
//         <Route path="/employee" element={<Employee />} />
//       </Routes>
//     </Router>
//   );
// }

// // export default App;
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Landing from "./pages/Landing/Landing";
// import RoleSelect from "./pages/Auth/RoleSelect";
// import Login from "./pages/Auth/Login";
// import ResetPassword from "./pages/Auth/ResetPassword";
// import Unauthorized from "./component/Unauthorized";
// import Dashboard from "./pages/Common/Dashboard";
// import SuperAdmin from "./pages/SuperAdmin/SuperAdmin";
// import HR from "./pages/HR/HR";
// import Manager from "./pages/Manager/Manager";
// import Employee from "./pages/Employee/Employee";
// import ProtectedRoute from "./component/ProtectedRoute";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/" element={<Landing />} />
//         <Route path="/role-select" element={<RoleSelect />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/reset-password/:userId" element={<ResetPassword />} />
//         <Route path="/unauthorized" element={<Unauthorized />} />

//         {/* Dashboard - All authenticated users */}
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute allowedRoles={[1, 2, 3, 4]}>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />

//         {/* Super Admin Routes - roleId: 1
//         <Route
//           path="/admin"
//           element={
//             <ProtectedRoute allowedRoles={[1]}>
//               <SuperAdmin />
//             </ProtectedRoute>
//           }
//         /> */}

//         {/* HR Routes - roleId: 2 */}
//         <Route
//           path="/hr"
//           element={
//             <ProtectedRoute allowedRoles={[1, 2]}>
//               <HR />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/hr/employees"
//           element={
//             <ProtectedRoute allowedRoles={[1, 2]}>
//               <HR />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/hr/departments"
//           element={
//             <ProtectedRoute allowedRoles={[1, 2]}>
//               <HR />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/hr/designations"
//           element={
//             <ProtectedRoute allowedRoles={[1, 2]}>
//               <HR />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/hr/attendance"
//           element={
//             <ProtectedRoute allowedRoles={[1, 2]}>
//               <HR />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/hr/leaves"
//           element={
//             <ProtectedRoute allowedRoles={[1, 2]}>
//               <HR />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/hr/recruitment"
//           element={
//             <ProtectedRoute allowedRoles={[1, 2]}>
//               <HR />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/hr/payroll"
//           element={
//             <ProtectedRoute allowedRoles={[1, 2]}>
//               <HR />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/hr/resignations"
//           element={
//             <ProtectedRoute allowedRoles={[1, 2]}>
//               <HR />
//             </ProtectedRoute>
//           }
//         />

//         {/* Manager Routes - roleId: 3 */}
//         <Route
//           path="/manager/*"
//           element={
//             <ProtectedRoute allowedRoles={[1, 3]}>
//               <Manager />
//             </ProtectedRoute>
//           }
//         />

//         {/* Employee Routes - roleId: 4 */}
//         <Route
//           path="/employee"
//           element={
//             <ProtectedRoute allowedRoles={[1, 4]}>
//               <Employee />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;







import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import RoleSelect from "./pages/Auth/RoleSelect";
import Login from "./pages/Auth/Login";
import ResetPassword from "./pages/Auth/ResetPassword";
import Unauthorized from "./component/Unauthorized";
import Dashboard from "./pages/Common/Dashboard";
import SuperAdmin from "./pages/SuperAdmin/SuperAdmin";
import HR from "./pages/HR/HR";
import Manager from "./pages/Manager/Manager";
import Employee from "./pages/Employee/Employee";
import ProtectedRoute from "./component/ProtectedRoute";
import SSOCallback from './component/SSOCallback';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/role-select" element={<RoleSelect />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password/:userId" element={<ResetPassword />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* SuperAdmin Route - Protected by Clerk ONLY (NO ProtectedRoute wrapper) */}
        <Route path="/admin" element={<SuperAdmin />} />
        <Route path="/admin/sso-callback" element={<SSOCallback />} />

        {/* Dashboard - All authenticated users */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={[1, 2, 3, 4]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* HR Routes - roleId: 2 */}
        <Route
          path="/hr"
          element={
            <ProtectedRoute allowedRoles={[1, 2]}>
              <HR />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hr/employees"
          element={
            <ProtectedRoute allowedRoles={[1, 2]}>
              <HR />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hr/departments"
          element={
            <ProtectedRoute allowedRoles={[1, 2]}>
              <HR />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hr/designations"
          element={
            <ProtectedRoute allowedRoles={[1, 2]}>
              <HR />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hr/attendance"
          element={
            <ProtectedRoute allowedRoles={[1, 2]}>
              <HR />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hr/leaves"
          element={
            <ProtectedRoute allowedRoles={[1, 2]}>
              <HR />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hr/recruitment"
          element={
            <ProtectedRoute allowedRoles={[1, 2]}>
              <HR />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hr/payroll"
          element={
            <ProtectedRoute allowedRoles={[1, 2]}>
              <HR />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hr/resignations"
          element={
            <ProtectedRoute allowedRoles={[1, 2]}>
              <HR />
            </ProtectedRoute>
          }
        />

        {/* Manager Routes - roleId: 3 */}
        <Route
          path="/manager/*"
          element={
            <ProtectedRoute allowedRoles={[1, 3]}>
              <Manager />
            </ProtectedRoute>
          }
        />

        {/* Employee Routes - roleId: 4 */}
        <Route
          path="/employee/*"
          element={
            <ProtectedRoute allowedRoles={[1, 4]}>
              <Employee />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
