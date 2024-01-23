import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import NoteCard from '../components/NoteCard'
import Notes from '../components/Notes'

function Home() {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  return (
    <div>
        <Navbar/>
        {/* Render the Notes component */}
        <Notes alignRight={!sidebarVisible}/>
        <NoteCard/>
    </div>
  )
}

export default Home