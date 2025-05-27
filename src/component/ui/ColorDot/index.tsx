import React from 'react';

interface ColorDotProps {
  color: string;
  width: number | string;
}

const ColorDot: React.FC<ColorDotProps> = ({ color, width }) => {
  const size = typeof width === 'number' ? `${width}px` : width;

  return (
    <span
      style={{
        display: 'inline-block',
        width: size,
        height: size,
        backgroundColor: color,
        borderRadius: '50%',
      }}
    />
  );
};

export default ColorDot;