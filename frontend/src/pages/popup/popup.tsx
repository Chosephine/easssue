import React, {useEffect} from 'react'
import { createRoot } from 'react-dom/client'
import './popup.css'
import '@root/index.css'

const App: React.FC<{}> = () => {
  useEffect(() =>{
    console.log('popup render');
    
  },[])
  return (
    <div>
      <img src="smalllogo.png" />
      <h1 className="text-sm font-bold underline">
      Hello world!
    </h1>
    </div>
  )
}

const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container)
root.render(<App />)
