import React, { useState } from "react";
import { PlayerState, PlayerInfo } from "../../../../api/types";
import { HathoraConnection } from "../../../.hathora/client";
import CardComponent from "./Card";
import { CardAction } from "../types";

interface IPlayerTurnsProps {
  isCreator: boolean;
  currentPlayerInfo: PlayerInfo;
  playerState: PlayerState;
  client: HathoraConnection;
}

function PlayerTurns(props: IPlayerTurnsProps) {
  const { client, playerState, currentPlayerInfo } = props;
  const turnIdx = playerState.players.findIndex((p) => p.name === playerState.turn)!;
  const chooser = playerState.players[(turnIdx + 1) % playerState.players.length];
  console.log("currentPlayerInfo", currentPlayerInfo);

  const [arrangementZoom, setArrangementZoom] = useState("");

  return (
    <div>
      {currentPlayerInfo && playerState && (
        <div
          className={"tussie--score-header"}
          style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
        >
          <h2 style={{ margin: 3, textAlign: "center" }}>{playerState.turn}'s Offer</h2>
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

      {currentPlayerInfo &&
        playerState.turn !== currentPlayerInfo.name &&
        currentPlayerInfo.drawnCards.length === 0 &&
        !playerState.offer && <h3>Waiting for {playerState.turn} to make an offer</h3>}
      {currentPlayerInfo &&
        playerState.turn === currentPlayerInfo.name &&
        currentPlayerInfo.drawnCards.length === 0 &&
        !playerState.offer && (
          <>
            <h3>It's Your Turn</h3>
            <button onClick={drawCards}>Draw Cards</button>
          </>
        )}
      {currentPlayerInfo && currentPlayerInfo.drawnCards.length > 0 && (
        <>
          <h2>Select card to offer face up:</h2>
          <div style={{ display: "flex", overflowX: "auto" }}>
            {currentPlayerInfo.drawnCards.map((card) => {
              return (
                <CardComponent
                  key={card.id}
                  val={card}
                  state={playerState}
                  client={client}
                  clickHandler={playerState.turn === currentPlayerInfo.name ? makeOffer : (s: CardAction) => {}}
                  toSelect={true}
                />
              );
            })}
          </div>
        </>
      )}
      {currentPlayerInfo && playerState.offer && (
        <>
          {chooser.name === currentPlayerInfo.name ? (
            <h2>Select which card you want:</h2>
          ) : (
            <h3>{chooser.name} is deciding on an offer:</h3>
          )}

          <div style={{ display: "flex", overflowX: "auto" }}>
            <CardComponent
              key={playerState.offer.faceupCard.id}
              val={playerState.offer.faceupCard}
              state={playerState}
              client={client}
              clickHandler={chooser.name === currentPlayerInfo.name ? selectOffer : (s: CardAction) => {}}
              toSelect={chooser.name === currentPlayerInfo.name}
            />
            <CardComponent
              key={playerState.offer.facedownCard.id}
              val={playerState.offer.facedownCard}
              state={playerState}
              client={client}
              clickHandler={chooser.name === currentPlayerInfo.name ? selectOffer : (s: CardAction) => {}}
              toSelect={chooser.name === currentPlayerInfo.name}
            />
          </div>
        </>
      )}

      <h3>Your Arrangement:</h3>
      {currentPlayerInfo && currentPlayerInfo.hand.length > 0 && (
        <>
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
        </>
      )}
      {currentPlayerInfo && currentPlayerInfo.hand.length === 0 && (
        <div className={"tussie--empty-card"}>
          <h5>Empty arrangement</h5>
        </div>
      )}

      {currentPlayerInfo &&
        playerState &&
        playerState.players
          .filter((p) => p.name !== currentPlayerInfo.name)
          .map((p) => {
            if (p.hand.length === 0) {
              return (
                <>
                  <h3 key={p.name}>{p.name}'s Arrangement:</h3>
                  <div className={"tussie--empty-card"}>
                    <h5>Empty arrangement</h5>
                  </div>
                </>
              );
            }
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
                        isSmall={p.name !== arrangementZoom}
                      />
                    );
                  })}
                </div>
              </>
            );
          })}
    </div>
  );

  function setZoom(playerName: string) {
    if (arrangementZoom === playerName) {
      setArrangementZoom("");
    } else {
      setArrangementZoom(playerName);
    }
  }

  function drawCards() {
    props.client.drawForOffer({}).then((result) => {
      if (result.type === "error") {
        console.error(result.error);
      }
    });
  }

  function makeOffer(selection: CardAction) {
    props.client.makeOffer({ faceupCard: selection.cardName! }).then((result) => {
      if (result.type === "error") {
        console.error(result.error);
      }
    });
  }

  function selectOffer(selection: CardAction) {
    props.client.selectOffer({ faceup: selection.isFaceUp }).then((result) => {
      if (result.type === "error") {
        console.error(result.error);
      }
    });
  }
}

export default PlayerTurns;
