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
    const newObjects = generateObjects(10, 20);
    setObjects(newObjects);
    setTargetObject(newObjects[Math.floor(Math.random() * newObjects.length)]);
  }, []);

  const handleObjectClick = (clickedObject: ObjectType) => {
    if (clickedObject.id === targetObject?.id) {
      setObjectsFound((prev) => prev + 1);
      const newObjects = generateObjects(10, 20);
      setObjects(newObjects);
      setTargetObject(newObjects[Math.floor(Math.random() * newObjects.length)]);
    } else {
      setLives((prev) => prev - 1);
    }
  };

  const handleStrengthChange = (newStrength: number) => {
    setMagnifyingGlassStrength(newStrength);
  };

  const handleSizeChange = (newSize: number) => {
    setMagnifyingGlassSize(newSize);
  };

  const handlePositionChange = (newPosition: { x: number; y: number }) => {
    setMagnifyingGlassPosition(newPosition);
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
