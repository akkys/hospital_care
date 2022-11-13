import React from "react";
import { Carousel } from "react-bootstrap";
import Image1 from "../../images/reception.jpg";
import Image2 from "../../images/ward.jpg";
import Image3 from "../../images/operation-theatre.jpg";
import Image4 from "../../images/laboratory.jpg";
import Image5 from "../../images/doctor-patient.jpg";

const ImageCarousel = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={Image1}
          height="500vh"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={Image2}
          height="500px"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={Image3}
          height="500px"
          alt="Third slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={Image4}
          height="500px"
          alt="Third slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={Image5}
          height="500px"
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  );
};

export default ImageCarousel;
