import { RootState } from '@/modules/store';
import { FC, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { removeKeyword,endDropChangeList } from '@modules/keyWordReducer';

const UserKeyword: FC = () => {
  const kwdList = useSelector((state: RootState) => {
    // console.log(state);
    return state.persistedReducer.keyWordReducer.kwdList;
  });
  console.log("kwdList:", kwdList);
  const dispatch = useDispatch();
  const removeKeywordButton = (keywordId: number) => {
    dispatch(removeKeyword(keywordId));
  };
  return (
    <DragDropContext onDragEnd={(dndResult)=>dispatch(endDropChangeList(dndResult))}>
      <Droppable droppableId="keyword-list">
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef}>
            {kwdList.map((keyword, index) => {
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
                      className="m-1"
                      key={keyword.kwdId}
                    >
                      {keyword.kwdName}
                      <button
                        className="p-2"
                        onClick={() => removeKeywordButton(keyword.kwdId)}
                      >
                        {' '}
                        삭제{' '}
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
  );
};

export default UserKeyword;
