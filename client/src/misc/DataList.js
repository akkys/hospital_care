import React from "react";
import { Form } from "react-bootstrap";

const DataList = ({ data, label, value, setValue, err }) => {
  return (
    <>
      <Form.Floating>
        <Form.Control
          className={
            value || !err
              ? `form-control form-card-list mb-3`
              : `form-control form-card-list mb-3 is-invalid`
          }
          list="datalistOptions"
          id="exampleDataList"
          placeholder="Type to search for Employee's Name..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <datalist id="datalistOptions">
          <option>Choose one...</option>
          {data.map((d) => {
            return (
              <option key={d._id} value={d.name}>
                {d.name}
              </option>
            );
          })}
        </datalist>
        <label className={value || !err ? null : `text-danger`}>{label}</label>
      </Form.Floating>
    </>
  );
};

export default DataList;
