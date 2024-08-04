import { useEffect, useRef, useState } from 'react';
import { useGameLoop } from '../hooks/useGameLoop';
import { drawGame, updateGame } from '../utils/gameLogic';

const Game = () => {
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState({
    player: { x: 400, y: 300, speed: 5 },
    bullets: [],
    enemies: [],
    score: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 600;

    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      if (['w', 'a', 's', 'd'].includes(key)) {
        setGameState((prevState) => updateGame(prevState, key));
      }
    };

    const handleMouseDown = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setGameState((prevState) => ({
        ...prevState,
        bullets: [...prevState.bullets, { x: prevState.player.x, y: prevState.player.y }],
      }));
    };

    window.addEventListener('keydown', handleKeyDown);
    canvas.addEventListener('mousedown', handleMouseDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      canvas.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  useGameLoop(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    drawGame(ctx, gameState);
    setGameState((prevState) => updateGame(prevState));
  });

  return (
    <div className="relative">
      <canvas ref={canvasRef} className="border border-white" />
      <div className="absolute top-2 left-2 text-white text-xl">
        Score: {gameState.score}
      </div>
    </div>
  );
};

export default Game;
