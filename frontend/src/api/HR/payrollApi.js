// // const BASE_URL = "http://localhost:5000/api/payroll";
// // // const BASE_URL = "https://clg-majorprojrct.onrender.com/api/payroll";
// // export const fetchPayrollAPI = async () => {
// //   // Just fetch without token
// //   const res = await fetch(`${BASE_URL}/hr`, {
// //     headers: {
// //       "Content-Type": "application/json",
// //     },
// //   });

// //   if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
// //   return await res.json();
// // };


// //update
// const BASE_URL = "http://localhost:5000/api";
// // const BASE_URL = "https://clg-majorprojrct.onrender.com/api";

// // Get token from localStorage
// const getToken = () => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   return user?.token;
// };

// // Get all payroll (HR view)
// export const fetchPayrollAPI = async () => {
//   const token = getToken();
  
//   if (!token) {
//     throw new Error("No authentication token found");
//   }

//   const res = await fetch(`${BASE_URL}/hr/payroll`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": `Bearer ${token}`, // ✅ Add token
//     },
//   });

//   if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
//   return await res.json();
// };

// // Create payroll
// export const createPayrollAPI = async (data) => {
//   const token = getToken();
  
//   if (!token) {
//     throw new Error("No authentication token found");
//   }

//   const res = await fetch(`${BASE_URL}/hr/payroll`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": `Bearer ${token}`, // ✅ Add token
//     },
//     body: JSON.stringify(data),
//   });

//   if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
//   return await res.json();
// };

// // Get all employees (for dropdown)
// export const getEmployeesAPI = async () => {
//   const token = getToken();
  
//   if (!token) {
//     throw new Error("No authentication token found");
//   }

//   const res = await fetch(`${BASE_URL}/hr/employees`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": `Bearer ${token}`, // ✅ Add token
//     },
//   });

//   if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
//   return await res.json();
// };


const BASE_URL = "http://localhost:5000/api";

const getToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.token;
};

export const fetchPayrollAPI = async () => {
  const token = getToken();
  
  if (!token) throw new Error("No authentication token found");

const res = await fetch(`${BASE_URL}/hr/payroll`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return await res.json();
};

export const createPayrollAPI = async (data) => {
  const token = getToken();
  
  if (!token) throw new Error("No authentication token found");

  const res = await fetch(`${BASE_URL}/hr/payroll`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return await res.json();
};

// ✅ THIS FIX - Employee API endpoint
export const getEmployeesAPI = async () => {
  const token = getToken();
  
  if (!token) throw new Error("No authentication token found");

  console.log('📋 Fetching employees...');
  
  const res = await fetch(`${BASE_URL}/hr/employees`, {  // ✅ /api/hr/employees
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    console.error('❌ Employees fetch failed:', res.status);
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  
  const data = await res.json();
  console.log('✅ Employees fetched:', data?.length || 0);
  
  return data || [];
};
