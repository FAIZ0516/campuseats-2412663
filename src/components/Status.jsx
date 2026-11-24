// Small components for the loading and error states.
export function Loading() {
  return (
    <p className="muted" role="status">
      Loading…
    </p>
  );
}

export function ErrorMessage({ message, onRetry }) {
  return (
    <div className="card error" role="alert">
      <p>Something went wrong: {message}</p>
      <button className="btn" onClick={onRetry}>
        Try again
      </button>
    </div>
  );
}
