// TODO: content script
import React from "react";
import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserKeyword } from "@/components/BrowserKeyword";
import { KeywordResponse } from "@/components/BrowserKeyword/types";
import './contentScript.css'
console.log("hello")
const App: React.FC<{}> = () => {
  const [trend, setTrend] = useState<KeywordResponse>({});
  const [update, setUpdate] = useState(true)
  const [host, setHost] = useState("")
  const fetchTrend = (url:any) => {
    console.log(url)
    chrome.runtime.sendMessage({url}, messageResponse => {
      console.log(messageResponse.body)
      setTrend(messageResponse.body)
    })
  }
  useEffect(() => {
    fetchTrend('https://www.nate.com/main/srv/news/data/keywordList.today.json?v=202104300430')
    setHost(window.location.host)
  }, []);
  return (
    <BrowserKeyword trend={trend} host={host}/>
  )
}
const fr = new DocumentFragment
const container = document.querySelector(".gb_Ld") || fr
const container2 = document.querySelector("#NM_WEATHER") || fr
const child = document.createElement("div")
const bg = window.getComputedStyle(document.body).backgroundColor
console.log(bg)
child.style.height = "100%"
child.style.backgroundColor = bg
container.prepend(child)
if (container === fr) {
  const root = createRoot(container2)
  root.render( 
    <App/>)
}
else{
  const root = createRoot(child)
  root.render(
    <App/>)
}




export {}