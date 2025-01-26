import React from 'react'

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null; // 當 isOpen 為 false 時，不渲染 Modal
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
          {children}
        </div>
      </div>
    );
  };
  
  export default Modal;