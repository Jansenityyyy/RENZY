import '../styles/PopUp.css';

function FailedPopUp({ title, message, onClose }) {
  return (
    <div className="popup-overlay">
      <div className="popup popup-failed">
        <div className="popup-icon">✕</div>
        <h3 className="popup-title">{title}</h3>
        <p className="popup-message">{message}</p>
        <button className="popup-button" onClick={onClose}>
          Try Again
        </button>
      </div>
    </div>
  );
}

export default FailedPopUp;