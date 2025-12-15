import React from 'react';

interface ModalProps {
  Type?: string;
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ Type, children }) => {
  return <div>{[Type].filter(Boolean).join(' • ') || children}</div>;
};

export default Modal;
