import { create } from 'zustand';

const useChat = create((set) => ({
    chat: [],
    setChat: (data) => {
        set({chat: data});
    }
}));


const useError = create((set) => ({
    error: true,
    setError: (data) => {
        set({error: data});
    }
}));

export default useChat;