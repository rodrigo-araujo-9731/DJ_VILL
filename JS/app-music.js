const screen = document.querySelector('.screen')
const play = document.querySelector('#play');
const prev = document.querySelector('#prev');
const next = document.querySelector('#next');

const audio = document.querySelector('#audio');
const progress = document.querySelector('#progress');
const progressBar = document.querySelector('.progress-bar');

const soundBar = document.querySelector('.sound-bar');
const volumeProgress = document.querySelector('#volume-progress');
const muteContainer = document.querySelector('.mute-container');
const mute = document.querySelector('.mute');
const loveBtn = document.querySelector('#love');

const title = document.querySelector('#title');
const artist = document.querySelector('#artist');
const cover = document.querySelector('.cover');
const current = document.querySelector('.current');

const audioCurrentTime = document.querySelector('#audio-current-time');
const audioDuration = document.querySelector('#audio-duration');

const repeat = document.querySelector('#repeat');
const shuffle = document.querySelector('#shuffle');

const list = document.querySelector('.list');
const songName = document.querySelector('.song');




let songs = ['Alive', 'A River in the Flora', 'Waiting hours', 'No falling Again'];
let playlistIndex = 0;


function init() {
   play.addEventListener('click', playMusic);
   next.addEventListener('click', nextSong);
   prev.addEventListener('click', prevSong);
   progressBar.addEventListener('click', setProgress);
   soundBar.addEventListener('click', setVolume);
   mute.addEventListener('click', toggleMute);
   repeat.addEventListener('click', loop);
   shuffle.addEventListener('click', random);
   loveBtn.addEventListener('click', heartBtn);
   // songName.addEventListener('click', playFromPlaylist);

   audio.addEventListener('timeupdate', updateProgress);
   audio.addEventListener('ended', nextSong);
   

   loadSong(songs[playlistIndex]);
};


function random() {
   shuffle.classList.toggle('shuffle-active');
   if (shuffle.classList.contains('shuffle-active')) {
         // audio.addEventListener('ended', shuffleActive);
         shuffle.querySelector('i').style.color = '#209248';
      } else {
         // audio.addEventListener('ended', shuffleInactive);
         shuffle.querySelector('i').style.color = '#f8f9fa';
      }
}

function heartBtn() {
   loveBtn.classList.toggle('loveBtn-active');
   if (loveBtn.classList.contains('loveBtn-active')) {
         loveBtn.querySelector('i').style.color = '#209248';
      } else {
         loveBtn.querySelector('i').style.color = '#f8f9fa';
      }
}

// TODO SHUFFLE NOT WORKING

// function originalIndex(min, max) {
//    let myArray = [];

//    for(let i = min; i <= max; i++) {
//       myArray.push(i);
//    }
//    return myArray;
// }

// let newPlaylist = originalIndex(0, 3);

// function playlistRandomizer(a) {
//    for (let i = a.length - 1; i > 0; i--) {
//        const j = Math.floor(Math.random() * (i + 1));
//        [a[i], a[j]] = [a[j], a[i]];
//    }
//    return a;
// }

// function shuffleActive() {
//    playlistRandomizer(newPlaylist);
//    console.log(newPlaylist);

//    loadSong(songs[newPlaylist]);
//    playSong();
// }

// function shuffleInactive() {
//    newPlaylist = originalIndex(0, 3);
// }
 



// function getSongs() {
//    fetch('../Assets/playlist.json')
//          .then(res => res.json())
//          .then(data => {
//             let songs = [];
//             data.forEach(elem => songs.push(elem.title));
//             return songs;
//       });
//       return songs;
// }


function playMusic() {
   if(isPlaying()) {
      pauseSong();
   } else {
      playSong();
   }
}

function nextSong() {
   playlistIndex = ++playlistIndex % songs.length;

   loadSong(songs[playlistIndex]);
   playSong();
}

