import { CategoryStoreState } from '@/types';
import { create } from 'zustand';

export const useCategoryStore = create<CategoryStoreState>()((set) => ({
  activeId: 1,
  setActiveId: (activeId: number) => set({ activeId }),
}));