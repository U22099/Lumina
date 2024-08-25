import { create } from 'zustand';

const useChat = create((set) => ({
    chat: [
        {
            role: 'user',
            parts: [{
                text: 'Hey Lumina, explain the superman lore'
            }]
        },
        {
            role: 'model',
            parts: [{
                text: 'Superman, born kal-ei on the planet Krypton, was sent to Earth as a baby before Kryptons destruction. Found and raised by jonathan and Martha kent in Smallville. Kansas, he was named CLark Kent. As he grew Earths yello sun granted him extraordinary powers like super strengthm flight, invulnerability'
            }]
        },
        {
            role: 'user',
            parts: [{
                text: 'Must be tough, krypton being destroyed and him being the last son, sounds like a stupid asshole did that right?'
            }]
        },
        {
            role: 'model',
            parts: [{
                text: 'Superman, born kal-ei on the planet Krypton, was sent to Earth as a baby before Kryptons destruction. Found and raised by jonathan and Martha kent in Smallville. Kansas, he was named CLark Kent. As he grew Earths yello sun granted him extraordinary powers like super strengthm flight, invulnerability'
            }]
        }
    ],
    setChat: (data) => {
        set({chat: data});
    }
}));

export default useChat;