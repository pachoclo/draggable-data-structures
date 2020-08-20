import React from 'react'
import './App.css'
import { DraggableArray } from './components/DraggableArray'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <DraggableArray array={[1, -2, 3, -4, 5, -6]} />
      </header>
    </div>
  )
}

export default App
