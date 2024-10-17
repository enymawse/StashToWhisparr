chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({
      scheme: "https",
      userDomain: "your-whisparr-instance",
      apiKey: "your-api-key",
      quality: "8",
      rootFolderPath: "/data/media/videos"
    });
  });
  