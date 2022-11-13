import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listUsers, register, signin } from "../../actions/UserAuthAction";
import RegisterModal from "../Auth/RegisterModal";
import LoadingPage from "../Pages/LoadingPage";
import LoginModal from "../Auth/LoginModal";
import { Button } from "react-bootstrap";

const TopBar = () => {
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [regModalVisible, setRegModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);

  const dispatch = useDispatch();

  const { userInfo, error1, error2 } = useSelector((state) => state.userSignin);
  const {
    error1: errorReg1,
    error2: errorReg2,
    success,
  } = useSelector((state) => state.userRegister);
  const { loading, users } = useSelector((state) => state.userList);
  console.log(users);

  useEffect(() => {
    if (userInfo) {
      setLoginModalVisible(false);
    }
  }, [userInfo]);

  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch]);

  const openLoginModal = () => {
    setLoginModalVisible(true);
    setEmail();
    setPassword();
  };

  const openRegModal = () => {
    setRegModalVisible(true);
    setName("");
    setEmail("");
    setPassword("");
  };

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  const handleRegSubmit = (e) => {
    e.preventDefault();
    const user = {
      name,
      email,
      password,
    };
    dispatch(register(user));
  };

  const loginData = {
    loginModalVisible,
    setLoginModalVisible,
    handleLoginSubmit,
    error1,
    error2,
    email,
    password,
    setEmail,
    setPassword,
    passwordShown,
    togglePasswordVisiblity,
  };

  const regData = {
    userInfo,
    users,
    success,
    errorReg1,
    errorReg2,
    regModalVisible,
    setRegModalVisible,
    setLoginModalVisible,
    handleRegSubmit,
    name,
    setName,
    email,
    password,
    setEmail,
    setPassword,
    passwordShown,
    togglePasswordVisiblity,
  };

  return loading ? (
    <LoadingPage />
  ) : (
    <div className="home-container container">
      {loginModalVisible && <LoginModal data={loginData} />}
      {regModalVisible && <RegisterModal data={regData} />}
      {!userInfo && (
        <div className="btn-div">
          <Button
            variant="primary"
            size="sm"
            style={{ marginRight: "10px" }}
            onClick={() => openRegModal({})}>
            Register
          </Button>
          <Button
            variant="success"
            size="sm"
            onClick={() => openLoginModal({})}>
            Login
          </Button>
        </div>
      )}
    </div>
  );
};

export default TopBar;
