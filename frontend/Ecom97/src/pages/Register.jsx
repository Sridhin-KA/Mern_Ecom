import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";

function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            await api.post("/users/register", {
                name,
                email,
                password,
            });

            alert("Registration Successful");
            navigate("/");
        } catch (error) {
            console.log(error);
            alert(error.response?.data?.message);
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h1>Create Account</h1>

                <form onSubmit={handleRegister}>
                    <input
                        type="text"
                        placeholder="Enter Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <input
                        type="email"
                        placeholder="Enter Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Enter Your Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button type="submit">Register</button>
                </form>

                <p>
                    Already have an account?{" "}
                    <Link to="/">Login</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;