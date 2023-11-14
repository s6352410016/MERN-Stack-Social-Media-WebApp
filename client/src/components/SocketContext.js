import React, { useEffect, useRef, createContext } from 'react';
import io from 'socket.io-client';

export const SocketIOContext = createContext();

const SocketContext = (props) => {
    const socket = useRef();

    useEffect(() => {
        socket.current = io(`${process.env.REACT_APP_SERVER_DOMAIN}`);
    }, []);

    return (
        <SocketIOContext.Provider value={{socket}}>
            {props.children}
        </SocketIOContext.Provider>
    );
}

export default SocketContext;