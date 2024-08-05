import React, { useEffect, useState } from "react";
import "../css/CreateModal.css";
import time from "../img/Time_atack_duotone.svg";
import Done from "../img/Done_round_duotone.svg";
import close from "../img/close_ring_duotone-1.svg";
import axiosInstance from "../../axios";
const CreateModal = ({ showModal, handleCloseModal ,fetchData}) => {

  useEffect(() => {
    const modalElement = document.getElementById("slideInModal");
    if (modalElement) {
      const bootstrapModal = new window.bootstrap.Modal(modalElement);
  
      const handleHidden = () => {
        handleCloseModal();
       
      };
  
      modalElement.addEventListener("hidden.bs.modal", handleHidden);
  
      if (showModal) {
        bootstrapModal.show();
      } else {
        bootstrapModal.hide();
      }
     
      return () => {
        modalElement.removeEventListener("hidden.bs.modal", handleHidden);
        bootstrapModal.hide(); 
      };
      
    }
  }, [showModal]);
  const [selectedOption, setSelectedOption] = useState(null);

  // Hàm này sẽ được gọi khi người dùng click vào một ô input
  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue); // Cập nhật trạng thái
  };
  const [selectedOptionStatus, setSelectedOptionStatus] = useState(null);

  const handleOptionChangeStatus = (event) => {
    const selectedValueStatus = event.target.value;
    setSelectedOptionStatus(selectedValueStatus); // Cập nhật trạng thái
  };
  const [inputs, setInputs] = useState({
    name: "",
    Description: "",
  });
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(inputs)
  };
  const createTaskBoard = async () => {
    try {
     
      const response = await axiosInstance.post(
        "/api/auth/createTaskBoard",
        {
          name: inputs.name,
          description: inputs.Description,
          icon: selectedOption,
          status: selectedOptionStatus,
        }
      );
      resetInputs();
    } catch (error) {
      console.error("Lỗi tạo ghi chú:", error);
      // Xử lý lỗi
    }
  };

  const resetInputs = () => {
    setInputs({ name: "", Description: "" }); // Cập nhật inputs về giá trị mặc định
    setSelectedOption(null); // Cập nhật selectedOption về null
    setSelectedOptionStatus(null); // Cập nhật selectedOptionStatus về null
    fetchData();
  };

  return (
    <div
      className=" modal fade slide-in Size "
      id="slideInModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg m-3">
        <div className="modal-content border">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Task details
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleCloseModal}
            ></button>
          </div>
          <div className="modal-body">
            <div className="">
              <label className="form-label">Task name</label>
              <input
                type="text"
                className="form-control custom-outline"
                value={inputs.name}
                name="name"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label">
                Description
              </label>
              <textarea
                className="form-control custom-outline"
               
                name="Description"
                value={inputs.Description}
                placeholder="Enter a short description"
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="mb-3">
              <label className="form-label">Icon</label>
              <br />
              <div className="mb-3">
                <input
                  type="checkbox"
                  className="checkbox1"
                  name="option"
                  id="icon1"
                  value="1"
                  checked={selectedOption === "1"}
                  onChange={handleOptionChange}
                />
                <input
                  type="checkbox"
                  className="checkbox2"
                  name="option"
                  id="icon2"
                  value="2"
                  checked={selectedOption === "2"}
                  onChange={handleOptionChange}
                />
                <input
                  type="checkbox"
                  className="checkbox3"
                  name="option"
                  id="icon3"
                  value="3"
                  checked={selectedOption === "3"}
                  onChange={handleOptionChange}
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Status</label>
              <br />
              <div className="row">
                <div className="col-6">
                  <div className="boc-status p-2">
                    <div className="row">
                      <div className="col-2">
                        <div className="boc-img">
                          <img src={time} width="30px" />
                        </div>
                      </div>
                      <div className="col-8 p-2">
                        <p className="fs-6  ps-2">In Progress</p>
                      </div>
                      <div className="col-2 p-2">
                        <input
                          type="checkbox"
                          name="status"
                          className="check"
                          id="status1"
                          value="s1"
                          checked={selectedOptionStatus === "s1"}
                          onChange={handleOptionChangeStatus}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="boc-status p-2">
                    <div className="row">
                      <div className="col-2">
                        <div
                          className="boc-img"
                          style={{
                            backgroundColor: "#32D657",
                          }}
                        >
                          <img src={Done} width="30px" />
                        </div>
                      </div>
                      <div className="col-8 p-2">
                        <p className="fs-6 ps-2">In Progress</p>
                      </div>
                      <div className="col-2 p-2">
                        <input
                          type="checkbox"
                          name="status"
                          className="check"
                          id="status2"
                          value="s2"
                          checked={selectedOptionStatus === "s2"}
                          onChange={handleOptionChangeStatus}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-6">
                  <div className="boc-status p-2">
                    <div className="row">
                      <div className="col-2">
                        <div
                          className="boc-img"
                          style={{
                            backgroundColor: "#DD524C",
                          }}
                        >
                          <img src={close} width="30px" />
                        </div>
                      </div>
                      <div className="col-8 p-2">
                        <p className="fs-6  ps-2">In Progress</p>
                      </div>
                      <div className="col-2 p-2">
                        <input
                          type="checkbox"
                          name="status"
                          className="check"
                          id="status3"
                          value="s3"
                          checked={selectedOptionStatus === "s3"}
                          onChange={handleOptionChangeStatus}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              id="submit"
              className="btn btn-primary costum-save"
              onClick={createTaskBoard}
            >
              <span className="">Save</span>
              <i className="fa-solid fa-check ms-2"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateModal;
