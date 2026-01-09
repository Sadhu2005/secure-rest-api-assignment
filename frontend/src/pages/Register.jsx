import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

const Register = () => {
    const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "USER" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post("/auth/register", formData);
            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", width: "100vw" }}>
            <div style={{ maxWidth: "400px", width: "100%", padding: "20px", border: "1px solid #ddd", borderRadius: "8px", background: "#333", color: "#fff" }}>
                <h2>Register</h2>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: "10px" }}>
                        <label>Name:</label>
                        <input style={{ width: "100%", padding: "8px", boxSizing: "border-box" }} type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                    </div>
                    <div style={{ marginBottom: "10px" }}>
                        <label>Email:</label>
                        <input style={{ width: "100%", padding: "8px", boxSizing: "border-box" }} type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                    </div>
                    <div style={{ marginBottom: "10px" }}>
                        <label>Password:</label>
                        <input style={{ width: "100%", padding: "8px", boxSizing: "border-box" }} type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
                    </div>
                    <button style={{ width: "100%", padding: "10px", background: "#007bff", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }} type="submit">Register</button>
                </form>
                <p style={{ marginTop: "15px" }}>Already have an account? <Link to="/login">Login here</Link></p>
            </div>
        </div>
    );
};

export default Register;
