import React from "react";
import { Link } from "react-router-dom";
import Card from "../../shared/components/UIElements/Card";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./EventItem.css";

const PrefectureAndStartDateItem = (props) => {
  const settings = {
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "linear",
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <li className="event-item">
      <Card>
        <Link to={`/specific/${props.id}`} className="link-item">
          <Slider {...settings}>
            {props.images.map((image, index) => (
              <div key={index} className="event-item__image">
                <img
                  src={`${process.env.REACT_APP_ASSET_URL}/${image}`}
                  alt={props.title}
                />
              </div>
            ))}
          </Slider>
          <h3> {props.title} </h3>
        </Link>
      </Card>
    </li>
  );
};

export default PrefectureAndStartDateItem;
