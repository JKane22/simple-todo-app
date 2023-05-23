import React, { useState, useEffect } from "react";
import "./css/App.css";

import { UilTrashAlt } from "@iconscout/react-unicons";

function App() {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDueDate, setTaskDueDate] = useState("");
  const [taskSummary, setTaskSummary] = useState("");
  const [tasks, setTasks] = useState([]);

  const createTask = () => {
    // Save the task in the local storage
    if (taskTitle) {
      const newTask = {
        id: Math.floor(Math.random() * 1000),
        title: taskTitle,
        date: taskDueDate,
        summary: taskSummary,
      };

      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      setTaskTitle("");
      setTaskDueDate("");
      setTaskSummary("");
    }
  };

  const RandomTaskTitle = () => {
    const title = ["Take the dog for a walk!", "What are you thinking?", "Call Dad about Food!", "Go to the gym!", "Get a haircut!"];

    return title[Math.floor(Math.random() * title.length)];
  };

  const CheckDate = (date) => {
    const dateObj = new Date(date);

    const currentDate = new Date();

    dateObj.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);

    if (dateObj.getTime() === currentDate.getTime()) {
      return "Today!";
    } else if (dateObj.getTime() === currentDate.getTime() + 24 * 60 * 60 * 1000) {
      return "Tomorrow!";
    } else if (dateObj < currentDate) {
      return "Overdue! (" + dateObj.toDateString() + ")";
    } else if (
      dateObj >= currentDate &&
      dateObj <= new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 6)
    ) {
      return "This Week";
    } else { 
      return dateObj.toDateString();
    };
  };

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  };

  return (
    <div className="App bg-gray-300 min-h-screen">
      {/* Create tasks */}
      <div className="pt-5 bg-gray-300 w-full"></div>
      <div
        className="bg-white rounded-lg shadow-lg ml-auto mr-auto justify-between items-center"
        style={{ width: "600px" }}
      >
        <div className="px-6 py-4">
          {/* Task title */}
          <h1 className="text-xl font-semibold text-gray-800">Title <span className="text-red-600">*</span></h1>
          <input
            placeholder={RandomTaskTitle()}
            className="border border-gray-400 rounded-md w-full px-3 py-2 mt-1 mb-4 text-black"
            onChange={(e) => setTaskTitle(e.target.value)}
            value={taskTitle}
          />

          {/* Task Summary */}
          <h1 className="text-xl font-semibold text-gray-800">Summary</h1>
          <input
            placeholder="Tell me a little bit about that task!"
            className="border border-gray-400 rounded-md w-full px-3 py-2 mt-1 mb-4 text-black"
            onChange={(e) => setTaskSummary(e.target.value)}
            value={taskSummary}
          />

          {/* Due Date */}
          <h1 className="text-xl font-semibold text-gray-800">Due Date <span className="text-red-600">*</span></h1>
          <input
            type="date"
            className="border border-gray-400 rounded-md w-full px-3 py-2 mt-1 mb-4 text-black"
            onChange={(e) => setTaskDueDate(e.target.value)}
            value={taskDueDate}
          />
        </div>
        <div className="px-6 py-4 self-end">
          <button
            className={
              taskTitle == "" || taskDueDate == ""
                ? "btn btn-success btn-block text-white rounded-md btn-disabled opacity-30"
                : "btn btn-success btn-block text-white rounded-md"
            }
            onClick={createTask}
          >
            Create Task
          </button>
        </div>
      </div>

      {/* Show tasks */}
      {tasks.map((task) => (
        <React.Fragment key={task.id}>
          <div
            className={`bg-white rounded-lg shadow-lg justify-between items-center ml-auto mr-auto mt-2`}
            style={{ width: "600px" }}
          >
            <div className="px-6 py-4">
              <button
                className="btn btn-square btn-sm bg-transparent border-0 hover:bg-slate-100 float-right"
                onClick={() => deleteTask(task.id)}
              >
                <UilTrashAlt />
              </button>
              <h1
                className={
                  "text-xl font-black text-gray-800 w-full truncate"
                }
              >
                {task.title}
              </h1>
              {task.summary && (
                <h1 className="font-semibold text-gray-800 pt-2">{task.summary}</h1>
              )}
              <h1 className={CheckDate(task.date).includes("Overdue!") ? "font-bold text-right text-red-500" : "font-semibold text-gray-800 text-right"}>
                Due by: {CheckDate(task.date)}
              </h1>
              <h1 className="text-xs text-gray-800 text-right">
                Id: {task.id}
              </h1>
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}

export default App;
