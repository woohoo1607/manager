import React, { useEffect } from "react";

import ModalHeader from "./ModalHeader";
import ModalFooter from "./ModalFooter";
import ModalBody from "./ModalBody";

import "./styles.css";

const Modal = ({
  title = "",
  onClose = () => {},
  handleSubmit = () => {},
  children,
}) => {
  useEffect(() => {
    document.body.classList.add("no-scroll");
    return () => document.body.classList.remove("no-scroll");
  }, []);

  return (
    <div className="modal-wrapper">
      <div className="modal">
        <ModalHeader title={title} onClose={onClose} />
        <ModalBody>{children}</ModalBody>
        <ModalFooter onClose={onClose} handleSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default Modal;
