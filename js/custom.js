var initSpeed = localStorage.getItem("speedYoutube") || 1;
document.querySelector("video").playbackRate = initSpeed;
document.onkeypress = function (evt) {
  var speed = document.querySelector("video").playbackRate;
  evt = evt || window.event;
  var charCode = evt.keyCode || evt.which;
  var charStr = String.fromCharCode(charCode);
  if (charStr == "z" || charStr == "Z") {
    speed = speed - 0.5;
    document.querySelector("video").playbackRate = speed;
    initSpeed = speed;
  }
  if (charStr == "x" || charStr == "X") {
    speed = speed + 0.5;
    document.querySelector("video").playbackRate = speed;
    initSpeed = speed;
  }
  localStorage.setItem("speedYoutube", initSpeed);
};
