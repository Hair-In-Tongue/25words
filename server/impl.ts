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
  IJoinTeamRequest,
  IJoinAsLeaderRequest,
  IBidRequest,
  IGiveClueRequest,
  IGuessWordRequest,
} from "../api/types";
import { wordList } from "./wordList";

type InternalState = {
  players: PlayerInfo[];
  currentTurn: Color;
  cards: Card[];
  roundInfo?: RoundInfo;
  gameStatus: GameStatus;
  teams: Team[];
};

export class Impl implements Methods<InternalState> {
  initialize(userId: UserId, ctx: Context): InternalState {
    let teams = [];
    teams.push({color:Color.RED , points:0, bid:0});
    teams.push({color:Color.BLUE , points:0, bid:0});
    return {
      players: [],
      currentTurn: Color.GRAY,
      cards: [],
      roundInfo: undefined,
      gameStatus: GameStatus.NOT_STARTED,
      teams: teams,
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
    if (state.gameStatus == GameStatus.AUCTION || state.gameStatus == GameStatus.GUESSING) {
      return Response.error("Game already started");
    }


    state.players = ctx.chance.shuffle(state.players);
    for (let i = 0; i < state.players.length; i++) {

      state.players[i].team = i * 2 < state.players.length ? Color.RED : Color.BLUE;
      state.players[i].isGivingClues = false;
    }

    state.players[0].isGivingClues = true;
    state.players[state.players.length - 1].isGivingClues = true;


    const shuffledList = ctx.chance.shuffle(wordList);
    state.cards = [];
    state.cards.push(...chooseCards(shuffledList, 5));
    state.cards = ctx.chance.shuffle(state.cards);

    state.gameStatus = GameStatus.AUCTION;

    //losu team 
    state.currentTurn = Color.RED;

    return Response.ok();
  }

  joinTeam(state: InternalState, userId: UserId, ctx: Context, request: IJoinTeamRequest): Response {
    if (state.gameStatus == GameStatus.AUCTION || state.gameStatus == GameStatus.GUESSING) {
      return Response.error("Game already started");
    }

    let player = state.players.find((p) => p.id === userId);

    player!.team = request.team;

    return Response.ok();
  }

  joinAsLeader(state: InternalState, userId: UserId, ctx: Context, request: IJoinAsLeaderRequest): Response {
    return Response.error("Not implemented");
  }

  bid(state: InternalState, userId: UserId, ctx: Context, request: IBidRequest): Response {
    return Response.error("Not implemented");
  }

  giveClue(state: InternalState, userId: UserId, ctx: Context, request: IGiveClueRequest): Response {
    return Response.error("Not implemented");
  }

  guessWord(state: InternalState, userId: UserId, ctx: Context, request: IGuessWordRequest): Response {
    return Response.error("Not implemented");
  }

  getUserState(state: InternalState, userId: UserId): PlayerState {
    return state;
  }
}

function createPlayer(id: UserId): PlayerInfo {
  return {
    id,
    team: Color.GRAY,
    isGivingClues: false,
  };
}

function chooseCards(words: string[], num: number): Card[] {
  return [...Array(num).keys()].map((_) => ({ word: words.pop()!, guessed: false, hints: [], guesses: [] }));
}