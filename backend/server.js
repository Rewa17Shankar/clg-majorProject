// import express from "express";
// import dotenv from "dotenv";
// import authRoutes from "./routes/authRoutes.js";
// import userRoutes from "./routes/userRoutes.js";
// import departmentRoutes from "./routes/HR/departmentRoutes.js";
// import designationRoutes from "./routes/HR/designationRoutes.js";
// import attendanceRoutes from "./routes/attendanceRoutes.js";
// import shiftRoutes from "./routes/HR/shiftRoutes.js";
// import leaveRoutes from "./routes/HR/leaveRoutes.js";
// import recruitmentRoutes from "./routes/HR/recruitmentRoutes.js";
// import payrollRoutes from "./routes/HR/payrollRoutes.js";
// import resignationRoutes from "./routes/HR/resignationRoutes.js";
// import employeeRoutes from "./routes/HR/employeeRoutes.js";
// import teamRoutes from "./routes/MANAGER/teamRoutes.js";
// import performanceRoutes from "./routes/MANAGER/performanceRoutes.js";
// // import goalRoutes from "./routes/goalRoutes.js";
// import goalsTasksRoutes from "./routes/MANAGER/goalsTasksRoutes.js";
// import assetsRoutes from "./routes/MANAGER/assets.js";
// // import assetsRoutes from "./routes/assetsRoutes.js";
// import announcementsRoutes from "./routes/MANAGER/announcementsRoutes.js";
// import feedbackGrievanceRoutes from "./routes/MANAGER/feedbackGrievanceRoutes.js";
// import meetingsRoutes from "./routes/MANAGER/meetingsRoutes.js";
// import trainingRoutes from "./routes/MANAGER/trainingRoutes.js";
// import skillsRoutes from "./routes/MANAGER/skillsRoutes.js";
// import cors from "cors";
// dotenv.config();

// const app = express();

// app.use(cors({
//   origin: 'https://clg-major-projrct.vercel.app', 
//   credentials: true // if you need cookies
// }));
// // app.use(cors());
// app.use(express.json());

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/departments", departmentRoutes);
// app.use("/api/designations", designationRoutes);
// app.use("/api/attendance", attendanceRoutes);
// app.use("/api/shifts", shiftRoutes);
// app.use("/api/leaves", leaveRoutes);
// app.use("/api/recruitment", recruitmentRoutes);
// app.use("/api/payroll", payrollRoutes);
// app.use("/api/resignations", resignationRoutes);
// app.use("/api/employees", employeeRoutes);
// app.use("/api/performance", performanceRoutes);
// // app.use("/api/goals", goalRoutes);
// app.use("/api/assets", assetsRoutes);
// app.use("/api/teams", teamRoutes);
// // app.use("/api/assets", assetsRoutes);
// app.use("/api/announcements", announcementsRoutes);
// app.use("/api/feedback-grievance", feedbackGrievanceRoutes);
// app.use("/api/meetings", meetingsRoutes);
// app.use("/api/goals-tasks", goalsTasksRoutes);
// app.use("/api/trainings", trainingRoutes);
// app.use("/api/skills", skillsRoutes);
// // Default route
// app.get("/", (req, res) => {
//   res.send("HRMS Backend Running...");
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);import express from "express";














// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";

// dotenv.config();
// const app = express();

// // ================================
// // Middleware
// // ================================
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Allowed Origins
// const allowedOrigins = [
//   "http://localhost:5173",
//   "http://localhost:5174",
//   "http://localhost:3000",
//   "https://clg-major-projrct.vercel.app",
// ];

// // app.use(
// //   cors({
// //     origin: function (origin, callback) {
// //       if (!origin) return callback(null, true);
// //       if (allowedOrigins.includes(origin)) callback(null, true);
// //       else callback(new Error("Not allowed by CORS"));
// //     },
// //     methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
// //     allowedHeaders: ["Content-Type", "Authorization"],
// //   })
// // );
// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173",
//       "http://localhost:5174",
//       "http://localhost:3000",
//       "https://clg-major-projrct.vercel.app",
//     ],
//     methods: "GET,POST,PUT,PATCH,DELETE,OPTIONS",
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true   
//   })
// );

// // ================================
// // Import Routes
// // ================================

// // Auth & User
// import authRoutes from "./routes/authRoutes.js";
// import userRoutes from "./routes/userRoutes.js";

