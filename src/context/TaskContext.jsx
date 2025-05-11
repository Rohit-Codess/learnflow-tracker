import React, { createContext, useState, useEffect } from "react";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title, duration) => {
    const newTask = {
      id: crypto.randomUUID(),
      title,
      duration: duration * 60,
      spent: 0,
      lastStarted: null,
      active: false,
    };
    setTasks(prev => [...prev, newTask]);
  };

  const startTask = (id) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, lastStarted: Date.now(), active: true } : task
      )
    );
  };

  const stopTask = (id) => {
    setTasks(prev =>
      prev.map(task => {
        if (task.id === id && task.active) {
          const now = Date.now();
          const spent = Math.floor((now - task.lastStarted) / 1000);
          return {
            ...task,
            spent: task.spent + spent,
            lastStarted: null,
            active: false,
          };
        }
        return task;
      })
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, startTask, stopTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};
