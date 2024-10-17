(function() {
    'use strict';
  
    function showToast(message, isSuccess = true) {
      const toastContainer = document.querySelector('.ToastContainer');
  
      if (toastContainer) {
        const customToast = document.createElement('div');
        customToast.className = 'Toast';
        customToast.style.padding = '10px';
        customToast.style.backgroundColor = isSuccess ? '#4CAF50' : '#F44336';
        customToast.style.color = 'white';
        customToast.style.margin = '10px';
        customToast.style.borderRadius = '5px';
        customToast.innerText = message;
        toastContainer.appendChild(customToast);
        setTimeout(() => customToast.remove(), 5000);
      } else {
        console.log('ToastContainer not found.');
      }
    }
  
    function addButtonToCardHeader(config) {
      const cardHeader = document.querySelector('.scene-info .card-header');
      if (cardHeader && !document.querySelector('#whisparrButton')) {
        var triggerButton = document.createElement('button');
        triggerButton.id = 'whisparrButton';
        triggerButton.innerHTML = 'Add scene to Whisparr';
        triggerButton.style.backgroundColor = '#e385ed';
        triggerButton.style.color = 'white';
        triggerButton.style.padding = '10px';
        triggerButton.style.border = 'none';
        triggerButton.style.borderRadius = '5px';
        triggerButton.style.cursor = 'pointer';
        cardHeader.appendChild(triggerButton);
  
        triggerButton.addEventListener('click', function() {
          console.log('Adding to Whisparr!');
          const splitURL = window.location.href.split('https://stashdb.org/scenes/');
          if (splitURL.length > 1) {
            var sceneID = splitURL[1];
            var fullApiUrl = `${config.scheme}://${config.userDomain}/api/v3/lookup/scene?term=` + encodeURIComponent(sceneID);
            var headers = {
              'Accept': '*/*',
              'X-Api-Key': config.apiKey,
              'Connection': 'keep-alive'
            };
            fetch(fullApiUrl, { method: 'GET', headers: headers })
              .then(response => response.json())
              .then(data => {
                if (data && data.length > 0) {
                  var scene_data = data[0];
                  var payload = {
                    title: scene_data.movie.title,
                    studio: scene_data.movie.studioTitle,
                    foreignId: scene_data.foreignId,
                    year: scene_data.year,
                    rootFolderPath: config.rootFolderPath,
                    monitored: true,
                    addOptions: { searchForMovie: true },
                    qualityProfileId: config.quality
                  };
                  var postHeaders = {
                    'Accept': '*/*',
                    'X-Api-Key': config.apiKey,
                    'Content-Type': 'application/json'
                  };
                  var postApiUrl = `${config.scheme}://${config.userDomain}/api/v3/movie`;
                  fetch(postApiUrl, {
                    method: 'POST',
                    headers: postHeaders,
                    body: JSON.stringify(payload)
                  })
                    .then(postResponse => postResponse.json().then(postData => {
                      if (postResponse.status === 200) {
                        showToast('Scene added to Whisparr successfully!', true);
                      } else {
                        showToast('Error: ' + postData[0].errorMessage, false);
                      }
                    }))
                    .catch(postError => showToast('Error adding scene to Whisparr.', false));
                } else {
                  showToast('No scene data found for this URL.', false);
                }
              })
              .catch(error => showToast('Error fetching scene data.', false));
          } else {
            showToast('No valid StashID found in the URL.', false);
          }
        });
      }
    }
  
    chrome.storage.sync.get(['scheme', 'userDomain', 'apiKey', 'quality', 'rootFolderPath'], function(config) {
      addButtonToCardHeader(config);
      const observer = new MutationObserver(() => addButtonToCardHeader(config));
      observer.observe(document.body, { childList: true, subtree: true });
    });
  })();
  