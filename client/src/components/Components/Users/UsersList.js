import React, { useState } from "react";
import img from "../../../images/user.png";
import DeleteModal from "../../../misc/DeleteModal";
import CardContainer from "../../Layout/CardContainer";

const UsersList = ({ user, userInfo, deleteHandler, openModal }) => {
  const [deleteModal, setDeleteModal] = useState(false);

  const openDeleteModal = () => {
    setDeleteModal(true);
  };

  const admin = userInfo && userInfo.user.role === "Admin";
  return (
    <>
      {deleteModal && (
        <DeleteModal
          deleteHandler={deleteHandler}
          data={user}
          deleteModalVisible={deleteModal}
          setDeleteModalVisible={setDeleteModal}
        />
      )}
      <div className="col-md-3 mb-3 mt-2">
        <CardContainer
          img={img}
          title={user.name}
          id={user._id}
          data={user}
          admin={admin}
          openDeleteModal={openDeleteModal}
          openModal={openModal}>
          <h6>
            <label>Email</label>: {user.email}
          </h6>
          <h6>
            <label>Role</label>: {user.role}
          </h6>
        </CardContainer>
      </div>
    </>
  );
};

export default UsersList;
