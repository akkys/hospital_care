import React from "react";
import InputField from "./InputField";

const InputComp = ({
  label,
  inputType,
  rows,
  type,
  name,
  value,
  setValue,
  data,
  placeholder,
  fullWidth,
  size,
  err,
}) => {
  return (
    <>
      {fullWidth && (
        <div className="">
          <InputField
            label={label}
            data={data}
            inputType={inputType}
            type={type}
            name={name}
            rows={rows}
            value={value}
            setValue={setValue}
            placeholder={placeholder}
            err={err}
          />
        </div>
      )}
      {!fullWidth && (
        <div>
          <InputField
            data={data}
            label={label}
            inputType={inputType}
            type={type}
            name={name}
            rows={rows}
            value={value}
            setValue={setValue}
            placeholder={placeholder}
            size={size}
            err={err}
          />
        </div>
      )}
    </>
  );
};

export default InputComp;
