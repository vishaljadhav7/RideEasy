import  { createContext, useContext, useEffect } from 'react';
import { io } from 'socket.io-client';

export const WebSocketContext = createContext()

const socket = io("http://localhost:3000"); 

export const WebSocketProvider = ({children}) => {
 
    useEffect(()=> {
      socket.on('connection' , () => {
        console.log('Connected from server');
      });

      socket.on('disconnect', () => {
        console.log('Disconnected from server');
      });

      // return () => {
      //   socket.disconnect()
      // }
    }, []) 

    return (
        <WebSocketContext.Provider value={{socket}}>
         {children}
        </WebSocketContext.Provider>
    )
};


export function useWebSocketContext(){
    return useContext(WebSocketContext);
}

// export default WebSocketProvider;