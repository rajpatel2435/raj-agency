import React from 'react'
import ReactDOM from 'react-dom/client'
 import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store.js'
import Home from "./pages/Home.jsx"
import Login from "./pages/Login.jsx"
import AuthLayout from "./components/AuthLayout.jsx"
import Signup from "./pages/Signup.jsx"

import AllPosts from "./pages/AllPosts.jsx"
import AddPosts from "./pages/AddPosts.jsx"
import Post from "./pages/Post.jsx"
import EditPost from './pages/EditPost.jsx'

const router= createBrowserRouter([
  {
    path:"/",
    element: <App />,
    children:[
      {
        path:"/",
        element: <Home />
      },
      {
        path:"/login",
        element: (
        <AuthLayout authentication={false} >
        <Login />
        </AuthLayout>
      
      )
      },
      {
        path:"/signup",
        element: (
        <AuthLayout authentication={false} >
        <Signup />
        </AuthLayout>
      
      )
      },

      {
        path:"/all-posts",
        element: (
        <AuthLayout authentication>
        <AllPosts />
        </AuthLayout>
      
      )
      },

      {
        path:"/add-posts",
        element: (
      
        <AddPosts />
  
      
      )
      },

      {
        path:"/edit-posts/:slug",
        element: (
        <AuthLayout authentication>
        <EditPost />
        </AuthLayout>
      
      )
      },

      {
        path:"/post/:slug",
        element: (
        <AuthLayout authentication>
        <Post />
        </AuthLayout>
      
      )
      },
   
    ]
  },

  
])




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
<RouterProvider router={router} />
</Provider>
  </React.StrictMode>,
)
