import useModalStore from '@/hooks/useModalStore';

const Modal = ({ title, body }) => {
  const isOpen = useModalStore((state) => state.isOpen);
  const closeModal = useModalStore((state) => state.closeModal);

  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 ">
          <div className="flex flex-col items-center justify-start rounded-xl bg-white p-10">
            <h1 className="mb-6 text-2xl">{title}</h1>
            <div>{body}</div>
            <div className="mt-6 flex justify-between gap-4">
              <button className="border bg-secondary px-4 py-2 text-xl text-white hover:bg-tertiary">
                Save
              </button>
              <button
                className="mr-4 border px-4 py-2 text-xl text-black hover:bg-gray-200"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
