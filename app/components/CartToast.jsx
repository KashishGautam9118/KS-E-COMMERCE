'use client';
import { useEffect, useRef } from 'react';

export default function CartToast({ message }) {
  const toastRef = useRef(null);

  useEffect(() => {
    if (message && toastRef.current) {
      toastRef.current.classList.add('show');
      const timeoutId = setTimeout(() => {
        if (toastRef.current) {
          toastRef.current.classList.remove('show');
        }
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [message]);

  if (!message) return null;

  return (
    <div
      className="position-fixed top-0 end-0 p-5"
      style={{ zIndex: 1055, maxWidth: '350px' }}
    >
      <div
        ref={toastRef}
        className="toast shadow-lg border-0 rounded-4 text-bg-primary fade"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        style={{ fontSize: '1.1rem', padding: '1rem 1.2rem' }}
      >
        <div className="d-flex align-items-center">
          <div className="toast-body flex-grow-1">{message}</div>
          <button
            type="button"
            className="btn-close btn-close-white ms-3"
            onClick={() => toastRef.current.classList.remove('show')}
            aria-label="Close"
          ></button>
        </div>
      </div>
    </div>
  );
}
