import { create } from 'zustand';

const useModalStore = create((set) => ({
  isOpen: false,
  title: '',
  body: null,
  buttonLabel: null,
  openModal: (title, body, buttonLabel) => set({ isOpen: true, title, body, buttonLabel }),
  closeModal: () => set({ isOpen: false, title: '', body: null, buttonLabel: null })
}));

export default useModalStore;
