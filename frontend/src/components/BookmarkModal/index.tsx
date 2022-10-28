import React, {useState} from "react";
import { BookmarkModalProps } from "./types";
import { TextInput, Label, Button } from "flowbite-react";

export const BookmarkModal: React.FC<BookmarkModalProps> = ({
  setBookmarkModalOpen,
}) => {
  const [bookmarkName, setBookmarkName] = useState("")
  const [bookmarkURL, setBookmarkURL] = useState("")
  const onCloseClick = () => {
    setBookmarkModalOpen(false);
  };
  const onSaveClick = () => {
    chrome.bookmarks.create({
      parentId: "1",
      title: bookmarkName,
      url: bookmarkURL,
    })
    setBookmarkModalOpen(false);
  }
  const onChangeName = (e:any) => {
    setBookmarkName(e.target.value);
  }
  const onChangeURL = (e:any) => {
    setBookmarkURL(e.target.value);
  }
  return (
    <>
      <div className="absolute top-0 left-0 w-screen h-screen bg-black/75">
        <div className="p-2 z-50 h-1/2 w-1/2 absolute top-1/4 left-1/4 bg-white rounded-lg">
          <div className="text-xl">
            북마크 추가
            <button className="absolute right-2" onClick={onCloseClick}>
              X
            </button>
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="name" value="name" />
            </div>
            <TextInput id="name" type="text" sizing="md" value={bookmarkName} onChange={onChangeName}></TextInput>
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="url" value="url" />
            </div>
            <TextInput id="url" type="text" sizing="md" value={bookmarkURL} onChange={onChangeURL}></TextInput>
          </div>
          <Button className="absolute right-4 bottom-4" onClick={onSaveClick}>저장</Button>
        </div>
      </div>
    </>
  );
};
