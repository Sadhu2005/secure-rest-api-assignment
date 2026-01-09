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
        <div style={{ maxWidth: "600px", margin: "50px auto", padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2>Task Dashboard</h2>
                <button onClick={handleLogout} style={{ padding: "8px 15px", background: "#dc3545", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>Logout</button>
            </div>

            <div style={{ margin: "20px 0", padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
                <h3>Create New Task</h3>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <form onSubmit={createTask}>
                    <div style={{ marginBottom: "10px" }}>
                        <input
                            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
                            type="text"
                            placeholder="Title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                        />
                    </div>
                    <div style={{ marginBottom: "10px" }}>
                        <textarea
                            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
                            placeholder="Description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>
                    <button style={{ padding: "10px 20px", background: "#007bff", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }} type="submit">Add Task</button>
                </form>
            </div>

            <div style={{ marginTop: "30px" }}>
                <h3>Your Tasks</h3>
                {tasks.length === 0 ? (
                    <p>No tasks found. Add your first task!</p>
                ) : (
                    <ul style={{ listStyle: "none", padding: 0 }}>
                        {tasks.map((task) => (
                            <li key={task.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px", borderBottom: "1px solid #eee", background: task.completed ? "#f9f9f9" : "#fff" }}>
                                <div>
                                    <span style={{ textDecoration: task.completed ? "line-through" : "none", fontWeight: "bold" }}>{task.title}</span>
                                    <p style={{ margin: "5px 0 0", fontSize: "0.9em", color: "#666" }}>{task.description}</p>
                                </div>
                                <div>
                                    <button onClick={() => toggleComplete(task)} style={{ marginRight: "10px", padding: "5px 10px", background: task.completed ? "#6c757d" : "#28a745", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                                        {task.completed ? "Undo" : "Complete"}
                                    </button>
                                    <button onClick={() => deleteTask(task.id)} style={{ padding: "5px 10px", background: "#dc3545", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>Delete</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
