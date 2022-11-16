import React, {useEffect, useState} from "react";
import { BookmarkModal } from "../BookmarkModal";
import { BookmarkProps } from "./types";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";


export const Bookmark:React.FC<BookmarkProps> = ({setBookmarkModalOpen, bookmarkTree}) => {
  
  useEffect(() => {
    renderBookmarks(bookmarkTree)
  },[bookmarkTree])


  const renderBookmarks = (tree: chrome.bookmarks.BookmarkTreeNode[]) => {
    return tree.map((treeItem, index) => {
      return (

          <div key={index}>
             <a href={treeItem.url} target="_blank">
               <img className="m-auto rounded-md" src={"https://www.google.com/s2/favicons?domain=" + treeItem.url + "&sz=32"} style={{width: 32, height: 32}} alt="" onError={({ currentTarget }) => {
    currentTarget.onerror = null;
    currentTarget.src="bookmark2.svg";
  }}/>
               <div className="mt-2 text-xs text-ellipsis line-clamp-2 text-white text-center">{treeItem.title}</div>
             </a>    
           </div>
        
      )
    })
  }

  

  const onCreateClick = () => {
    setBookmarkModalOpen(true)
  }

  return (
    <>
      <div className="bg-black/25 p-4 rounded-lg m-2 mb-8">
        <div className="grid grid-cols-10 gap-4">
            {renderBookmarks(bookmarkTree)}
            <button onClick={onCreateClick}>
              <img className="m-auto"  style={{width: 32, height: 32}} src="bookmark.svg" />
              <div className="mt-2 text-xs text-ellipsis line-clamp-2 text-white">북마크 추가</div>
            </button>
          </div>
        </div>      

    </>
    
  )
}

