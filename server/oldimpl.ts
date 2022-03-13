import { Methods, Context } from "./.hathora/methods";
import { Response } from "../api/base";
import {
  Cards,
  Color,
  Card,
  Team,
  PlayerInfo,
  GameStatus,
  RoundInfo,
  PlayerState,
  UserId,
  IJoinGameRequest,
  IStartGameRequest,
  IGiveClueRequest,
  IEncryptClueRequest,
  IHideLetterRequest,
  IRevealLetterRequest,
  ISelectCardRequest,
} from "../api/types";
import { wordList } from "./words";

type InternalState = {
  players: PlayerInfo[];
  currentTurn: Color;
  cards: Card[];
  roundInfo?: RoundInfo;
  gameStatus: GameStatus;
  team?: Team;
};

export class Impl implements Methods<InternalState> {
  initialize(userId: UserId, ctx: Context): InternalState {
    return {
      players: [], currentTurn: Color.YELLOW, cards: [], gameStatus: GameStatus.NOT_STARTED
    };
  }
  joinGame(state: InternalState, userId: UserId, ctx: Context, request: IJoinGameRequest): Response {
    if (state.players.find((player) => player.id === userId)) {
      return Response.error("Already joined");
    }
    state.players.push(createPlayer(userId));
    return Response.ok();
  }
  startGame(state: InternalState, userId: UserId, ctx: Context, request: IStartGameRequest): Response {
    //if >1 player

    if (state.gameStatus == GameStatus.IN_PROGRESS) {
      return Response.error("Game already started");
    }


    state.players = ctx.chance.shuffle(state.players);
    for (let i = 0; i < state.players.length; i++) {

      state.players[i].team!.color = i * 2 < state.players.length ? Color.RED : Color.BLUE;
      state.players[i].isSpymaster = false;
    }

    state.players[0].isSpymaster = true;
    state.players[state.players.length - 1].isSpymaster = true;
    

    const shuffledList = ctx.chance.shuffle(wordList);
    state.cards = [];
    state.cards.push(...chooseCards(shuffledList, 12, Color.BLACK));
    state.cards.push(...chooseCards(shuffledList, 13, Color.YELLOW));
    state.cards = ctx.chance.shuffle(state.cards);

    state.gameStatus = GameStatus.IN_PROGRESS;

    //losu team 
    state.currentTurn = Color.RED;

    return Response.ok();
  }
  giveClue(state: InternalState, userId: UserId, ctx: Context, request: IGiveClueRequest): Response {

    const player = state.players.find((p) => p.id === userId);
    if (player === undefined) {
      return Response.error('Player not found');
    }

    if (!player.isSpymaster) {
      return Response.error('Player is not a spymaster');
    }

    if (player.team!.color != state.currentTurn) {
      return Response.error('Wrong team');
    }

    state.roundInfo = {
      startingTeam: state.currentTurn,
      numberOfActiveHints: 0,
      step: 1,
      originalHint: request.originalHint,
      activeHint: request.originalHint,
      jackpot: 0
    }

    state.currentTurn = state.roundInfo.startingTeam === Color.RED ? Color.BLUE : Color.RED

    return Response.ok();
  }
  encryptClue(state: InternalState, userId: UserId, ctx: Context, request: IEncryptClueRequest): Response {
    if (state.roundInfo!.step != 1) {
      return Response.error('Wrong step');
    }

    const player = state.players.find((p) => p.id === userId);
    if (player === undefined) {
      return Response.error('Player not found');
    }

    if (!player.isSpymaster) {
      return Response.error('Player is not a spymaster');
    }

    if (player.team!.color != state.currentTurn) {
      return Response.error('Wrong team');
    }

    state.roundInfo = {
      ...state.roundInfo!,
      step: 2,
      activeHint: request.activeHint,
      jackpot: 0
    }

    return Response.ok();
  }
  hideLetter(state: InternalState, userId: UserId, ctx: Context, request: IHideLetterRequest): Response {
    return Response.error("Not implemented");
  }
  revealLetter(state: InternalState, userId: UserId, ctx: Context, request: IRevealLetterRequest): Response {
    return Response.error("Not implemented");
  }
  selectCard(state: InternalState, userId: UserId, ctx: Context, request: ISelectCardRequest): Response {
    return Response.error("Not implemented");
  }
  getUserState(state: InternalState, userId: UserId): PlayerState {
    return state;
  }
}

function createPlayer(id: UserId): PlayerInfo {
  return {
    id,
    team: {
      color: Color.YELLOW,
      token: 0,
      points: 0
    },
    isSpymaster: false
  };
}

function chooseCards(words: string[], num: number, color: Color): Card[] {
  return [...Array(num).keys()].map((_) => ({ word: words.pop()!, color, selectedBy: undefined }));

}
