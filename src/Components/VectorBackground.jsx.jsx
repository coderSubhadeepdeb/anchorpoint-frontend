import React from 'react';

const VectorBackground = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden opacity-10">
    <svg
      width="100%"
      height="100%"
      preserveAspectRatio="none"
      viewBox="0 0 1200 800"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Horizontal lines */}
      <path d="M0 100H1200" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5 5" />
      <path d="M0 300H1200" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5 5" />
      <path d="M0 500H1200" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5 5" />
      <path d="M0 700H1200" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5 5" />
      
      {/* Vertical lines */}
      <path d="M100 0V800" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5 5" />
      <path d="M300 0V800" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5 5" />
      <path d="M500 0V800" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5 5" />
      <path d="M700 0V800" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5 5" />
      <path d="M900 0V800" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5 5" />
      <path d="M1100 0V800" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5 5" />
      
      {/* Diagonal lines */}
      <path d="M0 0L1200 800" stroke="currentColor" strokeWidth="0.3" strokeDasharray="3 3" />
      <path d="M1200 0L0 800" stroke="currentColor" strokeWidth="0.3" strokeDasharray="3 3" />
    </svg>
  </div>
);

export default VectorBackground;