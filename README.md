
# 🧠 AI Resume Analyzer (Full Stack Project)

A full-stack AI-powered resume analyzer that compares resumes with job descriptions and generates a skill match score.

---

## 🚀 Live Links

- Frontend: [Open Frontend](https://ai-resume-analyzer-qqjg.vercel.app)
- Backend: [Open Backend](https://ai-resume-analyzer-backend-production-7c55.up.railway.app/)

---

## 📌 Features

- Upload resume (PDF)
- Extract text from resume
- Compare with job description
- Generate ATS-style score
- Show matched & missing skills

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- Axios
- Tailwind CSS

### Backend
- Node.js
- Express.js
- Multer
- pdf-parse
- CORS

---

## ⚙️ How It Works

1. User uploads resume from frontend  
2. Frontend sends data to backend API  
3. Backend extracts text from PDF  
4. Skills are matched with job description  
5. Score is calculated  
6. Result sent back to UI  

---

## 📡 API Endpoint

POST /analyze

---

## 📁 Project Structure

```text id="struct1"
client/   → Frontend
server/   → Backend
