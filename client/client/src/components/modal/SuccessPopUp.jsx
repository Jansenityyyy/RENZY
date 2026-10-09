import '../styles/PopUp.css';

function SuccessPopUp({ title, message, onClose }) {
  return (
    <div className="popup-overlay">
      <div className="popup popup-success">
        <div className="popup-icon">✓</div>
        <h3 className="popup-title">{title}</h3>
        <p className="popup-message">{message}</p>
        <button className="popup-button" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
}

export default SuccessPopUp;