function prevSong() {
   playlistIndex--;

   if (playlistIndex < 0) {
      playlistIndex = songs.length - 1;
   }

   loadSong(songs[playlistIndex]);
   playSong();
}

function setProgress(e) {
   const width = progressBar.clientWidth;
   const clickX = e.offsetX;
   const duration = audio.duration;

   audio.currentTime = (clickX / width) * duration;
}

function setVolume(e) {
   const volumeWidth = soundBar.clientWidth;
   const volumeClickX = e.offsetX;

   audio.volume = (volumeClickX / volumeWidth);
}

function toggleMute() {
   let currentvolume = audio.volume;

   if (audio.volume > 0) {
      muteContainer.querySelector('i').classList.remove('fa-volume-up');
      muteContainer.querySelector('i').classList.add('fa-volume-mute');
      audio.volume = 0;
   } else {
      muteContainer.querySelector('i').classList.remove('fa-volume-mute');
      muteContainer.querySelector('i').classList.add('fa-volume-up');
      audio.volume = 0.05;
   }
}

function updateProgress() {

   const { duration, currentTime } = audio;

   const progressPercent = (currentTime / duration) * 100;
   progress.style.width = `${progressPercent}%`;

   const volumePercent = audio.volume * 100;
   volumeProgress.style.width = `${volumePercent}%`;

   updateAudioTime();
}

function loadSong(song) {
   title.textContent = song;
   audio.src = `../Assets/Music/${song}.mp3`
   cover.src = `../Assets/Pics/${song}.png`
   current.textContent = title.textContent;
   updateAudioTime()
}

function isPlaying() {
   return screen.classList.contains('play');
}


function playSong() {
   if (!isPlaying()) {
   updateMusicStatus();
   }
   audio.play();
}

function updateAudioTime() {
   if (!isNaN(audio.currentTime) && !isNaN(audio.duration)) {
      progress.value = (audio.currentTime / audio.duration) * 100;
      
      let mins = Math.floor(audio.currentTime /60);
      mins = mins < 10 ? '0' + mins : mins;
      let secs = Math.floor(audio.currentTime % 60);
      secs = secs < 10 ? '0' + secs : secs;


      let minsTotal = Math.floor(audio.duration / 60);
      minsTotal = minsTotal < 10 ? '0' + minsTotal : minsTotal;
      let secsTotal = Math.floor(audio.duration % 60);
      secsTotal = secsTotal < 10 ? '0' + secsTotal : secsTotal;


      audioCurrentTime.textContent = `${mins}:${secs}`;
      audioDuration.textContent = `${minsTotal}:${secsTotal}`;

   }
}

function pauseSong() {
   updateMusicStatus();
   audio.pause();
}

function updateMusicStatus() {
   screen.classList.toggle('play');

   play.querySelector('i').classList.toggle('fa-play');
   play.querySelector('i').classList.toggle('fa-pause');
}


function loop() {
   repeat.classList.toggle('repeat-active');
   if (repeat.classList.contains('repeat-active')) {
         audio.loop = true;
         repeat.querySelector('i').style.color = '#209248';
      } else {
         audio.loop = false;
         repeat.querySelector('i').style.color = '#f8f9fa';
      }
}

function getData() {
   fetch('../Assets/playlist.json')
      .then(res => res.json())
      .then(data => {
         // let songsIds = [];
         // data.forEach(elem => songs.push(elem.id));
         // console.log(songs);

         document.querySelector('.list').innerHTML = data.map(element => `
            <tr class="song" id="song-${element.id}">
               <td class="nr"><h5>${element.id}<h5></td>
               <td class="title">
                  <h6>${element.title}<h6>
                  <br>
                  <h8>${element.artist}</h8>
               </td>
               <td class="length"><h5>${element.duration}<h5></td>
               <td><button id="love1" class="controller heart"><i class="fas fa-heart"></i></button></td>
            </tr>
         `).join('');
      });
}


audio.volume = 0.5;

window.addEventListener('load', init);
window.addEventListener('load', getData);