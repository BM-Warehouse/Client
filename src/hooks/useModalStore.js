import {create} from 'zustand';

const useStoreModal = create((set) => ({
  isOpen: false,
  openModal : () => set({isOpen: true}),
  closeModal : () => set({isOpen: false})
})
);

export default useStoreModal;