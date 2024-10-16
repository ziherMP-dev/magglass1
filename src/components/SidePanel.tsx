import React from 'react';
import { Search, Target, Heart, Clock, Star } from 'lucide-react';
import { ObjectType } from '../utils/objectGenerator';

interface SidePanelProps {
  magnifyingGlassStrength: number;
  setMagnifyingGlassStrength: (strength: number) => void;
  magnifyingGlassSize: number;
  setMagnifyingGlassSize: (size: number) => void;
  targetObject: ObjectType | null;
  lives: number;
  timeLeft: number;
  objectsFound: number;
}

const SidePanel: React.FC<SidePanelProps> = ({
  magnifyingGlassStrength,
  setMagnifyingGlassStrength,
  magnifyingGlassSize,
  setMagnifyingGlassSize,
  targetObject,
  lives,
  timeLeft,
  objectsFound,
}) => {
  return (
    <div className="w-80 bg-white p-6 shadow-lg flex flex-col space-y-6">
      <div>
        <h2 className="panel-title flex items-center">
          <Search className="mr-2" size={24} />
          Magnifying Glass
        </h2>
        <div className="space-y-4">
          <div>
            <label className="slider-label block">Strength</label>
            <input
              type="range"
              min="1"
              max="5"
              step="0.1"
              value={magnifyingGlassStrength}
              onChange={(e) => setMagnifyingGlassStrength(parseFloat(e.target.value))}
              className="custom-slider"
            />
          </div>
          <div>
            <label className="slider-label block">Size</label>
            <input
              type="range"
              min="50"
              max="200"
              step="10"
              value={magnifyingGlassSize}
              onChange={(e) => setMagnifyingGlassSize(parseInt(e.target.value))}
              className="custom-slider"
            />
          </div>
        </div>
      </div>
      
      <div className="target-object-container">
        <h3 className="panel-title flex items-center">
          <Target className="mr-2" size={24} />
          Find This!
        </h3>
        {targetObject && (
          <div
            className="w-24 h-24 mx-auto flex items-center justify-center"
            style={{
              backgroundColor: targetObject.color,
              clipPath: targetObject.shape,
              fontSize: '50px',
              fontWeight: 'bold',
              color: 'white',
              textShadow: '4px 4px 6px rgba(0,0,0,0.5)',
            }}
          >
            {targetObject.label}
          </div>
        )}
      </div>
      
      <div className="game-stats-container">
        <h3 className="panel-title flex items-center">
          <Star className="mr-2" size={24} />
          Game Stats
        </h3>
        <div className="space-y-2">
          <p className="flex items-center">
            <Heart className="mr-2" size={20} color="#F56565" />
            <span className="stat-label">Lives:</span>
            <span className="stat-value ml-2">{lives}</span>
          </p>
          <p className="flex items-center">
            <Clock className="mr-2" size={20} color="#4299E1" />
            <span className="stat-label">Time Left:</span>
            <span className="stat-value ml-2">
              {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </span>
          </p>
          <p className="flex items-center">
            <Star className="mr-2" size={20} color="#F6E05E" />
            <span className="stat-label">Objects Found:</span>
            <span className="stat-value ml-2">{objectsFound}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SidePanel;
