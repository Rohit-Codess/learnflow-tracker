import React, { useContext, useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TaskContext } from "../context/TaskContext";
import Swal from 'sweetalert2';
import CompletionAlert from "../components/popups/CompletionAlert";
import ConfirmDeleteModal from "../components/popups/ConfirmDeleteModal";

export default function TaskPage() {
  const { id } = useParams();
  const { tasks, startTask, stopTask, deleteTask } = useContext(TaskContext);
  const task = tasks.find((t) => t.id === id);
  const [localSpent, setLocalSpent] = useState(task?.spent || 0);
  const [isRunning, setIsRunning] = useState(task?.active || false);
  const [alertShown, setAlertShown] = useState(false);
  const navigate = useNavigate();
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!task) return;
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setLocalSpent((prev) => {
          if (prev >= task.duration) {
            clearInterval(intervalRef.current);
            if (!alertShown) {
              stopTask(task.id);
              CompletionAlert(task.title);
              setAlertShown(true);
            }
            return task.duration;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, task, alertShown, stopTask]);

  if (!task) {
    return (
      <div className="container py-5 bg-light-subtle">
        <div className="alert alert-warning text-center fw-semibold">
          Task not found.{' '}
          <span
            className="text-primary"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            Go back to Dashboard
          </span>
        </div>
      </div>
    );
  }

  const remaining = Math.max(task.duration - localSpent, 0);
  const percent = Math.floor((localSpent / task.duration) * 100);

  const toggleStart = () => {
    startTask(task.id);
    setIsRunning(true);
  };

  const toggleStop = () => {
    stopTask(task.id);
    setIsRunning(false);
  };

  const handleDelete = async (id) => {
    const confirmed = await ConfirmDeleteModal();
    if (confirmed) {
      deleteTask(task.id);
      Swal.fire('Deleted!', 'Your task has been deleted.', 'success');
    }
    navigate("/");
  };

  return (
    <div className="container-fluid py-5 px-3" style={{
      backgroundImage: "linear-gradient(120deg, #c2e9fb 0%, #f9f7f7 100%)",
      minHeight: "100vh"
    }}>
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <div className="card shadow-lg border-0 rounded-4 p-4 bg-white">
            <h2 className="fw-bold text-primary mb-4">📘 {task.title}</h2>
            <div className="d-flex flex-column align-items-center">
              <div className="position-relative mb-4" style={{ width: '200px', height: '200px' }}>
                <svg width="200" height="200" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="#e9ecef"
                    strokeWidth="10"
                    fill="none"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="#0d6efd"
                    strokeWidth="10"
                    fill="none"
                    strokeDasharray={2 * Math.PI * 45}
                    strokeDashoffset={(1 - localSpent / task.duration) * 2 * Math.PI * 45}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                  />
                  <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize="14"
                    fontWeight="bold"
                    fill="#333"
                  >
                    {Math.floor(remaining / 60)}m {remaining % 60}s
                  </text>
                </svg>
              </div>

              <div className="progress rounded-pill w-100 mb-3" style={{ height: '10px' }}>
                <div
                  className="progress-bar bg-success"
                  role="progressbar"
                  style={{ width: `${percent}%` }}
                  aria-valuenow={percent}
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>

              <div className="d-grid gap-3 d-md-flex justify-content-center mt-3 w-100">
                <button
                  onClick={toggleStart}
                  className="btn btn-outline-success px-4 fw-semibold"
                  disabled={isRunning || localSpent >= task.duration}
                >
                  ▶️ Start
                </button>
                <button
                  onClick={toggleStop}
                  className="btn btn-outline-danger px-4 fw-semibold"
                  disabled={!isRunning}
                >
                  ⏹️ Stop
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="btn btn-outline-secondary px-4 fw-semibold"
                >
                  🔙 Back
                </button>
                <button
                  onClick={handleDelete}
                  className="btn btn-outline-danger px-4 fw-semibold"
                >
                  🗑️ Delete Task
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
