import * as Employee from "../../models/HR/employeesModel.js";

export async function getEmployees(req, res) {
  const { data, error } = await Employee.getAllEmployees();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
}

export async function getEmployee(req, res) {
  const { id } = req.params;
  const { data, error } = await Employee.getEmployeeById(id);
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
}

export async function createEmployee(req, res) {
  const { username, email, password, role_id, department_id, designation_id, date_of_joining } = req.body;

  if (!username || !email) {
    return res.status(400).json({ error: "username and email are required" });
  }

  const { data, error } = await Employee.addEmployee({
    username,
    email,
    password,
    role_id,
    department_id,
    designation_id,
    date_of_joining,
  });

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
}


export async function updateEmployee(req, res) {
  const { id } = req.params;
  const { data, error } = await Employee.updateEmployee(id, req.body);
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
}

export async function deleteEmployee(req, res) {
  const { id } = req.params;
  const { error } = await Employee.deleteEmployee(id);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ success: true });
}
