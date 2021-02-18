import React from "react";
import Button from "../Button";

const ModalFooter = ({ handleSubmit = () => {}, onClose = () => {} }) => {
  return (
    <footer className="modal__footer">
      <Button
        className="modal__button modal__button_cancel"
        type="button"
        onClick={onClose}
      >
        Cancel
      </Button>
      <Button
        className="modal__button modal__button_success"
        type="button"
        onClick={handleSubmit}
      >
        Save
      </Button>
    </footer>
  );
};

export default ModalFooter;
