import { Methods, Context } from "./.hathora/methods";
import { Response } from "../api/base";
import {
  Cards,
  PrevRoundCards,
  Color,
  Card,
  Word,
  Team,
  PlayerInfo,
  GameStatus,
  Difficulty,
  Language,
  Deck,
  RoundInfo,
  PlayerState,
  UserId,
  IInitializeRequest,
  IJoinGameRequest,
  IChangeNameRequest,
  ISetPasswordRequest,
  IStartGameRequest,
  ISetDifficultyRequest,
  IAddCustomDeckRequest,
  IRemoveCustomDeckRequest,
  IResetScoreRequest,
  IKickPlayerRequest,
  IShuffleTeamsRequest,
  IJoinTeamRequest,
  IJoinAsLeaderRequest,
  IBidRequest,
  IGiveClueRequest,
  IGuessWordRequest,
  ISetTimerRequest,
  ISendHeartBeatResponseRequest,
  ISetGameLanguageRequest,
} from "../api/types";

import { plEasy, plMedium, plHard } from './wordList';

type InternalState = {
  players: PlayerInfo[];
  cards: Card[];
  roundInfo?: RoundInfo;
  gameStatus: GameStatus;
  teams: Team[];
  hintsGiven: number;
  timerEnabled: boolean;
  gamePassword: string;
  language: Language;
  customDecks: Array<Deck>;
  usedDecks: Array<Word>;
};

export class Impl implements Methods<InternalState> {
  initialize(ctx: Context, request: IInitializeRequest): InternalState {
    let teams = [];
    teams.push({ color: Color.RED, points: 0, bid: 0 });
    teams.push({ color: Color.BLUE, points: 0, bid: 0 });
    return {
      players: [],
      cards: [],
      roundInfo: {
        cards: 5,
        hints: 0,
        timeMax: 90,
        timeLeft: 90,
        currentTurn: Color.GRAY,
        board: undefined,
        prevBoard: undefined,
        difficulty: Difficulty.EASY,
        comment: ""
      },
      gameStatus: GameStatus.NOT_STARTED,
      teams: teams,
      hintsGiven: 0,
      timerEnabled: true,
      gamePassword: "",
      language: Language.PL,
      customDecks: [plEasy, plMedium, plHard],
      usedDecks: createDeck([plEasy, plMedium, plHard], Language.PL, Difficulty.EASY),
    };
  }
  joinGame(state: InternalState, userId: UserId, ctx: Context, request: IJoinGameRequest): Response {
    let error = checkPermissionForAction(state, userId, ctx, request, 'joinGame');
    if (error.value == false) {
      return Response.error(error?.message);
    }

    if (request.password != state.gamePassword) {
      return Response.error("Wrong password");
    }

    let admin = state.players.length == 0 ? true : false;

    state.players.push(createPlayer(userId, request.name, admin));

    return Response.ok();
  }

