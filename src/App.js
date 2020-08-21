import React from 'react'
import './App.css'
import { Array } from './components/Array'

const defaultArray = [1, -2, 3, -4, 5, -6]

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <main className="App-main">
        <section>
          <Array array={defaultArray} />
        </section>
      </main>
    </div>
  )
}

export default App
