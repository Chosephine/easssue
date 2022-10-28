export const Settingbar = () => {
  const onHistoryClick = () => {
    chrome.tabs.create({
      url: "chrome://history"
    })
  }
  return (
    <>
      <div className="flex justify-end">
        <button className="mx-2" onClick={onHistoryClick}>
          <img className="m-auto" src="history_32.png" />
        </button>
        <button className="mx-2">
          <img src="setting_32.png" alt="" />
        </button>
      </div>
    </>
  );
};
