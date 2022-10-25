import { RootState } from "@/modules/store";
import { FC } from "react";
import { useSelector, useDispatch } from "react-redux"
import { removeKeyword } from "@modules/keyWordReducer";

const UserKeyword: FC = () => {
  const { keywords } = useSelector(
    (state : RootState) => {
      // console.log(state);
      return state.persistedReducer.keyWordReducer;
    }
  )
  console.log(keywords);
  const dispatch = useDispatch();
  const removeKeywordButton = (keywordId :number) => {
    dispatch(removeKeyword(keywordId))
  }
  return <>
  <div>
  {keywords.map(keyword => {
    return(<div className="m-1" key={keyword.kwdId}>
      {keyword.kwdName}
      <button className="p-2" onClick={()=>removeKeywordButton(keyword.kwdId)}> 삭제 </button>
    </div>)
    })}
  </div>
  </>;
}
 
export default UserKeyword;