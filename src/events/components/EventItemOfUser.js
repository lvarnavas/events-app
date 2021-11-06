import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import Map from "../../shared/components/UIElements/Map";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "./EventItemOfUser.css";
import Card from "../../shared/components/UIElements/Card";

const EventItemOfUser = (props) => {
  const { error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);


  const closeMapHandler = () => setShowMap(false);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const history = useHistory();

  const confirmDeleteHandler = async (event) => {
    event.preventDefault();
    setShowConfirmModal(false);
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + `/events/${props.id}`,
        "DELETE",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      props.onDelete(props.id);
      window.location.reload();
      history.push("/user/" + auth.userId);
    } catch (err) {}
  };

  const lat = parseFloat(props.lat);
  const lng = parseFloat(props.lng);

  const coordinates = { lat: lat, lng: lng };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass="event-item-of-user__modal-content"
        footerClass="event-item-of-user__modal-actions"
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <div className="map-container">
          <Map center={coordinates} zoom={16} />
        </div>
      </Modal>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="event-item-of-user__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        <p>
          Do you want to proceed and delete this event? Please note that it
          can't be undone.
        </p>
      </Modal>
      <Card className="event-item-of-user">
        <div className="event-item-of-user__actions">
          <br />
          <div className="title-btn" >
            {props.title}
          </div>
          <br />
          <br />
          <div>
            {auth.userId === props.creatorId && (
              <div>
                <Button inverse to={`/edit/${props.id}`}>
                  EDIT EVENT
                </Button>
                <Button inverse onClick={showDeleteWarningHandler}>
                  DELETE EVENT
                </Button>
                <Button inverse to={`/specific/${props.id}`}>
                  GO TO EVENT
                </Button>
              </div>
            )}
          </div>
        </div>
      </Card>
    </React.Fragment>
  );
};

export default EventItemOfUser;
