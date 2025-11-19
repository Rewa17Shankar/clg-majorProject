// controllers/recruitmentController.js
import Job from "../../models/HR/jobModel.js";
import Applicant from "../../models/HR/applicantModel.js";

// Job Postings
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.getAll();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createJob = async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Applicants
export const getApplicants = async (req, res) => {
  try {
    const { job_id } = req.params;
    const applicants = await Applicant.getByJob(job_id);
    res.json(applicants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const applyJob = async (req, res) => {
  try {
    const applicant = await Applicant.apply(req.body);
    res.status(201).json(applicant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateApplicantStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updated = await Applicant.updateStatus(id, status);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

