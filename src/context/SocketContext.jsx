import React, { createContext, useEffect, useState, useContext } from 'react';
import { io } from 'socket.io-client';
import { SOCKET_URL } from '../apiConfig';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';

const SocketContext = createContext();

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error('useSocket must be used within a SocketProvider');
    }
    return context;
};

const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState(new Set());
    const { isAuthenticated, userInfo } = useSelector(state => state.userAuth);

    useEffect(() => {
        if (isAuthenticated && userInfo?._id) {
            // Initialize socket connection
            const newSocket = io(SOCKET_URL, {
                withCredentials: true,
                transports: ['websocket', 'polling']
            });

            newSocket.on('connect', () => {
                console.log('Connected to socket server');
                // Identify the user to the server
                newSocket.emit('joinRoom', userInfo._id);
            });

            // Listen for status changes of other users
            newSocket.on('userStatusChange', ({ userId, isActive }) => {
                setOnlineUsers(prev => {
                    const newSet = new Set(prev);
                    if (isActive) {
                        newSet.add(userId);
                    } else {
                        newSet.delete(userId);
                    }
                    return newSet;
                });
            });

            // Listen for real-time notifications
            newSocket.on('newNotification', (data) => {

                const currentPath = window.location.pathname;

                console.log("CURENT PATH", data)
                if(currentPath === `/chat/${data.sender?._id}`) return;
                // You could trigger a global sound or toast here
                toast.info(`New ${data.type.replace('_', ' ')} from ${data.sender?.firstName + " " + data?.sender?.lastName || 'someone'}`);
            });

            // Listen for real-time status responses (for initial check)
            newSocket.on('statusResponse', ({ userId, isActive }) => {
                setOnlineUsers(prev => {
                    const newSet = new Set(prev);
                    if (isActive) newSet.add(userId);
                    else newSet.delete(userId);
                    return newSet;
                });
            });

            setSocket(newSocket);

            return () => {
                newSocket.disconnect();
                setSocket(null);
            };
        }
    }, [isAuthenticated, userInfo?._id]);

    const isOnline = (userId) => {
        return onlineUsers.has(String(userId));
    };

    return (
        <SocketContext.Provider value={{ socket, onlineUsers, isOnline }}>
            {children}
        </SocketContext.Provider>
    );
};

export {
    SocketProvider,
    SocketContext
}

