import { Modal } from "@components/modal";
import dynamic from "next/dynamic";
import { useModalAction, useModalState } from "./ModalProvider";

// const Login = dynamic(() => import("../../../containers/auth/Login"));

const ManagedModal = () => {
  const { isOpen, view, data } = useModalState();
  const { closeModal } = useModalAction();

  return (
    <Modal open={isOpen} onClose={closeModal}>
      <div className="text-xl text-center">HELLO FROM MODAL</div>
      {/* {view === "LOGIN_VIEW" && <Login />} */}
      {/* {view === "REGISTER" && <Register />}
      {view === "PRODUCT_DETAILS" && <ProductPopup data={data} />}
      {view === "SELECT_CATEGORY" && (
        <SelectProductCategory onSelect={data.onSelect} />
      )} */}
    </Modal>
  );
};

export default ManagedModal;
