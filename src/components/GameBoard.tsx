import React from 'react';
import { ObjectType } from '../utils/objectGenerator';

interface GameBoardProps {
  objects: ObjectType[];
  onObjectClick: (object: ObjectType) => void;
  magnifyingGlassPosition: { x: number; y: number };
  magnifyingGlassSize: number;
}

const GameBoard: React.FC<GameBoardProps> = ({ objects, onObjectClick, magnifyingGlassPosition, magnifyingGlassSize }) => {
  const clipPath = `circle(${magnifyingGlassSize / 2}px at ${magnifyingGlassPosition.x}px ${magnifyingGlassPosition.y}px)`;

  return (
    <div className="w-full h-full relative cursor-none bg-gradient-to-br from-green-100 to-blue-100">
      {/* Layer for original objects */}
      <div className="absolute inset-0 z-10">
        {objects.map((object) => (
          <div
            key={object.id}
            className="absolute cursor-none transition-all duration-200 hover:scale-110"
            style={{
              left: `${object.x}%`,
              top: `${object.y}%`,
              width: '24px',
              height: '24px',
              backgroundColor: object.color,
              clipPath: object.shape,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 'bold',
              color: 'white',
              textShadow: '1px 1px 1px rgba(0,0,0,0.5)',
            }}
            onClick={() => onObjectClick(object)}
          >
            {object.label}
          </div>
        ))}
      </div>

      {/* Layer to completely hide original objects under magnifying glass */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'rgba(255, 255, 255, 1)', // Changed to fully opaque
          clipPath: `circle(${magnifyingGlassSize / 2}px at ${magnifyingGlassPosition.x}px ${magnifyingGlassPosition.y}px)`,
          zIndex: 20,
        }}
      ></div>
    </div>
  );
};

export default GameBoard;