import React from 'react';

function ModalConfirmation({ action, message, id }) {
  return (
    <dialog id={id} className="modal">
      <div className="modal-box bg-primary">
        <h3 className="text-base font-bold pt-5 px-3 text-secondary">{message}</h3>

        <div className="container-btn-action flex items-center justify-between">
          <div className="container-btn-submit mt-7">
            <button
              onClick={action}
              type="submit"
              className="btn bg-secondary px-7 text-white h-10 min-h-2 rounded-2xl"
            >
              Yes
            </button>
          </div>
          <div className="modal-action">
            <form method="dialog" className="flex flex-row-reverse justify-between">
              <button className="btn bg-secondary text-white h-10 min-h-2 rounded-2xl">
                Cancel
              </button>
            </form>
          </div>
        </div>
      </div>
    </dialog>
  );
}

export default ModalConfirmation;
