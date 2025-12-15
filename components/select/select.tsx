import React from 'react';

interface SelectProps {
  State?: string;
  Theme?: string;
  children?: React.ReactNode;
}

const Select: React.FC<SelectProps> = ({ State, Theme, children }) => {
  return <div>{[State, Theme].filter(Boolean).join(' • ') || children}</div>;
};

export default Select;
