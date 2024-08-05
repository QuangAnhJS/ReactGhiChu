import React, { useEffect, useState } from "react";
import "../css/CreateModal.css";
import axiosInstance from "../../axios";
import Swal from "sweetalert2";
import status1 from "../img/Time_atack_duotone.svg";
import status2 from "../img/Done_round_duotone.svg";
import status3 from "../img/close_ring_duotone-1.svg";
const CreateModal = ({ showModalEdit, handleCloseModalEdit, selectID ,fetchData, }) => {

  useEffect(() => {
    const modalElement = document.getElementById("model-update");
    const bootstrapModal = new window.bootstrap.Modal(modalElement);
    const handleHidden = () => {
      handleCloseModalEdit();
    };

    modalElement.addEventListener("hidden.bs.modal", handleHidden);

    if (showModalEdit) {
      bootstrapModal.show();
      dataghichu(selectID);
    } else {
      bootstrapModal.hide();
    }

    return () => {
      modalElement.removeEventListener("hidden.bs.modal", handleHidden);
      bootstrapModal.hide();
    };
  }, [showModalEdit, handleCloseModalEdit]);
  const [inputs, setInputs] = useState({
    name: "",
    Description: "",
    icon: "",
    status: "",
  
  });
  const [ID, setID] = useState("");

  const dataghichu = async (selectID) => {
    try {
      const response = await axiosInstance.post("/api/auth/getGhichu", {
        id: selectID,
      });
      setInputs({
        name: response.data.message.name,
        Description: response.data.message.description,
        icon: response.data.message.icon,
        status: response.data.message.status,
        id: response.data.message.id,
      });
      setID(response.data.message.id);
    } catch (error) {
      console.error("Lỗi tạo ghi chú:", error);
    }
  };

  const EditTaskBoard = async (id) => {
    try {
      const response = await axiosInstance.post("/api/auth/Update", {
        id: id,
        name: inputs.name,
        description: inputs.Description,
        icon: inputs.icon,
        status: inputs.status,
      });
      if (response.status === 200) {
        handleCloseModalEdit();
      }
    } catch (error) {
      console.error("Lỗi tạo ghi chú:", error);
    }
  };

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChangeStatus = (event) => {
    const selectedValueStatus = event.target.value;
    setInputs({ ...inputs, status: selectedValueStatus });
  };
  const handleOptionChangeicon = (event) => {
    const selectedValueStatus = event.target.value;
    setInputs({ ...inputs, icon: selectedValueStatus });
  };
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [itemIdToDelete, setItemIdToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false); 
  const handleDelete = (id) => {
    setItemIdToDelete(id);
    setShowConfirmation(true);
  };

  useEffect(() => {
    if (showConfirmation && !isDeleting) {
      setIsDeleting(true);
      Swal.fire({
        title: "Bạn thật sự muốn xóa chứ?",
        text: "Nội dung đã xóa không thể phục hồi lại !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axiosInstance.post("/api/auth/Delete", {
              id: itemIdToDelete,
            });
  
            // Hiển thị thông báo thành công SAU khi xóa thành công
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
  
            handleCloseModalEdit();
            fetchData(); // Gọi fetchData để cập nhật dữ liệu
          } catch (error) {
            // Xử lý lỗi nếu xóa không thành công
            console.error("Error deleting item:", error);
            Swal.fire({
              title: "Error!",
              text: "Failed to delete the item.",
              icon: "error",
            });
          }
        }
        setIsDeleting(false);
        setShowConfirmation(false);
      });
    }
  }, [showConfirmation, isDeleting]);
  
  return (
    <div
      className="modal fade slide-in "
      id="model-update"
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
            ></button>
          </div>
          <div className="modal-body">
            <div className="">
              <label className="form-label">Task name</label>
              <input
                type="text"
                className="form-control custom-outline"
                id="update-name"
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
                id="update-Description"
                placeholder="Enter a short description"
                value={inputs.Description}
                name="Description"
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
                  name="update-option"
                  id="icon1"
                  value="1"
                  checked={inputs.icon === "1"}
                  onChange={handleOptionChangeicon}
                />
                <input
                  type="checkbox"
                  className="checkbox2"
                  name="update-option"
                  id="icon2"
                  value="2"
                  checked={inputs.icon === "2"}
                  onChange={handleOptionChangeicon}
                />
                <input
                  type="checkbox"
                  className="checkbox3"
                  name="update-option"
                  id="icon3"
                  value="3"
                  checked={inputs.icon === "3"}
                  onChange={handleOptionChangeicon}
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
                          {" "}
                          <img
                            src={status1}
                            width="30px"
                          />
                        </div>
                      </div>
                      <div className="col-8 p-2">
                        <p className="fs-6 ps-2">In Progress</p>
                      </div>
                      <div className="col-2 p-2">
                        {" "}
                        <input
                          type="checkbox"
                          name="update-status"
                          className="check"
                          id="status1"
                          value="s1"
                          checked={inputs.status === "s1"}
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
                            background: "#32D657",
                          }}
                        >
                          {" "}
                          <img
                         src={status2}
                            width="30px"
                          />
                        </div>
                      </div>
                      <div className="col-8 p-2">
                        <p className="fs-6 ps-2">In Progress</p>
                      </div>
                      <div className="col-2 p-2">
                        {" "}
                        <input
                          type="checkbox"
                          name="update-status"
                          className="check"
                          id="status2"
                          value="s2"
                          checked={inputs.status === "s2"}
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
                            background: "#DD524C",
                          }}
                        >
                          {" "}
                          <img
                           src={status3}
                            width="30px"
                          />
                        </div>
                      </div>
                      <div className="col-8 p-2">
                        <p className="fs-6 ps-2">In Progress</p>
                      </div>
                      <div className="col-2 p-2">
                        {" "}
                        <input
                          type="checkbox"
                          name="update-status"
                          className="check"
                          id="status3"
                          value="s3"
                          checked={inputs.status === "s3"}
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
              className="btn btn-secondary costum-delete"
              onClick={()=>{handleDelete(inputs.id)}}
            >
              <span className="" id="delete">
                Delete
              </span>
              <i className="fa-solid fa-trash-can ms-2"></i>
            </button>
            <button
              type="button"
              id="Update"
              className="btn btn-primary costum-save"
              onClick={() => EditTaskBoard(inputs.id)}
            >
              <span className="">Update</span>
              <i className="fa-solid fa-check ms-2"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreateModal;
