import { Link } from "react-router-dom";
import React, { useState } from "react";
import axiosInstance from "../../axios";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [showPass, setShowpaass] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    re_password: "",
  });

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(inputs);
  };

  const togglePasswordVisibility = () => {
    setShowpaass(!showPass);
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    try {
      if (inputs.password !== inputs.re_password) {
        setError("mật khẩu không khớp");
        return error;
      }
      const response = await axiosInstance.post("/api/auth/register", {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
        re_password: inputs.re_password,
      });
      if (response.status === 500) {
        console.log("ssdj");
      }
      navigate('/Login');
    } catch (error) {
     if(error.response.status===500){
        setError( error.response.data.message)
     }
    }
  };
  return (
    <div className="register">
      <div className="container">
        <div className="row pt-5">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <div className="card">
              <div className="header-card">
                <h2 className="text-center mt-3">Đăng kí</h2>
              </div>
              <div className="body-card mb-3">
                <form action="" className="p-3">
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      placeholder="Nhập Tên"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="Nhập Email"
                      onChange={handleChange}
                    />
                  </div>
                  <label className="form-label">Password</label>
                  <div className="input-group mb-3">
                    <input
                      className="form-control input-pw"
                      id="password"
                      name="password"
                      placeholder="Password"
                      type={showPass ? "text" : "password"}
                      onChange={handleChange}
                    />
                    <span
                      className="input-group-text custom-password"
                      onClick={togglePasswordVisibility}
                    >
                      <i
                        className={showPass ? "far fa-eye" : "far fa-eye-slash"}
                        id="togglePassword"
                      ></i>
                    </span>
                  </div>
                  <label className="form-label">Repeat password</label>
                  <div className="input-group mb-3">
                    <input
                      className="form-control input-pw"
                      id="password"
                      name="re_password"
                      placeholder="Password"
                      type={showPass ? "text" : "password"}
                      onChange={handleChange}
                    />
                    <span
                      className="input-group-text custom-password"
                      onClick={togglePasswordVisibility}
                    >
                      <i
                        className={showPass ? "far fa-eye" : "far fa-eye-slash"}
                        id="togglePassword"
                      ></i>
                    </span>
                  </div>
                  {error && <p className="text-danger">{error}</p>}
                  <div className="input-group mb-6">
                    <button
                      className="btn-login p-1"
                      type="button"
                      id="login"
                      onClick={handleRegister}
                    >
                      Đăng Kí
                    </button>
                    <h6 className="p-4">
                      Nếu bạn da có tài khoản vui lòng bấm vào đây để đăng nhập{" "}
                      <Link to={"/login"}>
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
export default Register;
