import React, { ReactNode, MouseEventHandler } from 'react';

interface ModalProps {
  children: ReactNode;
  onClose: MouseEventHandler<HTMLButtonElement>;
}

const Modal = ({ children, onClose }: ModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="bg-white w-1/2 p-4 rounded-md">
      <div className="flex justify-end">
        <button
          className="text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          Close
        </button>
      </div>
      <div>{children}</div>
    </div>
  </div>
  );
};

export default Modal;
