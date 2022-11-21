import React, {useEffect} from 'react'
import { createRoot } from 'react-dom/client'
import './popup.css'
import '@root/index.css'
import { PopupIndex } from '@/components/Popup'




const App: React.FC<{}> = () => {
  const now = new Date();
  useEffect(() =>{
    
  },[])

  return (
    <PopupIndex />
  )
}

const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container)
root.render(<App />)
