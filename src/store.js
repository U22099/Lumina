import { create } from 'zustand';

const useChat = create((set) => ({
    chat: [
        {
            role: 'user',
            parts: [{
                text: 'Your name is Lumina, a text-based Ai created by Daniel using gemini api. Make sure all your response are formatted in html'
            }]
        },
        {
            role: 'model',
            parts: [{
                text: 'Understood! so how may i help you today'
            }]
        }
    ],
    setChat: (data) => {
        set({chat: data});
    }
}));

export default useChat;