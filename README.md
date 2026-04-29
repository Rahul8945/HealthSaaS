# 🏥 HealthSaaS Frontend

A B2B healthcare SaaS UI built with **React**, **TypeScript**, **Redux Toolkit**, **Firebase Authentication**, protected routing, analytics, patient management, and service worker notifications.

[![Made with React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-1.9-764ABC?logo=redux)](https://redux-toolkit.js.org/)
[![Firebase](https://img.shields.io/badge/Firebase-Auth-FFCA28?logo=firebase)](https://firebase.google.com/)

---

## ✨ Features

- ✅ React + TypeScript with Vite
- ✅ Redux Toolkit for state management (auth, patients, notifications)
- ✅ Firebase Authentication (Email/Password only – no demo fallback)
- ✅ Protected routes (dashboard, analytics, patient details)
- ✅ Patient grid / list view toggle – stored in Redux
- ✅ Reusable components & scalable folder structure
- ✅ Service worker registration with working local notifications
- ✅ Performance‑conscious (memoized selectors, route‑level code splitting)

---

## 🚀 Run Locally

### Prerequisites

- Node.js (v18 or later)
- A Firebase project (free tier works)

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd HealthSaaS
npm install
npm run dev
```
### create .env file and add 

```bash
VITE_FIREBASE_API_KEY=xxxxxxxxxxxxxxxxxxxx
VITE_FIREBASE_AUTH_DOMAIN=xxxxxxxxxxxxxxxxxxxxx
VITE_FIREBASE_PROJECT_ID=xxxxxxxxxxxxxxxxxx
VITE_FIREBASE_APP_ID=xxxxxxxxxxxxxxxxxxxxxxxxx

```

#### then you can able to login with firebase 
