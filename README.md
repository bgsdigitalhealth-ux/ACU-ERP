# ACU ERP — Adichunchanagiri University Enterprise Platform

A comprehensive, role-based University Management & Institutional Intelligence Platform for **Adichunchanagiri University (ACU)**. Built with React 18, TypeScript, Tailwind CSS, Node.js / Express, and MongoDB Atlas.

---

## 🏛️ Architecture & Modules

The platform features tailored portals and governance suites:
- **Chancellor Suite**: Statutory approvals, executive decrees, university examination audit.
- **Vice-Chancellor Dashboard**: Academic oversight, examination workflows, university KPIs.
- **Controller of Examination (CoE)**: Exam schedules, centre allocation, confidential operations.
- **Registrar (Evaluation)**: Valuation centres, result processing, revaluation.
- **Dean / Chief Superintendent**: Centre conduction, invigilation management, hall supervision.
- **Deputy Superintendent**: Hall assignments, duty rosters, exam sessions.
- **Department HOD**: Departmental QP scrutiny, examiner nomination, internal marks.
- **Faculty / Staff Portal**: CBME lesson planning, attendance marking, assessment creation, OBE CO-PO mapping, timetable.
- **Student Portal**: Course registrations, hall tickets, attendance tracking, internal assessment marks, fee management, academic calendar.

---

## 🚀 Deployment Guide

### 1. MongoDB Atlas (Database)
1. In your **MongoDB Atlas** console, create or select your cluster.
2. Under **Security > Network Access**, click **Add IP Address**:
   - Add `0.0.0.0/0` (Allow Access from Anywhere) so Render web services can connect dynamically.
3. Under **Security > Database Access**, verify your user credentials.
4. Copy your MongoDB SRV Connection String:
   ```
   mongodb+srv://<username>:<password>@cluster0.cpxf4ss.mongodb.net/acu_erp?retryWrites=true&w=majority&compressors=zlib
   ```

---

### 2. Backend Deployment on Render
1. Sign in to [Render](https://render.com).
2. Click **New + > Web Service** and connect your GitHub repository:
   `https://github.com/bgsdigitalhealth-ux/ACU-ERP.git`
3. Configure the service:
   - **Name**: `acu-erp-backend`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. In **Environment Variables**, add:
   - `NODE_ENV`: `production`
   - `PORT`: `10000`
   - `MONGODB_URI`: `<Your MongoDB Atlas connection URI>`
5. Click **Deploy Web Service**.
6. Copy your deployed backend URL (e.g. `https://acu-erp-backend.onrender.com`).

---

### 3. Frontend Deployment on Vercel
1. Sign in to [Vercel](https://vercel.com).
2. Click **Add New... > Project** and import the `ACU-ERP` GitHub repository.
3. In **Project Configuration**:
   - **Framework Preset**: `Vite`
   - **Root Directory**: Click *Edit* and select `frontend` (or keep root — `vercel.json` will auto-route to `frontend`).
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. In **Environment Variables**, add:
   - `VITE_API_URL`: Your Render backend URL (e.g. `https://acu-erp-backend.onrender.com`)
5. Click **Deploy**.
6. Vercel will build and deploy your application with single-page application routing configured.

---

## 💻 Local Development

### Prerequisites
- Node.js (v18+)
- npm

### 1. Backend
```bash
cd backend
npm install
npm start
```
Runs at `http://localhost:5000`

### 2. Frontend
```bash
cd frontend
npm install
npm run dev
```
Runs at `http://localhost:5173`

---

## 🛡️ License
Copyright © 2026 Adichunchanagiri University (ACU). All rights reserved.
