import React, { useState, useEffect } from "react";
import Create from "./CreateModal";
import addroundduotone from "../img/addroundduotone1-1.svg";
import logo from "../img/logo-1.svg";
import edit from "../img/edit-duotone-1.svg";
import axiosInstance from "../../axios";
import Ghichu from "./ghichu";
import { Watch } from "react-loader-spinner";
const Home = () => {

  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const [ghichu, setghicu] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/api/auth/me");
      console.log("test", response.data);
      setghicu([response.data]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post("/api/auth/logout");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="home">
      <div className="container">
        <div className="row">
          <div className="col-xl-3"></div>
          <div className="col-xl-6">
            <div className="row">
              <div className="col-6 pt-5">
                <div className="row">
                  <div className="col-2">
                    <img src={logo} alt="" width="35px" />
                  </div>
                  <div className="col-10">
                    <h3>
                      My Task Board 1
                      <span>
                        <img src={edit} alt="" width="20px" />
                      </span>
                    </h3>
                    <p className="fs-6">Tasks to keep organised</p>
                  </div>
                </div>
              </div>
              <div className="col-6 pt-5">
                <div className="row">
                  <div className="col-2"></div>
                  <div className="col-2"></div>
                  <div className="col-8">
                    <button className="p-2" onClick={handleLogout}>
                      Đăng xuất
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="loading">
                <Watch
                  height="100"
                  width="100"
                  color="#fd7e14"
                  ariaLabel="audio-loading"
                  wrapperStyle={{}}
                  wrapperClass="wrapper-class"
                  visible={true}
                />
              </div>
            ) : (
              <Ghichu data={ghichu} fetchData={fetchData}></Ghichu>
            )}

            <div className="row pt-3">
              <div className="Progress">
                <div className="row p-2 ">
                  <div className="col-2">
                    <button className="boc" onClick={handleShowModal}>
                      <img
                        className="custom-img"
                        src={addroundduotone}
                        alt=""
                        width="40px"
                      />
                    </button>
                  </div>
                  <div className="col-8 p-3">
                    <p className="fs-5 padding-0">Tasks to keep Progress</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3"></div>
        </div>
      </div>
      <Create
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        fetchData={fetchData}
      />
      <button
        onClick={() => {
          fetchData();
        }}
      >
        refresh
      </button>
    </div>
  );
};

export default Home;
