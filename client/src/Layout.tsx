import axios from 'axios';
import { login } from './redux/reducer/userReducer';
import { useDispatch } from 'react-redux';
import { Outlet } from "react-router-dom";
import { useEffect } from 'react';
import Header from './components/Header';

function Layout() {
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/me`, { withCredentials: true })
      .then((response) => {
        // console.log(response)
        dispatch(login(response.data))
      })
      .catch((error) => {
        console.error('Login error:', error);
      })
  }, [])




  return (
    <>
    <Header />
      <Outlet />
    </>
  )
}

export default Layout