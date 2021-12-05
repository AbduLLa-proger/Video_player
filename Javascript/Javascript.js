"use strict";
var mainScreenImg = document.querySelector('#mainScreenVideo');
var mainScreenVideo = document.querySelector('#mainScreenVideo');
var mainScreenId = document.querySelector('#mainScreenVideo');
var videoBodyContentBlock = document.querySelector('.video-body-content_block');
var playIcon = document.querySelector('.fa-play');
var playButton = document.querySelector('.play_button');
var ellipsis = document.querySelector('.fa-ellipsis-h');
var socialIconsInner = document.querySelector('.social_icons_inner');
var videoList = document.querySelector('.video-list');
var leftButton = document.querySelector('.fa-chevron-left');
var rightButton = document.querySelector('.fa-chevron-right');
var videoTitle = document.querySelector('.video-body-upper_text');
var videoSubtitle = document.querySelector('.video-body-upper_name');
var videoSubtext = document.querySelector('.video-body-upper_subtext');
var like = document.querySelector('#like');
var dislike = document.querySelector('#dislike');
var left = 1;
var videoIndex = Math.floor((Math.random() * allVideos.length) + 1);
document.addEventListener('DOMContentLoaded', function () {
    setMainVideo(videoIndex);
    setSecondaryVideo();
    establishButtonClick();
});
function setMainVideo(indexNumber) {
    mainScreenImg.src = "video/" + allVideos[indexNumber - 1].src + ".mp4";
    mainScreenVideo.dataset["id"] = allVideos[indexNumber - 1].id;
    setTextContent(indexNumber);
}
function setSecondaryVideo() {
    var index = 1;
    var _loop_1 = function (i) {
        if (videoIndex != i) {
            var videoListInner = document.createElement('div');
            videoListInner.classList.add('video-list-inner_block');
            videoListInner.classList.add('video-list-inner-block_move');
            videoListInner.innerHTML =
                "<video src=\"video/video " + i + ".mp4\" class=\"video video-time\" data-id=\"" + (i - 1) + "\"} >\n        <source type=\"video/mp4\" />\n        <source type=\"video/ogg\" />\n        <source type=\"video/webm\" />\n      </video>\n      <span class=\"video-duration\"></span>";
            videoList === null || videoList === void 0 ? void 0 : videoList.appendChild(videoListInner);
            var videoListInnerBlock = videoList === null || videoList === void 0 ? void 0 : videoList.childNodes[index];
            var videoTime = videoList === null || videoList === void 0 ? void 0 : videoList.childNodes[index].childNodes[0];
            var videoDuration_1 = videoListInnerBlock.querySelector('.video-duration');
            videoListInnerBlock.style.left = (16 * (index - 1)) + 1 + "vw";
            index++;
            videoTime === null || videoTime === void 0 ? void 0 : videoTime.addEventListener('loadeddata', function (item) {
                var _a;
                var duration = (_a = item === null || item === void 0 ? void 0 : item.target) === null || _a === void 0 ? void 0 : _a.duration;
                var totalMin = Math.floor(duration / 60);
                var totalSec = Math.floor(duration % 60);
                if (totalSec < 0) {
                    totalSec = "0" + totalSec;
                }
                videoDuration_1.textContent = totalMin + ":" + totalSec;
            });
        }
    };
    for (var i = 1; i <= allVideos.length; i++) {
        _loop_1(i);
    }
}
function establishButtonClick() {
    var videoTime = document.querySelectorAll('.video-time');
    videoTime.forEach(function (items) {
        items.addEventListener('click', function (item) {
            var _a;
            var videoSrc = mainScreenImg.src;
            var duration = mainScreenVideo.duration;
            var totalMin = Math.floor(duration / 60);
            var totalSec = Math.floor(duration % 60);
            if (totalSec < 0) {
                totalSec = "0" + totalSec;
            }
            mainScreenImg.src = item.target.src;
            item.target.src = videoSrc;
            item.textContent = totalMin + ":" + totalSec;
            var id = parseInt(item.target.dataset.id);
            item.target.dataset.id = (_a = mainScreenVideo === null || mainScreenVideo === void 0 ? void 0 : mainScreenVideo.dataset) === null || _a === void 0 ? void 0 : _a['id'];
            mainScreenVideo.dataset['id'] = id.toString();
            setTextContent(id + 1);
        });
    });
    leftButton === null || leftButton === void 0 ? void 0 : leftButton.addEventListener('click', function () {
        var videoListInnerBlock = document.querySelectorAll('.video-list-inner_block');
        if (videoListInnerBlock[0].style.left != '1vw') {
            for (var i = 0; i < videoListInnerBlock.length; i++) {
                var leftWidth = parseInt(videoListInnerBlock[i].style.left.slice(0, -2));
                leftWidth += 16;
                videoListInnerBlock[i].style.left = leftWidth + "vw";
            }
        }
    });
    rightButton === null || rightButton === void 0 ? void 0 : rightButton.addEventListener('click', function () {
        var videoListInnerBlock = document.querySelectorAll('.video-list-inner_block');
        if (videoListInnerBlock[videoListInnerBlock.length - 1].style.left != '49vw') {
            for (var i = 0; i < videoListInnerBlock.length; i++) {
                var rightWidth = parseInt(videoListInnerBlock[i].style.left.slice(0, -2));
                rightWidth += -16;
                videoListInnerBlock[i].style.left = rightWidth + "vw";
            }
        }
    });
    var progressBar = document.querySelector('.video-body_inner');
    var newprogressBar = document.querySelector('.video-js');
    progressBar === null || progressBar === void 0 ? void 0 : progressBar.addEventListener('click', function () {
        console.log('clicked');
    });
}
function setTextContent(indexNumber) {
    videoTitle.textContent = allVideos[indexNumber - 1].videoTitle;
    videoSubtitle.textContent = allVideos[indexNumber - 1].videoSubtitle;
    videoSubtext.textContent = allVideos[indexNumber - 1].videoSubtext;
    like.textContent = allVideos[indexNumber - 1].like;
    dislike.textContent = allVideos[indexNumber - 1].dislike;
    var likeLength = Math.floor(parseInt(allVideos[indexNumber - 1].like) / 1000);
    var dislikeLength = Math.floor(parseInt(allVideos[indexNumber - 1].dislike) / 1000);
    if (likeLength.toString().length >= 2)
        like.textContent += 'K';
    if (dislikeLength.toString().length >= 2)
        dislike.textContent += 'K';
}
playButton === null || playButton === void 0 ? void 0 : playButton.addEventListener('click', function () {
    if (mainScreenVideo.paused) {
        videoBodyContentBlock.style.opacity = 1;
        mainScreenVideo.play();
        playIcon === null || playIcon === void 0 ? void 0 : playIcon.classList.add('fa-pause');
        var hideContent = setInterval(hide, 30);
        playButton === null || playButton === void 0 ? void 0 : playButton.classList.add('play_button_move');
    }
    else {
        videoBodyContentBlock.style.opacity = 0;
        mainScreenVideo.pause();
        playIcon === null || playIcon === void 0 ? void 0 : playIcon.classList.remove('fa-pause');
        var displayContent = setInterval(display, 30);
        playButton === null || playButton === void 0 ? void 0 : playButton.classList.remove('play_button_move');
    }
    ;
    function hide() {
        videoBodyContentBlock.style.opacity -= 0.1;
        if (videoBodyContentBlock.style.opacity == 0)
            clearInterval(hideContent);
    }
    function display() {
        videoBodyContentBlock.style.opacity = parseFloat(videoBodyContentBlock.style.opacity) + 0.1;
        if (videoBodyContentBlock.style.opacity == 1)
            clearInterval(displayContent);
    }
});
ellipsis === null || ellipsis === void 0 ? void 0 : ellipsis.addEventListener('click', function () {
    if (socialIconsInner === null || socialIconsInner === void 0 ? void 0 : socialIconsInner.classList.contains('social_icons_hide'))
        socialIconsInner === null || socialIconsInner === void 0 ? void 0 : socialIconsInner.classList.remove('social_icons_hide');
    else
        socialIconsInner === null || socialIconsInner === void 0 ? void 0 : socialIconsInner.classList.add('social_icons_hide');
});
//# sourceMappingURL=Javascript.js.map