import React, { createContext, useEffect, useRef, useState, useContext } from 'react';
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
    const socket = useRef(null);
    const [onlineUsers, setOnlineUsers] = useState(new Set());
    const { isAuthenticated, userInfo } = useSelector(state => state.userAuth);

    useEffect(() => {
        if (isAuthenticated && userInfo?._id) {
            // Initialize socket connection
            socket.current = io(SOCKET_URL, {
                withCredentials: true,
                transports: ['websocket', 'polling']
            });

            socket.current.on('connect', () => {
                console.log('Connected to socket server');
                // Identify the user to the server
                socket.current.emit('joinRoom', userInfo._id);
            });

            // Listen for status changes of other users
            socket.current.on('userStatusChange', ({ userId, isActive }) => {
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
            socket.current.on('newNotification', (data) => {
                console.log('New notification received:', data);
                // You could trigger a global sound or toast here
                toast.info(`New ${data.type.replace('_', ' ')} from ${data.sender?.firstName || 'someone'}`);
            });

            // Listen for real-time status responses (for initial check)
            socket.current.on('statusResponse', ({ userId, isActive }) => {
                setOnlineUsers(prev => {
                    const newSet = new Set(prev);
                    if (isActive) newSet.add(userId);
                    else newSet.delete(userId);
                    return newSet;
                });
            });

            return () => {
                if (socket.current) {
                    socket.current.disconnect();
                    socket.current = null;
                }
            };
        }
    }, [isAuthenticated, userInfo?._id]);

    const isOnline = (userId) => {
        return onlineUsers.has(String(userId));
    };

    return (
        <SocketContext.Provider value={{ socket: socket.current, onlineUsers, isOnline }}>
            {children}
        </SocketContext.Provider>
    );
};

export {
    SocketProvider,
    SocketContext
}