  changeName(state: InternalState, userId: UserId, ctx: Context, request: IChangeNameRequest): Response {

    let error = checkPermissionForAction(state, userId, ctx, request, 'changeGame');
    if (error.value == false) {
      return Response.error(error?.message);
    }

    let player = state.players.find((p) => p.id === userId);
    player!.name = request.name;

    return Response.ok();
  }
  setPassword(state: InternalState, userId: UserId, ctx: Context, request: ISetPasswordRequest): Response {
    let error = checkPermissionForAction(state, userId, ctx, request, 'setPassword');
    if (error.value == false) {
      return Response.error(error?.message);
    }

    state.gamePassword = request.password;

    return Response.ok();
  }
  startGame(state: InternalState, userId: UserId, ctx: Context, request: IStartGameRequest): Response {
    let error = checkPermissionForAction(state, userId, ctx, request, 'startGame');
    if (error.value == false) {
      return Response.error(error?.message);
    }

    state.roundInfo = {
      ...state.roundInfo!,
      cards: 5,
      hints: 0,
      timeMax: 90,
      timeLeft: state.roundInfo!.timeMax,
      board: undefined
    };
    state.hintsGiven = 0;
    if (state.usedDecks.length < state.roundInfo.cards*5) {
      return Response.error("Not enough cards to start game (Min. 30 cards)");
    }
    state.cards = getCardsForRound(state, ctx, state.roundInfo.cards, state.roundInfo.difficulty);
    state.roundInfo!.board = state.cards;

    //losu team
    state.roundInfo!.currentTurn = ctx.chance.pickone([Color.RED, Color.BLUE]);

    let teamA = state.teams.find((p) => p.color === state.roundInfo!.currentTurn);
    let teamB = state.teams.find((p) => p.color != state.roundInfo!.currentTurn);

    teamA!.bid = 25;
    teamB!.bid = 25;

    state.gameStatus = GameStatus.AUCTION;
    return Response.ok();
  }
  setDifficulty(state: InternalState, userId: UserId, ctx: Context, request: ISetDifficultyRequest): Response {
    let error = checkPermissionForAction(state, userId, ctx, request, 'setDifficulty');
    if (error.value == false) {
      return Response.error(error?.message);
    }

    state.roundInfo!.difficulty = request.name;
    state.usedDecks = createDeck(state.customDecks, state.language, state.roundInfo!.difficulty);

    return Response.ok();
  }
  addCustomDeck(state: InternalState, userId: UserId, ctx: Context, request: IAddCustomDeckRequest): Response {
    return Response.error("Not implemented");

    // let error = checkPermissionForAction(state, userId, ctx, request, 'addCustomDeck');
    // if (error.value == false) {
    //   return Response.error(error?.message);
    // }

    // let deck: Deck = {
    //   code: request.name,
    //   name: "super fajny deck",
    //   difficulty: Difficulty.HARD,
    //   language: Language.PL,
    //   words: ['zupa','kot'],
    // };

//Check if deck already added

    // state.customDecks.push(deck);

    //state.usedDecks = createDeck(state.customDecks, state.language, state.roundInfo!.difficulty);

    // return Response.error("Not implemented");
  }
  removeCustomDeck(state: InternalState, userId: UserId, ctx: Context, request: IRemoveCustomDeckRequest): Response {
    return Response.error("Not implemented");

    // let error = checkPermissionForAction(state, userId, ctx, request, 'removeCustomDeck');
    // if (error.value == false) {
    //   return Response.error(error?.message);
    // }

    // let removed = state.customDecks.find((d) => d.code === request.name);
    // if (!removed) {
    //   return Response.error('deck not found');
    // } else {
    //   const index = state.customDecks.indexOf(removed, 0);
    //   if (index > -1) {
    //     state.customDecks.splice(index, 1);
    //   }
    // }

    //state.usedDecks = createDeck(state.customDecks, state.language, state.roundInfo!.difficulty);

    // return Response.error("Not implemented");
  }
  resetScore(state: InternalState, userId: UserId, ctx: Context, request: IResetScoreRequest): Response {
    let error = checkPermissionForAction(state, userId, ctx, request, 'resetScore');
    if (error.value == false) {
      return Response.error(error?.message);
    }

    state.teams.forEach((element) => {
      element.points = 0;
    });
    return Response.ok();
  }
  kickPlayer(state: InternalState, userId: UserId, ctx: Context, request: IKickPlayerRequest): Response {
    let error = checkPermissionForAction(state, userId, ctx, request, 'startGame');
    if (error.value == false) {
      return Response.error(error?.message);
    }

    let kicked = state.players.find((p) => p.id === request.player);
    if (!kicked) {
      return Response.error('Player is undefined');
    } else {
      const index = state.players.indexOf(kicked, 0);
      if (index > -1) {
        state.players.splice(index, 1);
      }
    }
    return Response.ok();
  }
  shuffleTeams(state: InternalState, userId: UserId, ctx: Context, request: IShuffleTeamsRequest): Response {
    let error = checkPermissionForAction(state, userId, ctx, request, 'shuffleTeams');
    if (error.value == false) {
      return Response.error(error?.message);
    }

    state.players = ctx.chance.shuffle(state.players);
    for (let i = 0; i < state.players.length; i++) {
      state.players[i].team = i * 2 < state.players.length ? Color.RED : Color.BLUE;
      state.players[i].isGivingClues = false;
    }

    //state.players[0].isGivingClues = true;
    //state.players[state.players.length - 1].isGivingClues = true;

    return Response.ok();
  }

  joinTeam(state: InternalState, userId: UserId, ctx: Context, request: IJoinTeamRequest): Response {

    let error = checkPermissionForAction(state, userId, ctx, request, 'joinTeam');
    if (error.value == false) {
      return Response.error(error?.message);
    }

    let player = state.players.find((p) => p.id === userId);
    player!.team = request.team;
    player!.isGivingClues = false;

    return Response.ok();
  }

