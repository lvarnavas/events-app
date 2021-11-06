import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import Avatar from "../../shared/components/UIElements/Avatar";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import Slider from "react-slick";

import "../components/UserItem.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const UserItem = (props) => {
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      images: {
        value: null,
        isValid: true,
      },
    },
    false
  );

  const history = useHistory();

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

  const settings = {
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "linear",
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const ImageSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/users/imgprofile",
        "PATCH",
        JSON.stringify({
          userId: auth.userId,
          images: addImages(formState.inputs.images.value),
        }),
        {
          "Content-Type": "application/json",
          //   Authorization: "Bearer " + auth.token,
        }
      );
      history.push("/");
    } catch (err) {}
  };

  return (
    <div className="user-item">
      <h2 style={{ textAlign: "center" }}>Personal Information</h2>
      <hr />
      <br />
      <Card>
        {props.imageProf[0] === "" && (
          <React.Fragment>
            <div className="profile-image__preview">
              <p>You have not selected any profile photos.</p>
            </div>
            <ImageUpload center id="images" onInput={inputHandler} />
            <br />
            <br />
            {formState.inputs.images.value && (
              <div className="post-image">
                <Button inverse onClick={ImageSubmitHandler}>
                  UPLOAD
                </Button>
                <p>Notice! You can upload your profile images only once.</p>
                <br />
              </div>
            )}
          </React.Fragment>
        )}
        {props.imageProf[0] !== "" && (
          <div>
            <Slider {...settings}>
              {props.imageProf.map((i, index) => (
                <div className="image__avatar" key={index}>
                  <Avatar
                    {...settings}
                    image={`${process.env.REACT_APP_ASSET_URL}/${i}`}
                    alt={props.name}
                  />
                </div>
              ))}
            </Slider>
          </div>
        )}
        <div className="personal-info">
          <p>
            Name: <span className="user-info"> {props.name} </span>
          </p>
          <hr className="line" />
          <p>
            Email: <span className="user-info">{props.email} </span>
          </p>
          <hr className="line" />
          <p>
            Member since: <span className="user-info"> {props.createdAt} </span>
          </p>
        </div>
        <hr className="line" />
        <br />
        <div className="change-pass">
          <Button inverse to={`/update/${props.id}`}>
            Change password
          </Button>
        </div>
        <br />
      </Card>
    </div>
  );
};

export default UserItem;
