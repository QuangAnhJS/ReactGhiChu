import "../css/stytle.css";
import { Link } from "react-router-dom"; 
import axiosInstance from "../../axios";
import React, { useState } from "react";

const Login = () => {
   
   
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPass, setShowpaass] = useState(false);
   
 
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    const togglePasswordVisibility = () => {
        setShowpaass(!showPass);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
   
    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await axiosInstance.post("/api/auth/login", {
                email: email,
                password: password,
            });
            const token = response.data.access_token;
            const expires_in = response.data.expires_in;
            localStorage.setItem("access_token", token);
            localStorage.setItem("expires_in", expires_in);
            window.location.reload();
        } catch (error) {
            setEmail("");
            setPassword("");
            setError(
                "Đăng nhập thất bại, vui lòng kiểm tra lại email và mật khẩu."
            );
        }
    };
  
    return (
        <div className="login">
            <div className="container pt-5">
                <div className="row pt-5">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <div className="card">
                            <div className="header-card">
                                <h2 className="text-center mt-3">Đăng nhập</h2>
                            </div>
                            <div className="body-card mb-3">
                                <form action="" className="p-3">
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="Nhập Email"
                                            value={email}
                                            onChange={handleEmailChange}
                                        />
                                    </div>
                                    <label className="form-label">
                                        Password
                                    </label>
                                    <div className="input-group mb-3">
                                        <input
                                            className="form-control input-pw"
                                            name="password"
                                            placeholder="Password"
                                            type={
                                                showPass ? "text" : "password"
                                            }
                                            value={password}
                                            onChange={handlePasswordChange}
                                        />
                                        <span
                                            className="input-group-text custom-password"
                                            onClick={togglePasswordVisibility}
                                        >
                                            <i
                                                className={
                                                    showPass
                                                        ? "far fa-eye"
                                                        : "far fa-eye-slash"
                                                }
                                                id="togglePassword"
                                            ></i>
                                        </span>
                                    </div>
                                    {error && (
                                        <p className="text-danger">{error}</p>
                                    )}
                                    <div className="input-group mb-6">
                                        <button
                                            className="btn-login p-1"
                                            type="button"
                                            id="login"
                                            onClick={handleLogin}
                                        >
                                            Đăng nhập
                                        </button>
                                        <h6 className="p-4">
                                            Nếu bạn chưa có tài khoản vui lòng
                                            đăng kí{" "}
                                            <Link to={"/register"}>
                                                <span> tại đây</span>
                                            </Link>
                                        </h6>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-3"></div>
                </div>
            </div>
        </div>
    );
};

export default Login;
