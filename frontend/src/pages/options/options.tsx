import React from 'react'
import { createRoot } from 'react-dom/client'
import { PopupIndex } from '@/components/Popup' 
import './options.css'
import '@root/index.css'

const App: React.FC<{}> = () => {
  return (
    <PopupIndex />
  )
}

const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container)
root.render(<App />)
