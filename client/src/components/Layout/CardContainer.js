import React from "react";
import "./Styles/CardContainer.css";
import { Button, Card } from "react-bootstrap";
import CardFooterBtn from "../../misc/CardFooterBtn";

const CardContainer = ({
  userInfo,
  header,
  title,
  img,
  children,
  data,
  admin,
  user,
  openModal,
  openDeleteModal,
  handleDetailModal,
}) => {
  return (
    <>
      <Card className="card-container">
        {header && <Card.Header as="h4">{header}</Card.Header>}
        <div className="card-flex">
          {img && <Card.Img variant="top" src={img} className="card-img-top" />}
          <Card.Body>
            {title && <Card.Title>{title}</Card.Title>}
            <Card.Text>{children}</Card.Text>
          </Card.Body>
        </div>
        {userInfo ? (
          <Card.Footer>
            <CardFooterBtn
              data={data}
              openModal={openModal}
              openDeleteModal={openDeleteModal}
              handleDetailModal={handleDetailModal}
            />
          </Card.Footer>
        ) : admin && !user ? (
          <Card.Footer>
            <CardFooterBtn
              data={data}
              openModal={openModal}
              openDeleteModal={openDeleteModal}
              handleDetailModal={handleDetailModal}
            />
          </Card.Footer>
        ) : (
          <Card.Footer>
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={handleDetailModal}>
              Info &raquo;
            </Button>
          </Card.Footer>
        )}
      </Card>
    </>
  );
};

export default CardContainer;
