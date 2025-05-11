# 📘 LearnFlow Tracker
A beautifully designed productivity tracker built with React and Bootstrap, allowing users to create tasks, track time spent, visualize progress, and receive browser notifications to stay focused.

## 🚀 Features
```
⏱️ Task Timer — Track time spent on each task in real-time
🎯 Progress Visualization — Live circular and bar progress indicators
🔔 Web Notifications — Sends reminder alerts to complete tasks (opt-in)
📱 Fully Responsive — Optimized for desktop, tablet, and mobile
💾 LocalStorage Support — All tasks persist across sessions
🌈 Modern UI/UX — Glassmorphism + gradient backgrounds for a clean look
🗑️ Delete Functionality — Remove tasks with confirmation modals
✅ Completion Popup — SweetAlert2 notification on task completion
```

## 🛠️ Technologies Used
```
- React.js – UI rendering and component logic
- React Router – Page routing (Dashboard, TaskPage)
- Bootstrap 5 – UI layout, responsiveness, and utility classes
- SweetAlert2 – Stylish modal and alert system
- Web Notification API – Local reminder notifications
- LocalStorage – Persistent task saving
```

## Folder Structure
```
src/
├── components/
│   └── CompletionAlert.jsx
│   └── ConfirmDeleteModal.jsx
├── context/
│   └── TaskContext.jsx
├── pages/
│   └── Dashboard.jsx
│   └── TaskPage.jsx
|── utils/notification.js
├── App.jsx
├── index.js
```

## 🙌 Future Enhancements
```
⏳ Pomodoro timer option
📊 Daily/weekly analytics dashboard
🔗 Firebase or Supabase integration
🧠 AI-generated task tips & scheduling
```

## Installation
```
git clone https://github.com/Rohit-Codess/learnflow-tracker.git
cd learnflow-tracker
npm install
npm start
```