import React, { useState } from "react";
import "./css/App.css";

import { UilTrashAlt } from "@iconscout/react-unicons";

function App() {
  const [taskTitle, setTaskTitle] = useState("");
  const [tasks, setTasks] = useState([]);

  const DateCreated = (DateGiven) => {
    if (DateGiven === new Date().toLocaleDateString()) {
      return "Today";
    } else {
      return DateGiven;
    }
  };

  const createTask = () => {
    if (taskTitle) {
      setTasks([
        ...tasks,
        {
          id: Math.floor(Math.random() * 1000),
          title: taskTitle,
          createdAt: new Date().toLocaleDateString(),
        },
      ]);
      setTaskTitle("");
    }
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <div className="App bg-gray-300 min-h-screen">
      {/* Create tasks */}
      <div
        className="bg-white rounded-lg shadow-lg ml-auto mr-auto justify-between items-center"
        style={{ width: "600px" }}
      >
        <div className="px-6 py-4">
          <h1 className="text-xl font-semibold text-gray-800">Title:</h1>
          <input
            placeholder="What do you wanna do?"
            className="border border-gray-400 rounded-md w-full px-3 py-2 mt-1 mb-4 text-black"
            onChange={(e) => setTaskTitle(e.target.value)}
            value={taskTitle}
          />
        </div>
        <div className="px-6 py-4 self-end">
          <button
            className="btn btn-success text-white w-40 rounded-md"
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
                className={"text-xl font-semibold text-gray-800 w-full truncate"}
              >
                {task.title}
              </h1>
              <h1 className="font-semibold text-gray-800 text-right">
                Created: {DateCreated(task.createdAt)}
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
