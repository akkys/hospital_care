const { check, validationResult } = require("express-validator");

exports.validateLabRoom = [
  check("name").notEmpty().withMessage("Please enter Room Name."),
  check("num").notEmpty().withMessage("Please enter Room Number."),
  check("capacity").notEmpty().withMessage("Please enter Room Capacity."),
  check("fromTime").notEmpty().withMessage("Please select From Time."),
  check("toTime").notEmpty().withMessage("Please select Till Time."),
  check("groups").notEmpty().withMessage("Please select particular Group."),
];

exports.validateAppointment = [
  check("name").notEmpty().withMessage("Please enter Name."),
  check("email").isEmail().withMessage("Please enter a valid Email."),
  check("contact").notEmpty().withMessage("Please enter Contact Number."),
  check("date").notEmpty().withMessage("Please select Date."),
  check("fromTime").notEmpty().withMessage("Please select From Time."),
  check("toTime").notEmpty().withMessage("Please select Till Time."),
  check("docName").notEmpty().withMessage("Please select Doctor's Name."),
  check("department")
    .notEmpty()
    .withMessage("Please select particular Department."),
  check("address").notEmpty().withMessage("Please enter Address."),
  check("city").notEmpty().withMessage("Please enter City."),
  check("zipcode").notEmpty().withMessage("Please enter Zipcode."),
  check("reason").notEmpty().withMessage("Please select the Appointment Type."),
  check("status").notEmpty().withMessage("Please select the Status."),
];

exports.validateEmployee = [
  check("empId").notEmpty().withMessage("Please enter Employee ID."),
  check("name").notEmpty().withMessage("Please enter Employee Name."),
  check("email")
    .notEmpty()
    .withMessage("Please select from Employee name for valid Email."),
  check("gender").notEmpty().withMessage("Please select Gender."),
  check("dob").notEmpty().withMessage("Please select Date of Birth."),
  check("bloodGroup").notEmpty().withMessage("Please select Blood Group."),
  check("designationId")
    .notEmpty()
    .withMessage("Please select particular Designation."),
  check("joinDate").notEmpty().withMessage("Please select Date of Joining."),
  check("deptId")
    .notEmpty()
    .withMessage("Please select particular Department."),
  check("contact")
    .notEmpty()
    .withMessage("Please enter Patient Contact Number."),
];

exports.validateBranch = [
  check("address").notEmpty().withMessage("Please enter Branch Address."),
  check("email").isEmail().withMessage("Please enter a valid Email."),
  check("contact").notEmpty().withMessage("Please enter Contact Number."),
  check("helpLine").notEmpty().withMessage("Please enter Helpline Number."),
];

exports.validateName = [
  check("name").notEmpty().withMessage("Please enter Name."),
];

exports.validateDoctor = [
  check("name").notEmpty().withMessage("Please enter Doctor Name."),
  check("gender").notEmpty().withMessage("Please select Gender."),
  check("qualification").notEmpty().withMessage("Please enter Qualification."),
  check("expert").notEmpty().withMessage("Please enter Expertise in."),
  check("exp").notEmpty().withMessage("Please enter Work Experience."),
  check("contact")
    .notEmpty()
    .withMessage("Please enter Doctor's Contact Number."),
  check("available")
    .notEmpty()
    .withMessage("Please select Doctor's available timing."),
  check("time")
    .notEmpty()
    .withMessage("Please enter Doctor's available hours."),
  check("desc").notEmpty().withMessage("Please enter Doctor's Description."),
];

exports.validatePatient = [
  check("pid").notEmpty().withMessage("Please enter Patient ID."),
  check("name").notEmpty().withMessage("Please enter Patient Name."),
  check("admitDate")
    .notEmpty()
    .withMessage("Please select Admission Date & Time."),
  check("status").notEmpty().withMessage("Please select the current Status."),
  check("roomNum").notEmpty().withMessage("Please enter Room Number."),
  check("roomType").notEmpty().withMessage("Please enter Room Type."),
  check("docName").notEmpty().withMessage("Please select Doctor's Name."),
  check("dob").notEmpty().withMessage("Please select Date of Birth."),
  check("age").notEmpty().withMessage("Please enter the Age."),
  check("gender").notEmpty().withMessage("Please select Gender."),
  check("bloodGroup").notEmpty().withMessage("Please select Blood Group."),
  check("contact")
    .notEmpty()
    .withMessage("Please enter Patient's Contact Number."),
  check("address")
    .notEmpty()
    .withMessage("Please enter Patient's Full Address."),
  check("maritalStatus")
    .notEmpty()
    .withMessage("Please select Patient's Marital Status."),
  check("admitReason")
    .notEmpty()
    .withMessage("Please enter Patient's Admit Reason."),
  check("pastMedication")
    .notEmpty()
    .withMessage("Please enter `No` if not taking any Medication."),
];

exports.validateWarden = [
  check("empId").notEmpty().withMessage("Please enter Warden ID."),
  check("name").notEmpty().withMessage("Please enter Warden Name."),
  check("gender").notEmpty().withMessage("Please select Gender."),
  check("dob").notEmpty().withMessage("Please select Date of Birth."),
  check("bloodGroup").notEmpty().withMessage("Please select Blood Group."),
  check("joinDate").notEmpty().withMessage("Please select Date of Joining."),
  check("contact")
    .notEmpty()
    .withMessage("Please enter Warden Contact Number."),
];

exports.validateWard = [
  check("name").notEmpty().withMessage("Please enter Ward Name."),
  check("desc").notEmpty().withMessage("Please enter Ward Description."),
  check("price").notEmpty().withMessage("Please enter Ward Price."),
];

exports.isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  next();
};
