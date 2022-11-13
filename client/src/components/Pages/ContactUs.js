import React, { useEffect } from "react";
import "../Layout/Styles/CardContainer.css";
import PageHeader from "../Layout/PageHeader";
import {
  HiMapPin,
  HiEnvelope,
  HiDevicePhoneMobile,
  HiPhone,
} from "react-icons/hi2";

const ContactUs = () => {
  useEffect(() => {
    document.title = "Contact Us | A S K Hospital";
  });
  return (
    <>
      <PageHeader title="Contact Us" />
      <h6>
        <HiMapPin size="19px" style={{ marginRight: "5px" }} />
        #152, 2nd Cross, 3rd Main,
        <br />
        <span style={{ marginLeft: "23px" }}>
          Rajajinagar, Bangalore - 560098
        </span>
      </h6>
      <h6>
        <HiEnvelope size="19px" style={{ marginRight: "5px" }} />
        deanoffice@askh.ac.in
      </h6>
      <p className="text-secondary ml-2 mt-2 mb-3">For Appointment / Enquiry</p>
      <h6>
        <HiDevicePhoneMobile size="19px" style={{ marginRight: "5px" }} />
        080 85647854
      </h6>
      <h6>
        <HiPhone size="18px" style={{ marginRight: "5px" }} />
        080 85798475
      </h6>
    </>
  );
};

export default ContactUs;
