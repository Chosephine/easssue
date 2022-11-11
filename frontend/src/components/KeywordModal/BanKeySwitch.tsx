import { FC } from 'react';
interface KeywordModeSwitchProps {
  switchFunction : Function
  mode : boolean
}

const KeywordModeSwitch: FC<KeywordModeSwitchProps> = ({switchFunction, mode}) => {
  const onClickHandler=()=>{
    switchFunction(!mode)
  }
  return (
    <>
      <label
        htmlFor="Toggle3"
        className="inline-flex items-center p-2 rounded-md cursor-pointer text-gray-800"
      >
        <input id="Toggle3" type="checkbox" className="hidden peer" onChange={()=>onClickHandler()}/>
        <span className="px-4 py-2 rounded-l-md text-white peer-checked:text-black bg-blue-400 peer-checked:bg-gray-300">
          구독 키워드
        </span>
        <span className="px-4 py-2 rounded-r-md peer-checked:text-white bg-gray-300 peer-checked:bg-blue-400">
          금지 키워드
        </span>
      </label>
    </>
  );
};

export default KeywordModeSwitch;
