document.addEventListener('DOMContentLoaded', () => {
    

    const discSlider = document.querySelector('.disc-slider');
    const allDiscs = Array.from(document.querySelectorAll('.disc'));
    const bgElement = document.querySelector('.bg');
    
    const initialDisc = allDiscs[0].querySelector('.cover');
    initialDisc.classList.add('clicked-disc');
    

    // Add click event listeners to each disc
    allDiscs.forEach(disc => {  
        disc.addEventListener('click', (event) => {
            const cover = disc.querySelector('.cover');
            if (cover) {
                const coverId = cover.id;
                const discPosition = disc.offsetLeft;

                if(coverId === "one"){
                    musicIndex = 0;
                }else if(coverId === "two"){
                    musicIndex = 1;
                }else if(coverId === "three"){
                    musicIndex = 2;
                }else if(coverId === "four"){
                    musicIndex = 3;
                }else if(coverId === "five"){
                    musicIndex = 4;
                }else{
                    musicIndex = 5;
                }
                
                discSlider.scrollTo({
                    left: discPosition,
                    behavior: 'smooth'
                });

                changeMusic(musicIndex);

                // Remove 'clicked-cover' class from all covers
                allDiscs.forEach(d => d.querySelector('.cover').classList.remove('clicked-disc'));

                // Add 'clicked-cover' class to the clicked cover
                cover.classList.add('clicked-disc');

                // Get the background image of the clicked cover
                const coverBg = window.getComputedStyle(cover).backgroundImage;

                // Change the background of the .bg element
                bgElement.style.backgroundImage = coverBg;
            } 
        });
    });

    // Infinite scrolling logic
    let isScrolling = false;
    discSlider.addEventListener('scroll', () => {
        if (isScrolling) return;

        const scrollLeft = discSlider.scrollLeft;
        const scrollWidth = discSlider.scrollWidth;
        const clientWidth = discSlider.clientWidth;
        const maxScrollLeft = scrollWidth - clientWidth;

        if (scrollLeft >= maxScrollLeft) {
            isScrolling = true;
            discSlider.scrollLeft = 0;
            isScrolling = false;
        }
    });



    const title = document.getElementById('music-title');
    const currentTimeEl = document.getElementById('current-time');
    const durationEl = document.getElementById('duration');
    const progress = document.getElementById('progress');
    //const playerProgress = document.getElementById('player-progress');
    const playBtn = document.getElementById('play');
    const nextBtn = document.getElementById('next');
    
    let musicIndex = 5;
    let isPlaying = false;

    const music = new Audio();
    const song = [
        {
            path: '../audio/Samudrartha.mp3',
            displayName: 'Samudrartha',
        },
        {
            path: '../audio/If I Can Stop One Heart From Breaking.mp3',
            displayName: 'If I Can Stop One Heart From Breaking',
        },
        {
            path: '../audio/Monodrama.mp3',
            displayName: 'Monodrama',
        },
        {
            path: '../audio/Let\'s Take a Photo!.mp3',
            displayName: 'Let\'s Take a Photo!',
        },
        {
            path: '../audio/Regression.mp3',
            displayName: 'Regression',
        },
        {
            path: '../audio/A Dramatic Irony.mp3',
            displayName: 'A Dramatic Irony',
        }
    ];
    function togglePlay() {
        if(isPlaying){
            pauseMusic();
        }else{
            playMusic();
        }
    }

    function playMusic() {
        isPlaying = true;

        playBtn.classList.replace('fa-play', 'fa-pause');
        playBtn.setAttribute('title', 'Pause');
        
        music.play();
    }
    
    function pauseMusic() {
        isPlaying = false;
        
        playBtn.classList.replace('fa-pause', 'fa-play');
        playBtn.setAttribute('title', 'Play');
        
        music.pause();
    }
    
    
    function loadMusic(song) {
        music.src = song.path;
        title.textContent = song.displayName;
    }
    
    function changeMusic(index) {
        loadMusic(song[index]);
        playMusic();
    }
    
    function updateProgressBar(){
        const { duration, currentTime } = music;
        const progressPercent = (currentTime / duration) *100;
        progress.style.width = `${progressPercent}%`;
    
        const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
        durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
        currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
    }
    
    /*function setProgressBar(e) {
        const width = playerProgress.clientWidth;
        const clickX = e.offsetX;
        music.curentTime = (clickX / width) * music.duration;
    }*/
    
    
    music.addEventListener('ended', () => changeMusic(musicIndex));
    music.addEventListener('timeupdate', updateProgressBar);
    playBtn.addEventListener('click', togglePlay);
    /*nextBtn.addEventListener('click', () => {
        if(musicIndex == 5){
            musicIndex = 0;
        }
        changeMusic(musicIndex);
        const discPosition = allDiscs[musicIndex + 1].offsetLeft;
        const cover = allDiscs[musicIndex + 1].querySelector('.cover');

        discSlider.scrollTo({
            left: discPosition,
            behavior: 'smooth'
        });

        // Remove 'clicked-cover' class from all covers
        allDiscs.forEach(d => d.querySelector('.cover').classList.remove('clicked-disc'));

        // Add 'clicked-cover' class to the clicked cover
        cover.classList.add('clicked-disc');

        // Get the background image of the clicked cover
        const coverBg = window.getComputedStyle(cover).backgroundImage;

        // Change the background of the .bg element
        bgElement.style.backgroundImage = coverBg;
    });*/

    loadMusic(song[musicIndex]);
});


