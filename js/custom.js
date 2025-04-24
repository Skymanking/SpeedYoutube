var initSpeed = localStorage.getItem("speedYoutube") || 1;

// Add Font Awesome CSS
const fontAwesome = document.createElement('link');
fontAwesome.rel = 'stylesheet';
document.head.appendChild(fontAwesome);

// Create speed display div
const speedDisplay = document.createElement('div');
speedDisplay.id = 'speedDisplay';
speedDisplay.innerHTML = `${initSpeed}`;

// Create container for controls
const controlsContainer = document.createElement('div');
controlsContainer.id = 'controlsContainer';

// Create decrease speed button
const decreaseBtn = document.createElement('button');
decreaseBtn.id = 'decreaseBtn';
decreaseBtn.innerHTML = '-';

// Create increase speed button
const increaseBtn = document.createElement('button');
increaseBtn.id = 'increaseBtn';
increaseBtn.innerHTML = '+';

// Function to update YouTube's session storage
function updateYouTubeSpeed(speed) {
  try {
    // Update session storage
    const sessionData = sessionStorage.getItem('yt-player-playback-rate');
    if (sessionData) {
      const data = JSON.parse(sessionData);
      data.data = speed;
      sessionStorage.setItem('yt-player-playback-rate', JSON.stringify(data));
    }
  } catch (e) {
    console.error('Error updating YouTube speed:', e);
  }
}

// Function to set video speed
function setVideoSpeed(speed) {
  const video = document.querySelector("video");
  if (video) {
    video.playbackRate = speed;
    updateYouTubeSpeed(speed);
  }
}

// Function to wait for video element and set initial speed
function waitForVideo() {
  const video = document.querySelector("video");
  if (video) {
    setVideoSpeed(initSpeed);
  } else {
    // If video not found, try again in 500ms
    setTimeout(waitForVideo, 500);
  }
}

// Start waiting for video element
waitForVideo();

// Detect URL changes
let lastUrl = window.location.href;
const urlObserver = new MutationObserver(() => {
  if(window.location.href == "https://www.youtube.com"){
    return;
  }
  if (window.location.href !== lastUrl) {
    lastUrl = window.location.href;
    // URL has changed, wait for new video and set speed
    setTimeout(waitForVideo, 1000);
  }
});

// Start observing URL changes
urlObserver.observe(document.body, { subtree: true, childList: true });

// Add click event listeners to buttons
decreaseBtn.addEventListener('click', () => {
  const video = document.querySelector("video");
  const newSpeed = Math.max(0.25, video.playbackRate - 0.25);
  video.playbackRate = newSpeed;
  initSpeed = newSpeed;
  localStorage.setItem("speedYoutube", initSpeed);
  speedDisplay.innerHTML = `${newSpeed}`;
  updateYouTubeSpeed(newSpeed);
  showControls();
});

increaseBtn.addEventListener('click', () => {
  const video = document.querySelector("video");
  const newSpeed = Math.min(16, video.playbackRate + 0.25);
  video.playbackRate = newSpeed;
  initSpeed = newSpeed;
  localStorage.setItem("speedYoutube", initSpeed);
  speedDisplay.innerHTML = `${newSpeed}`;
  updateYouTubeSpeed(newSpeed);
  showControls();
});

speedDisplay.addEventListener('click', () => {
  const video = document.querySelector("video");
  video.playbackRate = 1;
  initSpeed = 1;
  localStorage.setItem("speedYoutube", initSpeed);
  speedDisplay.innerHTML = `1`;
  updateYouTubeSpeed(1);
  showControls();
});

// Add elements to container
controlsContainer.appendChild(decreaseBtn);
controlsContainer.appendChild(speedDisplay);
controlsContainer.appendChild(increaseBtn);
document.body.appendChild(controlsContainer);

// Function to show controls
function showControls() {
  controlsContainer.classList.remove('hidden');
  
  // Clear any existing timeout
  if (window.hideControlsTimeout) {
    clearTimeout(window.hideControlsTimeout);
  }
  
  // Set timeout to hide controls after 5 seconds
  window.hideControlsTimeout = setTimeout(() => {
    controlsContainer.classList.add('hidden');
  }, 5000);
}

// Show controls initially and set timeout to hide them
showControls();

// Replace deprecated onkeypress with addEventListener
document.addEventListener('keydown', function(evt) {
  // Only respond to single key presses, not combinations
  if (evt.ctrlKey || evt.altKey || evt.shiftKey || evt.metaKey) {
    return;
  }
  
  var speed = document.querySelector("video").playbackRate;
  var charStr = evt.key;
  
  if (charStr === "z" || charStr === "Z") {
    speed = Math.max(0.25, speed - 0.25);
    document.querySelector("video").playbackRate = speed;
    initSpeed = speed;
  }
  if (charStr === "x" || charStr === "X") {
    speed = Math.min(16, speed + 0.25);
    document.querySelector("video").playbackRate = speed;
    initSpeed = speed;
  }
  localStorage.setItem("speedYoutube", initSpeed);
  speedDisplay.innerHTML = `<i class="fas fa-tachometer-alt icon"></i> ${speed}`;
  updateYouTubeSpeed(speed);
  showControls();
});

document.querySelector("video").playbackRate = initSpeed;