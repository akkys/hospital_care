import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputComp from "../../../misc/InputComp";
import TableHeader from "../../../misc/TableHeader";
import {
  addDepartment,
  deleteDepartment,
  listDepartments,
} from "../../../actions/DepartmentAction";
import EmptyData from "../../../misc/EmptyData";
import ModalContainer from "../../Layout/ModalContainer";
import PageHeader from "../../Layout/PageHeader";
import LoadingPage from "../../Pages/LoadingPage";
import DepartmentList from "./DepartmentList";
import ScrollToTop from "../../Layout/ScrollToTOp";

const DepartmentPage = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const { userInfo } = useSelector((state) => state.userSignin);
  const { departments, loading } = useSelector((state) => state.departmentList);
  const { success, error } = useSelector((state) => state.departmentAdd);

  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Departments | A S K Hospitals";
    dispatch(listDepartments());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      setModalVisible(false);
      dispatch(listDepartments());
    }
  }, [dispatch, success]);

  const openModal = (department) => {
    if (department._id) {
      setModalVisible(true);
      setId(department._id);
      setName(department.name);
    } else {
      setModalVisible(true);
      setId("");
      setName("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const department = { _id: id, name };
    dispatch(addDepartment(department));
  };

  const deleteHandler = (department) => {
    dispatch(deleteDepartment(department._id));
    dispatch(listDepartments());
  };

  const deptData = departments.map((dept, i) => {
    return (
      <DepartmentList
        dept={dept}
        index={i + 1}
        key={dept._id}
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
        data={departments}
        title="Departments"
        openModal={openModal}
        admin={userInfo.user.role === "Admin"}
      />
      {departments.length === 0 ? (
        <EmptyData
          name="Department"
          title="Add all the available departments now!"
          data={departments}
          openModal={openModal}
          admin={userInfo.user.role === "Admin"}
        />
      ) : (
        <TableHeader contents={contents} data={deptData} />
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
            label="Department Name"
            inputType="text"
            type="text"
            name="name"
            value={name}
            setValue={setName}
            placeholder="Enter dept name"
            err={error}
          />
        </ModalContainer>
      )}
      <ScrollToTop />
    </>
  );
};

export default DepartmentPage;
