import React, { useEffect } from "react";

import IconButton from "../IconButton";
import Button from "../Button";

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
        <div className="modal__header">
          <div></div>
          <h2 className="modal__title">{title}</h2>
          <IconButton icon="close" onClick={onClose} />
        </div>
        <div className="modal__body">{children}</div>
        <div className="modal__footer">
          <Button
            className="modal__button"
            variant="cancel"
            type="button"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            className="modal__button"
            variant="success"
            type="button"
            onClick={handleSubmit}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
