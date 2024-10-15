import React, { useState, useRef, useEffect } from 'react';
import GameBoard from './GameBoard';
import MagnifyingGlass from './MagnifyingGlass';
import SidePanel from './SidePanel';
import { generateObjects, ObjectType } from '../utils/objectGenerator';

const Game: React.FC = () => {
  console.log('Game component rendering');

  const [objects, setObjects] = useState<ObjectType[]>([]);
  const [targetObject, setTargetObject] = useState<ObjectType | null>(null);
  const [magnifyingGlassStrength, setMagnifyingGlassStrength] = useState(2);
  const [magnifyingGlassSize, setMagnifyingGlassSize] = useState(100);
  const [magnifyingGlassPosition, setMagnifyingGlassPosition] = useState({ x: 0, y: 0 });
  const [lives, setLives] = useState(3);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [objectsFound, setObjectsFound] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);

  const gameBoardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log('Game component mounted');
    const newObjects = generateObjects(20, 30);
    setObjects(newObjects);
    const newTarget = newObjects[Math.floor(Math.random() * newObjects.length)];
    setTargetObject(newTarget);
    console.log('Initial objects:', newObjects);
    console.log('Initial target object:', newTarget);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          // Handle game over logic here
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleObjectClick = (clickedObject: ObjectType) => {
    console.log('Object clicked in Game component:', clickedObject);
    console.log('Current target object:', targetObject);

    if (clickedObject.id === targetObject?.id) {
      console.log('Correct object found!');
      setObjectsFound((prev) => prev + 1);
      setFeedback("Correct! Great job!");
      
      const updatedObjects = objects.filter((obj) => obj.id !== clickedObject.id);
      setObjects(updatedObjects);
      console.log('Updated objects:', updatedObjects);

      if (updatedObjects.length > 0) {
        const newTarget = updatedObjects[Math.floor(Math.random() * updatedObjects.length)];
        setTargetObject(newTarget);
        console.log('New target object:', newTarget);
      } else {
        console.log('All objects found!');
        setFeedback("Congratulations! You've found all objects!");
      }
    } else {
      console.log('Incorrect object clicked');
      setLives((prev) => {
        const newLives = prev - 1;
        console.log('Lives remaining:', newLives);
        if (newLives <= 0) {
          setFeedback("Game Over! No more lives left.");
        } else {
          setFeedback("Oops! That's not the right object. Try again!");
        }
        return newLives;
      });
    }

    setTimeout(() => setFeedback(null), 2000);
  };

  return (
    <div className="flex h-screen">
      <div className="flex-grow relative" ref={gameBoardRef}>
        <GameBoard
          objects={objects}
          onObjectClick={handleObjectClick}
          magnifyingGlassPosition={magnifyingGlassPosition}
          magnifyingGlassSize={magnifyingGlassSize}
        />
        <MagnifyingGlass
          strength={magnifyingGlassStrength}
          size={magnifyingGlassSize}
          parentRef={gameBoardRef}
          objects={objects}
          onStrengthChange={setMagnifyingGlassStrength}
          onSizeChange={setMagnifyingGlassSize}
          onPositionChange={setMagnifyingGlassPosition}
        />
        {feedback && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded shadow">
            {feedback}
          </div>
        )}
      </div>
      <SidePanel
        magnifyingGlassStrength={magnifyingGlassStrength}
        setMagnifyingGlassStrength={setMagnifyingGlassStrength}
        magnifyingGlassSize={magnifyingGlassSize}
        setMagnifyingGlassSize={setMagnifyingGlassSize}
        targetObject={targetObject}
        lives={lives}
        timeLeft={timeLeft}
        objectsFound={objectsFound}
      />
    </div>
  );
};

export default Game;
