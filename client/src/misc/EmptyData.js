import React from "react";
import { Button } from "react-bootstrap";

const EmptyData = ({ data, title, name, openModal, userInfo, admin, user }) => {
  return (
    <div className="page-center">
      <h5>No {name} found.</h5>

      {userInfo ? (
        <div className="centerDiv">
          {data && data.length === 0 && (
            <>
              <span>{title}</span>
              <Button
                variant="info"
                size="sm"
                onClick={() => openModal({})}
                className="mt-3"
                style={{ width: "120px" }}>
                <strong>Add</strong>
              </Button>
            </>
          )}
        </div>
      ) : admin && !user ? (
        <div className="centerDiv">
          {data && data.length === 0 && (
            <>
              <span>{title}</span>
              <button
                onClick={() => openModal({})}
                className="btn btn-info btn-sm mt-3"
                style={{ width: "120px" }}>
                <strong>Add</strong>
              </button>
            </>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default EmptyData;
