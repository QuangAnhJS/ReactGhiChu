import React, { useState, useEffect } from "react";
import icon1 from "../img/rectangle-20@2x.png";
import icon2 from "../img/rectangle-11@2x.png";
import icon3 from "../img/rectangle-22@2x.png";
import icon4 from "../img/rectangle-24@2x.png";
import status1 from "../img/Time_atack_duotone.svg";
import status2 from "../img/Done_round_duotone.svg";
import status3 from "../img/close_ring_duotone-1.svg";
import ModalEdit from "./Editmodal";

const GhiChu = ({ data,fetchData }) => {

  const [showModalEdit, setShowModalEdit] = useState(false);
  const handleShowModalEdit = (id) => { // Nhận id
    setShowModalEdit(true);
    setSelectID(id);
  };
  const [selectID, setSelectID] = useState(null);
  const [editTaskData, setEditTaskData] = useState(null);

  const handleCloseModalEdit = (id) => {
    setShowModalEdit(false);
    setSelectID(id);

  };
  
  if (!data[0] || !Array.isArray(data[0]) ) {
    return <div></div>;
  }

  return (
    <div>
      {data[0].map((item, index) => {
        let id = item.id;
        let iconStatus = "";
        let colors = "";
        let background = "";

        // Gán giá trị cho iconStatus, colors và background dựa trên item.iconStatus
        switch (item.status) {
          case "s1":
            iconStatus = status1;
            colors = "#E9A23B";
            background = "#F5D565";
            break;
          case "s2":
            iconStatus = status2;
            colors = "#A0ECB1";
            background = "#A0ECB1";
            break;
          case "s3":
            iconStatus = status3;
            colors = "#DD524C";
            background = "#F7D4D3";
            break;
          default:
            iconStatus = ""; // Giá trị mặc định nếu không có trường hợp nào khớp
            colors = "gray"; // Màu nền mặc định
            background = "lightgray"; // Màu nền mặc định
            break;
        }

        return (
          <div key={index} className="row pt-3">
            <div className="Progress" style={{ backgroundColor: background }}>
              <div className="row p-2">
                <div className="col-2">
                  <img
                    className="custom-img"
                    src={
                      item.icon == 1
                        ? icon1
                        : item.icon == 2
                        ? icon2
                        : item.icon == 3
                        ? icon3
                        : item.icon == 4
                        ? icon4
                        : "error"
                    }
                    alt=""
                    width="40px"
                  />
                </div>
                <div className="col-8">
                  <p className="fs-5 padding-0">{item.title}</p>
                  <p className="fs-6 padding-0">{item.description}</p>
                </div>
                <div className="col-2">
                  <button
                    className="boc"
                    style={{ backgroundColor: colors }}
                    onClick={() => handleShowModalEdit(item.id)} // Truyền id
                  >
                    <img
                      className="custom-img"
                      src={item.status==="s1"?status1 :item.status==="s2"?status2:item.status==="s3"?status3 :"error"}
                      alt=""
                      width="40px"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <ModalEdit
        showModalEdit={showModalEdit}
        handleCloseModalEdit={handleCloseModalEdit}
        selectID={selectID}
        fetchData={fetchData}
        data={data}
      />
    </div>
  );
};

export default GhiChu;