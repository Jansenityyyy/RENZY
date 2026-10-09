import '../styles/PopUp.css';

function ConfirmPopUp({ title, message, confirmText = 'Confirm', onConfirm, onCancel }) {
  return (
    <div className="popup-overlay">
      <div className="popup popup-confirm">
        <div className="popup-icon">?</div>
        <h3 className="popup-title">{title}</h3>
        <p className="popup-message">{message}</p>
        <div className="popup-actions">
          <button className="popup-button popup-button-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button className="popup-button" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmPopUp;