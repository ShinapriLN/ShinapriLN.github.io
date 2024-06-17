document.addEventListener('DOMContentLoaded', () => {
    const imageClick = document.getElementById('cover');
    const musicList = document.getElementById('list');
    const title = document.getElementById('display-title');
    const artist = document.getElementById('display-artist');
    const currentTimeEl = document.getElementById('current-time');
    const durationTimeEl = document.getElementById('duration-time');
    const progress = document.getElementById('progress');
    const playBtn = document.getElementById('play');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const blurBackground = document.getElementById('bg');
    const playerProgress = document.getElementById('player-progress');
    const listMusic = document.getElementById('list');
    let displayBlock = 0;
    let musicIndex = 0;
    let isPlaying = 0;

    const music = new Audio();

    const songs = [
        {
            path:'audio/Deemo Goodbye.mp3',
            cover:'img/bg1.jpg',
            songName:'Deemo Goodbye',
            artist:'Asaka Tomoko'
        },
        {
            path:'audio/Evolution Era.mp3',
            cover:'img/bg2.jpg',
            songName:'Evolution Era',
            artist:'VK'
        },
        {
            path:'audio/Reflection (Mirror Night).mp3',
            cover:'img/bg3.jpg',
            songName:'Reflection (Mirror Night)',
            artist:'VK'
        },
        {
            path:'audio/Reverse-Parallel Universe.mp3',
            cover:'img/bg4.jpg',
            songName:'Reverse-Parallel Universe',
            artist:'VK'
        },
        {
            path:'audio/Wings of Piano.mp3',
            cover:'img/bg5.jpg',
            songName:'Wings of Piano',
            artist:'VK'
        },
        {
            path:'audio/심야열차 (深夜列車).mp3',
            cover:'img/bg6.jpg',
            songName:'심야열차',
            artist:'Sereno'
        },
        {
            path:'audio/Light Dance (2015 Remastered Edition).mp3',
            cover:'img/bg7.jpg',
            songName:'Light Dance',
            artist:'Akira'
        },
        {
            path:'audio/Wings of Piano.mp3',
            cover:'img/bg8.jpg',
            songName:'Walking by the Sea',
            artist:'Edmund'
        },
        {
            path:'audio/Yawning Lion.mp3',
            cover:'img/bg9.jpg',
            songName:'Yawning Lion',
            artist:'VK'
        },
        {
            path:'audio/Fairy\'s Crown.mp3',
            cover:'img/bg10.jpg',
            songName:'Fairy\'s Crown',
            artist:'Asako Tomoko'
        }
    ]

    let i = 0;
    songs.forEach(song => {
        listMusic.innerHTML += `
        <div class="song-list" id="${i}">
            <div class="cover-list" style="background-image: url(${song.cover});width: 20%;height: 100%;
            background-position: center;background-repeat: no-repeat;background-size: cover;
            border-radius: 10px 0 0 10px;"></div>
            <div>
                <div class="song-name"><h4 class="display-title-list">${song.songName}</h4></div>
                <div class="artist-name"><p class="display-artist-list">${song.artist}</p></div>
            </div>
        </div>`
        i += 1;
    });

    const songClick = document.querySelectorAll('.song-list');
    songClick.forEach(song => {
        song.addEventListener('click', (event) => {
            const songId = song.id;
            changeMusicWithIndex(songId);
        })
    })

    function listShowHide(){
        if(displayBlock){
            displayBlock = 0;
            musicList.style.opacity = '0';
            musicList.style.display = 'none';
        }else{
            displayBlock = 1;
            musicList.style.opacity = '0.7';
            musicList.style.display = 'block';
        }
    }

    function togglePlay(){
        if(isPlaying){
            isPlaying = 0;
            pauseMusic();
        }else{
            isPlaying = 1;
            playMusic();
        }
    }

    function checkState(){
        if(isPlaying){
            playMusic();
        }else{
            pauseMusic();
        }
    }

    function playMusic(){
        playBtn.classList.replace('fa-play', 'fa-pause');
        playBtn.setAttribute('title', 'pause');
        music.play();
    }

    function pauseMusic(){
        playBtn.classList.replace('fa-pause', 'fa-play');
        playBtn.setAttribute('title', 'play');
        music.pause();
    }

    function changeMusic(direction){
        musicIndex = (musicIndex+direction+songs.length) % songs.length;
        loadMusic(songs[musicIndex]);
        checkState();
    }

    function changeMusicWithIndex(index){
        loadMusic(songs[index]);
        checkState();
    }

    function loadMusic(song){
        music.src = song.path;
        title.textContent = song.songName;
        artist.textContent = song.artist;
        blurBackground.style.backgroundImage = `url(${song.cover})`;
        imageClick.style.backgroundImage = `url(${song.cover})`;
    }

    function updateProgressBar(){
        const { duration, currentTime } = music;
        const progressPercent = (currentTime / duration) *100;
        progress.style.width = `${progressPercent}%`;
    
        const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
        durationTimeEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
        currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
    }

    function setProgressBar(e){
        const width = playerProgress.clientWidth;
        const clickX = e.offsetX;
        const playerProgressPercent = (clickX / width) * 100;
        music.currentTime = (clickX / width) * music.duration;
        progress.style.width = `${playerProgressPercent}%`;
    }
   

   imageClick.addEventListener('click', listShowHide);
   playBtn.addEventListener('click', togglePlay);
   prevBtn.addEventListener('click', () => changeMusic(-1));
   nextBtn.addEventListener('click', () => changeMusic(1));
   music.addEventListener('ended', () => changeMusic(1));
   music.addEventListener('timeupdate', updateProgressBar);
   playerProgress.addEventListener('click', setProgressBar);

   loadMusic(songs[musicIndex]);
});