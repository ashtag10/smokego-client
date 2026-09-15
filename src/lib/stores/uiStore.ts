import { create } from 'zustand'

interface UIState {
  isLoading: boolean
  isDarkMode: boolean
  sidebarOpen: boolean
  modalOpen: boolean
  modalContent: React.ReactNode | null

  // Actions
  setLoading: (isLoading: boolean) => void
  toggleDarkMode: () => void
  setDarkMode: (isDarkMode: boolean) => void
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
  openModal: (content: React.ReactNode) => void
  closeModal: () => void
}

export const useUIStore = create<UIState>((set) => ({
  isLoading: false,
  isDarkMode: false,
  sidebarOpen: false,
  modalOpen: false,
  modalContent: null,

  setLoading: (isLoading) => set({ isLoading }),

  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),

  setDarkMode: (isDarkMode) => set({ isDarkMode }),

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

  setSidebarOpen: (open) => set({ sidebarOpen: open }),

  openModal: (content) => set({ modalOpen: true, modalContent: content }),

  closeModal: () => set({ modalOpen: false, modalContent: null }),
}))