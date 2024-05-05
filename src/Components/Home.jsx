import React from 'react'
import '../Styles/Home.css'
import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <div className='main-container'>
      <h1>Creative Creations</h1>
      <hr />
      <Outlet  />
    </div>
  )
}

export default Home