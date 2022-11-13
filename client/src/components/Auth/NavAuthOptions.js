import React from "react";
import { useSelector } from "react-redux";
import Cookie from "js-cookie";
import AuthOptions from "./AuthOptions";
import UnAuthOptions from "./UnAuthOptions";

const NavAuthOption = () => {
  const { loading, userInfo } = useSelector((state) => state.userSignin);

  const logOut = (e) => {
    e.preventDefault();
    Cookie.remove("userInfo");
    window.location.href = "/home";
  };

  return loading ? (
    <>
      <h3>Loading...</h3>
    </>
  ) : (
    <>
      {userInfo ? (
        <AuthOptions userInfo={userInfo} logOut={logOut} />
      ) : (
        <UnAuthOptions />
      )}
    </>
  );
};

export default NavAuthOption;
