import React from "react";
import { PlayerState } from "../../../../api/types";
import { HathoraConnection } from "../../../.hathora/client";

interface ILobbyProps {
  isCreator: boolean;
  playerState: PlayerState;
  client: HathoraConnection;
}

interface ILobbyState {
  nickname: string;
}

class Lobby extends React.Component<ILobbyProps, ILobbyState> {
  private url = document.baseURI;

  constructor(props: ILobbyProps) {
    super(props);
    this.state = this.getDefaultState(props);
  }

  render() {
    const { isCreator, playerState } = this.props;
    const players = playerState.players;

    return (
      <div className="Lobby">
        <h3>Game Code: {this.getSessionCode()}</h3>
        <span>
          <input className="hive-input-btn-input" type="url" value={this.url} id="urlText" readOnly />
          <button className="hive-btn hive-input-btn" onClick={this.copyUrl}>
            Copy
          </button>
        </span>
        <br />
        <label htmlFor="nicknameInput">Nickname:</label>
        <input
          type="text"
          id="nicknameInput"
          className="hive-input-btn-input"
          value={this.state.nickname}
          onChange={(e) => this.setState({ nickname: e.target.value })}
        />
        <button
          onClick={() => {
            if (players.find((p) => p.name === playerState.nickname) === undefined && this.state.nickname) {
              this.joinGame(this.state.nickname);
            }
          }}
        >
          Join Game
        </button>
        <br />
        <h4 style={{ margin: 2 }}>Current players:</h4>
        {players.map((p, i) => (
          <h5 style={{ margin: 0, marginLeft: 4 }} key={i}>
            {i + 1}. {p.name}
          </h5>
        ))}
        {players.length < 2 && <h5>Waiting on more players to join the game</h5>}
        {players.length > 1 &&
          (isCreator ? <h5>Press "Play!" to start the game</h5> : <h5>Waiting for host to start the game!</h5>)}
        {players.length > 4 &&
          (isCreator ? (
            <h5>Too many players to start! Need to remove players (max 4)</h5>
          ) : (
            <h5>Waiting for host to start the game!</h5>
          ))}
        {isCreator && players.length > 1 && players.length <= 4 && (
          <button className="hive-btn" onClick={this.playGame} disabled={players.length === 0}>
            Play!
          </button>
        )}
      </div>
    );
  }

  private getDefaultState(props: ILobbyProps): ILobbyState {
    return {
      nickname: "",
    };
  }

  private joinGame = (nickname: string) => {
    this.props.client.joinGame({ nickname }).then((result) => {
      if (result.type === "error") {
        console.error(result.error);
      }
    });
  };

  private playGame = () => {
    this.props.client.startGame({}).then((result) => {
      if (result.type === "error") {
        console.error(result.error);
      }
    });
  };

  private getSessionCode(): string {
    return this.url.split("game/")[1].toUpperCase();
  }

  private copyUrl(): void {
    const copyText = document.getElementById("urlText") as HTMLInputElement;
    if (copyText) {
      copyText.select();
      copyText.setSelectionRange(0, 99999); /* For mobile devices */
      document.execCommand("copy");
    }
  }
}

export default Lobby;
