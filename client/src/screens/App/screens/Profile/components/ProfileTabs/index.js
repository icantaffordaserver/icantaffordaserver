import React from "react";

export default props => {
  return (
    <ul>
      <li>
        <button onClick={e => props.changeTab(e, "about")}>About</button>
      </li>
      <li>
        <button onClick={e => props.changeTab(e, "availability")}>
          Availability
        </button>
      </li>
      <li>
        <button onClick={e => props.changeTab(e, "settings")}>Settings</button>
      </li>
    </ul>
  );
};
