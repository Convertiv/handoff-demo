import React from 'react';

interface SwitchProps {
  State?: string;
  Activity?: string;
  Theme?: string;
  children?: React.ReactNode;
}

const Switch: React.FC<SwitchProps> = ({ State, Activity, Theme, children }) => {
  return <div>{[State, Activity, Theme].filter(Boolean).join(' • ') || children}</div>;
};

export default Switch;
