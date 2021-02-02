import React, { useState } from "react";
import { Button, Row, Col } from "react-bootstrap";
import Avatar from "react-avatar-edit";

import defaultAvatar from "../assets/images/default-avatar.jpg";

export default function App() {
  let src = defaultAvatar;
  const [preview, setPreview] = useState(null);
  const [changeDisplay, setChangeDisplay] = useState("d-none");
  const [avatarDisplay, setAvatarDisplay] = useState("d-flex");

  function onClose() {
    setPreview(null);
  }

  function onCrop(preview) {
    setPreview(preview);
  }

  function onBeforeFileLoad(elem) {
    if (elem.target.files[0].size > 71680) {
      alert("File is too big!");
      elem.target.value = "";
    }
  }

  function showEditor() {
    setChangeDisplay("d-flex");
    setAvatarDisplay("d-none");
  }
  function showAvatar() {
    setChangeDisplay("d-none");
    setAvatarDisplay("d-flex");
  }
  function saveAvatar() {
    showEditor();
  }

  return (
    <Row className="text-center Avatar">
      <Col
        className={`${changeDisplay} flex-column justify-content-center align-items-center`}
      >
        <Avatar
          width={150}
          height={150}
          cropRadius={70}
          onCrop={onCrop}
          onClose={onClose}
          onBeforeFileLoad={onBeforeFileLoad}
          src={src}
        />
        <div className="d-flex mt-2">
          <Button onClick={saveAvatar} className="mx-1">
            Save
          </Button>
          <Button onClick={showAvatar} className="bg-danger mx-1">
            Cancel
          </Button>
        </div>
      </Col>
      <Col
        className={`${avatarDisplay} flex-column justify-content-center align-items-center`}
      >
        <img src={src} alt="Preview" className="avatar-preview" />
        <Button onClick={showEditor} className="mt-2">
          Change
        </Button>
      </Col>
    </Row>
  );
}
