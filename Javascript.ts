const mainScreenImg = (document.querySelector('#mainScreenVideo') as HTMLImageElement);
const mainScreenVideo = (document.querySelector('#mainScreenVideo') as HTMLVideoElement)
const mainScreenId = (document.querySelector('#mainScreenVideo') as HTMLAnchorElement);
const videoBodyContentBlock: any = document.querySelector('.video-body-content_block');
const playIcon = document.querySelector('.fa-play');
const playButton = document.querySelector('.play_button');
const ellipsis = document.querySelector('.fa-ellipsis-h');
const socialIconsInner = document.querySelector('.social_icons_inner');
const videoList = document.querySelector('.video-list');
const leftButton = document.querySelector('.fa-chevron-left');
const rightButton = document.querySelector('.fa-chevron-right');
const videoTitle = (document.querySelector('.video-body-upper_text') as HTMLAnchorElement);
const videoSubtitle = (document.querySelector('.video-body-upper_name') as HTMLAnchorElement);
const videoSubtext = (document.querySelector('.video-body-upper_subtext') as HTMLAnchorElement);
const like = (document.querySelector('#like') as HTMLAnchorElement);
const dislike = (document.querySelector('#dislike') as HTMLAnchorElement);

const left: number = 1;
const videoIndex = Math.floor((Math.random() * allVideos.length) + 1);

document.addEventListener('DOMContentLoaded', () => {
  setMainVideo(videoIndex);
  setSecondaryVideo();
  establishButtonClick();
});

function setMainVideo(indexNumber: number) {
  mainScreenImg.src = `video/${allVideos[indexNumber - 1].src}.mp4`;
  mainScreenVideo.dataset["id"] = allVideos[indexNumber - 1].id;
  setTextContent(indexNumber);
}

function setSecondaryVideo() {
  let index: number = 1;
  for(let i = 1; i <= allVideos.length; i++) {
    if(videoIndex != i) {
      const videoListInner = document.createElement('div');
      videoListInner.classList.add('video-list-inner_block'); 
      videoListInner.classList.add('video-list-inner-block_move');
      videoListInner.innerHTML = 
      `<video src="video/video ${i}.mp4" class="video video-time" data-id="${i - 1}"} >
        <source type="video/mp4" />
        <source type="video/ogg" />
        <source type="video/webm" />
      </video>
      <span class="video-duration"></span>`;
    videoList?.appendChild(videoListInner);
    const videoListInnerBlock: any = videoList?.childNodes[index];
    const videoTime = videoList?.childNodes[index].childNodes[0];
    const videoDuration = videoListInnerBlock.querySelector('.video-duration');
    videoListInnerBlock.style.left = `${(16 * (index - 1)) + 1}vw`;
    index++;
    videoTime?.addEventListener('loadeddata', (item: any) => {
      const duration = item?.target?.duration;
      const totalMin: number = Math.floor(duration / 60);
      let totalSec: number | string = Math.floor(duration % 60);
      if(totalSec < 0) {
        totalSec = `0${totalSec}`;
      }
      videoDuration.textContent = `${totalMin}:${totalSec}`; 
    });
    }
  }
}

function establishButtonClick() {
  const videoTime = document.querySelectorAll('.video-time');
  videoTime.forEach((items: Node) => {
    items.addEventListener('click', (item: any) => {
      const videoSrc = mainScreenImg.src;
      let duration = mainScreenVideo.duration;
      const totalMin: number = Math.floor(duration / 60);
      let totalSec: number | string = Math.floor(duration % 60);
      if(totalSec < 0) {
        totalSec = `0${totalSec}`;
      }
      mainScreenImg.src = item.target.src;
      item.target.src = videoSrc;
      item.textContent = `${totalMin}:${totalSec}`; 
      const id: number = parseInt(item.target.dataset.id);
      item.target.dataset.id = mainScreenVideo?.dataset?.['id'];
      mainScreenVideo.dataset['id'] = id.toString();
      setTextContent(id + 1);
    })
  })

  leftButton?.addEventListener('click', () => {
    const videoListInnerBlock: any = document.querySelectorAll('.video-list-inner_block');
    if(videoListInnerBlock[0].style.left != '1vw') {
      for(let i = 0; i < videoListInnerBlock.length; i++) {
        let leftWidth = parseInt(videoListInnerBlock[i].style.left.slice(0, -2));
        leftWidth += 16;
        videoListInnerBlock[i].style.left = `${leftWidth}vw`;
      }
    }
  });

  rightButton?.addEventListener('click', () => {
    const videoListInnerBlock: any = document.querySelectorAll('.video-list-inner_block');
    if(videoListInnerBlock[videoListInnerBlock.length - 1].style.left != '49vw') {
      for(let i = 0; i < videoListInnerBlock.length; i++) {
        let rightWidth = parseInt(videoListInnerBlock[i].style.left.slice(0, -2));
        rightWidth += -16;
        videoListInnerBlock[i].style.left = `${rightWidth}vw`;
      }
    }
  })

  const progressBar = document.querySelector('.video-body_inner');
  const newprogressBar = document.querySelector('.video-js');
  progressBar?.addEventListener('click', () => {
    console.log('clicked');
  });

}

function setTextContent(indexNumber: number) {
  videoTitle.textContent = allVideos[indexNumber - 1].videoTitle;
  videoSubtitle.textContent = allVideos[indexNumber - 1].videoSubtitle;
  videoSubtext.textContent = allVideos[indexNumber - 1].videoSubtext;
  like.textContent = allVideos[indexNumber - 1].like;
  dislike.textContent = allVideos[indexNumber - 1].dislike;
  let likeLength = Math.floor(parseInt(allVideos[indexNumber - 1].like) / 1000);
  let dislikeLength = Math.floor(parseInt(allVideos[indexNumber - 1].dislike) / 1000);
  if(likeLength.toString().length >= 2) like.textContent += 'K';
  if(dislikeLength.toString().length >= 2) dislike.textContent += 'K';
}

playButton?.addEventListener('click', () => {
  if(mainScreenVideo.paused) { 
    videoBodyContentBlock.style.opacity = 1;
    mainScreenVideo.play(); playIcon?.classList.add('fa-pause'); 
    var hideContent = setInterval(hide, 30);
    playButton?.classList.add('play_button_move')
  }

  else { 
    videoBodyContentBlock.style.opacity = 0;
    mainScreenVideo.pause(); playIcon?.classList.remove('fa-pause'); 
    var displayContent = setInterval(display, 30);
    playButton?.classList.remove('play_button_move');
  };

  function hide() {
    videoBodyContentBlock.style.opacity -= 0.1;
    if(videoBodyContentBlock.style.opacity == 0) clearInterval(hideContent);
  }
  function display() {
    videoBodyContentBlock.style.opacity = parseFloat(videoBodyContentBlock.style.opacity) + 0.1;
    if(videoBodyContentBlock.style.opacity == 1) clearInterval(displayContent);
  }
});

ellipsis?.addEventListener('click', () => {
  if(socialIconsInner?.classList.contains('social_icons_hide')) socialIconsInner?.classList.remove('social_icons_hide');

  else socialIconsInner?.classList.add('social_icons_hide') 
});
