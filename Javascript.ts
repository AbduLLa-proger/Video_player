const videoDuration: any = document.querySelectorAll('.video-duration');
const videoTime: any = document.querySelectorAll('.video-time');

window.addEventListener('load', () => {
  setVideoDurationTime();
})

function setVideoDurationTime() {
  for(let i = 0; i < videoTime.length; i++) {
    videoTime[i].textContent = i.toString();
    console.log(videoTime[i].textContent);
  }
  console.log("FF");
}