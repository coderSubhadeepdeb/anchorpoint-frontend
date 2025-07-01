// components/TechnicalGridBackground.jsx
import React from 'react';

const TechnicalGridBackground = () => {
  // Configuration matching your image
  const GRID_SIZE = 20; // Main grid spacing (matches your coordinate system)
  const SUBDIVISIONS = 4; // Subdivisions between main grid lines
  const STROKE_WIDTH = 0.5;
  const TEXT_SIZE = 3;
  const COLOR = "#3B82F6"; // Blue similar to your image

  // Generate all grid elements
  const gridElements = [];
  
  // Main grid lines (every 20 units)
  for (let x = 0; x <= 100; x += GRID_SIZE) {
    gridElements.push(
      <line
        key={`v-${x}`}
        x1={x}
        y1="0"
        x2={x}
        y2="100"
        stroke={COLOR}
        strokeWidth={STROKE_WIDTH}
      />
    );
    
    // X-axis labels
    if (x > 0) {
      gridElements.push(
        <text
          key={`xlabel-${x}`}
          x={x}
          y="98"
          fill={COLOR}
          fontSize={TEXT_SIZE}
          textAnchor="middle"
        >
          {x}
        </text>
      );
    }
  }

  for (let y = 0; y <= 100; y += GRID_SIZE) {
    gridElements.push(
      <line
        key={`h-${y}`}
        x1="0"
        y1={y}
        x2="100"
        y2={y}
        stroke={COLOR}
        strokeWidth={STROKE_WIDTH}
      />
    );
    
    // Y-axis labels
    if (y > 0) {
      gridElements.push(
        <text
          key={`ylabel-${y}`}
          x="2"
          y={100 - y + TEXT_SIZE/2}
          fill={COLOR}
          fontSize={TEXT_SIZE}
        >
          {y}
        </text>
      );
    }
  }

  // Subdivision lines (every 5 units)
  for (let x = 0; x <= 100; x += GRID_SIZE/SUBDIVISIONS) {
    if (x % GRID_SIZE !== 0) { // Skip main grid lines
      gridElements.push(
        <line
          key={`subv-${x}`}
          x1={x}
          y1="0"
          x2={x}
          y2="100"
          stroke={COLOR}
          strokeWidth={STROKE_WIDTH * 0.7}
          strokeDasharray="1,1"
        />
      );
    }
  }

  for (let y = 0; y <= 100; y += GRID_SIZE/SUBDIVISIONS) {
    if (y % GRID_SIZE !== 0) {
      gridElements.push(
        <line
          key={`subh-${y}`}
          x1="0"
          y1={y}
          x2="100"
          y2={y}
          stroke={COLOR}
          strokeWidth={STROKE_WIDTH * 0.7}
          strokeDasharray="1,1"
        />
      );
    }
  }

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden opacity-20">
      <svg
        width="100%"
        height="100%"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        {gridElements}
        
        {/* Axes with slightly heavier lines */}
        <line x1="0" y1="100" x2="100" y2="100" stroke={COLOR} strokeWidth={STROKE_WIDTH * 1.5} />
        <line x1="0" y1="0" x2="0" y2="100" stroke={COLOR} strokeWidth={STROKE_WIDTH * 1.5} />
      </svg>
    </div>
  );
};

export default TechnicalGridBackground;