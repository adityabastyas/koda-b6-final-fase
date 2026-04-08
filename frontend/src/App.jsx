import React from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import CreateLink from './pages/CreateLink'
import NotFound from './pages/NotFound'
import Profile from './pages/Profile'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from './components/AppLayout'

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/register",
    element: <Register/>
  },
  {
    path: "/notfound",
    element: <NotFound/>

  },
  {
    element: <AppLayout/>,
    children: [
      {
        index: true,
        element: <Home/>
      },
      {
        path: "dashboard",
        element: <Dashboard/>
      },
      {
        path: "create-link",
        element: <CreateLink/>
      },
      {
        path: "profile",
        element: <Profile/>

      }

    ]
  }

])
function App() {
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App