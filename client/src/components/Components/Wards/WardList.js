import React, { useState } from "react";
import DeleteModal from "../../../misc/DeleteModal";
import CardContainer from "../../Layout/CardContainer";

const WardList = ({ ward, openModal, userInfo, deleteHandler }) => {
  const [deleteModal, setDeleteModal] = useState(false);

  const openDeleteModal = () => {
    setDeleteModal(true);
  };

  const admin = userInfo.user.role === "Admin";
  const user = userInfo.user.role === "User";

  return (
    <div className="col-md-12 mb-3 mt-2 ward-container">
      {deleteModal && (
        <DeleteModal
          deleteHandler={deleteHandler}
          data={ward}
          deleteModalVisible={deleteModal}
          setDeleteModalVisible={setDeleteModal}
        />
      )}
      <CardContainer
        userInfo
        header={ward.name}
        id={ward._id}
        data={ward}
        admin={admin}
        user={user}
        openModal={openModal}
        openDeleteModal={openDeleteModal}>
        <>
          <h5 className="text-secondary">
            <h6 className="float-right">Price : {ward.price}/- per Day </h6>
            <h6>Description :</h6>
            <small>{ward.desc}</small>
          </h5>
        </>
      </CardContainer>
    </div>
  );
};

export default WardList;
