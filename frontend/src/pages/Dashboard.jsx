import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [formData, setFormData] = useState({ title: "", description: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const res = await API.get("/tasks");
            setTasks(res.data);
        } catch (err) {
            setError("Failed to fetch tasks");
        }
    };

    const createTask = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post("/tasks", formData);
            setTasks([...tasks, res.data]);
            setFormData({ title: "", description: "" });
        } catch (err) {
            setError("Failed to create task");
        }
    };

    const toggleComplete = async (task) => {
        try {
            const res = await API.put(`/tasks/${task.id}`, { completed: !task.completed });
            setTasks(tasks.map((t) => (t.id === task.id ? res.data : t)));
        } catch (err) {
            setError("Failed to update task");
        }
    };

    const deleteTask = async (id) => {
        try {
            await API.delete(`/tasks/${id}`);
            setTasks(tasks.filter((t) => t.id !== id));
        } catch (err) {
            setError("Failed to delete task");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", width: "100vw", padding: "20px", boxSizing: "border-box", background: "#242424" }}>
            <div style={{ maxWidth: "800px", width: "100%", padding: "30px", border: "1px solid #444", borderRadius: "12px", background: "#333", color: "#fff", boxShadow: "0 4px 15px rgba(0,0,0,0.3)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #555", paddingBottom: "15px", marginBottom: "20px" }}>
                    <h2 style={{ margin: 0, color: "#28a745" }}>Task Master Dashboard</h2>
                    <button onClick={handleLogout} style={{ padding: "8px 15px", background: "#dc3545", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", transition: "0.3s" }}>Logout</button>
                </div>

                <div style={{ margin: "20px 0", padding: "20px", border: "1px solid #555", borderRadius: "8px", background: "#3d3d3d" }}>
                    <h3 style={{ marginTop: 0 }}>Create New Task</h3>
                    {error && <p style={{ color: "#ff6b6b" }}>{error}</p>}
                    <form onSubmit={createTask}>
                        <div style={{ marginBottom: "12px" }}>
                            <input
                                style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #555", background: "#222", color: "#fff", boxSizing: "border-box" }}
                                type="text"
                                placeholder="Task Title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                required
                            />
                        </div>
                        <div style={{ marginBottom: "12px" }}>
                            <textarea
                                style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #555", background: "#222", color: "#fff", boxSizing: "border-box", minHeight: "80px" }}
                                placeholder="Task Description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                        </div>
                        <button style={{ padding: "10px 25px", background: "#007bff", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }} type="submit">Add Task</button>
                    </form>
                </div>

                <div style={{ marginTop: "30px" }}>
                    <h3>Your Tasks</h3>
                    {tasks.length === 0 ? (
                        <p style={{ textAlign: "center", color: "#888" }}>No tasks found. Start by adding one above!</p>
                    ) : (
                        <ul style={{ listStyle: "none", padding: 0 }}>
                            {tasks.map((task) => (
                                <li key={task.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px", marginBottom: "10px", borderRadius: "8px", background: task.completed ? "#2a2a2a" : "#444", border: "1px solid #555", borderLeft: task.completed ? "5px solid #6c757d" : "5px solid #28a745" }}>
                                    <div style={{ flex: 1 }}>
                                        <span style={{ textDecoration: task.completed ? "line-through" : "none", fontWeight: "bold", fontSize: "1.1em", color: task.completed ? "#888" : "#fff" }}>{task.title}</span>
                                        <p style={{ margin: "5px 0 0", fontSize: "0.95em", color: task.completed ? "#666" : "#bbb" }}>{task.description}</p>
                                    </div>
                                    <div style={{ display: "flex", gap: "10px" }}>
                                        <button onClick={() => toggleComplete(task)} style={{ padding: "6px 12px", background: task.completed ? "#555" : "#28a745", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "0.9em" }}>
                                            {task.completed ? "Undo" : "Complete"}
                                        </button>
                                        <button onClick={() => deleteTask(task.id)} style={{ padding: "6px 12px", background: "#dc3545", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "0.9em" }}>Delete</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
