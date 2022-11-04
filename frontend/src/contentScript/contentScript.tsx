// TODO: content script
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserKeyword } from "@/components/BrowserKeyword";
import './contentScript.css'
console.log("hello")
const App: React.FC<{}> = () => {
  return (
    <BrowserKeyword />
  )
}
const fr = new DocumentFragment
const container = document.querySelector(".gb_Ld") || fr
const container2 = document.querySelector("#NM_WEATHER") || fr
const child = document.createElement("div")
child.style.height = "100%"
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