  joinAsLeader(state: InternalState, userId: UserId, ctx: Context, request: IJoinAsLeaderRequest): Response {
    let error = checkPermissionForAction(state, userId, ctx, request, 'joinAsLeader');
    if (error.value == false) {
      return Response.error(error?.message);
    }

    let player = state.players.find((p) => p.id === userId);

    if (request.team != Color.GRAY) {
      player!.team = request.team;
      player!.isGivingClues = true;
    } else {
      return Response.error('You cannot lead gray team');
    }

    return Response.ok();
  }

  bid(state: InternalState, userId: UserId, ctx: Context, request: IBidRequest): Response {
    let error = checkPermissionForAction(state, userId, ctx, request, 'bid');
    if (error.value == false) {
      return Response.error(error?.message);
    }

    let player = state.players.find((p) => p.id === userId);

    if (request.hints != 0 && request.hints < state.roundInfo!.cards) {
      return Response.error("You can't bid less than cards on board");
    }

    let teamA = state.teams.find((p) => p.color === player!.team);
    let teamB = state.teams.find((p) => p.color != player!.team);

    if (request.hints === 0) {
      if (teamA!.bid! >= teamB!.bid!) {
        state.roundInfo!.currentTurn = teamB!.color;
        state.roundInfo!.hints = teamB!.bid!;
        state.hintsGiven = 0;
        state.gameStatus = GameStatus.GUESSING;
        return Response.ok();
      } else {
        return Response.error('You cant accept opponent bid if your is lower');
      }
    }

    if (teamA!.bid! < teamB!.bid!) {
      return Response.error('Your offer is already lower');
    } else if (request.hints >= teamB!.bid!) {
      return Response.error('Your offer must be lower');
    } else {
      if (request.hints === state.roundInfo!.cards) {
        teamA!.bid = request.hints;
        state.roundInfo!.currentTurn = teamA!.color;
        state.hintsGiven = 0;
        state.gameStatus = GameStatus.GUESSING;
        return Response.ok();
      } else {
        teamA!.bid = request.hints;
        state.roundInfo!.currentTurn = teamB!.color;
      }
    }
    return Response.ok();
  }

  giveClue(state: InternalState, userId: UserId, ctx: Context, request: IGiveClueRequest): Response {
    let error = checkPermissionForAction(state, userId, ctx, request, 'giveClue');
    if (error.value == false) {
      return Response.error(error?.message);
    }

    let player = state.players.find((p) => p.id === userId);
    let teamA = state.teams.find((p) => p.color === player!.team);

    if (teamA!.bid! > 0) {
      teamA!.bid!--;
      state.roundInfo!.hints--;
      state.hintsGiven++;
      state.cards[request.word].hints.push(request.hint);
    } else {
      return Response.error("You don't have any hints left");
    }

    return Response.ok();
  }

