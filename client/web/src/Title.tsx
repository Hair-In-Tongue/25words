import React, { useState } from "react";
import { Link } from "react-router-dom";

function Title() {
  const [gameId, setGameId] = useState<string>("");
  return (
    <>
      <div
        className={"tussie--title-header"}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h3 style={{ margin: 4 }}>Tussie Mussie</h3>
        </div>
      </div>
      <div className="tussie--title-container">
        <div
          className="inputs"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 8,
          }}
        >
          <span>
            <Link to="/game" style={{ display: "inline-block" }}>
              New Game
            </Link>
          </span>
          <br />
          <label htmlFor="gameIdInput">Game code:</label>
          <input
            type="text"
            id="gameIdInput"
            className="hive-input-btn-input"
            value={gameId}
            onChange={(e) => setGameId(e.target.value.toLowerCase())}
          />
          <span>
            <Link to={`/game/${gameId}`} style={{ display: "inline-block" }}>
              Join Game
            </Link>
          </span>
        </div>
      </div>
    </>
  );
}

export default Title;
