import React, { useEffect, useState } from "react"
import { SettingModalProps } from "./types"
import { Button } from "flowbite-react"
export const SettingModal: React.FC<SettingModalProps> = ({setSettingModalOpen}) => {
  const [bgimg, setBgimg] = useState("")
  const [imageSrc, setImageSrc] = useState('');
  const onCloseClick = () => {
    setSettingModalOpen(false)
  }
  const onSaveClick = () => {
    chrome.storage.local.set({'bgimg': bgimg}, ()=> {
    } )
    setSettingModalOpen(false)
  }
  
  const handleClickInput = (event:any) => {
    const fr = new FileReader();
    const file = event.target.files[0];
    fr.readAsDataURL(file)
    fr.onload = (event:any) => {
      const url = event.target.result
      setBgimg(url)
      setImageSrc(url)
    }
  }
  
  return (
    <>
      <div className="absolute top-0 left-0 w-screen h-screen bg-black/75">
        <div className="flex flex-col p-2 z-50 h-1/2 w-1/2 absolute top-1/4 left-1/4 bg-white rounded-lg">
          <div className="text-xl m-2">
            배경화면 설정
            <button className="absolute right-3" onClick={onCloseClick}>
              <img className="h-5 w-5" src="itemDelete.svg" alt="" />
            </button>
          </div>
          <label className="m-2 w-[120px] text-center flex bg-blue-400 focus:outline-none text-white text-base uppercase font-bold shadow-md rounded-full p-2" htmlFor="input-file">
            이미지 불러오기
          </label>
          <input id="input-file" style={{display: "none"}} type="file" onChange={handleClickInput} />
          <div className="preview self-center" style={{width: "50%", height:"50%"}}>
        {imageSrc && <img style={{width: "100%", height: "100%"}}src={imageSrc} alt="preview-img" />}
        </div>
          <button className="absolute right-3 bottom-3 justify-center m-2 w-[120px] text-center flex bg-gradient-to-r from-[#6183e7] to-[#1ec4c4] hover:from-green-600 hover:to-blue-600 focus:outline-none text-white text-base uppercase font-bold shadow-md rounded-full p-2" onClick={onSaveClick}> 배경화면 변경</button>
        </div>
      </div>
    </>
  )
}