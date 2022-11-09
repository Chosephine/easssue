import { AppDispatch, RootState } from '@/modules/store';
import { FC, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  removeKeyword,
  endDropChangeList,
  getSubscribeKeywordsRedux,
} from '@modules/keyWordReducer';
import Scrollbars from "react-custom-scrollbars-2";
const UserKeyword: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getSubscribeKeywordsRedux());
  }, []);
  const subScribeKwdList = useSelector((state: RootState) => {
    // console.log(state);
    return state.persistedReducer.keyWordReducer.subScribeKwdList;
  });
  console.log('kwdList:', subScribeKwdList);
  const removeKeywordButton = (keywordId: number) => {
    dispatch(removeKeyword(keywordId));
  };
  return (
    <div className="w-[60%]">
      <div className='text-xl font-bold'> {"구독중인 키워드"}</div>
      <DragDropContext
        onDragEnd={(dndResult) => dispatch(endDropChangeList(dndResult))}
      >
        <Droppable droppableId="keyword-list">
          {(provided) => (
            <ul
              className="w-[100%] h-[95%] overflow-auto"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >          <Scrollbars
            autoHideTimeout={1000}
            autoHideDuration={200}
            autoHide={true}
          >
        <div
                    // onClick={() =>
                    //   addKeywordButton(
                    //     searchResultItem.kwdId,
                    //     searchResultItem.kwdName
                    //   )
                    // }
                    className="flex flex-col gap-4 lg:p-0 p-2  rounde-lg m-2"
                  >
                    <div className="flex items-center justify-between w-full p-2 lg:rounded-full md:rounded-full hover:bg-gray-100 cursor-pointer border-2 rounded-lg">
                      <div className="lg:flex md:flex items-center">
                        <div className="flex flex-col">
                          <div className="text-sm pl-2 leading-3 text-gray-700 font-bold w-full">
                            {"키워드!"}
                          </div>
                        </div>
                      </div>

                      <svg
                        className="h-6 w-6 mr-1 invisible md:visible lg:visible xl:visible"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
              {subScribeKwdList.map((keyword, index) => {
                return (
                  <Draggable
                    draggableId={`${keyword.kwdId}`}
                    index={index}
                    key={keyword.kwdId}
                  >
                    
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        className="grid grid-cols-12 m-0 p-1 w-[95%] items-center"
                        key={keyword.kwdId}
                      >
                        <div className="col-span-3 ">{'drag'}</div>
                        <div className="col-span-6">{keyword.kwdName}</div>
                        <button
                          className="p-2 col-span-3"
                          onClick={() => removeKeywordButton(keyword.kwdId)}
                        >
                          삭제
                        </button>
                      </li>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
              </Scrollbars>
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default UserKeyword;
