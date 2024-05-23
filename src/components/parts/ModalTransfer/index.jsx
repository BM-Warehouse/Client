import React from 'react';

import { FaWhatsapp } from 'react-icons/fa';

function ModalTransfer({ totalPrice, id, handleResetCart }) {
  return (
    <dialog id={id} className="modal modal-middle">
      <div className="modal-box bg-primary">
        <div className="text-base  pt-5 px-2 flex items-center justify-center flex-col mb-10 text-justify ">
          <div className="main-info ">
            Please make the payment by transferring to <b>BCA</b> account number <b>0500673610</b>{' '}
            in the name of <b>KIT HARINGTON </b>for <span className="font-bold">{totalPrice}</span>{' '}
            and send the transfer proof to WhatsApp 0892602833123.
          </div>
          <div className="mt-3">
            <a
              target="_blank"
              href="whatsapp://send?text=Hello&phone=+6285211940022"
              className=" bg-tertiary text-bgColor px-3 py-1 flex justify-center items-center gap-2  hover:bg-secondary rounded-xl"
            >
              <FaWhatsapp /> Whatsapp
            </a>
          </div>
        </div>

        <div className="modal-action">
          <form method="dialog">
            <button
              type="button"
              onClick={handleResetCart}
              className="btn bg-secondary text-white h-10 min-h-2 rounded-2xl"
            >
              Close
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}

export default ModalTransfer;
