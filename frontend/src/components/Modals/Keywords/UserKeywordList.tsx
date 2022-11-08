import { AppDispatch, RootState } from '@/modules/store';
import { FC, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  removeKeyword,
  endDropChangeList,
  getSubscribeKeywordsRedux,
} from '@modules/keyWordReducer';

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
              className="w-[100%]"
              {...provided.droppableProps}
              ref={provided.innerRef}
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
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default UserKeyword;
