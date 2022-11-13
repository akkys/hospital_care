import React from "react";
import { Col, Row } from "react-bootstrap";
import InputField from "./InputField";

const InputTime = ({
  label1,
  label2,
  inputType,
  rows,
  type,
  name,
  value1,
  setValue1,
  value2,
  setValue2,
  data,
  err,
}) => {
  return (
    <Row className="form-group">
      <Col md={6}>
        <InputField
          data={data}
          label={label1}
          inputType={inputType}
          type={type}
          name={name}
          rows={rows}
          value={value1}
          setValue={setValue1}
          err={err}
        />
      </Col>
      <Col md={6}>
        <InputField
          data={data}
          label={label2}
          inputType={inputType}
          type={type}
          name={name}
          rows={rows}
          value={value2}
          setValue={setValue2}
          err={err}
        />
      </Col>
    </Row>
  );
};

export default InputTime;
