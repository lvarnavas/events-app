import React from "react";

import UserItem from "./UserItem";
import "./Profile.css";

const Profile = (props) => {
  if (props.items.length === 0) {
    return (
      <div>
        <h2>No user found</h2>
      </div>
    );
  }
  return (
    <ul className="users-list">
      {props.items.map((user) => (
        <UserItem
          key={user.id}
          id={user.id}
          name={user.name}
          email={user.email}
          imageProf={JSON.parse(user.images) || [""]}
          createdAt={user.createdAt}

        />
      ))}
    </ul>
  );
};

export default Profile;
