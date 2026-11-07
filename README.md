# University-ERP (ACU ERP) — Enterprise Modular Architecture

A state-of-the-art, modular, role-based University Management & Institutional Intelligence Platform for **Adichunchanagiri University (ACU)** and affiliated colleges. Built with React 18, TypeScript, Tailwind CSS, Node.js / Express, and MongoDB Atlas.

---

## 🏛️ Project Directory Structure

```
University-ERP/
│
├── backend/
│   │
│   ├── University/
│   │   ├── Chancellor/
│   │   │   ├── controllers/
│   │   │   ├── models/
│   │   │   ├── routes/
│   │   │   ├── services/
│   │   │   └── validations/
│   │   │
│   │   ├── ViceChancellor/
│   │   ├── Registrar/
│   │   ├── Finance/
│   │   ├── HR/
│   │   ├── LeaveAdmin/
│   │   ├── Examination/
│   │   ├── Academic/
│   │   ├── Admission/
│   │   ├── Research/
│   │   ├── StudentAffairs/
│   │   └── UniversityAdmin/
│   │
│   ├── College/
│   │   ├── Principal/
│   │   ├── VicePrincipal/
│   │   ├── HOD/
│   │   ├── Faculty/
│   │   ├── CollegeHR/
│   │   ├── LeaveAdmin/
│   │   ├── Accounts/
│   │   ├── Admission/
│   │   ├── Examination/
│   │   ├── Library/
│   │   ├── StudentSection/
│   │   └── CollegeAdmin/
│   │
│   ├── Shared/
│   │   ├── middleware/
│   │   ├── database/
│   │   ├── authentication/
│   │   ├── authorization/
│   │   ├── notifications/
│   │   ├── uploads/
│   │   ├── utils/
│   │   └── config/
│   │
│   ├── routes/
│   │   └── index.js
│   │
│   ├── app.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   │
│   ├── src/
│   │   │
│   │   ├── University/
│   │   │   ├── Chancellor/
│   │   │   │   ├── components/
│   │   │   │   ├── pages/
│   │   │   │   ├── layouts/
│   │   │   │   ├── services/
│   │   │   │   └── routes/
│   │   │   │
│   │   │   ├── ViceChancellor/
│   │   │   ├── Registrar/
│   │   │   ├── Finance/
│   │   │   ├── HR/
│   │   │   ├── LeaveAdmin/
│   │   │   ├── Examination/
│   │   │   ├── Academic/
│   │   │   ├── Admission/
│   │   │   ├── Research/
│   │   │   ├── StudentAffairs/
│   │   │   └── UniversityAdmin/
│   │   │
│   │   ├── College/
│   │   │   ├── Principal/
│   │   │   ├── VicePrincipal/
│   │   │   ├── HOD/
│   │   │   ├── Faculty/
│   │   │   ├── CollegeHR/
│   │   │   ├── LeaveAdmin/
│   │   │   ├── Accounts/
│   │   │   ├── Admission/
│   │   │   ├── Examination/
│   │   │   ├── Library/
│   │   │   ├── StudentSection/
│   │   │   └── CollegeAdmin/
│   │   │
│   │   ├── Shared/
│   │   │   ├── components/
│   │   │   ├── layouts/
│   │   │   ├── hooks/
│   │   │   ├── context/
│   │   │   ├── services/
│   │   │   ├── utils/
│   │   │   └── assets/
│   │   │
│   │   ├── authentication/
│   │   ├── config/
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   ├── public/
│   ├── package.json
│   └── .env
│
└── README.md
```

---

## 👥 Role Modules Breakdown

### University Directorate Modules
1. **Chancellor**: Statutory decrees, apex governance, executive decrees, and university exam audits.
2. **Vice Chancellor**: Academic oversight, examination workflows, university KPIs, and quality benchmarking.
3. **Registrar**: Examination valuation centres, official gazette notifications, and degree endorsements.
4. **Finance**: Consolidated university treasury, government grants, UGC allocations, and audits.
5. **HR**: Centralized university faculty roster, recruitment requisitions, payroll registers, and biometric sync.
6. **LeaveAdmin**: Centralized statutory leave approvals for university officers and faculty.
7. **Examination**: Controller of Examinations Directorate, QP generation, room allocations, and schedules.
8. **Academic**: Academic calendar, NMC CBME assessments, curriculum logs, and course registries.
9. **Admission**: University-wide counseling, seat matrix allocation, and quota management.
10. **Research**: Funded grants, doctoral thesis approvals, research journals, and patent records.
11. **StudentAffairs**: Student welfare, anti-ragging cell, and grievance redressal board.
12. **UniversityAdmin**: System metrics, module access, institutional telemetry, and security policies.

### College Institutional Modules
1. **Principal**: Apex college leadership, executive authorizations, and institutional oversight.
2. **Vice Principal**: Academic coordination, lecture schedules, and timetable management.
3. **HOD**: Department curriculum delivery, QP scrutiny, and internal assessment marks.
4. **Faculty**: Attendance marking, lesson planning, student marks logs, and clinical logs.
5. **CollegeHR**: College staff biometric records, duty rosters, and localized salary slips.
6. **LeaveAdmin**: College faculty and non-teaching staff casual and medical leave workflow.
7. **Accounts (College Finance)**: Live college ledger, fee collection, receipt generation, and expense tracking.
8. **Admission**: College document verification, seat confirmations, and applicant verification.
9. **Examination**: Internal assessment seating charts, invigilation rosters, and hall supervision.
10. **Library**: Central cataloging, book issuance, digital OPAC, and return logs.
11. **StudentSection**: Student enrollment dossiers, transfer certificates, and bonafide records.
12. **CollegeAdmin**: Master college configuration, branch creation, and lab allocations.

---

## ⚡ Getting Started

### 1. Prerequisites
- **Node.js**: v18+ or v20+
- **MongoDB Atlas**: Cluster running with accessible connection string

### 2. Backend Setup
```bash
cd backend
npm install
npm start
```
The backend server runs on `http://localhost:5000` with modular routing mounted under `/api`.

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The frontend Vite server runs on `http://localhost:5173`.

### 4. Build Verification
```bash
cd frontend
npm run build
```
Compiled with TypeScript and Vite into optimized production assets.
