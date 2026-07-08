import React from 'react';

export function FeedbackMessage({ type, message }) {
  if (!message) return null;

  const typeClass = type === 'error' ? 'feedback-error' : type === 'success' ? 'feedback-success' : 'feedback-info';

  return (
    <div className={`feedback-message ${typeClass}`}>
      {message}
    </div>
  );
}
