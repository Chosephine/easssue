import React from 'react'
import { createRoot } from 'react-dom/client'

const App: React.FC<{}> = () => {
  return (
    <div>
      <h1>HEllo World!</h1>
      <img src="biglogo.png" />
    </div>
  )
}

const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container)
root.render(<App />)
