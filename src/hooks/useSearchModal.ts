import { create } from 'zustand'

export type SearchQuery = {
    country: string;
    checkIn: Date;
    
}

interface SearchModalStore {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}

const useSearchModal = create<SearchModalStore>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false })
}))

export default useSearchModal
