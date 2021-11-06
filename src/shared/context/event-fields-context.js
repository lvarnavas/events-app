import React, { createContext, useReducer } from "react";

const initialEventFieldsState = {
  cities: [],
  categories: [],
  prefectures: [],
};

const eventFieldsType = {
  SET_CITIES: "SET_CITIES",
  SET_CATEGORIES: "SET_CATEGORIES",
  SET_PREFECTURES: "SET_PREFECTURES",
};

const eventFieldsReducer = (state, action) => {
  switch (action.type) {
    case eventFieldsType.SET_CITIES:
      return {
        ...state,
        cities: action.payload,
      };
    case eventFieldsType.SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case eventFieldsType.SET_PREFECTURES:
      return {
        ...state,
        prefectures: action.payload,
      };
    default:
      return state;
  }
};

const EventFieldsContext = createContext(initialEventFieldsState);
const EventFieldsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    eventFieldsReducer,
    initialEventFieldsState
  );

  function setCities(cities) {
    dispatch({
      type: eventFieldsType.SET_CITIES,
      payload: cities,
    });
  }

  function setCategories(categories) {
    dispatch({
      type: eventFieldsType.SET_CATEGORIES,
      payload: categories,
    });
  }

  function setPrefectures(prefectures) {
    dispatch({
      type: eventFieldsType.SET_PREFECTURES,
      payload: prefectures,
    });
  }

  const dispatches = {
    setCities,
    setCategories,
    setPrefectures,
  };

  return (
    <EventFieldsContext.Provider value={{ ...state, ...dispatches }}>
      {children}
    </EventFieldsContext.Provider>
  );
};

export { EventFieldsContext, EventFieldsProvider };
