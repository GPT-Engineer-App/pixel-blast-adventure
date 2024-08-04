import { useEffect, useRef, useState } from 'react';
import { useGameLoop } from '../hooks/useGameLoop';
import { drawGame, updateGame, CANVAS_WIDTH, CANVAS_HEIGHT } from '../utils/gameLogic';

const Game = () => {
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState({
    player: { x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT - 50, speed: 5 },
    bullets: [],
    enemies: [],
    score: 0,
    gameOver: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      if (['w', 'a', 's', 'd', ' '].includes(key)) {
        setGameState((prevState) => updateGame(prevState, key));
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useGameLoop(() => {
    if (!gameState.gameOver) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      drawGame(ctx, gameState);
      setGameState((prevState) => updateGame(prevState));
    }
  });

  const restartGame = () => {
    setGameState({
      player: { x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT - 50, speed: 5 },
      bullets: [],
      enemies: [],
      score: 0,
      gameOver: false,
    });
  };

  return (
    <div className="relative">
      <canvas ref={canvasRef} className="border border-white" />
      <div className="absolute top-2 left-2 text-white text-xl">
        Score: {gameState.score}
      </div>
      {gameState.gameOver && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Game Over</h2>
            <p className="text-xl mb-4">Your Score: {gameState.score}</p>
            <button
              onClick={restartGame}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Restart Game
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;
