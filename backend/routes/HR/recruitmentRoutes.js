// routes/recruitmentRoutes.js
import express from "express";
import {getJobs, createJob, getApplicants, applyJob, updateApplicantStatus } from "../../controllers/HR/recruitmentController.js";

const router = express.Router();

// Jobs
router.get("/jobs", getJobs);
router.post("/jobs", createJob);

// Applicants
router.get("/jobs/:job_id/applicants", getApplicants);
router.post("/applicants", applyJob);
router.put("/applicants/:id/status", updateApplicantStatus);

export default router;
