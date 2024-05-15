/* eslint-disable jsx-a11y/no-noninteractive-tabindex */

import Link from 'next/link';

/* eslint-disable max-len */
function CartIcon() {
  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-circle btn-ghost">
        <div className="indicator">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-secondary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <span className="badge indicator-item badge-sm text-tertiary">8</span>
        </div>
      </div>
      <div
        tabIndex={0}
        className="card dropdown-content card-compact z-[1] mt-3 w-52 bg-primary shadow"
      >
        <div className="card-body">
          <span className="text-lg font-bold text-tertiary">8 Items</span>
          <span className="text-info">Subtotal: $999</span>
          <div className="card-actions">
            <Link
              href="/checkout"
              className="btn btn-block bg-tertiary text-primary hover:bg-secondary"
            >
              View cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartIcon;
