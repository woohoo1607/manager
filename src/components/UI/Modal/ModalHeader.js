import React from "react";
import IconButton from "../IconButton";

const ModalHeader = ({ title = "", onClose = () => {} }) => {
  return (
    <header className="modal__header">
      <div></div>
      <h2 className="modal__title">{title}</h2>
      <IconButton icon="close" onClick={onClose} />
    </header>
  );
};

export default ModalHeader;
