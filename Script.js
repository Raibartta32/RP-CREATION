const apiKey = 'AIzaSyAm8zsjCFEM4Kv_p_Kv2gaLMdOsGZ69rbU'; // Replace with your API key

document.getElementById('fetchInfo').addEventListener('click', () => {
  const videoUrl = document.getElementById('videoUrl').value;
  const videoId = extractVideoId(videoUrl);

  if (videoId) {
    fetchVideoInfo(videoId);
  } else {
    alert('Invalid YouTube URL');
  }
});

function extractVideoId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

function fetchVideoInfo(videoId) {
  const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const videoInfo = data.items[0].snippet;
      displayVideoInfo(videoInfo);
    })
    .catch(error => {
      console.error('Error fetching video info:', error);
    });
}

function displayVideoInfo(info) {
  const videoInfoDiv = document.getElementById('videoInfo');
  videoInfoDiv.innerHTML = `
    <h2>${info.title}</h2>
    <p>${info.description}</p>
    <img src="${info.thumbnails.medium.url}" alt="Thumbnail">
  `;
}