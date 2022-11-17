// TODO: content script
import React from "react";
import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserKeyword } from "@/components/BrowserKeyword";
import { KeywordResponse } from "@/components/BrowserKeyword/types";
import './contentScript.css'
const App: React.FC<{}> = () => {
  const [trend, setTrend] = useState<string[]>([]);
  const [update, setUpdate] = useState(0)
  const [host, setHost] = useState("")
  const fetchTrend = (url:any) => {
    chrome.runtime.sendMessage({url}, messageResponse => {
      setTrend(()=>messageResponse.body)
      setUpdate(1)
    })
  }
  useEffect(() => {
    fetchTrend('https://www.easssue.com/api/trend/v2')
    // fetchTrend('https://www.nate.com/js/data/jsonLiveKeywordDataV1.js?v=202211140925')
    setHost(window.location.host)
  }, []);
  return (
    <>
    {update ? (<BrowserKeyword trend={trend} host={host}/>) : ("")}
    </>
  )
}
const fr = new DocumentFragment
const container = document.querySelector(".gb_Ld") || fr
const container2 = document.querySelector("#NM_WEATHER") || fr
const container3 = document.querySelector(".lnb_group") || fr
const child = document.createElement("div")
const child2 = document.createElement("div")
child.style.height = "34px"
child2.style.position = "absolute"
child2.style.left = "800px"
child2.style.height = "100%"
container.prepend(child)
container3.prepend(child2)
if (container === fr) {
  const root = createRoot(container2)
  root.render( 
    <App/>)
  const root2 = createRoot(child2)
  root2.render(
    <App/>
  )
}
else {
  const root = createRoot(child)
  root.render(
    <App/>)
}





export {}