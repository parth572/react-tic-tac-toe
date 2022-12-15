import { useReducer } from "react";
import Board from "./Board";

const xTurn = "X";
const yTurn = "0";

const winningCombo = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const intialState = {
  boxArray: new Array(9).fill(""),
  winningPlayer: null,
  gameOver: false,
  playerTurn: xTurn,
  winnerLines: [null, null, null],
  backHistory: []
};

const haveWinningCombo = (boxArray, winningPlayer, winnerLines) => {
  const winning = winningCombo.some((item) => {
    const [id1, id2, id3] = item;
    const combo = [boxArray[id1], boxArray[id2], boxArray[id3]];
    const [firstValue] = combo;
    let winner =
      !!firstValue && combo.every((itemCombo) => itemCombo === firstValue);

    if (winner) {
      winningPlayer = firstValue;
      winnerLines = item;
      return true;
    }
    return false;
  });
  return [winning, winningPlayer, winnerLines];
};

const gameReducer = (state, action) => {
  if (action.type === "squareClicked") {
    const boxArray = [...state.boxArray];
    //player already won or square already clicked
    if (state.winningPlayer || !!boxArray[action.payload]) return state;

    boxArray[action.payload] = state.playerTurn;
    const playerTurn = state.playerTurn === xTurn ? yTurn : xTurn;
    let winningPlayer = state.winningPlayer;
    let winnerLines = state.winnerLines;

    let backHistory = [...state.backHistory];
    const winningData = haveWinningCombo(boxArray, winningPlayer, winnerLines);

    const gameOver = boxArray.every((item) => !!item) || winningData[0];
    winningPlayer = winningData[1];
    winnerLines = winningData[2];
    backHistory.push({ type: state.playerTurn, index: action.payload });

    return {
      boxArray,
      winningPlayer,
      gameOver,
      playerTurn,
      winnerLines,
      backHistory
    };
  } else if (action.type === "gameReset") {
    return {
      ...intialState
    };
  } else if (action.type === "backClicked") {
    const boxArray = [...state.boxArray];
    let lastIndex = state.backHistory[state.backHistory.length - 1].index;
    boxArray[lastIndex] = "";
    let winningPlayer = null;
    let gameOver = false;
    let playerTurn = state.backHistory[state.backHistory.length - 1].type;
    let winnerLines = [null, null, null];

    let backHistory = [...state.backHistory];
    backHistory.pop();
    return {
      boxArray,
      winningPlayer,
      gameOver,
      playerTurn,
      winnerLines,
      backHistory
    };
  }
};

const useActions = (state, dispatch) => ({
  onSquareClick: (id) => dispatch({ type: "squareClicked", payload: id }),
  onResetClick: () => dispatch({ type: "gameReset" }),
  onBackClick: () => dispatch({ type: "backClicked" })
});

const Game = () => {
  const [state, dispatch] = useReducer(gameReducer, intialState);
  const actions = useActions(state, dispatch);
  const {
    boxArray,
    winningPlayer,
    gameOver,
    playerTurn,
    winnerLines,
    backHistory
  } = state;
  return (
    <Board
      boxArray={boxArray}
      winningPlayer={winningPlayer}
      gameOver={gameOver}
      backHistory={backHistory}
      playerTurn={playerTurn}
      onSquareClick={actions.onSquareClick}
      onResetClick={actions.onResetClick}
      onBackClick={actions.onBackClick}
      winnerLines={winnerLines}
    />
  );
};

export default Game;
