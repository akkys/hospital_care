import React from "react";
import { Button, Col, Row } from "react-bootstrap";

const PageHeader = (props) => {
  const {
    data,
    title,
    fullTitle,
    search,
    setSearch,
    openModal,
    admin,
    user,
    userInfo,
    placeholder,
  } = props;
  return (
    <div className="page-header">
      <Row>
        <Col md={10}>
          <Row>
            <Col md={7} className="mb-1">
              {fullTitle ? (
                <h4 style={{ fontWeight: "600" }}>{fullTitle}</h4>
              ) : (
                <h4 style={{ fontWeight: "600" }}>{title}</h4>
              )}
            </Col>
            {setSearch && (
              <Col md={5} className="mb-2">
                <div className="searchbox">
                  <input
                    type="text"
                    className="form-control form-control-sm search"
                    value={search}
                    name="search"
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={placeholder}
                  />
                </div>
              </Col>
            )}
          </Row>
        </Col>
        {userInfo ? (
          <Col md={2} className="d-grid gap-2">
            {data && data.length !== 0 && (
              <Button variant="info" size="sm" onClick={() => openModal({})}>
                <strong>Add</strong>
              </Button>
            )}
          </Col>
        ) : admin && !user ? (
          <Col md={2} className="d-grid gap-2">
            {data && data.length !== 0 && (
              <Button variant="info" size="sm" onClick={() => openModal({})}>
                <strong>Add</strong>
              </Button>
            )}
          </Col>
        ) : null}
      </Row>
      <hr />
    </div>
  );
};

export default PageHeader;
