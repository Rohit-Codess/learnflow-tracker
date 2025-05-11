// Enhanced UI/UX Dashboard.jsx with Bootstrap integration and reminder toggle
import React, { useContext, useState, useEffect } from "react";
import { TaskContext } from "../context/TaskContext";
import { useNavigate } from "react-router-dom";
import { requestNotificationPermission, sendReminderNotification } from "../utils/notification";
import Swal from 'sweetalert2';
import ConfirmDeleteModal from "../components/popups/ConfirmDeleteModal";

export default function Dashboard() {
  const { tasks, addTask, deleteTask } = useContext(TaskContext);
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [reminderEnabled, setReminderEnabled] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !duration) return;
    addTask(title, parseInt(duration));
    if (reminderEnabled) {
      setTimeout(() => {
        sendReminderNotification(title);
      }, 1000 * 60 * 30); // 30-minute delay
    }
    setTitle("");
    setDuration("");
  };

  const handleDelete = async (id) => {
    const confirmed = await ConfirmDeleteModal();
    if (confirmed) {
      deleteTask(id);
      Swal.fire('Deleted!', 'Your task has been deleted.', 'success');
    }
  };

  return (
    <div className="min-vh-100 py-5 px-3" style={{ backgroundImage: "linear-gradient(120deg, #c2e9fb 0%, #f9f7f7 100%)" }}>
      <div className="container">
        <h1 className="display-4 fw-bold text-center text-primary mb-5">
          🚀 LearnFlow Tracker
        </h1>

        <form onSubmit={handleSubmit} className="glassmorph p-4 rounded-4 shadow-lg mb-5 row gy-3 gx-3">
          <div className="col-md-12 col-lg-7">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task Title"
              className="form-control"
            />
          </div>
          <div className="col-md-8 col-lg-3">
            <input
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="Duration (min)"
              type="number"
              className="form-control"
            />
          </div>
          <div className="col-md-4 col-lg-2 d-grid">
            <button className="btn btn-primary px-4 py-2 fw-semibold addBtn">
              ➕ Add Task
            </button>
          </div>
          <div className="col-12 d-flex align-items-center">
            <input
              type="checkbox"
              checked={reminderEnabled}
              onChange={() => setReminderEnabled(!reminderEnabled)}
              className="form-check-input me-2"
              id="reminderToggle"
            />
            <label htmlFor="reminderToggle" className="form-check-label">
              Enable 30-min Reminder Notification
            </label>
          </div>
        </form>

        <div className="row g-4">
          {tasks.map((task) => {
            const remaining = Math.max(task.duration - task.spent, 0);
            const percent = Math.floor((task.spent / task.duration) * 100);
            return (
              <div key={task.id} className="col-12 col-md-6 col-lg-4">
                <div className="card border-0 rounded-4 shadow-sm p-3 glassmorph hover-shadow position-relative">
                  <div onClick={() => navigate(`/task/${task.id}`)} style={{ cursor: "pointer" }}>
                    <div className="d-flex flex-column gap-1">
                      <h5 className="fw-semibold text-dark mb-1">{task.title}</h5>
                      <small className="text-muted">
                        ⏳ {Math.floor(remaining / 60)} min {remaining % 60} sec left
                      </small>
                      <div className="progress rounded-pill mt-2" style={{ height: '8px' }}>
                        <div
                          className="progress-bar bg-primary"
                          style={{ width: `${percent}%` }}
                          role="progressbar"
                          aria-valuenow={percent}
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                  </div>
                  <span className="position-absolute top-0 end-0 badge rounded-pill bg-primary me-3 mt-3">
                    {percent}%
                  </span>
                  <button
                    className="btn btn-sm btn-light btn-outline-danger position-absolute bottom-0 end-0 m-3"
                    onClick={() => handleDelete(task.id)}
                  >
                    🗑️ X
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
