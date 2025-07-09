import React from 'react';
import PropTypes from 'prop-types';

const ModalConfirm = ({ isOpen, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <p>{message}</p>
        <button onClick={onConfirm}>Yes</button>
        <button onClick={onCancel}>No</button>
      </div>
    </div>
  );
};

ModalConfirm.propTypes = { isOpen: PropTypes.bool.isRequired, message: PropTypes.string.isRequired, onConfirm: PropTypes.func.isRequired, onCancel: PropTypes.func.isRequired };
export default ModalConfirm;
