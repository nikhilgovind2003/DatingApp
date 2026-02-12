import React, { createContext, useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { API_URL, SOCKET_URL } from '../apiConfig';


const SocketContext = createContext();

const SocketProvider = ({ children }) => {
    const socket = useRef(null);
    const [onlineUsers, setOnlineUsers] = useState([])
    const [istrue, setIsTrue] = useState(false)
    useEffect(() => {
        if (localStorage.getItem('jwtToken')) {
            socket.current = io(SOCKET_URL);

            socket.current.on('connect', async () => {
                console.log('Connected to socket server');
                const userId = await getUserIdFromToken(localStorage.getItem('jwtToken'));
                socket.current.emit('new-user-add', userId);
                socket.current.on("get-users", users => {
                    console.log(users)
                    setOnlineUsers(users)
                })
            });

        }

    }, [istrue]);

    const getUserIdFromToken = async (token) => {
        const response = await fetch(`${API_URL}/users/user`, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
            }
        })
        const data = await response.json()
        if (response.ok && data.length > 0) {
            return data[0]._id
        }
    };
    return (
        <SocketContext.Provider value={{ socket, onlineUsers, setIsTrue }}>
            {children}
        </SocketContext.Provider>
    );
};
export {
    SocketProvider,
    SocketContext
}