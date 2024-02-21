const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const shuffleButton = document.getElementById("shuffle");
const repeatButton = document.getElementById("repeat");
const audio = document.getElementById("audio");
const songImage = document.getElementById("song-image");
const songName = document.getElementById("song-name");
const songArtist = document.getElementById("song-artist");
const playlistButton = document.getElementById("playlist");

const maxDuration = document.getElementById("max-duration");
const currentTimeRef = document.getElementById("current-time");

const progressBar = document.getElementById("progress-bar");
const playlistContainer = document.getElementById("playlist-container");
const closeButton = document.getElementById("close-btn");
const playlistSongs = document.getElementById("playlist-songs");

const currentProgress = document.getElementById("current-progress");

// sarki sirasi
let index;

// dongu durumu
let loop = true;

const songsList = [
  {
    name: "Bir",
    link: "musics/Pentagram-Bir.mp3",
    artist: "Pentagram",
    image: "images/pentagram.jpeg",
  },
  {
    name: "GunduzGece",
    link: "musics/Pentagram-GunduzGece.mp3",
    artist: "Pentagram",
    image: "images/pentagram.jpeg",
  },
  {
    name: "SeniBuldumYa",
    link: "musics/KaanBosnak-SeniBuldumYa.mp3",
    artist: "KaanBosnak",
    image: "images/kaan.jpeg",
  },
  {
    name: "BeyazGiyme",
    link: "musics/KaanBosnak-BeyazGiyme.mp3",
    artist: "KaanBosnak",
    image: "images/kaan.jpeg",
  },
  {
    name: "BeklenenGemi",
    link: "musics/KaanBosnak-BeklenenGemi.mp3",
    artist: "KaanBosnak",
    image: "images/kaan.jpeg",
  },
  {
    name: "BenBoyleyim",
    link: "musics/Athena-BenBoyleyim.mp3",
    artist: "Athena",
    image: "images/athena.jpeg",
  },
  {
    name: "KafamaGore",
    link: "musics/Athena-KafamaGore.mp3",
    artist: "Athena",
    image: "images/athena.jpeg",
  },
];

// zaman duzenleme
const timeFormatter = (timeInput) => {
  let minute = Math.floor(timeInput / 60);
  minute = minute < 10 ? "0" + minute : minute;

  let second = Math.floor(timeInput % 60);
  second = second < 10 ? "0" + second : second;

  return `${minute}:${second}`;
};

// sarki atama
const setSongs = (arrayIndex) => {
  let { name, link, artist, image } = songsList[arrayIndex];
  audio.src = link;
  songName.innerHTML = name;
  songArtist.innerHTML = artist;
  songImage.src = image;

  audio.onloadeddata = () => {
    maxDuration.innerText = timeFormatter(audio.duration);
  };
  playlistContainer.classList.add("hide");
  playAudio();
};

// Sesi ilerletme
progressBar.addEventListener("click", (e) => {
  let coordStart = progressBar.getBoundingClientRect().left;

  let coordEnd = e.clientX;

  let progress = (coordEnd - coordStart) / progressBar.offsetWidth;

  currentProgress.style.width = progress * 100 + "%";
  //   console.log(coordStart);

  audio.currentTime = progress * audio.duration;

  audio.play();
  pauseButton.classList.remove("hide");
  playButton.classList.add("hide");
});

setInterval(() => {
  currentTimeRef.innerHTML = timeFormatter(audio.currentTime);
  currentProgress.style.width =
    (audio.currentTime / audio.duration.toFixed(3)) * 100 + "%";
}, 1000);

audio.addEventListener("timeupdate", () => {
  currentTimeRef.innerText = timeFormatter(audio.currentTime);
});

// sarki listesini ac
playlistButton.addEventListener("click", () => {
  playlistContainer.classList.toggle("hide");
});

// sarkiyi cal
const playAudio = () => {
  audio.play();
  pauseButton.classList.remove("hide");
  playButton.classList.add("hide");
};

// sarkiyi duraklat
const pauseAudio = () => {
  audio.pause();
  pauseButton.classList.add("hide");
  playButton.classList.remove("hide");
};

// sonraki sarki
const nextSong = () => {
  if (loop) {
    if (index == songsList.length - 1) {
      index = 0;
    } else {
      index++;
    }
    setSongs(index);
    playAudio();
  } else {
    let randomIndex = Math.floor(Math.random() * songsList.length);
    setSongs(randomIndex);
    playAudio();
  }
};

// onceki sarki
const previousSong = () => {
  if (loop) {
    if (index == 0) {
      index = songsList.length - 1;
    } else {
      index--;
    }
    setSongs(index);
    playAudio();
  } else {
    let randomIndex = Math.floor(Math.random * songsList.length);
    setSongs(randomIndex);
    playAudio();
  }
};

// sarki bittiginde
audio.onended = () => {
  nextSong();
};

// sarki listesini olustur
const initializePlaylist = () => {
  for (const i in songsList) {
    playlistSongs.innerHTML += `
    <li class="playlistSongs" onclick="setSongs(${i})">
        <div class="playlist-image-container">
            <img src="${songsList[i].image}"/>
        </div>
        <div class="playlist-song-details">
            <span id="playlist-song-name">
                ${songsList[i].name}
            </span>
            <span id="playlist-song-artist-name">
                ${songsList[i].artist}
            </span>
        </div>
    </li>
    `;
  }
};

// sarkiyi tekrar et
repeatButton.addEventListener("click", () => {
  if (repeatButton.classList.contains("active")) {
    repeatButton.classList.remove("active");
    audio.loop = false;
  } else {
    repeatButton.classList.add("active");
    audio.loop = true;
  }
});

// karisik cal
shuffleButton.addEventListener("click", () => {
  if (shuffleButton.classList.contains("active")) {
    shuffleButton.classList.remove("active");
    audio.loop = true;
  } else {
    shuffleButton.classList.add("active");
    audio.loop = false;
  }
});


// ekran yuklendiginde
window.onload = () => {
  index = 0;
  setSongs(index);
  pauseAudio();
  initializePlaylist();
};

playButton.addEventListener("click", playAudio);
pauseButton.addEventListener("click", pauseAudio);
nextButton.addEventListener("click", nextSong);
prevButton.addEventListener("click", previousSong);