  guessWord(state: InternalState, userId: UserId, ctx: Context, request: IGuessWordRequest): Response {
    let error = checkPermissionForAction(state, userId, ctx, request, 'guessWord');
    if (error.value == false) {
      return Response.error(error?.message);
    }

    var length = state.cards[request.word].word.word.length / 3 > 3 ? 3 : state.cards[request.word].word.word.length / 3;
    if (state.cards[request.word].guessed == false) {
      if (
        state.cards[request.word].word.word.toUpperCase() === request.guess.toUpperCase() ||
        levenstein(state.cards[request.word].word.word.toUpperCase(), request.guess.toUpperCase()) < length
      ) {
        state.cards[request.word].guessed = true;

        state.roundInfo!.timeLeft += 10;

        let notGuessed = state.roundInfo!.board!.find((p) => p.guessed === false);
        if (!notGuessed) {
          let team = state.teams.find((p) => p.color === state.roundInfo!.currentTurn);
          team!.points++;

          state.gameStatus = GameStatus.ROUND_ENDED;
          state.roundInfo!.prevBoard = state.roundInfo?.board;
          state.roundInfo!.currentTurn = Color.GRAY;

          return Response.ok();
        }
      } else {
        state.cards[request.word].guesses.push(request.guess);
        state.roundInfo!.timeLeft -= 3;
      }
    } else {
      return Response.error("Card already guessed");
    }
    return Response.ok();
  }
  setTimer(state: InternalState, userId: UserId, ctx: Context, request: ISetTimerRequest): Response {
    let error = checkPermissionForAction(state, userId, ctx, request, 'setTimer');
    if (error.value == false) {
      return Response.error(error?.message);
    }
    state.timerEnabled = request.enabled;
    state.roundInfo!.timeMax = request.time;

    return Response.error("Not implemented");
  }
  sendHeartBeatResponse(
    state: InternalState,
    userId: UserId,
    ctx: Context,
    request: ISendHeartBeatResponseRequest
  ): Response {
    let error = checkPermissionForAction(state, userId, ctx, request, 'sendHeartBeatResponse');
    if (error.value == false) {
      return Response.error(error?.message);
    }

    let player = state.players.find((p) => p.id === userId);
    player!.lastHeartbeat = 0;
    return Response.ok();
  }
  setGameLanguage(state: InternalState, userId: UserId, ctx: Context, request: ISetGameLanguageRequest): Response {
    let error = checkPermissionForAction(state, userId, ctx, request, 'setGameLanguage');
    if (error.value == false) {
      return Response.error(error?.message);
    }

    state.language = request.language;

    state.usedDecks = createDeck(state.customDecks, state.language, state.roundInfo!.difficulty);

    return Response.ok();
  }
  getUserState(state: InternalState, userId: UserId): PlayerState {
    return state;
  }
  onTick(state: InternalState, ctx: Context, timeDelta: number): void {
    //healtcheck

    sendHeartbeat(state);
    //removeOfflineUsers(state);

    //HintsTimer
    if (state.gameStatus === GameStatus.GUESSING && state.hintsGiven > 0 && state.timerEnabled) {
      state.roundInfo!.timeLeft--;
      if (state.roundInfo!.timeLeft <= 0) {
        let team = state.teams.find((p) => p.color != state.roundInfo!.currentTurn);
        team!.points++;

        state.gameStatus = GameStatus.ROUND_ENDED;
        state.roundInfo!.prevBoard = state.roundInfo?.board;
        state.roundInfo!.currentTurn = Color.GRAY;
      }
    }
  }
}

function createPlayer(id: UserId, name: string, admin: boolean): PlayerInfo {
  return {
    id,
    name,
    isAdmin: admin,
    lastHeartbeat: 0,
    team: Color.GRAY,
    isGivingClues: false,
  };
}

function chooseCards(deck: Array<Word>, num: number): Card[] {
  return [...Array(num).keys()].map((_) => ({ word: deck.pop()!, guessed: false, hints: [], guesses: [] }));
}

function levenstein(a: string, b: string) {
  var b = b + '',
    m = [],
    i,
    j,
    min = Math.min;

  if (!(a && b)) return (b || a).length;

  for (i = 0; i <= b.length; m[i] = [i++]);
  for (j = 0; j <= a.length; m[0][j] = j++);

  for (i = 1; i <= b.length; i++) {
    for (j = 1; j <= a.length; j++) {
      m[i][j] =
        b.charAt(i - 1) == a.charAt(j - 1)
          ? m[i - 1][j - 1]
          : (m[i][j] = min(m[i - 1][j - 1] + 1, min(m[i][j - 1] + 1, m[i - 1][j] + 1)));
    }
  }

  return m[b.length][a.length];
}

function sendHeartbeat(state: InternalState) {
  state.players.forEach((element) => {
    element.lastHeartbeat++;
  });
}

function removeOfflineUsers(state: InternalState) {
  state.players.forEach((element) => {
    if (element.lastHeartbeat > 60) {
      const index = state.players.indexOf(element, 0);
      if (index > -1) {
        state.players.splice(index, 1);
      }
      if (element.isAdmin) {
        checkForAdmin(state);
      }
    }
  });
}

function checkForAdmin(state: InternalState) {
  let player = state.players.find((p) => p.isAdmin === true);
  if (!player && state.players.length > 0) {
    state.players[0].isAdmin = true;
  }
}

