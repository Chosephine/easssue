import { AppDispatch, RootState } from '@/modules/store';
import { FC, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  removeKeyword,
  endDropChangeList,
  getSubscribeKeywordsRedux,
} from '@modules/keyWordReducer';
import Scrollbars from 'react-custom-scrollbars-2';
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
      <div className="text-xl font-bold"> {'구독중인 키워드'}</div>
      <DragDropContext
        onDragEnd={(dndResult) => dispatch(endDropChangeList(dndResult))}
      >
        <Droppable droppableId="keyword-list">
          {(provided) => (
            <ul
              className="w-[100%] h-[95%] overflow-auto"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {' '}
              <Scrollbars
                autoHideTimeout={1000}
                autoHideDuration={200}
                autoHide={true}
              >
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
                          key={keyword.kwdId}
                        >
                          <div className="flex flex-col gap-4 lg:p-0 p-2  rounde-lg m-2">
                            <div className="flex items-center justify-between w-full p-2 lg:rounded-full md:rounded-full hover:bg-gray-100 cursor-pointer border-2 rounded-lg">
                              <div className="lg:flex md:flex items-center">
                                <img className="w-4 h-4" src="draggable_1.svg" alt="" />
                                <div className="flex flex-col">
                                  <div className="text-sm pl-2 leading-3 text-gray-700 font-bold w-full">
                                    {keyword.kwdName}
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center mr-2">
                                <span onClick={() => removeKeywordButton(keyword.kwdId)} className="h-[100%]" > {"키워드 삭제"}</span>
                              </div>
                            </div>
                          </div>
                          {/* <div className="col-span-3 ">{'drag'}</div>
                        <div className="col-span-6">{keyword.kwdName}</div>
                        <button
                          className="p-2 col-span-3"
                          onClick={() => removeKeywordButton(keyword.kwdId)}
                        >
                          삭제
                        </button> */}
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
