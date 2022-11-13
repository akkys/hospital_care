import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  listUsers,
  registerUser,
} from "../../../actions/UserAuthAction";
import InputComp from "../../../misc/InputComp";
import EmptyData from "../../../misc/EmptyData";
import ModalContainer from "../../Layout/ModalContainer";
import PageHeader from "../../Layout/PageHeader";
import LoadingPage from "../../Pages/LoadingPage";
import UsersList from "./UsersList";
import ScrollToTop from "../../Layout/ScrollToTOp";
import InputPassword from "../../../misc/InputPassword";

const UsersPage = () => {
  const [modalVisible, setModalVisible] = useState("");
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roles] = useState(["Admin", "User"]);
  const [role, setRole] = useState();
  const [passwordShown, setPasswordShown] = useState(false);

  const { userInfo } = useSelector((state) => state.userSignin);
  const { error1, error2, success } = useSelector(
    (state) => state.userRegister
  );
  const { loading, users } = useSelector((state) => state.userList);

  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Users | A S K Hospitals";
    dispatch(listUsers());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      setModalVisible(false);
      dispatch(listUsers());
    }
  }, [success, dispatch]);

  const openModal = (user) => {
    if (user._id) {
      setModalVisible(true);
      setId(user._id);
      setName(user.name);
      setRole(user.role);
      setEmail(user.email);
      setPassword(user.password);
    } else {
      setModalVisible(true);
      setId("");
      setName("");
      setRole("");
      setEmail("");
      setPassword("");
    }
  };

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      _id: id,
      name,
      email,
      password,
      role,
    };
    dispatch(registerUser(user));
  };

  const deleteHandler = (user) => {
    dispatch(deleteUser(user._id));
    dispatch(listUsers());
  };

  const usersList = users.map((user) => {
    return (
      <UsersList
        key={user._id}
        user={user}
        userInfo={userInfo}
        deleteHandler={deleteHandler}
        openModal={openModal}
      />
    );
  });

  return loading ? (
    <LoadingPage />
  ) : (
    <>
      <PageHeader
        data={users}
        title="Users"
        openModal={openModal}
        admin={userInfo.user.role === "Admin"}
      />
      {users.length === 0 ? (
        <EmptyData
          name="User"
          title="Add all available users now!"
          data={users}
          openModal={openModal}
          admin={userInfo.user.role === "Admin"}
        />
      ) : (
        <Row>{usersList}</Row>
      )}
      {modalVisible && (
        <ModalContainer
          title="Employee"
          show={modalVisible}
          hide={() => setModalVisible(false)}
          size="md"
          onSubmit={handleSubmit}
          error1={error1}
          error2={error2}>
          <InputComp
            label="First Name"
            inputType="text"
            type="text"
            value={name}
            setValue={setName}
            placeholder="Full Name"
            err={error2}
          />
          <InputComp
            inputType="select"
            data={roles}
            value={role}
            setValue={setRole}
            label="Role"
            err={error2}
          />
          <InputComp
            inputType="text"
            type="email"
            value={email}
            setValue={setEmail}
            placeholder="Email Address"
            label="Email Address"
            err={error2}
          />
          <InputPassword
            value={password}
            setValue={setPassword}
            error={error2}
            type={passwordShown}
            togglePasswordVisiblity={togglePasswordVisiblity}
          />
        </ModalContainer>
      )}
      <ScrollToTop />
    </>
  );
};

export default UsersPage;
