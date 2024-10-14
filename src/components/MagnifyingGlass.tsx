import React, { useState, useEffect } from 'react';
import { ObjectType } from '../utils/objectGenerator';

interface MagnifyingGlassProps {
  strength: number;
  size: number;
  parentRef: React.RefObject<HTMLDivElement>;
  objects: ObjectType[];
  onStrengthChange: (newStrength: number) => void;
  onSizeChange: (newSize: number) => void;
  onPositionChange: (position: { x: number; y: number }) => void;
}

const MagnifyingGlass: React.FC<MagnifyingGlassProps> = ({ 
  strength, 
  size, 
  parentRef, 
  objects, 
  onStrengthChange,
  onSizeChange,
  onPositionChange
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isRightMouseDown, setIsRightMouseDown] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (parentRef.current) {
        const rect = parentRef.current.getBoundingClientRect();
        const newPosition = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        };
        setPosition(newPosition);
        onPositionChange(newPosition);
      }
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isRightMouseDown) {
        const delta = e.deltaY > 0 ? -10 : 10;
        const newSize = Math.max(50, Math.min(200, size + delta));
        onSizeChange(newSize);
      } else {
        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        const newStrength = Math.max(1, Math.min(5, strength + delta));
        onStrengthChange(newStrength);
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (e.button === 2) {
        setIsRightMouseDown(true);
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (e.button === 2) {
        setIsRightMouseDown(false);
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    document.addEventListener('mousemove', handleMouseMove);
    parentRef.current?.addEventListener('wheel', handleWheel, { passive: false });
    parentRef.current?.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    parentRef.current?.addEventListener('contextmenu', handleContextMenu);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      parentRef.current?.removeEventListener('wheel', handleWheel);
      parentRef.current?.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      parentRef.current?.removeEventListener('contextmenu', handleContextMenu);
    };
  }, [parentRef, strength, size, onStrengthChange, onSizeChange, isRightMouseDown, onPositionChange]);

  const magnifierRadius = size / 2;
  const scaleFactor = strength;

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: `${position.x - magnifierRadius}px`,
        top: `${position.y - magnifierRadius}px`,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        border: '4px solid #4FD1C5',
        overflow: 'hidden',
        zIndex: 30,
        boxShadow: '0 0 0 4px rgba(79, 209, 197, 0.3), 0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div
        className="absolute"
        style={{
          left: `${-position.x + magnifierRadius}px`,
          top: `${-position.y + magnifierRadius}px`,
          width: `${parentRef.current?.clientWidth || 0}px`,
          height: `${parentRef.current?.clientHeight || 0}px`,
          transform: `scale(${scaleFactor})`,
          transformOrigin: `${position.x}px ${position.y}px`,
        }}
      >
        {objects.map((object) => (
          <div
            key={object.id}
            className="absolute transition-all duration-200"
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
          >
            {object.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MagnifyingGlass;