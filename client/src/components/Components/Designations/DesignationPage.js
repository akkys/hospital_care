import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addDesignation,
  deleteDesignation,
  listDesignations,
} from "../../../actions/DesignationAction";
import EmptyData from "../../../misc/EmptyData";
import InputComp from "../../../misc/InputComp";
import TableHeader from "../../../misc/TableHeader";
import ModalContainer from "../../Layout/ModalContainer";
import PageHeader from "../../Layout/PageHeader";
import ScrollToTop from "../../Layout/ScrollToTOp";
import LoadingPage from "../../Pages/LoadingPage";
import DesignationList from "./DesignationList";

const DesignationPage = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const { userInfo } = useSelector((state) => state.userSignin);
  const { designations, loading } = useSelector(
    (state) => state.designationList
  );
  const { success, error } = useSelector((state) => state.designationAdd);

  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Designations | A S K Hospitals";
    dispatch(listDesignations());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      setModalVisible(false);
      dispatch(listDesignations());
    }
  }, [dispatch, success]);

  const openModal = (designation) => {
    if (designation._id) {
      setModalVisible(true);
      setId(designation._id);
      setName(designation.name);
    } else {
      setModalVisible(true);
      setId("");
      setName("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const designation = {
      _id: id,
      name,
    };
    dispatch(addDesignation(designation));
  };

  const deleteHandler = (designation) => {
    dispatch(deleteDesignation(designation._id));
    dispatch(listDesignations());
  };

  const designationData = designations.map((designation, i) => {
    return (
      <DesignationList
        designation={designation}
        index={i + 1}
        key={designation._id}
        openModal={openModal}
        deleteHandler={deleteHandler}
      />
    );
  });

  const contents = ["#", "Name", "Actions"];
  return loading ? (
    <LoadingPage />
  ) : (
    <>
      <PageHeader
        data={designations}
        title="Designations"
        openModal={openModal}
        admin={userInfo.user.role === "Admin"}
      />
      {designations.length === 0 ? (
        <EmptyData
          name="Designation"
          title="Add all the available designations now!"
          data={designations}
          openModal={openModal}
          admin={userInfo.user.role === "Admin"}
        />
      ) : (
        <TableHeader contents={contents} data={designationData} />
      )}
      {modalVisible && (
        <ModalContainer
          title="Employee"
          show={modalVisible}
          hide={() => setModalVisible(false)}
          size="md"
          id={id}
          onSubmit={handleSubmit}
          error={error}>
          <InputComp
            label="Designation Name"
            inputType="text"
            type="text"
            value={name}
            setValue={setName}
            placeholder="Enter designation name"
            err={error}
          />
        </ModalContainer>
      )}
      <ScrollToTop />
    </>
  );
};

export default DesignationPage;
