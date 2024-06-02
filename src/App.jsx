import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Outlet } from  'react-router-dom'
function App() {

  return (
    <>
    <div>
 <main>  
  {/* outlet to render the component inside parent element */}
  <Outlet />

 </main>
 </div>
    </>
  )
}

export default App
