import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addWard, deleteWard, listWards } from "../../../actions/WardAction";
import EmptyData from "../../../misc/EmptyData";
import ModalContainer from "../../Layout/ModalContainer";
import PageHeader from "../../Layout/PageHeader";
import LoadingPage from "../../Pages/LoadingPage";
import WardList from "./WardList";
import InputComp from "../../../misc/InputComp";

const WardPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");

  const { userInfo } = useSelector((state) => state.userSignin);
  const { loading, wards } = useSelector((state) => state.wardList);
  const { success: successSave, error: errorSave } = useSelector(
    (state) => state.wardAdd
  );

  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Wards | A S K Hospitals";
    dispatch(listWards());
  }, [dispatch]);
  console.log(wards);

  useEffect(() => {
    document.title = "Wards | A S K Hospitals";
    if (successSave) {
      setModalVisible(false);
      dispatch(listWards());
    }
  }, [dispatch, successSave]);

  const openModal = (ward) => {
    if (ward._id) {
      setModalVisible(true);
      setId(ward._id);
      setName(ward.name);
      setDesc(ward.desc);
      setPrice(ward.price);
    } else {
      setModalVisible(true);
      setId();
      setName();
      setDesc();
      setPrice();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const ward = {
      _id: id,
      name,
      desc,
      price,
    };
    dispatch(addWard(ward));
  };

  const deleteHandler = (ward) => {
    dispatch(deleteWard(ward._id));
    dispatch(listWards());
  };

  const wardsListData = wards.map((ward, i) => {
    return (
      <WardList
        key={i}
        ward={ward}
        openModal={openModal}
        userInfo={userInfo}
        deleteHandler={deleteHandler}
      />
    );
  });
  return loading ? (
    <LoadingPage />
  ) : (
    <>
      <PageHeader
        data={wards}
        title="Wards"
        openModal={openModal}
        userInfo={userInfo}
        admin={userInfo.user.role === "Admin"}
      />
      {wards.length === 0 ? (
        <EmptyData
          name="Ward"
          title="Add all available wards now!"
          data={wards}
          openModal={openModal}
          userInfo={userInfo}
          admin={userInfo.user.role === "Admin"}
        />
      ) : (
        <div className="row">{wardsListData}</div>
      )}
      {modalVisible && (
        <ModalContainer
          title="Ward"
          show={modalVisible}
          hide={() => setModalVisible(false)}
          size="md"
          onSubmit={handleSubmit}
          error={errorSave}
          id={id}>
          <InputComp
            label="Room Name"
            inputType="text"
            type="text"
            value={name}
            setValue={setName}
            placeholder="Enter room type"
            err={errorSave}
          />
          <InputComp
            label="Price"
            inputType="text"
            type="text"
            value={price}
            setValue={setPrice}
            placeholder="Enter room price"
            err={errorSave}
          />
          <InputComp
            label="Description"
            inputType="textarea"
            type="textarea"
            value={desc}
            setValue={setDesc}
            placeholder="Enter room desc"
            err={errorSave}
            size="130px"
          />
        </ModalContainer>
      )}
    </>
  );
};

export default WardPage;
