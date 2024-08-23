import { create } from 'zustand';

const useChat = create((set) => ({
    chat: [],
    setChat: (data) => {
        set({chat: data});
    }
}));

export default useChat