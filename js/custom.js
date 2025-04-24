var initSpeed = localStorage.getItem("speedYoutube") || 1;
document.querySelector("video").playbackRate = initSpeed;

// Add Font Awesome CSS
const fontAwesome = document.createElement('link');
fontAwesome.rel = 'stylesheet';
fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css';
document.head.appendChild(fontAwesome);

// Create speed display div
const speedDisplay = document.createElement('div');
speedDisplay.id = 'speedDisplay';
speedDisplay.innerHTML = `<i class="fas fa-tachometer-alt icon"></i> ${initSpeed}`;

// Create container for controls
const controlsContainer = document.createElement('div');
controlsContainer.id = 'controlsContainer';

// Create decrease speed button
const decreaseBtn = document.createElement('button');
decreaseBtn.id = 'decreaseBtn';
decreaseBtn.innerHTML = '<i class="fas fa-minus icon"></i>';

// Create increase speed button
const increaseBtn = document.createElement('button');
increaseBtn.id = 'increaseBtn';
increaseBtn.innerHTML = '<i class="fas fa-plus icon"></i>';

// Add click event listeners to buttons
decreaseBtn.addEventListener('click', () => {
    const video = document.querySelector("video");
    const newSpeed = Math.max(0.25, video.playbackRate - 0.25);
    video.playbackRate = newSpeed;
    initSpeed = newSpeed;
    localStorage.setItem("speedYoutube", initSpeed);
    speedDisplay.innerHTML = `<i class="fas fa-tachometer-alt icon"></i> ${newSpeed}`;
});

increaseBtn.addEventListener('click', () => {
    const video = document.querySelector("video");
    const newSpeed = Math.min(16, video.playbackRate + 0.25);
    video.playbackRate = newSpeed;
    initSpeed = newSpeed;
    localStorage.setItem("speedYoutube", initSpeed);
    speedDisplay.innerHTML = `<i class="fas fa-tachometer-alt icon"></i> ${newSpeed}`;
});

speedDisplay.addEventListener('click', () => {
  const video = document.querySelector("video");
  video.playbackRate = 1;
  initSpeed = 1;
  localStorage.setItem("speedYoutube", initSpeed);
  speedDisplay.innerHTML = `<i class="fas fa-tachometer-alt icon"></i> 1`;
});

// Add elements to container
controlsContainer.appendChild(decreaseBtn);
controlsContainer.appendChild(speedDisplay);
controlsContainer.appendChild(increaseBtn);
document.body.appendChild(controlsContainer);

document.onkeypress = function (evt) {
  var speed = document.querySelector("video").playbackRate;
  evt = evt || window.event;
  var charCode = evt.keyCode || evt.which;
  var charStr = String.fromCharCode(charCode);
  if (charStr == "z" || charStr == "Z") {
    speed = Math.max(0.25, speed - 0.25);
    document.querySelector("video").playbackRate = speed;
    initSpeed = speed;
  }
  if (charStr == "x" || charStr == "X") {
    speed = Math.min(16, speed + 0.25);
    document.querySelector("video").playbackRate = speed;
    initSpeed = speed;
  }
  localStorage.setItem("speedYoutube", initSpeed);
  speedDisplay.innerHTML = `<i class="fas fa-tachometer-alt icon"></i> ${speed}`;
};
