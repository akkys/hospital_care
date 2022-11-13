import React from "react";
import { Form } from "react-bootstrap";

const DataIdList = ({ data, label, value, setValue, err }) => {
  console.log(value);
  return (
    <>
      <Form.Floating className="mb-3">
        <Form.Select
          size="sm"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={
            value || !err ? `form-control ` : `form-control is-invalid`
          }>
          <option>Choose one...</option>
          {data.map((d) => {
            return (
              <option key={d._id} value={d._id}>
                {d.name}
              </option>
            );
          })}
        </Form.Select>
        <label className={value || !err ? null : `text-danger`}>{label}</label>
      </Form.Floating>
    </>
  );
};

export default DataIdList;
