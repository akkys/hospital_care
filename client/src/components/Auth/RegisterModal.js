import React, { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import ErrorAlert from "../../misc/ErrorAlert";
import InputComp from "../../misc/InputComp";
import hospital from "../../images/hospital-staff.png";
import InputPassword from "../../misc/InputPassword";

const RegisterModal = ({ data }) => {
  const {
    success,
    regModalVisible,
    setRegModalVisible,
    setLoginModalVisible,
    handleRegSubmit,
    errorReg1,
    errorReg2,
    name,
    setName,
    email,
    password,
    setEmail,
    setPassword,
    passwordShown,
    togglePasswordVisiblity,
  } = data;

  useEffect(() => {
    if (success) {
      setRegModalVisible(false);
      setLoginModalVisible(true);
    }
  }, [success, setRegModalVisible, setLoginModalVisible]);

  return (
    <>
      <Modal
        show={regModalVisible}
        onHide={() => setRegModalVisible(false)}
        size="lg"
        className="modal-container">
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <img src={hospital} className="card-img" alt="..." />
            </div>
            <div className="col-md-6 regModal">
              <h4>Register an Account</h4>
              <form onSubmit={handleRegSubmit} className="mt-4">
                {errorReg1 && <ErrorAlert message={errorReg1} />}{" "}
                {errorReg2 && <ErrorAlert message={errorReg2} />}
                <InputComp
                  inputType="text"
                  label="Full Name"
                  type="text"
                  name={name}
                  value={name}
                  setValue={setName}
                  placeholder="Full Name"
                  err={errorReg2}
                />
                <InputComp
                  inputType="text"
                  label="Email"
                  type="email"
                  name={email}
                  value={email}
                  setValue={setEmail}
                  placeholder="example@mail.com"
                  err={errorReg2}
                />
                <InputPassword
                  value={password}
                  setValue={setPassword}
                  error={errorReg2}
                  type={passwordShown}
                  togglePasswordVisiblity={togglePasswordVisiblity}
                />
                <Button
                  variant="primary"
                  size="sm"
                  type="submit"
                  style={{ float: "right" }}
                  className="mt-2">
                  Register
                </Button>
              </form>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RegisterModal;
