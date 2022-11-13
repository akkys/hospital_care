import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRoom, deleteRoom, listRooms } from "../../../actions/LabRoomAction";
import TableHeader from "../../../misc/TableHeader";
import EmptyData from "../../../misc/EmptyData";
import ModalContainer from "../../Layout/ModalContainer";
import PageHeader from "../../Layout/PageHeader";
import PaginationButton from "../../Layout/PaginationButton";
import LoadingPage from "../../Pages/LoadingPage";
import LabRoom from "./LabRoom";
import InputTime from "../../../misc/InputTime";
import InputComp from "../../../misc/InputComp";

const LabRoomPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState("");
  const [num, setNum] = useState("");
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [groups, setGroups] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [resultPerPage] = useState(10);

  const { userInfo } = useSelector((state) => state.userSignin);
  const { rooms, loading } = useSelector((state) => state.roomList);
  const { success: successSave, error: errorSave } = useSelector(
    (state) => state.roomAdd
  );
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Laboratory | A S K Hospitals";
    dispatch(listRooms());
  }, [dispatch]);

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
      dispatch(listRooms());
    }
  }, [dispatch, successSave]);

  const openModal = (room) => {
    if (room._id) {
      setModalVisible(true);
      setId(room._id);
      setNum(room.num);
      setName(room.name);
      setCapacity(room.capacity);
      setFromTime(room.fromTime);
      setToTime(room.toTime);
      setGroups(room.groups);
    } else {
      setModalVisible(true);
      setId();
      setNum();
      setName();
      setCapacity();
      setFromTime();
      setToTime();
      setGroups();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const room = {
      _id: id,
      num,
      name,
      capacity,
      groups,
      fromTime,
      toTime,
    };
    dispatch(addRoom(room));
  };

  const deleteHandler = (room) => {
    dispatch(deleteRoom(room._id));
    dispatch(listRooms());
  };

  //Pagination
  const indexOfLastResult = currentPage * resultPerPage;
  const indexOfFirstResult = indexOfLastResult - resultPerPage;
  const currentResult =
    rooms && rooms.slice(indexOfFirstResult, indexOfLastResult);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const nextPage = () => {
    if (currentPage < rooms.length / resultPerPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const sampleGroups = [
    "Blood",
    "Urine",
    "Stool",
    "Throat Swab",
    "UV Scan",
    "MRI",
    "X-Ray",
  ];

  const roomListData = currentResult.map((room, i) => {
    return (
      <LabRoom
        key={i}
        index={i + 1}
        room={room}
        openModal={openModal}
        deleteHandler={deleteHandler}
        userInfo={userInfo}
      />
    );
  });

  const contents = [
    "#",
    "No.",
    "Room Name",
    "Sample Groups",
    "Capacity",
    "Timing",
    "Actions",
  ];

  return loading ? (
    <LoadingPage />
  ) : (
    <>
      <PageHeader
        data={rooms}
        fullTitle="List of Labs available in the Hospital"
        openModal={openModal}
        admin={userInfo.user.role === "Admin"}
      />
      {currentResult.length === 0 ? (
        <EmptyData
          name="Laboratory"
          title="Add all the available laboratories now!"
          data={rooms}
          openModal={openModal}
          admin={userInfo.user.role === "Admin"}
        />
      ) : (
        <div className=" mt-3">
          {rooms.length > 0 && (
            <TableHeader
              avatar
              contents={contents}
              data={roomListData}
              align="center"
            />
          )}
        </div>
      )}
      <PaginationButton
        PerPage={resultPerPage}
        total={rooms.length}
        paginate={paginate}
        currentPage={currentPage}
        nextPage={nextPage}
        prevPage={prevPage}
        perPageLength={currentResult.length}
      />
      {modalVisible && (
        <ModalContainer
          title="Laboratory"
          show={modalVisible}
          hide={() => setModalVisible(false)}
          size="md"
          onSubmit={handleSubmit}
          error={errorSave}
          id={id}>
          <InputComp
            label="Name"
            inputType="text"
            type="text"
            value={name}
            setValue={setName}
            placeholder="Enter Name"
            err={errorSave}
          />
          <InputComp
            label="Lab No."
            inputType="text"
            type="text"
            value={num}
            setValue={setNum}
            placeholder="Enter number"
            err={errorSave}
          />
          <InputComp
            label="Capacity"
            inputType="text"
            type="text"
            value={capacity}
            setValue={setCapacity}
            placeholder="Enter capacity"
            err={errorSave}
          />

          <InputTime
            label1="From Time"
            label2="To Time"
            inputType="text"
            type="time"
            value1={fromTime}
            setValue1={setFromTime}
            value2={toTime}
            setValue2={setToTime}
            err={errorSave}
          />
          <InputComp
            label="Sample Groups"
            data={sampleGroups}
            inputType="select"
            value={groups}
            setValue={setGroups}
            err={errorSave}
          />
        </ModalContainer>
      )}
    </>
  );
};

export default LabRoomPage;
