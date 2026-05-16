import { useState, useRef } from 'react';

export default function MovingButton({ children, onClick, style = {} }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const moved = useRef(0);

  const handleMouseEnter = (e) => {
    // Only run away first 3 times, then let user click (frustrating, not impossible)
    if (moved.current < 3) {
      const randomX = (Math.random() - 0.5) * 300;
      const randomY = (Math.random() - 0.5) * 200;
      setPos({ x: randomX, y: randomY });
      moved.current += 1;
    }
  };

  return (
    <button
      onMouseEnter={handleMouseEnter}
      onClick={onClick}
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        transition: 'transform 0.3s ease',
        ...style,
      }}
    >
      {children}
    </button>
  );
}
