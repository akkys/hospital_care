import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addBranch,
  deleteBranch,
  listBranches,
} from "../../../actions/BranchAction";
import EmptyData from "../../../misc/EmptyData";
import InputComp from "../../../misc/InputComp";
import ModalContainer from "../../Layout/ModalContainer";
import PageHeader from "../../Layout/PageHeader";
import ScrollToTop from "../../Layout/ScrollToTOp";
import LoadingPage from "../../Pages/LoadingPage";
import BranchList from "./BranchList";

const BranchPage = () => {
  const [modalVisible, setModalVisible] = useState("");
  const [id, setId] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [helpLine, setHelpLine] = useState("");
  const [contact, setContact] = useState("");

  const { userInfo } = useSelector((state) => state.userSignin);
  const { loading, branches } = useSelector((state) => state.branchList);
  const { success: successSave, error: errorSave } = useSelector(
    (state) => state.branchAdd
  );
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Branches | A S K Hospitals";
    dispatch(listBranches());
  }, [dispatch]);

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
      dispatch(listBranches());
    }
  }, [dispatch, successSave]);

  const openModal = (branch) => {
    if (branch._id) {
      setModalVisible(true);
      setId(branch._id);
      setAddress(branch.address);
      setEmail(branch.email);
      setContact(branch.contact);
      setHelpLine(branch.helpLine);
    } else {
      setModalVisible(true);
      setId();
      setAddress();
      setEmail();
      setContact();
      setHelpLine();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const branch = {
      _id: id,
      address,
      email,
      contact,
      helpLine,
    };
    dispatch(addBranch(branch));
  };

  const deleteHandler = (branch) => {
    dispatch(deleteBranch(branch._id));
    dispatch(listBranches());
  };

  const brachListData = branches.map((branch, i) => {
    return (
      <BranchList
        key={i}
        branch={branch}
        openModal={openModal}
        deleteHandler={deleteHandler}
        userInfo={userInfo}
      />
    );
  });
  return loading ? (
    <LoadingPage />
  ) : (
    <>
      <PageHeader
        data={branches}
        title="Branches"
        openModal={openModal}
        admin={userInfo && userInfo.user.role === "Admin"}
      />
      {branches.length === 0 ? (
        <EmptyData
          name="Branch"
          title="Add all the available branches now!"
          data={branches}
          openModal={openModal}
          admin={userInfo && userInfo.user.role === "Admin"}
        />
      ) : (
        <Row>{brachListData}</Row>
      )}
      {modalVisible && (
        <ModalContainer
          title="Branch"
          show={modalVisible}
          hide={() => setModalVisible(false)}
          size="md"
          onSubmit={handleSubmit}
          error={errorSave}
          id={id}>
          <InputComp
            label="Address"
            inputType="textarea"
            type="textarea"
            value={address}
            setValue={setAddress}
            placeholder="Enter address"
            size="100px"
            err={errorSave}
          />
          <InputComp
            label="Email"
            inputType="text"
            type="email"
            value={email}
            setValue={setEmail}
            placeholder="Enter Email"
            err={errorSave}
          />
          <InputComp
            label="Contact Number"
            inputType="text"
            type="text"
            value={contact}
            setValue={setContact}
            placeholder="Enter contact number"
            err={errorSave}
          />
          <InputComp
            label="HelpLine Number"
            inputType="text"
            type="text"
            value={helpLine}
            setValue={setHelpLine}
            placeholder="Enter helpline number"
            err={errorSave}
          />
        </ModalContainer>
      )}
      <ScrollToTop />
    </>
  );
};

export default BranchPage;
