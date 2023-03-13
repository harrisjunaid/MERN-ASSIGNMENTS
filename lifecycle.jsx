    // id is the square's number
    // call takeTurn to tell Parent the square is  filled
    const Square = ({id, takeTurn}) => {
    const mark = ['O', 'X', '+'];
    // filled tells you if square has been filled
    const [filled, setFilled] = React.useState(false);
    // tik tells you symbol in square (same as player)
    const [tik, setTik] = React.useState(2);
  
    // Step 1: Move the mounted state & toggle from the board component to here
    const [mounted, setMounted] = React.useState(true);
    const toggle = () => setMounted(!mounted);


    // Step 2: Check to see if the mounted state is false. If it is we want to return null instead of returning the button
    if(mounted)
    return (
      <button
        // DO NOT DELETE THIS id
        id={`square-button-${id}`}
        onClick={() => {
          setTik(takeTurn(id));
          setFilled(true);
          // Step 3: Trigger toggle() when button is clicked
          toggle();
        }}
      >
        <h1>{mark[tik]}</h1>
      </button>
    );
    else return null;
  };
  
  const Board = () => {
    // 1st player is X ie 1
    // State keeps track of next player and gameState
    const [player, setPlayer] = React.useState(1);
    // const [mounted, setMounted] = React.useState(true); // moved to child
    const [gameState, setGameState] = React.useState([]);
  
    // const toggle = () => setMounted(!mounted); // moveed to child
  
    /**
     * 
     * @param {number} id 
     * @returns player
     * @desc
     * - update gameState array by adding in new gameState
     * - switch player between 0 and 1
     */
    const takeTurn = (id) => {
      setGameState([...gameState, { id: id, player: player }]);
      setPlayer((player + 1) % 2); // get next player
      return player;
    };
    function renderSquare(i) {
      // use properties to pass callback function takeTurn to Child
      return (
      <Square takeTurn={takeTurn} id={i}></Square>
      );
    }
  
    return (
      <div className="game-board">
        <div className="grid-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div id="info">
          {/* <button onClick={toggle}>Show/Hide Row</button> */}
          <h1>{status}</h1>
        </div>
      </div>
    );
  };
  
  const Game = () => {
    return (
      <div className="game">
        <Board></Board>
      </div>
    );
  };
  
  // ========================================
  
  ReactDOM.render(<Game />, document.getElementById('root'));
  