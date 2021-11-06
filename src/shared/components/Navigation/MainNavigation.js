import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import { useHttpClient } from "../../hooks/http-hook";
import { EventFieldsContext } from "../../context/event-fields-context";
import "./MainNavigation.css";
import Backdrop from "../UIElements/Backdrop";

const MainNavigation = (props) => {
  const { sendRequest } = useHttpClient();
  const { setCities, setCategories, setPrefectures } =
    useContext(EventFieldsContext);

  useEffect(() => {
    const getData = async () => {
      try {
        const { cities } = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/events/c/cities",
          "GET"
        );
        const { categories } = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/events/cat/categories",
          "GET"
        );
        const { prefectures } = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/events/p/prefectures",
          "GET"
        );
        setCities(cities.map((cityObj) => cityObj.city));
        setCategories(categories.map((categoryObj) => categoryObj.category));
        setPrefectures(
          prefectures.map((prefectureObj) => prefectureObj.prefecture)
        );
      } catch (err) {}
    };

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  // If click on the SideDrawer then set it open
  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };

  return (
    <React.Fragment>
      {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}(
      <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
        <nav className="main-navigation__drawer-nav">
          <NavLinks />
        </nav>
      </SideDrawer>
      <MainHeader>
        <button
          className="main-navigation__menu-btn"
          onClick={openDrawerHandler}
        >
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">EVENTS</Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