function getCardsForRound(state: InternalState, ctx: Context, cards: Object, difficulty: Difficulty) {

  // let shuffledEasyWordList = ctx.chance.shuffle(plEasy.words);
  // let shuffledNormalWordList = ctx.chance.shuffle(plMedium.words);
  // let shuffledHardWordList = ctx.chance.shuffle(plHard.words);
  // state.cards = [];

  // switch (difficulty) {
  //   case Difficulty.EASY:
  //     state.cards.push(...chooseCards(shuffledEasyWordList, state.roundInfo!.cards));
  //     state.cards = ctx.chance.shuffle(state.cards);
  //     break;

  //   case Difficulty.NORMAL:
  //     let normalWordList = ctx.chance.shuffle(shuffledNormalWordList.concat(shuffledEasyWordList.slice(0, 100)));
  //     state.cards.push(...chooseCards(normalWordList, state.roundInfo!.cards));
  //     state.cards = ctx.chance.shuffle(state.cards);
  //     break;

  //   case Difficulty.HARD:
  //     let hardWordList = ctx.chance.shuffle(
  //       shuffledHardWordList.concat(
  //         shuffledNormalWordList.slice(0, 100).concat(shuffledEasyWordList.slice(0, 50))
  //       )
  //     );
  //     state.cards.push(...chooseCards(hardWordList, state.roundInfo!.cards));
  //     state.cards = ctx.chance.shuffle(state.cards);
  //     break;

  //   default:
  //     break;
  // }
  state.cards = [];
  state.cards.push(...chooseCards(state.usedDecks, state.roundInfo!.cards));
  state.cards = ctx.chance.shuffle(state.cards);
  return state.cards;
}

function checkPermissionForAction(state: InternalState, userId: UserId, ctx: Context, request: any, method: string) {
  switch (method) {
    case 'joinGame': {
      let error = isPlaying(state, userId);
      if (error['value'] == false) {
        return error;
      }
      break;
    }

    case 'changeName': {
      let error = isPlayer(state, userId);
      if (error['value'] == false) {
        return error;
      }

      break;
    }

    case 'setPassword': {
      let error = isPlayer(state, userId);
      if (error['value'] == false) {
        return error;
      }

      error = isAdmin(state, userId);
      if (error['value'] == false) {
        return error;
      }

      break;
    }

    case 'startGame': {
      let error = isPlayer(state, userId);
      if (error['value'] == false) {
        return error;
      }

      error = isAdmin(state, userId);
      if (error['value'] == false) {
        return error;
      }

      break;
    }

    case 'setDifficulty': {
      let error = isPlayer(state, userId);
      if (error['value'] == false) {
        return error;
      }

      error = isAdmin(state, userId);
      if (error['value'] == false) {
        return error;
      }

      break;
    }

    case 'addCustomDeck': {
      let error = isPlayer(state, userId);
      if (error['value'] == false) {
        return error;
      }

      error = isAdmin(state, userId);
      if (error['value'] == false) {
        return error;
      }

      break;
    }

    case 'removeCustomDeck': {
      let error = isPlayer(state, userId);
      if (error['value'] == false) {
        return error;
      }

      error = isAdmin(state, userId);
      if (error['value'] == false) {
        return error;
      }

      break;
    }

    case 'resetScore': {
      let error = isPlayer(state, userId);
      if (error['value'] == false) {
        return error;
      }

      error = isAdmin(state, userId);
      if (error['value'] == false) {
        return error;
      }

      error = isGameStatus(state, GameStatus.NOT_STARTED);
      if (error['value'] == false) {
        return error;
      }

      break;
    }

    case 'kickPlayer': {
      let error = isPlayer(state, userId);
      if (error['value'] == false) {
        return error;
      }

      error = isAdmin(state, userId);
      if (error['value'] == false) {
        return error;
      }
      break;
    }

    case 'shuffleTeams': {
      let error = isPlayer(state, userId);
      if (error['value'] == false) {
        return error;
      }

      error = isAdmin(state, userId);
      if (error['value'] == false) {
        return error;
      }

      break;
    }

    case 'joinTeam': {
      let error = isPlayer(state, userId);
      if (error['value'] == false) {
        return error;
      }

      break;
    }

    case 'joinAsLeader': {
      let error = isPlayer(state, userId);
      if (error['value'] == false) {
        return error;
      }
      error = isAllowedToLead(state, userId, request.team);
      if (error['value'] == false) {
        return error;
      }

      break;
    }

    case 'bid': {
      let error = isPlayer(state, userId);
      if (error['value'] == false) {
        return error;
      }

      error = isGuesser(state, userId);
      if (error['value'] == false) {
        return error;
      }

      error = isGameStatus(state, GameStatus.AUCTION);
      if (error['value'] == false) {
        return error;
      }

      error = isCurrentTurn(state, userId);
      if (error['value'] == false) {
        return error;
      }

      break;
    }

    case 'giveClue': {
      let error = isPlayer(state, userId);
      if (error['value'] == false) {
        return error;
      }

      error = isLeader(state, userId);
      if (error['value'] == false) {
        return error;
      }

      error = isGameStatus(state, GameStatus.GUESSING);
      if (error['value'] == false) {
        return error;
      }

      break;
    }

    case 'guessWord': {
      let error = isPlayer(state, userId);
      if (error['value'] == false) {
        return error;
      }

      error = isGuesser(state, userId);
      if (error['value'] == false) {
        return error;
      }

      error = isGameStatus(state, GameStatus.GUESSING);
      if (error['value'] == false) {
        return error;
      }

      break;
    }

    case 'setTimer': {
      let error = isPlayer(state, userId);
      if (error['value'] == false) {
        return error;
      }

      error = isAdmin(state, userId);
      if (error['value'] == false) {
        return error;
      }

      error = isGameStatus(state, GameStatus.NOT_STARTED);
      if (error['value'] == false) {
        return error;
      }

      break;
    }

    case 'setGameLanguage': {
      let error = isPlayer(state, userId);
      if (error['value'] == false) {
        return error;
      }

      error = isAdmin(state, userId);
      if (error['value'] == false) {
        return error;
      }

      error = isGameStatus(state, GameStatus.NOT_STARTED);
      if (error['value'] == false) {
        return error;
      }

      break;
    }

    default: {
      return {
        value: false,
        message: "No method found"
      };
    }
  }
  return {
    value: true,
    message: ""
  };
}

