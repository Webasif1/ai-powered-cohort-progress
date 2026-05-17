import { useState, useRef } from 'react';
import { playFahh } from '../../utils/Sounds.js';

export default function MovingButton({ children, onClick, style = {} }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const moved = useRef(0);

  const handleMouseEnter = () => {
    if (moved.current < 4) {
      const x = (Math.random() - 0.5) * 320;
      const y = (Math.random() - 0.5) * 180;
      setPos({ x, y });
      moved.current += 1;
      playFahh(); // fahh every time the button escapes your cursor
    }
  };

  const handleClick = () => {
    moved.current = 0;
    setPos({ x: 0, y: 0 });
    if (onClick) onClick();
  };

  return (
    <button
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        transition: 'transform 0.25s cubic-bezier(0.68,-0.55,0.27,1.55)',
        ...style,
      }}
    >
      {children}
    </button>
  );
}
