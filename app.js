const audioPlayer = document.getElementById("audioPlayer");
const cards = document.querySelectorAll(".card");
const albumImg = document.querySelector(".album_img");
const songTitle = document.querySelector(".song_title");
const artistName = document.querySelector(".artist_name");
const playPauseBtn = document.getElementById("play_pause");
const volumeSlider = document.getElementById("volumeSlider");
const prevBtn = document.querySelector('img[src="player_icon2.png"]');
const nextBtn = document.querySelector('img[src="player_icon4.png"]');

let currentPlaying = null;

let currentSongIndex = -1;

cards.forEach((card, index) => {
    card.addEventListener("click", () => {
        currentSongIndex = index;
        const audioSrc = card.getAttribute("data-audio");
        const imgSrc = card.getAttribute("data-img");
        const title = card.querySelector(".card_title").textContent;
        const artist = card.querySelector(".card_info").textContent;

        albumImg.src = imgSrc;
        songTitle.textContent = title;
        artistName.textContent = artist;

        audioPlayer.src = audioSrc;
        audioPlayer.play();
        currentPlaying = audioSrc;
        playPauseBtn.src = "pause_btn.png";
    });
});

playPauseBtn.addEventListener("click", () => {
    if (!audioPlayer.src) return;

    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseBtn.src = "pause_btn.png";
    } else {
        audioPlayer.pause();
        playPauseBtn.src = "player_icon3.png";
    }
});

audioPlayer.volume = volumeSlider.value;

volumeSlider.addEventListener("input", () => {
  audioPlayer.volume = volumeSlider.value;
});

function playSongAt(index) {
    const card = cards[index];
    if (!card) return;

    const audioSrc = card.getAttribute("data-audio");
    const imgSrc = card.getAttribute("data-img");
    const title = card.querySelector(".card_title").textContent;
    const artist = card.querySelector(".card_info").textContent;

    albumImg.src = imgSrc;
    songTitle.textContent = title;
    artistName.textContent = artist;

    audioPlayer.src = audioSrc;
    audioPlayer.play();
    currentPlaying = audioSrc;
    playPauseBtn.src = "pause_btn.png";
    currentSongIndex = index;
}

prevBtn.addEventListener("click", () => {
    if (currentSongIndex > 0) {
        playSongAt(currentSongIndex - 1);
    }
});

nextBtn.addEventListener("click", () => {
    if (currentSongIndex < cards.length - 1) {
        playSongAt(currentSongIndex + 1);
    }
});

const progressBar = document.querySelector(".progress_bar");
const currTime = document.querySelector(".curr_time");
const totTime = document.querySelector(".tot_time");

audioPlayer.addEventListener("timeupdate", () => {
    const current = audioPlayer.currentTime;
    const duration = audioPlayer.duration;

    progressBar.value = (current / duration) * 100;

    const formatTime = time => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    currTime.textContent = formatTime(current);
    totTime.textContent = formatTime(duration);
});

progressBar.addEventListener("input", () => {
    const seekTime = (progressBar.value / 100) * audioPlayer.duration;
    audioPlayer.currentTime = seekTime;
});
