import React from 'react'
import { createRoot } from 'react-dom/client'
import './options.css'
import '@root/index.css'

const App: React.FC<{}> = () => {
  return (
    <div>
      <img src="smalllogo.png" />
      <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
    </div>
  )
}

const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container)
root.render(<App />)
