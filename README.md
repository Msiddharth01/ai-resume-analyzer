# AI Resume Analyzer

A full-stack AI-powered web application that analyzes resumes, evaluates job compatibility, and provides intelligent suggestions to improve resume quality. The application helps users understand their strengths, identify skill gaps, and generate an improved version of their resume.

---

## Features

* Upload PDF resume
* Extract and analyze resume content
* AI-powered resume scoring (out of 100)
* ATS (Applicant Tracking System) score simulation
* Skill extraction from resume
* Strengths and weaknesses analysis
* Personalized improvement suggestions
* Job role matching with percentage score
* Skill gap analysis (matched vs missing skills)
* Generate improved resume using AI
* Download improved resume as PDF
* Interactive dashboard UI
* Responsive design

---

## Tech Stack

**Frontend**

* React
* Tailwind CSS
* Axios

**Backend**

* Node.js
* Express.js

**AI Integration**

* OpenAI API

**File Handling**

* Multer
* pdf-parse

---

## Project Structure

ai-resume-analyzer
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   └── App.js
│   └── package.json
│
├── backend
│   ├── routes
│   ├── controllers
│   ├── utils
│   └── server.js
│
├── README.md
└── .gitignore

---

##

---

## Environment Variables

Create a `.env` file in the backend folder and add:

OPENAI_API_KEY=your_api_key_here

---

## Run the Project

Start backend server

cd backend
npm start

Start frontend

cd frontend
npm run dev

---

## Usage

1. Upload your resume in PDF format
2. Enter target job role (optional)
3. View resume score, ATS score, and analysis
4. Explore extracted skills and suggestions
5. Check skill gap analysis
6. Download improved resume

---

## API Endpoints

POST /api/analyze-resume

* Upload resume
* Extract text
* Perform AI analysis
* Return structured response

---

## Future Improvements

* Resume templates and formatting tools
* User authentication and saved history
* Real-time job recommendations
* Multi-language resume support
* Advanced ATS simulation

---

## Author

Siddharth Malik
B.Tech Student – Full Stack Development
Bennett University
