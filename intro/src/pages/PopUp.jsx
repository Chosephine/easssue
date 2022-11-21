import React,{useState} from 'react';
import PopUpComponent from '../components/Popup';
const Popup = ({toggle,toggleHandler}) => {
  // const [toggle, setToggle] = useState(false);
  const onClickHandler = () =>{
    toggleHandler()
  }
  return (
    <>
      <section className="panel pop-pop pr-[150px] font-service">
        <img
          onClick={onClickHandler}
            className={`relative transition ${toggle ? 'translate-y-[-35vh] scale-50' :  "hover:cursor-pointer"} duration-700  w-[150px] h-[150px] left-[50%] z-[10]`}
            src="biglogo.png"
            alt=""
          />
          {!toggle && <span className="animate-ping relative inline-flex w-[150px] h-[150px]  bg-gradient-to-r from-[#6183e7] to-[#1ec4c4] left-[38.9vw] opacity-75"></span>}
        <div className="popup flex flex-col w-[100vw] items-center">
          
          
      {toggle && <PopUpComponent toggle={toggle}/>}
        </div>
      </section>
    </>
  );
};

export default Popup;
