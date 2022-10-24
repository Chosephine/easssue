import React, {useEffect, useState} from "react";


export const Bookmark = () => {
  const [bookmarkTree, setBookmarkTree] = useState<chrome.bookmarks.BookmarkTreeNode[]>([])
  useEffect(() => {
    fetchBookmarks()
  },[])

  const fetchBookmarks = () => {
    chrome.bookmarks.getChildren("1", (bookmarkTreeNodes) => {
      console.log(bookmarkTreeNodes)
      setBookmarkTree(bookmarkTreeNodes)
    })
  }

  const renderBookmarks = (tree: chrome.bookmarks.BookmarkTreeNode[]) => {
    return tree.map((treeItem) => {
      return <div>
        <a href={treeItem.url} target="_blank">
          <img className="m-auto rounded-md"src={"https://www.google.com/s2/favicons?domain=" + treeItem.url + "&sz=32"}  alt="" />
          <div className="mt-2 text-xs text-ellipsis line-clamp-2 text-white">{treeItem.title}</div>
        </a>    
      </div>
    })
  }

  const onHistoryClick = () => {
    chrome.tabs.create({
      url: "chrome://history"
    })
  }

  const onCreateClick = () => {
    
  }

  return (
    <div className="bg-black/25 p-4 rounded-lg">
      <div className="grid grid-cols-10 gap-4">
        {renderBookmarks(bookmarkTree)}
        <div>
        <button onClick={onHistoryClick}>
          <img className="m-auto"  src="history_32.png" />
          <div className="mt-2 text-xs text-ellipsis line-clamp-2 text-white">방문 기록</div>
        </button>    
      </div>
      </div>
    </div>
  )
}

