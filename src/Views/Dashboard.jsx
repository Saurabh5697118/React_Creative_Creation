import React, { useEffect, useState } from "react";
import Drawer from "./Drawer";
import "../Styles/Dashboard.css";

const Dashboard = () => {
  const [bgColors, setBgColors] = useState([]);
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([...cards]);
  const [enableDrawer, setEnableDrawer] = useState(false);

  const GetColors = async () => {
    const response = await fetch(
      "https://random-flat-colors.vercel.app/api/random?count=5"
    );
    const { colors } = await response.json();
    setBgColors(colors);
  };
  useEffect(() => {
    GetColors();
  }, []);

  function OpenDrawer() {
    if (cards.length === bgColors.length) return;
    setEnableDrawer(true);
    document.getElementById("main-drawer").style.width = "35%";
    document.getElementById("main-drawer").style.minWidth = "35%";
  }
  function CloseDrawer() {
    setEnableDrawer(false);
    document.getElementById("main-drawer").style.width = "0";
    document.getElementById("main-drawer").style.minWidth = "0";
  }

  const CardsInc = (val) => {
    if (cards.length !== bgColors.length) {
      setCards([...cards, val]);
      setSelectedCards([...selectedCards, val]);
    } else CloseDrawer();
  };

  return (
    <div className="main-dashboard">
      <div className="filter-section">
        <h3>Filter By:</h3>
        <div className="filters">
          <div style={{ padding: "10px 0px", width: 200 }}>
            <label>Color</label>
            <div
              style={{ display: "flex", flexWrap: "wrap", padding: "10px 0px" }}
            >
              {bgColors.map((data) => (
                <div
                  key={data}
                  style={{
                    backgroundColor: data,
                  }}
                  className="color-type"
                  name="bgColor"
                  onClick={() => {
                    const filteredCards = cards.filter(
                      (obj) => obj.bgColor === data
                    );
                    setSelectedCards(filteredCards);
                  }}
                />
              ))}
            </div>
          </div>
          <div style={{ padding: "10px 0px", width: 200 }}>
            <label>Title / Subtitle</label>

            <input
              className="search-title"
              placeholder="search by title/subtitle"
              onChange={(e) => {
                const filteredCardsByTitle = cards.filter((obj) =>
                  obj.title.toLowerCase().includes(e.target.value.toLowerCase())
                );
                if (!filteredCardsByTitle.length) {
                  const filteredCardsBySubTitle = cards.filter((obj) =>
                    obj.subTitle
                      .toLowerCase()
                      .includes(e.target.value.toLowerCase())
                  );
                  if (!filteredCardsBySubTitle.length) setSelectedCards(cards);
                  else setSelectedCards(filteredCardsBySubTitle);
                } else {
                  setSelectedCards(filteredCardsByTitle);
                }
              }}
            />
          </div>
        </div>
        <div className="creatives-bar">
          <div className="bar">
            <div
              className="bar-progress"
              style={{ width: `${(cards.length / bgColors.length) * 100}%` }}
            />
          </div>
          <span>
            {" "}
            {cards.length} / {bgColors.length} Creatives
          </span>
        </div>
        <button
          className="add-creative-button"
          onClick={() => OpenDrawer()}
          disabled={enableDrawer}
        >
          + Add Creative
        </button>
        <div className="show-creatives">
          {selectedCards.map((obj) => (
            <div
              className="creative-cards"
              style={{ backgroundColor: obj.bgColor }}
            >
              <h2>{obj.title}</h2>
              <h4>{obj.subTitle}</h4>
            </div>
          ))}
        </div>
      </div>
      <div id="main-drawer" className="drawer">
        <Drawer
          CloseDrawer={() => CloseDrawer()}
          CardsInc={(value) => CardsInc(value)}
          color={bgColors}
        />
      </div>
    </div>
  );
};

export default Dashboard;
