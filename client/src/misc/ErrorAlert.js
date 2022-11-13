import React from "react";

const ErrorAlert = (props) => {
  return (
    <>
      <div className="alert alert-danger alert-dismissible " role="alert">
        <small>{props.message}</small>
      </div>
    </>
  );
};

export default ErrorAlert;
