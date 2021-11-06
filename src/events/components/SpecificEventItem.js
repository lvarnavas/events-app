import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";

import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import Map from "../../shared/components/UIElements/Map";
import Input from "../../shared/components/FormElements/Input";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import {
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { useHistory } from "react-router-dom";
import { useForm } from "../../shared/hooks/form-hook";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import EventMap, { withScriptjs } from "../pages/EventsDirectionsMap";

import Comment from "../pages/Comment";

import "./SpecificEventItem.css";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import placeholder from "../icons/placeholder.png";
import interests from "../icons/interests.png";
import calendar from "../icons/calendar.png";
import clock from "../icons/clock.png";
import notes from "../icons/notes.png";
// import copyright from "../icons/copyright.png";
import googlemaps from "../icons/googlemaps.png";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "white" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "white" }}
      onClick={onClick}
    />
  );
}

const SpecificEventItem = (props) => {
  const [showMapModal, setShowMapModal] = useState(false);
  const [origin, setOrigin] = useState(undefined);
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const auth = useContext(AuthContext);
  const eventId = useParams().eventId;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const MapLoader = withScriptjs(EventMap);
  const destination = {
    lat: parseFloat(props.lat),
    lng: parseFloat(props.lng),
  };

  const [formState, inputHandler] = useForm(
    {
      comment: {
        value: "",
        isValid: false,
      },
      images: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  const showReportWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelReportHandler = () => {
    setShowConfirmModal(false);
  };

  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);
  const closeMapModalHandler = () => setShowMapModal(false);

  const history = useHistory();

  const lat = parseFloat(props.lat);
  const lng = parseFloat(props.lng);

  const coordinates = { lat: lat, lng: lng };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const addImages = (images) => {
    if (!images || images.length < 1) {
      return null;
    }

    const imagesArr = [];
    for (const img of images) {
      imagesArr.push(img.image);
    }
    return JSON.stringify(imagesArr);
  };

  const getDirections = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const origin = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setOrigin(origin);
        setShowMapModal(true);
      });
    }
  };

  const confirmReportHandler = async (event) => {
    event.preventDefault();
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/events/report/${eventId}`,
        "POST",
        JSON.stringify({
          userId: auth.userId,
          creatorId: props.creatorId,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
    } catch (err) {}
  };

  const eventCommentSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/events/comment/${eventId}`,
        "POST",
        JSON.stringify({
          comment: formState.inputs.comment.value,
          images: addImages(formState.inputs.images.value),
          userId: auth.userId,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      history.push("/specific/" + eventId);
      window.location.reload();
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={<div>{props.address}</div>}
        contentClass="specific-item__modal-content"
        footerClass="specific-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <div className="map-container">
          <Map center={coordinates} zoom={16} />
        </div>
      </Modal>
      <Modal
        show={showConfirmModal}
        onCancel={cancelReportHandler}
        header="Are you sure?"
        footerClass="specific-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelReportHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmReportHandler}>
              REPORT
            </Button>
          </React.Fragment>
        }
      >
        <p>
          Do you want to proceed and report this event? Please note that it
          can't be undone.
        </p>
      </Modal>
      <li className="specific-item">
        {isLoading && <LoadingSpinner asOverlay />}
        <Slider {...settings}>
          {props.images.map((image, index) => (
            <div key={index} className="specific-item__image">
              <img
                src={`${process.env.REACT_APP_ASSET_URL}/${image}`}
                alt={props.title}
              />
            </div>
          ))}
        </Slider>
        <div className="specific-item__info">
          <h2> {props.title} </h2>
          <p>
            <img src={googlemaps} alt="Logo" onClick={openMapHandler} />{" "}
            Address: <strong> {props.address} </strong>
            <hr className="line" />
            <p>
              <img src={placeholder} alt="Logo" /> Hosted in{" "}
              <strong>
                {" "}
                {props.city}, <i>{props.prefecture}</i>{" "}
              </strong>
            </p>
          </p>
          <hr className="line" />
          <p>
            <img src={interests} alt="Logo" /> Belongs to the category:{" "}
            <strong> {props.category} </strong>
          </p>
          <hr className="line" />
          <p>
            <img src={calendar} alt="Logo" /> Begins:
            <strong> {props.startDate} </strong> ends:
            <strong> {props.endDate} </strong>
          </p>
          <hr className="line" />
          <p>
            <img src={clock} alt="Logo" /> Opening time:
            <strong> {props.startTime} </strong>
          </p>
          <hr />
          <p style={{ textAlign: "left" }}>
            <img src={notes} alt="Logo" />
            {props.description}
          </p>
          <p className="created-by">
            <i>created by </i> <strong>{props.creator}</strong>
          </p>
        </div>
        <div className="specific-item__actions">
          <Button onClick={openMapHandler}>VIEW LOCATION</Button>
          <Button inverse onClick={getDirections}>
            GET DIRECTIONS
          </Button>
          {auth.isLoggedIn && (
            <Button danger onClick={showReportWarningHandler}>
              REPORT
            </Button>
          )}
        </div>
      </li>
      <Modal
        show={showMapModal}
        onCancel={closeMapModalHandler}
        header={<div>Directions to {props.address}</div>}
        footerClass="specific-item__modal-actions"
        footer={<Button onClick={closeMapModalHandler}>CLOSE</Button>}
      >
        <MapLoader
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}`}
          loadingElement={<div style={{ height: `100px` }} />}
          origin={origin}
          destination={destination}
        />
        <div />
      </Modal>
      <div>
        {isLoading && <LoadingSpinner asOverlay />}
        {auth.isLoggedIn && (
          <React.Fragment>
            <h3 className="center">ADD YOUR COMMENTS</h3>
            <div>
              <Input
                id="comment"
                element="textarea"
                placeholder="Enter your comment here..."
                validators={[VALIDATOR_MINLENGTH(1), VALIDATOR_MAXLENGTH(255)]}
                errorText="Please enter a valid comment (min 1 character - max 255) or pick an image."
                onInput={inputHandler}
              />
            </div>
            <div>
              <Button
                onClick={eventCommentSubmitHandler}
                disabled={
                  !formState.inputs.comment.value &&
                  !formState.inputs.images.value
                }
              >
                Add Comment
              </Button>
              <p>or/ and</p>
              <ImageUpload id="images" onInput={inputHandler} />
            </div>
          </React.Fragment>
        )}
        <br />
        <br />
        <h3 className="comments-section">COMMENTS SECTION</h3>
        <hr />
        <Comment />
      </div>
    </React.Fragment>
  );
};

export default SpecificEventItem;
