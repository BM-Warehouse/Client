const Modal = ({ title, body }) => (
  <div className="z-100 fixed inset-0 flex items-center justify-center bg-black/50">
    <div className="flex flex-col items-center justify-start rounded-xl bg-white p-10">
      <h1 className="mb-6 text-2xl">{title}</h1>
      <div>{body}</div>
    </div>
  </div>
);

export default Modal;
