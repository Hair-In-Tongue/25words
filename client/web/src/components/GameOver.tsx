import { isEqual } from "lodash-es";
import React from "react";
import { PlayerState, PlayerInfo } from "../../../../api/types";
import { HathoraConnection } from "../../../.hathora/client";

interface IGameOverProps {
  isCreator: boolean;
  currentPlayerInfo: PlayerInfo;
  playerState: PlayerState;
  client: HathoraConnection;
}

interface IGameOverState {}

class GameOver extends React.Component<IGameOverProps, IGameOverState> {
  state = this.getDefaultState(this.props);

  componentDidUpdate(oldProps: IGameOverProps) {
    if (!isEqual(oldProps, this.props)) {
      this.setState(this.getDefaultState(this.props));
    }
  }

  render() {
    const { playerState, currentPlayerInfo } = this.props;

    return (
      <div>
        <h2>{playerState.players.sort((a, b) => b.score - a.score)[0].name} wins!</h2>
        {currentPlayerInfo &&
          playerState &&
          playerState.players
            .sort((a, b) => b.score - a.score)
            .map((p) => {
              return (
                <>
                  <h4 key={p.name}>
                    {p.name}'s score: {p.score}
                  </h4>
                </>
              );
            })}
        <div>
          <button className="hive-btn" onClick={this.playAgain}>
            Play Again
          </button>
        </div>
      </div>
    );
  }

  private getDefaultState(props: IGameOverProps): IGameOverState {
    return {};
  }

  private playAgain = () => {
    this.props.client.playAgain({}).then((result) => {
      if (result.type === "error") {
        console.error(result.error);
      }
    });
  };
}

export default GameOver;
