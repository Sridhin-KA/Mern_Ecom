import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await api.post("/users/login", {
                email,
                password,
            });

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("isAdmin", res.data.isAdmin);

            if (res.data.isAdmin) {
                alert("Admin Login Successful");
                navigate("/admin");
            } else {
                alert("Login Successful");
                navigate("/products");
            }
        } catch (error) {
            alert(error.response?.data?.message);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h1>Login</h1>

                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Enter Your Email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Enter Your Password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button type="submit">Login</button>
                </form>

                <p>
                    Don't have an account?{" "}
                    <Link to="/register">Register</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;