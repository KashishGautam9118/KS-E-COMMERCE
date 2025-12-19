'use client';

import { useEffect } from 'react';

function CartModal({ show, onClose, product }) {
  useEffect(() => {
    if (show) {
      // Bootstrap modal show
      const modal = new window.bootstrap.Modal(document.getElementById('cartModal'));
      modal.show();

      // Clean up on unmount
      return () => {
        modal.hide();
      };
    }
  }, [show]);

  if (!show || !product) return null;

  return (
    <div className="modal fade" id="cartModal" tabIndex="-1" aria-labelledby="cartModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-success" id="cartModalLabel">
              <i className="bi bi-check-circle-fill me-2"></i>
              Added to Cart!
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="d-flex align-items-center">
              <img
                src={product.image}
                alt={product.name}
                className="img-fluid me-3"
                style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                onError={(e) => {
                  e.target.src = `https://via.placeholder.com/80x80/FF6B6B/FFFFFF?text=${encodeURIComponent(product.name)}`;
                }}
              />
              <div>
                <h6 className="mb-1">{product.name}</h6>
                <p className="text-primary fw-bold mb-0">₹{product.price.toLocaleString('en-IN')}</p>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={onClose}>
              Continue Shopping
            </button>
            <a href="/cart" className="btn btn-primary">
              View Cart
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export { CartModal };
