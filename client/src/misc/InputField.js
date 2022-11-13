import React from "react";
import { Form } from "react-bootstrap";

const InputField = ({
  inputType,
  type,
  label,
  value,
  setValue,
  data,
  placeholder,
  size,
  err,
}) => {
  return (
    <>
      {inputType === "text" && (
        <>
          <Form.Floating className="mb-3">
            <Form.Control
              type={type}
              placeholder={placeholder}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className={
                value || !err ? `form-control ` : `form-control is-invalid`
              }
            />
            <label className={value || !err ? null : `text-danger`}>
              {label}
            </label>
          </Form.Floating>
        </>
      )}
      {inputType === "textarea" && (
        <Form.Floating className="mb-3">
          <Form.Control
            as="textarea"
            placeholder={placeholder}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            style={{ height: `${size}` }}
            className={
              value || !err ? `form-control ` : `form-control is-invalid`
            }
          />
          <label className={value || !err ? null : `text-danger`}>
            {label}
          </label>
        </Form.Floating>
      )}
      {inputType === "select" && (
        <Form.Floating className="mb-3">
          <Form.Select
            size="sm"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className={
              value || !err ? `form-control ` : `form-control is-invalid`
            }>
            {data.length === 0 ? (
              <option disabled>Please create {label} </option>
            ) : (
              <>
                <option>Choose one...</option>
                {data.map((d, i) => {
                  return (
                    <option key={i} value={d}>
                      {d}
                    </option>
                  );
                })}
              </>
            )}
          </Form.Select>
          <label className={value || !err ? null : `text-danger`}>
            {label}
          </label>
        </Form.Floating>
      )}
    </>
  );
};

export default InputField;
