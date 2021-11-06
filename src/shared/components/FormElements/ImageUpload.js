import React, { useRef, useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { AuthContext } from "../../context/auth-context";

import Button from "./Button";
import "./ImageUpload.css";
import LoadingSpinner from "../UIElements/LoadingSpinner";

const ImageUpload = (props) => {
  const [files, setFiles] = useState();
  const auth = useContext(AuthContext);
  const [isValid, setIsValid] = useState(false);
  const { isLoading, sendRequest } = useHttpClient();
  let [loadedEvents, setLoadedEvents] = useState();

  const { id, onInput } = props;

  const filePickerRef = useRef();

  const eventId = useParams().eventId;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        if (files) {
          const responseData = await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/events/image`,
            "POST",
            files,
            {
              Authorization: "Bearer " + auth.token,
            }
          );
          onInput(id, responseData.images, true);
          setLoadedEvents(responseData.images);
        }
      } catch (err) {}
    };
    fetchEvents();
  }, [sendRequest, setLoadedEvents, files, eventId, id, onInput, auth.token]);

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  const onImagesSelect = (event) => {
    const images = Array.from(event.target.files);
    const formData = new FormData();
    for (const image of images) {
      formData.append("images", image);
    }
    setFiles(formData);
    setIsValid(true);
  };

  return (
    <div className="form-control">
      {isLoading && <LoadingSpinner asOverlay />}
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: "none" }}
        type="file"
        multiple
        accept=".jpg,.png,.jpeg"
        onChange={onImagesSelect}
      />
      <div className={`image-upload ${props.center && "center"}`}>
        {/* {!loadedEvents && (
          <div className="image-upload__preview">
            <p>Pick image(s).</p>
          </div>
        )} */}
        {loadedEvents &&
          loadedEvents.map((event, index) => (
            <div key={index} className="image-upload__preview">
              <img
                src={`${process.env.REACT_APP_ASSET_URL}/${event.image}`}
                alt="Preview"
              />
            </div>
          ))}
        <Button image type="button" onClick={pickImageHandler}>
          Pick Image
        </Button>
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default ImageUpload;
