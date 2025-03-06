import React, { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import {  useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { setSocket } from './redux/socketSlice';
import { setOnlineUsers } from './redux/userSlice';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

const App = () => {
  const {authUser} = useSelector(store=>store.user);
  const {socket} = useSelector(store=>store.socket);
  const dispatch = useDispatch() 


useEffect(()=>{
if(authUser){
  const socketio = io('http://localhost:8000',{
    query :{
      userId : authUser._id
    }
  })
  dispatch(setSocket(socketio))
  socketio.on('getOnlineUsers', (onlineUsers)=>{
    dispatch(setOnlineUsers(onlineUsers))
  })
  return () => socketio.close()
}
else{
  if(socket){
    socket.close()
    dispatch(setSocket(null))
  }
}

},[authUser])



  return (
    <div className='h-screen p-4 flex items-center justify-center'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
