import React from 'react'
import { createRoot } from 'react-dom/client'
import '@root/index.css'
import KeywordModal from './Modals/Keywords/KeywordComponent';

const App: React.FC<{}> = () => {
  return (
    <div>
      <h1 className="text-3xl text-blue-500 font-bold underline">
      Hello world!
    </h1>
      <img src="biglogo.png" />
      <KeywordModal />
    </div>
  )
}

const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container)
root.render(<App />)
