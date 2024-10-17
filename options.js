document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('optionsForm');
    
    // Load saved options
    chrome.storage.sync.get(['scheme', 'userDomain', 'apiKey', 'quality', 'rootFolderPath'], function(data) {
      form.scheme.value = data.scheme || 'https';
      form.userDomain.value = data.userDomain || '';
      form.apiKey.value = data.apiKey || '';
      form.quality.value = data.quality || '';
      form.rootFolderPath.value = data.rootFolderPath || '/data/media/videos';
    });
  
    // Save options on form submit
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      chrome.storage.sync.set({
        scheme: form.scheme.value,
        userDomain: form.userDomain.value,
        apiKey: form.apiKey.value,
        quality: form.quality.value,
        rootFolderPath: form.rootFolderPath.value
      }, () => {
        alert('Options saved');
      });
    });
  });
  