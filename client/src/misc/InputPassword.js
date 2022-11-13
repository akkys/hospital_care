import React from "react";
import { FloatingLabel, Form } from "react-bootstrap";

const InputPassword = ({
  type,
  value,
  setValue,
  error,
  togglePasswordVisiblity,
}) => {
  return (
    <>
      <FloatingLabel label="Password" className="mb-3">
        <Form.Control
          type={type ? "text" : "password"}
          placeholder="Password"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={
            value || !error ? `form-control ` : `form-control is-invalid`
          }
        />
        <Form.Check
          type="checkbox"
          label="Show Password"
          onClick={togglePasswordVisiblity}
        />
      </FloatingLabel>
    </>
  );
};

export default InputPassword;
