import React, { useState } from "react";
import { useFormikContext } from "formik";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

import FileInputBase from "../UI/FileInputBase";
import Modal from "../UI/Modal";

const FileInput = ({ name = "", title = "add avatar" }) => {
  const { setFieldValue } = useFormikContext();
  const [imageRef, setImageRef] = useState(null);
  const [isModal, setIsModal] = useState(false);
  const [src, setSrc] = useState(null);
  const [fileName, setFileName] = useState("");

  const [crop, setCrop] = useState({
    unit: "px",
    aspect: 1,
    width: 300,
    height: 300,
    y: 50,
    x: 100,
  });

  const closeModal = () => setIsModal(false);
  const openModal = () => setIsModal(true);
  const onImageLoaded = (image) => {
    setImageRef(image);
  };

  const onCropComplete = () => {
    makeClientCrop(crop);
  };

  const onCropChange = (crop) => {
    setCrop(crop);
  };

  const loadFile = (event) => {
    const file = event.currentTarget.files[0];
    if (file instanceof Blob) {
      openModal();
      setFileName(file.name);
      setSrc(URL.createObjectURL(file));
    }
  };

  const makeClientCrop = async (crop) => {
    if (imageRef && crop.width && crop.height) {
      const croppedImage = await getCroppedImg(imageRef, crop);
      if (croppedImage instanceof Blob) {
        setFieldValue(name, croppedImage);
      }
      setSrc(null);
      closeModal();
    }
  };

  const getCroppedImg = (image, crop) => {
    const { naturalWidth, naturalHeight, width, height } = image;
    const canvas = document.createElement("canvas");
    const scaleX = naturalWidth / width;
    const scaleY = naturalHeight / height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        blob.name = fileName;
        resolve(blob);
      });
    });
  };

  return (
    <>
      <FileInputBase
        name={name}
        title={title}
        onChange={(event) => loadFile(event)}
      />
      {isModal && (
        <Modal
          title="Crop your avatar"
          handleSubmit={onCropComplete}
          onClose={closeModal}
        >
          <ReactCrop
            imageStyle={{ maxHeight: "70vh", maxWidth: "70vw" }}
            onImageLoaded={onImageLoaded}
            onChange={onCropChange}
            ruleOfThirds
            circularCrop
            crop={crop}
            src={src}
          />
        </Modal>
      )}
    </>
  );
};

export default FileInput;
