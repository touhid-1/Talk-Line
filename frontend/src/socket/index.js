import {io} from 'socket.io-client';

export const socketInit = () => {
    const options = {
        'force new connections' : true,
        reconnectionAttempt: 'Infinity',
        timeout: 10,
        transports: ['websocket'],
    };

    return io('http://localhost:5500', options)
}