import { useState } from "react";

function Header() {
  return <header className="bg-green-800 px-4 py-6 text-center text-white shadow-md">
  </header>;
}

function TaskForm({ taskInput, setTaskInput, addTask }) {
  const submit = (event) => { event.preventDefault(); addTask(); };
  return <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
    <input value={taskInput} onChange={(event) => setTaskInput(event.target.value)} placeholder="Enter a new task..." className="flex-1 rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-200" />
    <button type="submit" className="rounded-lg bg-green-700 px-6 py-3 font-semibold text-white hover:bg-green-800">Add Task</button>
  </form>;
}

function TaskItem({ task, toggleTask, deleteTask }) {
  return <li className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
    <div className="flex items-center gap-3"><span className={`h-3 w-3 rounded-full ${task.completed ? "bg-green-500" : "bg-yellow-400"}`}></span>
      <div><p className={`break-words font-medium ${task.completed ? "text-gray-400 line-through" : "text-gray-800"}`}>{task.text}</p>
        <span className={`text-sm font-semibold ${task.completed ? "text-green-600" : "text-yellow-600"}`}>{task.completed ? "Done" : "Not Done"}</span>
      </div>
    </div>
    <div className="flex gap-2"><button onClick={() => toggleTask(task.id)} className={`rounded-md px-3 py-2 text-sm font-medium text-white ${task.completed ? "bg-yellow-500 hover:bg-yellow-600" : "bg-green-600 hover:bg-green-700"}`}>{task.completed ? "Mark Not Done" : "Mark Done"}</button>
      <button onClick={() => deleteTask(task.id)} className="rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700">Delete</button>
    </div>
  </li>;
}

function Instructions() {
  return <section className="rounded-xl bg-white p-6 shadow-md"><h2 className="mb-4 text-2xl font-bold text-green-800">Instructions / User Guide</h2>
    <ol className="list-decimal space-y-3 pl-5 text-gray-700"><li>Type a task, then click <b>Add Task</b>.</li><li>Click <b>Mark Done</b> to complete a task.</li><li>Click <b>Mark Not Done</b> to return the task to its original status.</li><li>Click <b>Delete</b> to remove a task.</li><li>Click <b>Clear All</b> to reset the list.</li></ol>
  </section>;
}

export default function App() {
  const [taskInput, setTaskInput] = useState("");
  const [tasks, setTasks] = useState([{ id: 1, text: "Study React components", completed: false }, { id: 2, text: "Practice Tailwind CSS", completed: true }]);
  const addTask = () => { const text = taskInput.trim(); if (!text) return; setTasks((old) => [...old, { id: Date.now(), text, completed: false }]); setTaskInput(""); };
  const toggleTask = (id) => setTasks((old) => old.map((task) => task.id === id ? { ...task, completed: !task.completed } : task));
  const deleteTask = (id) => setTasks((old) => old.filter((task) => task.id !== id));
  const completed = tasks.filter((task) => task.completed).length;

  return <div className="min-h-screen"><Header /><main className="mx-auto max-w-5xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
    <section className="rounded-xl bg-white p-6 shadow-md sm:p-8"><h2 className="text-2xl font-bold text-green-800 sm:text-3xl">To-Do List Interface</h2><p className="mt-2 text-gray-600">A simple task manager created by a student using React and Tailwind CSS.</p>
      <div className="mt-6"><TaskForm taskInput={taskInput} setTaskInput={setTaskInput} addTask={addTask} /></div>
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3"><div className="rounded-lg bg-blue-50 p-4 text-center"><p className="text-2xl font-bold text-blue-700">{tasks.length}</p><p className="text-sm text-gray-600">Total Tasks</p></div><div className="rounded-lg bg-green-50 p-4 text-center"><p className="text-2xl font-bold text-green-700">{completed}</p><p className="text-sm text-gray-600">Done</p></div><div className="rounded-lg bg-yellow-50 p-4 text-center"><p className="text-2xl font-bold text-yellow-700">{tasks.length - completed}</p><p className="text-sm text-gray-600">Not Done</p></div></div>
      <div className="mt-6 flex items-center justify-between"><h3 className="text-xl font-bold text-gray-800">Task List</h3><button onClick={() => setTasks([])} className="rounded-md bg-gray-700 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800">Clear All</button></div>
      <ul className="mt-4 space-y-3">{tasks.length === 0 ? <li className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-gray-500">No tasks available. Add a new task above.</li> : tasks.map((task) => <TaskItem key={task.id} task={task} toggleTask={toggleTask} deleteTask={deleteTask} />)}</ul>
    </section>
    <Instructions />
    
  </main></div>;
}