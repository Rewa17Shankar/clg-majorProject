# 🚀 OnBoard-X

> A comprehensive SaaS-based Human Resource Management System (HRMS) designed to streamline HR operations, enhance employee management, and boost organizational efficiency.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-v18+-blue.svg)](https://reactjs.org/)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Demo Credentials](#demo-credentials)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

OnBoard-X is a modern, full-stack HRMS solution that empowers organizations to manage their human resources efficiently. Built with scalability and user experience in mind, it provides role-based access control for HR, Managers, Employees, and Super Admins.

### Key Highlights

- 🏢 **Multi-tenant Architecture** - Supports multiple organizations
- 👥 **Role-Based Access Control** - HR, Manager, Employee, and Super Admin roles
- 📊 **Real-time Analytics** - Comprehensive dashboards and reporting
- 🔒 **Secure Authentication** - JWT-based authentication with role management
- 📱 **Responsive Design** - Works seamlessly across all devices

## ✨ Features

### For HR Department
- **Employee Management** - Complete employee lifecycle management
- **Recruitment** - Job postings, applicant tracking, and hiring workflows
- **Attendance & Shifts** - Track attendance and manage shift schedules
- **Leave Management** - Leave requests, approvals, and balance tracking
- **Payroll Processing** - Automated payroll calculations and salary disbursement
- **Department & Designation Management** - Organizational structure setup
- **Resignation Processing** - Exit management and clearance workflows

### For Managers
- **Team Management** - Manage team members and assignments
- **Performance Reviews** - Track and evaluate employee performance
- **Goals & Tasks** - Set objectives and monitor task completion
- **Meetings** - Schedule and manage team meetings
- **Assets Management** - Track and allocate company assets
- **Announcements** - Communicate updates to team members
- **Skills Management** - Track team skills and competencies
- **Training & Development** - Organize training programs
- **Feedback & Grievances** - Handle employee feedback and concerns

### For Employees
- **Personal Dashboard** - View personalized information and updates
- **Attendance Tracking** - Check-in/check-out and view attendance history
- **Leave Applications** - Apply for leaves and track status
- **View Payslips** - Access salary information and deductions
- **Asset Requests** - Request and manage allocated assets
- **Training Enrollment** - Participate in training programs

### For Super Admin
- **System Configuration** - Manage global settings and configurations
- **Organization Management** - Oversee multiple organizations
- **User Administration** - Manage system-wide user accounts
- **Analytics & Reports** - System-wide analytics and insights

## 🛠 Tech Stack

### Frontend
- **React.js** - UI library for building interactive interfaces
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Context API** - State management
- **CSS3** - Styling and animations

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Supabase** - Backend-as-a-Service (Database, Authentication, Storage)
- **JWT** - JSON Web Tokens for authentication

### Database
- **PostgreSQL** (via Supabase) - Relational database

## 📁 Project Structure

```
CLS_MAJORPROJECT/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── api/             # API integration layer
│   │   │   ├── HR/          # HR-specific API calls
│   │   │   ├── MANAGER/     # Manager-specific API calls
│   │   │   └── Employee/    # Employee-specific API calls
│   │   ├── context/         # React Context for state management
│   │   ├── hooks/           # Custom React hooks
│   │   └── pages/           # Page components
│   │       ├── Auth/        # Authentication pages
│   │       ├── HR/          # HR module pages
│   │       ├── Manager/     # Manager module pages
│   │       ├── Employee/    # Employee module pages
│   │       └── SuperAdmin/  # Super Admin pages
│   └── public/              # Static assets
│
└── backend/                 # Express backend application
    ├── config/              # Configuration files
    ├── controllers/         # Request handlers
    │   ├── HR/             # HR business logic
    │   └── MANAGER/        # Manager business logic
    ├── middleware/          # Custom middleware
    ├── models/             # Database models
    │   ├── HR/            # HR data models
    │   └── MANAGER/       # Manager data models
    ├── routes/            # API routes
    │   ├── HR/           # HR endpoints
    │   └── MANAGER/      # Manager endpoints
    └── server.js         # Application entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase account
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/onboard-x.git
   cd onboard-x
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

   Start the backend server:
   ```bash
   npm start
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   ```

   Create a `.env` file in the frontend directory:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

   Start the frontend development server:
   ```bash
   npm start
   ```

4. **Access the application**
   
   Open your browser and navigate to `http://localhost:3000`

## 🔑 Demo Credentials

### HR Role
- **Username:** sourabh
- **Password:** welcome@123

### Manager Role
- **Username:** shreySharma
- **Password:** welcome@123

### Employee Role
- **Username:** Rishika Porwal
- **Password:** welcome@123

> **Note:** These are demo credentials for testing purposes. Please change them in production.

## 📚 API Documentation

The API follows RESTful conventions with the following base structure:

```
Base URL: http://localhost:5000/api
```

### Authentication Endpoints
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/reset-password` - Password reset

### HR Endpoints
- `GET /api/hr/employees` - Get all employees
- `POST /api/hr/employees` - Create new employee
- `PUT /api/hr/employees/:id` - Update employee
- `DELETE /api/hr/employees/:id` - Delete employee
- `GET /api/hr/departments` - Get all departments
- `GET /api/hr/leaves` - Get leave requests
- `GET /api/hr/payroll` - Get payroll records

### Manager Endpoints
- `GET /api/manager/teams` - Get team members
- `GET /api/manager/performance` - Get performance reviews
- `POST /api/manager/goals` - Create goals
- `GET /api/manager/meetings` - Get meetings
- `POST /api/manager/announcements` - Create announcements

### Employee Endpoints
- `GET /api/employee/attendance` - Get attendance records
- `POST /api/employee/leave-request` - Apply for leave
- `GET /api/employee/payslips` - Get payslips

For detailed API documentation, please refer to the [API Docs](./docs/API.md) (coming soon).

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please make sure to update tests as appropriate and adhere to the existing coding style.


## 👨‍💻 Authors

- **Rewa Shankar Gupta** 

## 🙏 Acknowledgments

- Thanks to all contributors who have helped shape OnBoard-X
- Inspiration from modern HRMS solutions
- Built with ❤️ using open-source technologies

## 📧 Contact

For questions or support, please reach out to:
- **Email:** shankarewajii@gmail.com
- **Project Link:** https://clg-major-project.vercel.app

---

⭐ If you find this project useful, please consider giving it a star on GitHub!

**Made with ❤️ for better HR Management**
