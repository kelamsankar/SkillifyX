# SkillifyX 🚀

SkillifyX is a web-based platform designed to help students and aspiring professionals analyze their skills, explore career opportunities, and understand startup trends through data-driven insights and interactive dashboards.

## 🎯 Features

- 🔐 User Registration and Login
- 📊 Skill Gap Analysis
- 💼 Career and Job Insights
- 📈 Company Analysis
- 🎓 Student Analysis
- 💡 Smart Skill Recommendations
- 🚀 Startup Ecosystem Insights
- 📍 Startup Hubs and Location Insights
- 📊 Interactive Power BI Dashboards
- 📱 Responsive User Interface

## 🧩 Main Modules

### SkillSync

SkillSync helps users understand the gap between their existing skills and industry requirements.

It provides:
- In-demand skill analysis
- Skill gap identification
- Career insights
- Company analysis
- Job-related trends
- Skill recommendations

### Startify

Startify focuses on startup and entrepreneurial insights.

It provides:
- Startup industry trends
- Funding insights
- Startup ecosystem analysis
- Location-based startup insights
- High-potential industry information

## 🛠️ Technologies Used

### Frontend
- React.js
- TypeScript
- Tailwind CSS
- JavaScript
- React Router DOM
- Framer Motion
- Lucide React
- Vite

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- MySQL

### Data Analysis
- Python
- Pandas
- Power Query

### Data Visualization
- Microsoft Power BI

## 📂 Project Structure

```text
SkillifyX/
│
├── client/
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       └── pages/
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   └── routes/
│
├── .gitignore
└── README.md
```

## ⚙️ Installation and Setup
1. Clone the Repository
```text
git clone YOUR_GITHUB_REPOSITORY_URL
cd SkillifyX
```
3. Frontend Setup
```text
cd client
npm install
npm run dev
```
4. Backend Setup
```text
Open another terminal:
cd server
npm install
```

Create a .env file inside the server folder and add your required environment variables.
Then start the backend:
npm start

## 🔒 Environment Variables
Do not upload your .env file to GitHub.
Example:
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
PORT=5000

## 📊 Dashboards
SkillifyX uses Power BI dashboards to visualize job, skill, company, student, and startup-related data.
The platform integrates these dashboards into the web interface for interactive data exploration.

## 🔮 Future Enhancements
- AI-powered personalized skill recommendations
- Resume analyzer
- Real-time job data integration
- Job recommendation system
- Predictive startup analytics
- Mobile application
- User progress tracking
- Integration with online learning platforms
- Cloud deployment
