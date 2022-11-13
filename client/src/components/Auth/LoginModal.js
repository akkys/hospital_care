import React from "react";
import { Button, Modal } from "react-bootstrap";
import ErrorAlert from "../../misc/ErrorAlert";
import InputComp from "../../misc/InputComp";
import hospital from "../../images/hospital-staff.png";
import InputPassword from "../../misc/InputPassword";

const LoginModal = ({ data }) => {
  const {
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
  } = data;
  return (
    <>
      <Modal
        show={loginModalVisible}
        onHide={() => setLoginModalVisible(false)}
        size="lg"
        className="modal-container">
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <img src={hospital} className="card-img" alt="..." />
            </div>
            <div className="col-md-6 loginModal">
              <h4 className="">Login</h4>
              <form onSubmit={handleLoginSubmit} className="mt-4">
                {error1 && <ErrorAlert message={error1} />}{" "}
                {error2 && <ErrorAlert message={error2} />}
                <InputComp
                  fullWidth
                  label="Email"
                  inputType="text"
                  type="email"
                  value={email}
                  setValue={setEmail}
                  placeholder="example@email.com"
                  err={error2}
                />
                <InputPassword
                  value={password}
                  setValue={setPassword}
                  error={error2}
                  type={passwordShown}
                  togglePasswordVisiblity={togglePasswordVisiblity}
                />
                <Button
                  variant="success"
                  size="sm"
                  type="submit"
                  style={{ float: "right" }}
                  className="mt-2">
                  Login
                </Button>
              </form>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default LoginModal;
