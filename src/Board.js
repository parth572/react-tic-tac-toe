const NextPlayer = ({ playerTurn }) => {
  return <div className="instruction">Next player : {playerTurn} </div>;
};

const WinningPlayer = ({ winningPlayer }) => {
  return <div className="instruction">Winner : {winningPlayer} </div>;
};

const Square = ({ index, playerTurn, onSquareClick, winnerLines }) => {
  return (
    <div
      className="conatiner-child"
      key={index}
      style={{
        color: winnerLines && winnerLines.includes(index) ? "red" : ""
      }}
      onClick={() => onSquareClick(index)}
    >
      {playerTurn}
    </div>
  );
};

const Board = ({
  boxArray,
  playerTurn,
  winningPlayer,
  onSquareClick,
  onResetClick,
  onBackClick,
  winnerLines,
  backHistory
}) => {
  return (
    <div>
      <div className="game-container">
        <NextPlayer playerTurn={playerTurn} />
        {winningPlayer && <WinningPlayer winningPlayer={winningPlayer} />}
        <button className="reset-button" onClick={onResetClick}>
          Reset
        </button>
        <div className="conatiner">
          {boxArray.map((item, index) => {
            return (
              <Square
                key={index}
                index={index}
                onSquareClick={onSquareClick}
                playerTurn={item}
                winnerLines={winnerLines}
              />
            );
          })}
        </div>

        {backHistory.length > 0 && (
          <button className="reset-button" onClick={onBackClick}>
            Go Back
          </button>
        )}
        {backHistory.map((item) => (
          <div>{item.type + " : is at position " + (item.index + 1)}</div>
        ))}
      </div>
    </div>
  );
};

export default Board;
