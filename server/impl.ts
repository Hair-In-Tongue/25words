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
  ITimeEndRequest,
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
    teams.push({ color: Color.RED, points: 0, bid: 0 });
    teams.push({ color: Color.BLUE, points: 0, bid: 0 });
    return {
      players: [],
      currentTurn: Color.GRAY,
      cards: [],
      roundInfo: { cards: 5, hints: 0, timeMax: 60, timeLeft: 60, board: undefined },
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
    let player = state.players.find((p) => p.id === userId);
    if (!player) {
      return Response.error("Player is undefined");
    }

    if (state.gameStatus == GameStatus.AUCTION || state.gameStatus == GameStatus.GUESSING) {
      return Response.error("Game already started");
    }

    state.roundInfo = {
      ...state.roundInfo!,
      cards: 5,
      hints: 0,
      timeMax: 90,
      timeLeft: 90,
      board: undefined
    };
    //  if(state.players.length < 4) return Response.error("Not enough players");

    // state.players = ctx.chance.shuffle(state.players);
    // for (let i = 0; i < state.players.length; i++) {

    //   state.players[i].team = i * 2 < state.players.length ? Color.RED : Color.BLUE;
    //   state.players[i].isGivingClues = false;
    // }

    // state.players[0].isGivingClues = true;
    // state.players[state.players.length - 1].isGivingClues = true;


    const shuffledList = ctx.chance.shuffle(wordList);
    state.cards = [];
    state.cards.push(...chooseCards(shuffledList, state.roundInfo!.cards));
    state.cards = ctx.chance.shuffle(state.cards);

    state.roundInfo!.board = state.cards;

    state.gameStatus = GameStatus.AUCTION;

    //losu team 
    state.currentTurn = Color.RED;

    state.teams.forEach(function (team) {
      team.bid = 25;
    });

    return Response.ok();
  }

  joinTeam(state: InternalState, userId: UserId, ctx: Context, request: IJoinTeamRequest): Response {
    let player = state.players.find((p) => p.id === userId);
    if (!player) {
      return Response.error("Player is undefined");
    }

    if (request.team == Color.GRAY) {
      player!.team = request.team;
      player?.isGivingClues == false;
      return Response.ok();
    }

    if (player?.isGivingClues && state.gameStatus == GameStatus.GUESSING) {
      return Response.error("You can't join while team is guessing");
    }

    player!.team = request.team;

    return Response.ok();
  }

  joinAsLeader(state: InternalState, userId: UserId, ctx: Context, request: IJoinAsLeaderRequest): Response {
    let player = state.players.find((p) => p.id === userId);
    if (!player) {
      return Response.error("Player is undefined");
    }

    if (state.gameStatus == GameStatus.GUESSING) {
      return Response.error("Game already started");
    }

    if (player!.team !== Color.GRAY) {
      let playerGivingClues = state.players.find((p) => {
        if (p.team === player!.team && p.isGivingClues === true) {
          return true;
        }
        return false;
      });

      if (!playerGivingClues) {
        player!.isGivingClues = true;
      } else {
        return Response.error("There is already one clue giver in your team");
      }
    }

    return Response.ok();
  }

  bid(state: InternalState, userId: UserId, ctx: Context, request: IBidRequest): Response {

    let player = state.players.find((p) => p.id === userId);
    if (!player) {
      return Response.error("Player is undefined");
    }

    if (state.gameStatus != GameStatus.AUCTION) {
      return Response.error("It's not a bidding time!");
    }

    if (player?.isGivingClues === false) {
      return Response.error("You are not bidding");
    }

    if (request.hints != 0 && request.hints < state.roundInfo!.cards) {
      return Response.error("You can't bid less than cards on board");
    }

    let teamA = state.teams.find((p) => p.color === player!.team);
    let teamB = state.teams.find((p) => p.color != player!.team);

    if (request.hints === 0) {
      if (teamA!.bid! > teamB!.bid!) {
        state.currentTurn = teamB!.color;

        state.gameStatus = GameStatus.GUESSING;
        return Response.ok();
      }
      else { return Response.error("You cant accept opponent bid if your is lower"); }
    }

    if (teamA!.bid! < teamB!.bid!) {
      return Response.error("Your offer is already lower");
    } else if (request.hints >= teamB!.bid!) {
      return Response.error("Your offer must be lower");
    }
    else {
      teamA!.bid = request.hints;
    }
    return Response.ok();
  }

  giveClue(state: InternalState, userId: UserId, ctx: Context, request: IGiveClueRequest): Response {

    let player = state.players.find((p) => p.id === userId);
    if (!player) {
      return Response.error("Player is undefined");
    }

    if (state.gameStatus != GameStatus.GUESSING) {
      return Response.error("It's not a guessing time!");
    }

    if (player?.team != state.currentTurn) {
      return Response.error("You not your turn");
    }

    if (player?.isGivingClues === false) {
      return Response.error("You are not giving clues");
    }

    let teamA = state.teams.find((p) => p.color === player!.team);

    if (teamA!.bid! > 0) {
      teamA!.bid!--;
      state.cards[request.word].hints.push(request.hint);
    }
    else {
      return Response.error("You don't have any hints left");
    }

    return Response.ok();
  }

  guessWord(state: InternalState, userId: UserId, ctx: Context, request: IGuessWordRequest): Response {

    let player = state.players.find((p) => p.id === userId);
    if (!player) {
      return Response.error("Player is undefined");
    }

    if (state.gameStatus != GameStatus.GUESSING) {
      return Response.error("It's not a guessing time!");
    }

    if (player?.team != state.currentTurn) {
      return Response.error("You not your turn");
    }

    if (player?.isGivingClues === true) {
      return Response.error("You are not guessing");
    }
    var length = state.cards[request.word].word.length / 3 > 3 ? 3 : state.cards[request.word].word.length / 3
    if (state.cards[request.word].word === request.guess || levenstein(state.cards[request.word].word, request.guess) < length) {
      state.cards[request.word].guessed = true;

      state.roundInfo!.timeLeft += 10;

      let notGuessed = state.roundInfo!.board!.find((p) => p.guessed === false);
      if (!notGuessed) {
        let team = state.teams.find((p) => p.color === state.currentTurn);
        team!.points++;

        state.gameStatus = GameStatus.ROUND_ENDED;

        return Response.ok();
      }
    }
    else {
      state.cards[request.word].guesses.push(request.guess);
      state.roundInfo!.timeLeft -= 3;
    }
    return Response.ok();
  }

  timeEnd(state: InternalState, userId: UserId, ctx: Context, request: ITimeEndRequest): Response {

    let team = state.teams.find((p) => p.color != state.currentTurn);
    team!.points++;

    state.gameStatus = GameStatus.ROUND_ENDED;

    return Response.ok();
  }

  getUserState(state: InternalState, userId: UserId): PlayerState {
    return state;
  }

  onTick(state: InternalState, ctx: Context, timeDelta: number): void {
    if (state.gameStatus === GameStatus.GUESSING) {
      state.roundInfo!.timeLeft--;
      if (state.roundInfo!.timeLeft <= 0) {
        let team = state.teams.find((p) => p.color != state.currentTurn);
        team!.points++;

        state.gameStatus = GameStatus.ROUND_ENDED;
      }
    }
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

function levenstein(a: string, b: string) {
  var b = b + "", m = [], i, j, min = Math.min;

  if (!(a && b)) return (b || a).length;

  for (i = 0; i <= b.length; m[i] = [i++]);
  for (j = 0; j <= a.length; m[0][j] = j++);

  for (i = 1; i <= b.length; i++) {
    for (j = 1; j <= a.length; j++) {
      m[i][j] = b.charAt(i - 1) == a.charAt(j - 1)
        ? m[i - 1][j - 1]
        : m[i][j] = min(
          m[i - 1][j - 1] + 1,
          min(m[i][j - 1] + 1, m[i - 1][j] + 1))
    }
  }

  return m[b.length][a.length];
}