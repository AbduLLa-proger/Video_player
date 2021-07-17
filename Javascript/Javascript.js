"use strict";
var videoDuration = document.querySelectorAll('.video-duration');
var videoTime = document.querySelectorAll('.video-time');
window.addEventListener('load', function () {
    setVideoDurationTime();
});
function setVideoDurationTime() {
    for (var i = 0; i < videoTime.length; i++) {
        videoTime[i].textContent = i.toString();
        console.log(videoTime[i].textContent);
    }
    console.log("FF");
}
//# sourceMappingURL=Javascript.js.map