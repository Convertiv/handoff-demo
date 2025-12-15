import React from 'react';

interface TooltipProps {
  Horizontal?: string;
  Vertical?: string;
  children?: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ Horizontal, Vertical, children }) => {
  return <div>{[Horizontal, Vertical].filter(Boolean).join(' • ') || children}</div>;
};

export default Tooltip;