// // HR MODULE
// import departmentRoutes from "./routes/HR/departmentRoutes.js";
// import designationRoutes from "./routes/HR/designationRoutes.js";
// import attendanceRoutes from "./routes/attendanceRoutes.js";
// import shiftRoutes from "./routes/HR/shiftRoutes.js";
// import leaveRoutes from "./routes/HR/leaveRoutes.js";
// import recruitmentRoutes from "./routes/HR/recruitmentRoutes.js";
// import payrollRoutes from "./routes/HR/payrollRoutes.js";
// import resignationRoutes from "./routes/HR/resignationRoutes.js";
// import employeeHRRoutes from "./routes/HR/employeeRoutes.js";

// // MANAGER MODULE
// import teamRoutes from "./routes/MANAGER/teamRoutes.js";
// import performanceRoutes from "./routes/MANAGER/performanceRoutes.js";
// import goalsTasksRoutes from "./routes/MANAGER/goalsTasksRoutes.js";
// import assetsRoutes from "./routes/MANAGER/assets.js";
// import announcementsRoutes from "./routes/MANAGER/announcementsRoutes.js";
// import feedbackGrievanceRoutes from "./routes/MANAGER/feedbackGrievanceRoutes.js";
// import meetingsRoutes from "./routes/MANAGER/meetingsRoutes.js";
// import trainingRoutes from "./routes/MANAGER/trainingRoutes.js";
// import skillsRoutes from "./routes/MANAGER/skillsRoutes.js";
// import managerSubmissionRoutes from "./routes/MANAGER/taskSubmissionsRoutes.js";
// import assetRequestRoutes from "./routes/MANAGER/assetRequestRoutes.js";

// // EMPLOYEE MODULE
// import employeeRoutes from "./routes/Employee/employeeRoutes.js";
// import taskRoutes from "./routes/Employee/taskRoutes.js";
// import employeeAssetRoutes from "./routes/Employee/assetRoutes.js"; 
// import employeeManagerRoutes from "./routes/Employee/managerRoutes.js";//fo manager list in asset
// import employeeAnnouncementsRoutes from "./routes/Employee/employeeAnnouncementsRoutes.js";
// import employeeTrainingRoutes from "./routes/Employee/trainingRoutes.js";
// import employeeDesignationRoutes from "./routes/Employee/designationRoutes.js";
// import employeeMeetingRoutes from "./routes/Employee/meetingRoutes.js";




// // ================================
// // Route Mapping
// // ================================

// // Auth
// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);

// // HR
// app.use("/api/departments", departmentRoutes);
// app.use("/api/designations", designationRoutes);
// app.use("/api/attendance", attendanceRoutes);
// app.use("/api/shifts", shiftRoutes);
// app.use("/api/leaves", leaveRoutes);
// app.use("/api/recruitment", recruitmentRoutes);
// app.use("/api/hr/payroll", payrollRoutes);
// app.use("/api/hr/employees", employeeHRRoutes);
// app.use("/api/resignations", resignationRoutes);

// // MANAGER
// app.use("/api/performance", performanceRoutes);
// app.use("/api/assets", assetsRoutes);
// app.use("/api/teams", teamRoutes);
// app.use("/api/announcements", announcementsRoutes);
// app.use("/api/feedback-grievance", feedbackGrievanceRoutes);
// app.use("/api/meetings", meetingsRoutes);
// app.use("/api/goals-tasks", goalsTasksRoutes);
// app.use("/api/trainings", trainingRoutes);
// app.use("/api/skills", skillsRoutes);
// app.use("/api/manager/submissions", managerSubmissionRoutes);
// app.use("/api/manager/asset-requests", assetRequestRoutes);

// // EMPLOYEE
// app.use("/api/employee", employeeRoutes);        // profile, attendance, leaves, payroll etc
// app.use("/api/employee/tasks", taskRoutes);  
// app.use("/api/employee-assets", employeeAssetRoutes);    
// app.use("/api/employee/managers", employeeManagerRoutes);
// app.use("/api/employee/announcements", employeeAnnouncementsRoutes);
// app.use("/api/employee/trainings", employeeTrainingRoutes);
// app.use("/api/employee/designation", employeeDesignationRoutes);
// app.use("/api/employee/meetings", employeeMeetingRoutes);



// // Default Route
// app.get("/", (req, res) => {
//   res.send("🚀 HRMS Backend Running Successfully!");
// });

