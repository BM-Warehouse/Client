import { create } from 'zustand';

const useSidebarStore = create((set) => ({
  expanded: false,
  setExpanded: (val) => set(() => ({ expanded: val })),
  toggleExpanded: () => set((state) => ({ expanded: !state.expanded }))
}));

export default useSidebarStore;
