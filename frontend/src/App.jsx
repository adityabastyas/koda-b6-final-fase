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
import store, { persistor } from './redux/store'
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

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
        path: "analytics",
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
      <Provider store={store}>
       <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
    
  )
}

export default App