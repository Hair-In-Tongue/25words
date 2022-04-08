import { Methods, Context } from './.hathora/methods';
import { Response } from '../api/base';
import {
    Cards,
    Color,
    Card,
    Team,
    PlayerInfo,
    GameStatus,
    Difficulty,
    RoundInfo,
    PlayerState,
    UserId,
    IJoinGameRequest,
    IChangeNameRequest,
    IStartGameRequest,
    ISetDifficultyRequest,
    IResetScoreRequest,
    IKickPlayerRequest,
    IShuffleTeamsRequest,
    IJoinTeamRequest,
    IJoinAsLeaderRequest,
    IBidRequest,
    IGiveClueRequest,
    IGuessWordRequest,
    ITimeEndRequest,
    ISendHeartBeatResponseRequest,
    IInitializeRequest,
} from '../api/types';

import { wordList } from './wordList';
import { wordListEasy } from './wordListEasy';
import { wordListNormal } from './wordListNormal';
import { wordListHard } from './wordListHard';

type InternalState = {
    players: PlayerInfo[];
    cards: Card[];
    roundInfo?: RoundInfo;
    gameStatus: GameStatus;
    teams: Team[];
    hintsGiven: number;
};

export class Impl implements Methods<InternalState> {
    initialize(ctx: Context, args: IInitializeRequest): InternalState {
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
                bidTimeLeft: 0,
                currentTurn: Color.GRAY,
                board: undefined,
                difficulty: Difficulty.EASY,
            },
            gameStatus: GameStatus.NOT_STARTED,
            teams: teams,
            hintsGiven: 0,
        };
    }

    joinGame(state: InternalState, userId: UserId, ctx: Context, request: IJoinGameRequest): Response {
        if (state.players.find((player) => player.id === userId)) {
            return Response.error('Already joined');
        }
        let admin = state.players.length == 0 ? true : false;

        state.players.push(createPlayer(userId, request.name, admin));

        return Response.ok();
    }

    changeName(state: InternalState, userId: UserId, ctx: Context, request: IChangeNameRequest): Response {
        let player = state.players.find((p) => p.id === userId);

        if (!player) {
            return Response.error('Player is undefined');
        }

        player.name = request.name;

        return Response.ok();
    }

    startGame(state: InternalState, userId: UserId, ctx: Context, request: IStartGameRequest): Response {
        let player = state.players.find((p) => p.id === userId);
        if (!player) {
            return Response.error('Player is undefined');
        }

        // if (state.gameStatus == GameStatus.AUCTION || state.gameStatus == GameStatus.GUESSING) {
        //   return Response.error("Game already started");
        // }

        if (!player.isAdmin) {
            return Response.error('Player is not an admin');
        }

        state.roundInfo = {
            ...state.roundInfo!,
            cards: 5,
            hints: 0,
            timeMax: 90,
            timeLeft: 90,
            board: undefined,
            bidTimeLeft: 15,
        };
        state.hintsGiven = 0;

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
        let player = state.players.find((p) => p.id === userId);

        if (!player) {
            return Response.error('Player is undefined');
        }

        if (!player.isAdmin) {
            return Response.error('Player is not an admin');
        }

        state.roundInfo!.difficulty = request.name;

        return Response.ok();
    }
    resetScore(state: InternalState, userId: UserId, ctx: Context, request: IResetScoreRequest): Response {
        let player = state.players.find((p) => p.id === userId);

        if (!player) {
            return Response.error('Player is undefined');
        }

        if (!player.isAdmin) {
            return Response.error('Player is not an admin');
        }

        state.teams.forEach((element) => {
            element.points = 0;
        });
        return Response.ok();
    }
    kickPlayer(state: InternalState, userId: UserId, ctx: Context, request: IKickPlayerRequest): Response {
        let player = state.players.find((p) => p.id === userId);

        if (!player) {
            return Response.error('Player is undefined');
        }

        if (!player.isAdmin) {
            return Response.error('Player is not an admin');
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
        let player = state.players.find((p) => p.id === userId);
        if (!player) {
            return Response.error('Player is undefined');
        }

        if (state.gameStatus == GameStatus.AUCTION || state.gameStatus == GameStatus.GUESSING) {
            return Response.error('Game already started');
        }

        if (!player.isAdmin) {
            return Response.error('Player is not an admin');
        }

        //if(state.players.length < 4) return Response.error("Not enough players");

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
        let player = state.players.find((p) => p.id === userId);
        if (!player) {
            return Response.error('Player is undefined');
        }

        if (request.team == Color.GRAY) {
            player!.team = request.team;
            player!.isGivingClues = false;
            return Response.ok();
        }

        if (player?.isGivingClues && state.gameStatus == GameStatus.GUESSING) {
            return Response.error("You can't join while team is guessing");
        }

        player!.team = request.team;
        player!.isGivingClues = false;

        return Response.ok();
    }

    joinAsLeader(state: InternalState, userId: UserId, ctx: Context, request: IJoinAsLeaderRequest): Response {
        let player = state.players.find((p) => p.id === userId);
        if (!player) {
            return Response.error('Player is undefined');
        }

        let playerGivingClues = state.players.find((p) => {
            if (p.team === request.team && p.isGivingClues === true) {
                return true;
            }
            return false;
        });

        if (state.gameStatus == GameStatus.GUESSING && playerGivingClues) {
            return Response.error('This team already has one leader');
        }

        if (state.gameStatus == GameStatus.GUESSING && playerGivingClues) {
            return Response.error('Game already started');
        }

        if (
            state.gameStatus == GameStatus.AUCTION &&
            player.isGivingClues &&
            playerGivingClues &&
            request.team != Color.GRAY
        ) {
            return Response.error('You cant switch teams while bidding');
        }

        if (request.team != Color.GRAY) {
            if (!playerGivingClues) {
                player.team = request.team;
                player!.isGivingClues = true;
            } else {
                return Response.error('There is already one clue giver in your team');
            }
        } else {
            return Response.error('You cant be leader of team gray');
        }

        return Response.ok();
    }

    bid(state: InternalState, userId: UserId, ctx: Context, request: IBidRequest): Response {
        let player = state.players.find((p) => p.id === userId);
        if (!player) {
            return Response.error('Player is undefined');
        }

        if (state.gameStatus != GameStatus.AUCTION) {
            return Response.error("It's not a bidding time!");
        }

        if (player?.isGivingClues === false || state.roundInfo?.currentTurn != player?.team) {
            return Response.error('You are not bidding');
        }

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
                //state.roundInfo!.bidTimeLeft = 0;
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
            if (request.hints === state.roundInfo.cards) {
                teamA!.bid = request.hints;
                state.roundInfo!.currentTurn = teamA!.color;
                state.hintsGiven = 0;
                state.gameStatus = GameStatus.GUESSING;
                //state.roundInfo!.bidTimeLeft = 0;
                return Response.ok();
            } else {
                teamA!.bid = request.hints;
                state.roundInfo!.currentTurn = teamB!.color;
                //state.roundInfo!.bidTimeLeft = 15;
            }
        }
        return Response.ok();
    }

    giveClue(state: InternalState, userId: UserId, ctx: Context, request: IGiveClueRequest): Response {
        let player = state.players.find((p) => p.id === userId);
        if (!player) {
            return Response.error('Player is undefined');
        }

        if (state.gameStatus != GameStatus.GUESSING) {
            return Response.error("It's not a guessing time!");
        }

        if (player?.team != state.roundInfo!.currentTurn) {
            return Response.error('You not your turn');
        }

        if (player?.isGivingClues === false) {
            return Response.error('You are not giving clues');
        }

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
        let player = state.players.find((p) => p.id === userId);
        if (!player) {
            return Response.error('Player is undefined');
        }

        if (state.gameStatus != GameStatus.GUESSING) {
            return Response.error("It's not a guessing time!");
        }

        if (player?.team != state.roundInfo!.currentTurn) {
            return Response.error('You not your turn');
        }

        if (player?.isGivingClues === true) {
            return Response.error('You are not guessing');
        }
        var length = state.cards[request.word].word.length / 3 > 3 ? 3 : state.cards[request.word].word.length / 3;
        if (
            state.cards[request.word].word.toLowerCase() === request.guess.toLowerCase() ||
            levenstein(state.cards[request.word].word.toLowerCase(), request.guess.toLowerCase()) < length
        ) {
            state.cards[request.word].guessed = true;

            state.roundInfo!.timeLeft += 10;

            let notGuessed = state.roundInfo!.board!.find((p) => p.guessed === false);
            if (!notGuessed) {
                let team = state.teams.find((p) => p.color === state.roundInfo!.currentTurn);
                team!.points++;

                state.gameStatus = GameStatus.ROUND_ENDED;

                return Response.ok();
            }
        } else {
            state.cards[request.word].guesses.push(request.guess);
            state.roundInfo!.timeLeft -= 3;
        }
        return Response.ok();
    }

    timeEnd(state: InternalState, userId: UserId, ctx: Context, request: ITimeEndRequest): Response {
        let team = state.teams.find((p) => p.color != state.roundInfo!.currentTurn);
        team!.points++;

        state.gameStatus = GameStatus.ROUND_ENDED;

        return Response.ok();
    }
    sendHeartBeatResponse(
        state: InternalState,
        userId: UserId,
        ctx: Context,
        request: ISendHeartBeatResponseRequest
    ): Response {
        let player = state.players.find((p) => p.id === userId);
        if (!player) {
            return Response.error('Player is undefined');
        }
        player.lastHeartbeat = 0;
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
        if (state.gameStatus === GameStatus.GUESSING && state.hintsGiven > 0) {
            state.roundInfo!.timeLeft--;
            if (state.roundInfo!.timeLeft <= 0) {
                let team = state.teams.find((p) => p.color != state.roundInfo!.currentTurn);
                team!.points++;

                state.gameStatus = GameStatus.ROUND_ENDED;
            }
        }

        //BidTimer
        if (state.gameStatus === GameStatus.AUCTION) {
            let playerGivingCluesA = state.players.find((p) => {
                if (p.team === Color.RED && p.isGivingClues === true) {
                    return true;
                }
                return false;
            });

            let playerGivingCluesB = state.players.find((p) => {
                if (p.team === Color.BLUE && p.isGivingClues === true) {
                    return true;
                }
                return false;
            });
            if (playerGivingCluesA && playerGivingCluesB) {
                //state.roundInfo!.bidTimeLeft--;
            }

            // if (state.roundInfo!.bidTimeLeft <= 0) {
            //   if (state.roundInfo!.currentTurn == Color.RED) {
            //     state.roundInfo!.currentTurn = Color.BLUE;
            //     state.roundInfo!.hints = state.teams[1].bid!;
            //   } else {
            //     state.roundInfo!.currentTurn = Color.RED;
            //     state.roundInfo!.hints = state.teams[0].bid!;
            //   }
            //   state.gameStatus = GameStatus.GUESSING;
            // }
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

function chooseCards(words: string[], num: number): Card[] {
    return [...Array(num).keys()].map((_) => ({ word: words.pop()!, guessed: false, hints: [], guesses: [] }));
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
    let shuffledEasyWordList = ctx.chance.shuffle(wordListEasy);
    let shuffledNormalWordList = ctx.chance.shuffle(wordListNormal);
    let shuffledHardWordList = ctx.chance.shuffle(wordListHard);
    state.cards = [];

    switch (difficulty) {
        case Difficulty.EASY:
            state.cards.push(...chooseCards(shuffledEasyWordList, state.roundInfo!.cards));
            state.cards = ctx.chance.shuffle(state.cards);
            break;

        case Difficulty.NORMAL:
            let normalWordList = ctx.chance.shuffle(shuffledNormalWordList.concat(shuffledEasyWordList.slice(0, 100)));
            state.cards.push(...chooseCards(normalWordList, state.roundInfo!.cards));
            state.cards = ctx.chance.shuffle(state.cards);
            break;

        case Difficulty.HARD:
            let hardWordList = ctx.chance.shuffle(
                shuffledHardWordList.concat(
                    shuffledNormalWordList.slice(0, 100).concat(shuffledEasyWordList.slice(0, 50))
                )
            );
            state.cards.push(...chooseCards(hardWordList, state.roundInfo!.cards));
            state.cards = ctx.chance.shuffle(state.cards);
            break;

        default:
            let shuffledList = ctx.chance.shuffle(wordList);
            state.cards = [];
            state.cards.push(...chooseCards(shuffledList, state.roundInfo!.cards));
            state.cards = ctx.chance.shuffle(state.cards);
            break;
    }
    return state.cards;
}
