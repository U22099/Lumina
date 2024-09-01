import { create } from 'zustand';

const useChat = create((set) => ({
    chat: [],
    setChat: (data) => {
        set({chat: data});
    }
}));


export const useError = create((set) => ({
    error: false,
    setError: (data) => {
        set({error: data});
    }
}));

export default useChat;