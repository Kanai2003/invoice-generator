import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import SignIn from './pages/SignIn'
import ProductPage from './pages/ProductPage'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { Toaster } from 'react-hot-toast';
import SignUp from './pages/SignUp'
import Layout from './Layout'



const router = createBrowserRouter(
  
  createRoutesFromElements(
    
    <Route path='/' element={<Layout/> }>
      <Route path="" element={<SignUp/>} />
      <Route path='/signin' element={<SignIn/>} />
      <Route path='/product' element={<ProductPage/>} />
    </Route>
  )
)


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
    <Toaster position="bottom-center" />
  </React.StrictMode>
)

