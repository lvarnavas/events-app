import React, { useState, useContext } from "react";

import Avatar from "../../shared/components/UIElements/Avatar";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import Modal from "../../shared/components/UIElements/Modal";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./CommentItem.css";

const CommentItem = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `
            ${process.env.REACT_APP_BACKEND_URL}/events/comment/${props.id}/event/${props.eventId}`,
        "DELETE",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      props.onDeleteComment(props.id);
    } catch (err) {}
  };

  const settings = {
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "none",
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <React.Fragment>
      {props.profileImage[0] !== "" && (
        <div>
          <Slider {...settings}>
            {props.profileImage.map((image, index) => (
              <div key={index} className="profile-image">
                <Avatar
                  image={`${process.env.REACT_APP_ASSET_URL}/${image}`}
                  alt={props.name}
                />
              </div>
            ))}
          </Slider>
          <h3 className="center">{props.user} </h3>
        </div>
      )}
      <div className="user__content">
        <ErrorModal error={error} onClear={clearError} />
        <Modal
          show={showConfirmModal}
          onCancel={cancelDeleteHandler}
          header="Are you sure?"
          footerClass="place-item__modal-actions"
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
          <p>Do you want to proceed and delete this comment?</p>
        </Modal>
        <div>
          {isLoading && <LoadingSpinner asOverlay />}
          <div>
            <div className="button-remove-comment">
              {auth.userId === props.creatorId && (
                <Button danger onClick={showDeleteWarningHandler}>
                  x
                </Button>
              )}
            </div>

            <p className="content">{props.content}</p>
            <div>
              {props.images.map((image, index) => (
                <div key={index} className="comment-item__image">
                  <img
                    src={`${process.env.REACT_APP_ASSET_URL}/${image}`}
                    alt={props.title}
                  />
                </div>
              ))}
            </div>
          </div>
          <p className="posted-at">
            {"posted at "} <i>{props.createdAt}</i>
          </p>
        </div>
      </div>
      <hr />
    </React.Fragment>
  );
};

export default CommentItem;