function isPlayer(state: InternalState, userId: UserId) {
  let player = state.players.find((p) => p.id === userId);

  if (!player) {
    return {
      value: false,
      message: "Player is undefined"
    };
  }
  return {
    value: true,
    message: ""
  };
}

function isPlaying(state: InternalState, userId: UserId) {
  if (state.players.find((player) => player.id === userId)) {
    return {
      value: false,
      message: "Player already joined"
    };
  }
  return {
    value: true,
    message: ""
  };
}

function isAdmin(state: InternalState, userId: UserId) {
  let player = state.players.find((p) => p.id === userId);

  if (!player?.isAdmin) {
    return {
      value: false,
      message: "Player is not an admin"
    };
  }
  return {
    value: true,
    message: ""
  };
}

function isAllowedToLead(state: InternalState, userId: UserId, team: Color) {
  let playerGivingClues = state.players.find((p) => {
    if (p.team === team && p.isGivingClues === true) {
      return true;
    }
    return false;
  });

  if (playerGivingClues) {
    return {
      value: false,
      message: "Team already has a leader"
    };
  }
  return {
    value: true,
    message: ""
  };
}

function isLeader(state: InternalState, userId: UserId) {
  let player = state.players.find((p) => p.id === userId);

  if (player?.isGivingClues === false) {
    return {
      value: false,
      message: "Player is not a team leader"
    };
  }
  return {
    value: true,
    message: ""
  };
}

function isGuesser(state: InternalState, userId: UserId) {
  let player = state.players.find((p) => p.id === userId);

  if (player?.isGivingClues === true) {
    return {
      value: false,
      message: "Players is not a guesser"
    };
  }
  return {
    value: true,
    message: ""
  };
}

function isGameStatus(state: InternalState, requiredStatus: GameStatus) {
  if (state.gameStatus != requiredStatus) {
    return {
      value: false,
      message: "Wrong game status"
    };
  }
  return {
    value: true,
    message: ""
  };
}

function isCurrentTurn(state: InternalState, userId: UserId) {
  let player = state.players.find((p) => p.id === userId);

  if (player?.team != state.roundInfo!.currentTurn) {
    return {
      value: false,
      message: "It's not your turn"
    };
  }
  return {
    value: true,
    message: ""
  };
}

function createDeck(decks: Array<Deck>, language: Language, difficulty: Difficulty) {

  let usedDecks = decks.filter((d) => {
    if (d.difficulty == difficulty && d.language == language) {
      return true;
    }
    return false;
  });

  let usedCards: Array<Word> = [];

  usedDecks.forEach(deck => {
    deck.words.forEach(word => {
      usedCards.push({
        word: word.toUpperCase(),
        code: deck.code
      })
    })
  });
  // dude pls fix this vvvvvvvv ;3
  // usedCards = usedCards.map(item => item.word).filter((value,index,self)=>self.indexOf(value) === index);
  usedCards = usedCards.reduce((usedCards: Array<Word>, current: Word) => {
    const x = usedCards.find(item => item.word === current.word);
    if (!x) {
      return usedCards.concat([current!]);
    } else {
      return usedCards;
    }
  }, []);

  return usedCards;
}