import React, { useState } from "react";
import { PlayerState, PlayerInfo } from "../../../../api/types";
import { HathoraConnection } from "../../../.hathora/client";
import CardComponent from "./Card";

interface IRoundRecapProps {
  isCreator: boolean;
  currentPlayerInfo: PlayerInfo;
  playerState: PlayerState;
  client: HathoraConnection;
}

function RoundRecap(props: IRoundRecapProps) {
  const { client, playerState, currentPlayerInfo } = props;

  const [arrangementZoom, setArrangementZoom] = useState("");

  return (
    <div>
      {currentPlayerInfo && playerState && (
        <div
          className={"tussie--score-header"}
          style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
        >
          <h2 style={{ margin: 3 }}>Round {playerState.round + 1} Recap</h2>
          {playerState.players
            .sort((a, b) => b.score - a.score)
            .map((p) => {
              return (
                <p style={{ margin: 4, fontWeight: 900 }} key={p.name}>
                  {p.name}: {p.score}
                </p>
              );
            })}
        </div>
      )}
      {playerState.round === 2 && (
        <h1 style={{ textAlign: "center" }}>{playerState.players.sort((a, b) => b.score - a.score)[0].name} wins!</h1>
      )}

      <h3>Your Arrangement:</h3>
      <button className={"tussie--button-small"} onClick={() => setZoom(currentPlayerInfo.name)}>
        {arrangementZoom === currentPlayerInfo.name ? "Unzoom" : "Zoom"}
      </button>
      <div style={{ display: "flex", overflowX: "auto" }}>
        {currentPlayerInfo &&
          currentPlayerInfo.hand.map((hc) => {
            return (
              <CardComponent
                key={hc.card.id}
                val={hc.card}
                state={playerState}
                client={client}
                isKeepsake={hc.isKeepsake}
                isSmall={currentPlayerInfo.name !== arrangementZoom}
              />
            );
          })}
      </div>

      {currentPlayerInfo &&
        playerState &&
        playerState.players
          .filter((p) => p.name !== currentPlayerInfo.name)
          .map((p) => {
            return (
              <>
                <h3 key={p.name}>{p.name}'s Arrangement:</h3>
                <button className={"tussie--button-small"} onClick={() => setZoom(p.name)}>
                  {arrangementZoom === p.name ? "Unzoom" : "Zoom"}
                </button>
                <div style={{ display: "flex", overflowX: "auto" }}>
                  {p.hand.map((hc) => {
                    return (
                      <CardComponent
                        key={hc.card.id}
                        val={hc.card}
                        state={playerState}
                        client={client}
                        isKeepsake={hc.isKeepsake}
                        isSmall={p.name !== arrangementZoom}
                      />
                    );
                  })}
                </div>
              </>
            );
          })}
      <div style={{ marginTop: 16 }}>
        {playerState.round < 2 && <button onClick={advanceRound}>Advance Round</button>}

        {playerState.round == 2 && (
          <button className="hive-btn" onClick={playAgain}>
            Play Again
          </button>
        )}
      </div>
    </div>
  );

  function setZoom(playerName: string) {
    if (arrangementZoom === playerName) {
      setArrangementZoom("");
    } else {
      setArrangementZoom(playerName);
    }
  }

  function advanceRound() {
    props.client.advanceRound({}).then((result) => {
      if (result.type === "error") {
        console.error(result.error);
      }
    });
  }

  function playAgain() {
    props.client.playAgain({}).then((result) => {
      if (result.type === "error") {
        console.error(result.error);
      }
    });
  }
}

export default RoundRecap;