// // 404 Route Handler
// app.use((req, res) => {
//   res.status(404).json({ message: "Route not found" });
// });

// // Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

// export default app;














// server.js
import express from "express";
import dotenv from "dotenv";
import crypto from "crypto";
import cors from "cors";

dotenv.config();
const app = express();

// ================================
// Middleware
// ================================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Allowed Origins
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000",
  "https://clg-major-project.vercel.app",
];

// Log incoming request origin if present (helpful for debugging CORS issues)
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin) console.log("Incoming request origin:", origin);
  next();
});

// Request logging
app.use((req, res, next) => {
  console.log(new Date().toISOString(), req.method, req.originalUrl);
  next();
});

// CORS middleware (explicit list + credentials)
app.use(
  cors({
    origin: function (origin, callback) {
      // allow non-browser requests (like server-to-server or Postman) with no origin
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ================================
// Import Routes
// ================================

// Auth & User
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

// HR MODULE
import departmentRoutes from "./routes/HR/departmentRoutes.js";
import designationRoutes from "./routes/HR/designationRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import shiftRoutes from "./routes/HR/shiftRoutes.js";
import leaveRoutes from "./routes/HR/leaveRoutes.js";
import recruitmentRoutes from "./routes/HR/recruitmentRoutes.js";
import payrollRoutes from "./routes/HR/payrollRoutes.js";
import resignationRoutes from "./routes/HR/resignationRoutes.js";
import employeeHRRoutes from "./routes/HR/employeeRoutes.js";

// MANAGER MODULE
import teamRoutes from "./routes/MANAGER/teamRoutes.js";
import performanceRoutes from "./routes/MANAGER/performanceRoutes.js";
import goalsTasksRoutes from "./routes/MANAGER/goalsTasksRoutes.js";
import assetsRoutes from "./routes/MANAGER/assets.js";
import announcementsRoutes from "./routes/MANAGER/announcementsRoutes.js";
import feedbackGrievanceRoutes from "./routes/MANAGER/feedbackGrievanceRoutes.js";
import meetingsRoutes from "./routes/MANAGER/meetingsRoutes.js";
import trainingRoutes from "./routes/MANAGER/trainingRoutes.js";
import skillsRoutes from "./routes/MANAGER/skillsRoutes.js";
import managerSubmissionRoutes from "./routes/MANAGER/taskSubmissionsRoutes.js";
import assetRequestRoutes from "./routes/MANAGER/assetRequestRoutes.js";

// EMPLOYEE MODULE
import employeeRoutes from "./routes/Employee/employeeRoutes.js";
import taskRoutes from "./routes/Employee/taskRoutes.js";
import employeeAssetRoutes from "./routes/Employee/assetRoutes.js";
import employeeManagerRoutes from "./routes/Employee/managerRoutes.js"; // for manager list in asset
import employeeAnnouncementsRoutes from "./routes/Employee/employeeAnnouncementsRoutes.js";
import employeeTrainingRoutes from "./routes/Employee/trainingRoutes.js";
import employeeDesignationRoutes from "./routes/Employee/designationRoutes.js";
import employeeMeetingRoutes from "./routes/Employee/meetingRoutes.js";

// ================================
// PayU Helpers & Endpoints
// ================================

function generateHash({ key, txnid, amount, productinfo, firstname, email, salt }) {
  // Format: key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5|salt
  // (udf fields intentionally left empty here)
  const hashString = `${key}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|||||||||||${salt}`;
  return crypto.createHash("sha512").update(hashString).digest("hex");
}

// Payment initiation - returns data frontend needs to post to PayU
app.post("/api/payment", (req, res) => {
  try {
    const { amount, productinfo, firstname, email, phone } = req.body;
    if (!amount || !productinfo || !firstname || !email || !phone) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const key = process.env.PAYU_KEY;
    const salt = process.env.PAYU_SALT;
    const baseUrl = process.env.PAYU_BASE_URL || "https://sandboxsecure.payu.in/_payment";

    if (!key || !salt) {
      return res.status(500).json({ error: "PAYU_KEY or PAYU_SALT not configured in environment" });
    }

    const txnid = "txn" + Date.now();
    const hash = generateHash({ key, txnid, amount, productinfo, firstname, email, salt });

    // Frontend SPA URL (change to your production SPA if different)
    const FRONTEND_URL = process.env.NODE_ENV === "production"
      ? "https://clg-major-project.vercel.app"
      : "http://localhost:5173";

    const response = {
      action: baseUrl,
      params: {
        key,
        txnid,
        amount,
        productinfo,
        firstname,
        email,
        phone,
        surl: `${FRONTEND_URL}/success`,
        furl: `${FRONTEND_URL}/payment-failed`,
        hash,
      },
    };

    return res.json(response);
  } catch (error) {
    console.error("Payment API error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// PayU callback (server-side) for audit / verification
app.post("/api/payu-callback", (req, res) => {
  try {
    const body = req.body;
    const {
      status,
      firstname, email, txnid, amount, productinfo, key, hash: response_hash, additionalCharges
    } = body;

    const udf1 = body.udf1 || "";
    const udf2 = body.udf2 || "";
    const udf3 = body.udf3 || "";
    const udf4 = body.udf4 || "";
    const udf5 = body.udf5 || "";

    const salt = process.env.PAYU_SALT;
    if (!salt) {
      console.error("PAYU_SALT missing in env");
      return res.status(500).send("Server misconfigured");
    }

    // Construct hash for verification as per PayU docs
    let hashSequence;
    if (additionalCharges) {
      // When additionalCharges are present, it comes first in the sequence
      hashSequence = `${additionalCharges}|${salt}|${status}|${udf5}|${udf4}|${udf3}|${udf2}|${udf1}|${email}|${firstname}|${productinfo}|${amount}|${txnid}|${key}`;
    } else {
      hashSequence = `${salt}|${status}|${udf5}|${udf4}|${udf3}|${udf2}|${udf1}|${email}|${firstname}|${productinfo}|${amount}|${txnid}|${key}`;
    }

    const calculatedHash = crypto.createHash("sha512").update(hashSequence).digest("hex");

    // Frontend SPA payment result routes
    const successUrl = process.env.NODE_ENV === "production"
      ? "https://clg-major-project.vercel.app/success"
      : "http://localhost:5173/success";
    const failureUrl = process.env.NODE_ENV === "production"
      ? "https://clg-major-project.vercel.app/payment-failed"
      : "http://localhost:5173/payment-failed";

    if (!response_hash || calculatedHash !== String(response_hash)) {
      console.warn("PayU hash mismatch", { calculatedHash, response_hash });
      // If you want to keep a record of the callback for audit, do it here (DB log)
      return res.redirect(failureUrl);
    }

    if (status && String(status).toLowerCase().includes("success")) {
      // Optionally record the successful payment in DB here
      return res.redirect(successUrl);
    } else {
      return res.redirect(failureUrl);
    }
  } catch (err) {
    console.error("PayU callback error", err);
    return res.status(500).send("Server error");
  }
});

// ================================
// Route Mapping
// ================================

// Auth
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// HR
app.use("/api/departments", departmentRoutes);
app.use("/api/designations", designationRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/shifts", shiftRoutes);
app.use("/api/leaves", leaveRoutes);
app.use("/api/recruitment", recruitmentRoutes);
app.use("/api/hr/payroll", payrollRoutes);
app.use("/api/hr/employees", employeeHRRoutes);
app.use("/api/resignations", resignationRoutes);

// MANAGER
app.use("/api/performance", performanceRoutes);
app.use("/api/assets", assetsRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/announcements", announcementsRoutes);
app.use("/api/feedback-grievance", feedbackGrievanceRoutes);
app.use("/api/meetings", meetingsRoutes);
app.use("/api/goals-tasks", goalsTasksRoutes);
app.use("/api/trainings", trainingRoutes);
app.use("/api/skills", skillsRoutes);
app.use("/api/manager/submissions", managerSubmissionRoutes);
app.use("/api/manager/asset-requests", assetRequestRoutes);

// EMPLOYEE
app.use("/api/employee", employeeRoutes); // profile, attendance, leaves, payroll etc
app.use("/api/employee/tasks", taskRoutes);
app.use("/api/employee-assets", employeeAssetRoutes);
app.use("/api/employee/managers", employeeManagerRoutes);
app.use("/api/employee/announcements", employeeAnnouncementsRoutes);
app.use("/api/employee/trainings", employeeTrainingRoutes);
app.use("/api/employee/designation", employeeDesignationRoutes);
app.use("/api/employee/meetings", employeeMeetingRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("🚀 HRMS Backend Running Successfully!");
});

// 404 Route Handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

export default app;
