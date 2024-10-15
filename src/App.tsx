import React, { useState, useEffect, useRef } from 'react';
import MagnifyingGlass from './components/MagnifyingGlass';
import SidePanel from './components/SidePanel';
import GameBoard from './components/GameBoard';
import { generateObjects, ObjectType } from './utils/objectGenerator';

const App: React.FC = () => {
  const [objects, setObjects] = useState<ObjectType[]>([]);
  const [targetObject, setTargetObject] = useState<ObjectType | null>(null);
  const [magnifyingGlassStrength, setMagnifyingGlassStrength] = useState(2);
  const [magnifyingGlassSize, setMagnifyingGlassSize] = useState(100);
  const [magnifyingGlassPosition, setMagnifyingGlassPosition] = useState({ x: 0, y: 0 });
  const [lives, setLives] = useState(3);
  const [timeLeft, setTimeLeft] = useState(300);
  const [objectsFound, setObjectsFound] = useState(0);
  const gameBoardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadNextTarget();
  }, []);

  const handleObjectClick = (clickedObject: ObjectType) => {
    console.log(`Handling click for object: ${clickedObject.id}`);
    if (clickedObject.id === targetObject?.id) {
      console.log('Correct object found!');
      setObjectsFound((prev) => {
        const newCount = prev + 1;
        console.log(`Objects Found Updated: ${newCount}`);
        return newCount;
      });
      loadNextTarget();
    } else {
      console.log('Incorrect object clicked.');
      setLives((prev) => {
        const updatedLives = Math.max(prev - 1, 0);
        console.log(`Lives Updated: ${updatedLives}`);
        if (updatedLives === 0) {
          alert('Game Over! You have no more lives.');
          // Optionally, implement game reset logic here
        }
        return updatedLives;
      });
    }
  };

  const loadNextTarget = () => {
    const newObjects = generateObjects(10, 20);
    setObjects(newObjects);
    if (newObjects.length > 0) {
      const newTarget = newObjects[Math.floor(Math.random() * newObjects.length)];
      setTargetObject(newTarget);
      console.log(`New target object set: ${newTarget.id}`);
    } else {
      console.error('No objects generated to set as target.');
    }
  };

  const handleStrengthChange = (newStrength: number) => {
    setMagnifyingGlassStrength(newStrength);
    console.log(`Magnifying Glass Strength Updated: ${newStrength}`);
  };

  const handleSizeChange = (newSize: number) => {
    setMagnifyingGlassSize(newSize);
    console.log(`Magnifying Glass Size Updated: ${newSize}`);
  };

  const handlePositionChange = (newPosition: { x: number; y: number }) => {
    setMagnifyingGlassPosition(newPosition);
    console.log(`Magnifying Glass Position Updated: x=${newPosition.x}, y=${newPosition.y}`);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-100 to-purple-100">
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
          onStrengthChange={handleStrengthChange}
          onSizeChange={handleSizeChange}
          onPositionChange={handlePositionChange}
        />
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

export default App;