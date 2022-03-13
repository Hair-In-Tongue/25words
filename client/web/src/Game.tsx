import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { History } from "history";
import { GameStatus, PlayerState } from "../../../api/types";
import { HathoraClient, HathoraConnection } from "../../.hathora/client";
import Lobby from "./components/Lobby";
import PlayerTurns from "./components/PlayerTurns";
import BeforeScoring from "./components/BeforeScoring";
import RoundRecap from "./components/RoundRecap";
import GameOver from "./components/GameOver";
import "./game.css";

const client = new HathoraClient(import.meta.env.VITE_APP_ID as string);

interface IGameProps {}

function Game(props: IGameProps) {
  const [playerState, setPlayerState] = useState<PlayerState | undefined>(undefined);
  const [hathora, setHathora] = useState<HathoraConnection | undefined>(undefined);
  const [is404, setIs404] = useState<boolean>(false);
  const path = useLocation().pathname;
  const history = useHistory();

  useEffect(() => {
    if (hathora === undefined) {
      initRtag(path, history, setHathora, setPlayerState).catch((e) => {
        console.error("Error connecting", e);
        setIs404(true);
      });
    }
  }, [path]);

  console.log(playerState);

  if (playerState && hathora && !is404 && path !== "/game") {
    return (
      <>
        <div className={"tussie--title-header"} style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {playerState.status >= GameStatus.PLAYER_TURNS && (
              <h3 style={{ margin: 4 }}>Tussie Mussie - Round {playerState.round + 1} of 3</h3>
            )}
            {playerState.status < GameStatus.PLAYER_TURNS && <h3 style={{ margin: 4 }}>Tussie Mussie</h3>}
          </div>
        </div>
        <div className={"tussie--game-container"}>
          {playerState.status === GameStatus.LOBBY && (
            <Lobby playerState={playerState} isCreator={true} client={hathora}></Lobby>
          )}
          {playerState.status === GameStatus.PLAYER_TURNS && (
            <PlayerTurns
              isCreator={true}
              playerState={playerState}
              currentPlayerInfo={playerState.players.find((p) => p.name === playerState.nickname)!}
              client={hathora}
            />
          )}
          {playerState.status === GameStatus.BEFORE_SCORING && (
            <BeforeScoring
              isCreator={true}
              playerState={playerState}
              currentPlayerInfo={playerState.players.find((p) => p.name === playerState.nickname)!}
              client={hathora}
            />
          )}
          {playerState.status === GameStatus.ROUND_RECAP && (
            <RoundRecap
              isCreator={true}
              playerState={playerState}
              currentPlayerInfo={playerState.players.find((p) => p.name === playerState.nickname)!}
              client={hathora}
            />
          )}
          {playerState.status === GameStatus.GAME_OVER && (
            <GameOver
              isCreator={true}
              playerState={playerState}
              currentPlayerInfo={playerState.players.find((p) => p.name === playerState.nickname)!}
              client={hathora}
            />
          )}

          <div style={{ marginTop: 32 }}>
            <button className="tussie--button-small" onClick={() => history.push("/")} disabled={path === "/"}>
              Return Home
            </button>
          </div>
        </div>
      </>
    );
  } else if (is404) {
    return (
      <div className="background">
        <span className="fourOhFour">Game with this Game Code does not exist</span>
      </div>
    );
  } else {
    return <div></div>;
  }
}

async function initRtag(
  path: string,
  history: History,
  setHathora: (client: HathoraConnection) => void,
  onStateChange: (state: PlayerState) => void
): Promise<void> {
  const storedUserData = sessionStorage.getItem("user");
  const token: string = storedUserData
    ? JSON.parse(storedUserData).token
    : await client.loginAnonymous().then((t) => {
        sessionStorage.setItem("user", JSON.stringify({ token: t }));
        return t;
      });
  if (path === "/game") {
    const connection = await client.connectNew(token, ({ state }) => onStateChange(state), console.error);
    setHathora(connection);
    history.replace(`/game/${connection.stateId}`);
  } else {
    const stateId = path.split("/").pop()!;
    const connection = client.connectExisting(token, stateId, ({ state }) => onStateChange(state), console.error);
    setHathora(connection);
  }
}

export default Game;
