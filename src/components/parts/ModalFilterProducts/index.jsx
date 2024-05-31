import React from 'react';

function ModalFilterProducts({ setOrderBy, setOrderType, handleApplyFilter }) {
  return (
    <dialog id="modal_filter_products" className="modal">
      <div className="modal-box bg-primary">
        <h3 className="font-bold text-lg text-tertiary">Filter Product</h3>
        <div className="form-contro my-5">
          <label htmlFor="orderBy">Order by:</label>
          <select
            name="orderBy"
            onChange={(e) => setOrderBy(e.target.value)}
            className="border-2 w-full rounded-md h-10"
          >
            <option value="id">ID</option>
            <option value="name">Name</option>
            <option value="price">Price</option>
          </select>
        </div>
        <div className="form-control">
          <label htmlFor="orderType">Order type:</label>
          <select
            name="orederType"
            onChange={(e) => setOrderType(e.target.value)}
            className="border-2 w-full rounded-md h-10"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
        <div className="container-btn-action flex items-center justify-between">
          <div className="container-btn-submit mt-7">
            <button
              type="submit"
              onClick={handleApplyFilter}
              className="btn text-white bg-secondary"
            >
              Apply
            </button>
          </div>
          <div className="modal-action">
            <button
              type="button"
              className="btn bg-secondary text-white"
              onClick={() => document.getElementById('modal_filter_products').close()}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}

export default ModalFilterProducts;
