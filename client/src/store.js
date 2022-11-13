import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import Cookie from "js-cookie";
import {
  userRegisterReducer,
  userSigninReducer,
  usersListReducer,
  deleteUserReducer,
} from "./reducers/UserAuthReducer";
import {
  addAppointmentReducer,
  appointmentListReducer,
  deleteAppointmentReducer,
} from "./reducers/AppointmentReducer";
import {
  addPatientReducer,
  deletePatientReducer,
  patientListReducer,
} from "./reducers/PatientReducer";
import {
  addRoomReducer,
  deleteRoomReducer,
  roomListReducer,
} from "./reducers/LabRoomReducer";
import {
  addWardReducer,
  deleteWardReducer,
  wardListReducer,
} from "./reducers/WardReducer";
import {
  addBranchReducer,
  branchListReducer,
  deleteBranchReducer,
} from "./reducers/BranchReducer";
import {
  addDoctorReducer,
  deleteDoctorReducer,
  doctorListReducer,
} from "./reducers/DoctorReducer";
import {
  addEmployeeReducer,
  deleteEmployeeReducer,
  employeeListReducer,
} from "./reducers/EmployeeReducer";
import {
  addDepartmentReducer,
  deleteDepartmentReducer,
  departmentListReducer,
} from "./reducers/DepartmentReducer";
import {
  addDesignationReducer,
  deleteDesignationReducer,
  designationListReducer,
} from "./reducers/DesignationReducer";
import {
  addWardenReducer,
  deleteWardenReducer,
  wardenListReducer,
} from "./reducers/WardenReducer";

const _userInfo = Cookie.get("userInfo") || null;
const userInfo = JSON.parse(_userInfo);

const initialState = {
  userSignin: { userInfo },
};

const reducer = combineReducers({
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  userList: usersListReducer,
  userDelete: deleteUserReducer,
  appointmentList: appointmentListReducer,
  appointmentAdd: addAppointmentReducer,
  appointmentDelete: deleteAppointmentReducer,
  patientList: patientListReducer,
  patientAdd: addPatientReducer,
  patientDelete: deletePatientReducer,
  doctorList: doctorListReducer,
  doctorAdd: addDoctorReducer,
  doctorDelete: deleteDoctorReducer,
  employeeList: employeeListReducer,
  employeeAdd: addEmployeeReducer,
  employeeDelete: deleteEmployeeReducer,
  roomList: roomListReducer,
  roomAdd: addRoomReducer,
  roomDelete: deleteRoomReducer,
  wardList: wardListReducer,
  wardAdd: addWardReducer,
  wardDelete: deleteWardReducer,
  branchList: branchListReducer,
  branchAdd: addBranchReducer,
  branchDelete: deleteBranchReducer,
  departmentList: departmentListReducer,
  departmentAdd: addDepartmentReducer,
  departmentDelete: deleteDepartmentReducer,
  designationList: designationListReducer,
  designationAdd: addDesignationReducer,
  designationDelete: deleteDesignationReducer,
  wardenList: wardenListReducer,
  wardenAdd: addWardenReducer,
  wardenDelete: deleteWardenReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
