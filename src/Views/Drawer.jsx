import React, { useState } from "react";
import "../Styles/Drawer.css";

let user = {
  title: "",
  subTitle: "",
  bgColor: "",
};

const Drawer = ({ CloseDrawer, color, CardsInc }) => {
  const [userDetails, setUserDetails] = useState({ ...user });

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    CardsInc(userDetails);
    setUserDetails({ ...user });
  };

  return (
    <div className="drawer-content">
      <div className="creation-heading">
        <h3>Creative Creation</h3>
        <span className="close-button" onClick={() => CloseDrawer()}>
          x
        </span>
      </div>
      <form>
        <div className="form-elements">
          <label htmlFor="title"> Title</label>
          <input
            id="title"
            className="cards-input"
            type="text"
            name="title"
            placeholder="This is a title..."
            value={userDetails.title}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-elements">
          <label htmlFor="subTitle">Sub Title</label>
          <input
            id="subTitle"
            className="cards-input"
            type="text"
            name="subTitle"
            placeholder="This is a sub title..."
            value={userDetails.subTitle}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-elements">
          <label htmlFor="bgColor"> Background Color</label>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {color.map((data) => (
              <div
                key={data}
                style={{
                  backgroundColor: data,
                }}
                className="color-type"
                name="bgColor"
                onClick={(e) =>
                  setUserDetails({ ...userDetails, bgColor: data })
                }
              />
            ))}
          </div>
        </div>
        <div></div>
      </form>
      <button
        className="drawer-done-button"
        disabled={
          !(userDetails.bgColor && userDetails.subTitle && userDetails.title)
        }
        onClick={(e) => handleSubmit(e)}
      >
        {" "}
        Done
      </button>
    </div>
  );
};

export default Drawer;
