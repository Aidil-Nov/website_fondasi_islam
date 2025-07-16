document.querySelectorAll('.audio-item').forEach(item => {
    const playBtn = item.querySelector('.play-btn');
    const audio = new Audio(item.getAttribute('data-audio'));
    const progressBar = item.querySelector('progress');
    const durationEl = item.querySelector('.audio-duration');
    
    // Format durasi (00:00)
    const formatTime = (secs) => {
        const minutes = Math.floor(secs / 60) || 0;
        const seconds = Math.floor(secs % 60) || 0;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };
    
    // Update progress bar
    audio.addEventListener('timeupdate', () => {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.value = progress || 0;
    });
    
    // Set durasi saat metadata audio dimuat
    audio.addEventListener('loadedmetadata', () => {
        durationEl.textContent = formatTime(audio.duration);
    });
    
    // Tombol play/pause
    playBtn.addEventListener('click', () => {
        // Hentikan semua audio lain yang sedang diputar
        document.querySelectorAll('audio').forEach(otherAudio => {
            if (otherAudio !== audio) {
                otherAudio.pause();
                otherAudio.currentTime = 0;
                const otherBtn = otherAudio.closest('.audio-item').querySelector('.play-btn');
                otherBtn.innerHTML = '<i class="icon-play"></i>';
            }
        });
        
        if (audio.paused) {
            audio.play();
            playBtn.innerHTML = '<i class="icon-pause"></i>';
        } else {
            audio.pause();
            playBtn.innerHTML = '<i class="icon-play"></i>';
        }
    });
    
    // Reset tombol saat audio selesai
    audio.addEventListener('ended', () => {
        playBtn.innerHTML = '<i class="icon-play"></i>';
        progressBar.value = 0;
    });
});