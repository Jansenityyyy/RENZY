import '../styles/Loading.css';

function Loading({ message = 'Loading...', overlay = false }) {
  return (
    <div className={overlay ? 'loading-overlay' : 'loading-container'}>
      <div className="loading-spinner" />
      {message && <p className="loading-text">{message}</p>}
    </div>
  );
}

export default Loading;