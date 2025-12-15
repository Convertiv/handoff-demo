import React from 'react';

interface BadgeProps {
  Type?: string;
  Theme?: string;
  State?: string;
  children?: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({ Type, Theme, State, children }) => {
  return <div>{[Type, Theme, State].filter(Boolean).join(' • ') || children}</div>;
};

export default Badge;
