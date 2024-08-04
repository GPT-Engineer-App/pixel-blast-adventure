import { useState } from 'react';
import Game from '../components/Game';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      {!gameStarted ? (
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Top-Down Shooter</h1>
          <Button onClick={() => setGameStarted(true)} className="text-xl px-6 py-3">
            Start Game
          </Button>
        </div>
      ) : (
        <Game />
      )}
    </div>
  );
};

export default Index;
