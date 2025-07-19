document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Mobile menu functionality
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    
    if (mobileToggle && sidebar) {
        mobileToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            sidebar.classList.toggle('active');
            this.setAttribute('aria-expanded', sidebar.classList.contains('active'));
        });
        
        if (overlay) {
            overlay.addEventListener('click', function() {
                sidebar.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
            });
        }
        
        document.addEventListener('click', function(e) {
            if (!sidebar.contains(e.target) && !mobileToggle.contains(e.target)) {
                sidebar.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
    
    // Audio player functionality
    document.querySelectorAll('.audio-player').forEach(player => {
        const button = player.querySelector('.play-btn');
        const audio = player.querySelector('audio');
        const icon = button.querySelector('i');
        
        // Format time for duration display
        const formatTime = (secs) => {
            const minutes = Math.floor(secs / 60) || 0;
            const seconds = Math.floor(secs % 60) || 0;
            return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        };
        
        // Set duration when metadata is loaded
        audio.addEventListener('loadedmetadata', () => {
            if (!isNaN(audio.duration)) {
                player.querySelector('.audio-duration').textContent = formatTime(audio.duration);
            }
        });
        
        // Error handling
        audio.addEventListener('error', () => {
            console.error('Error loading audio:', audio.src);
            button.disabled = true;
            icon.setAttribute('data-feather', 'alert-circle');
            feather.replace();
        });
        
        // Play/pause functionality
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Pause all other audios
            document.querySelectorAll('audio').forEach(otherAudio => {
                if (otherAudio !== audio && !otherAudio.paused) {
                    otherAudio.pause();
                    const otherBtn = otherAudio.parentElement.querySelector('.play-btn');
                    otherBtn.innerHTML = '<i data-feather="play"></i>';
                    feather.replace();
                }
            });
            
            if (audio.paused) {
                audio.play().catch(e => {
                    console.error('Playback failed:', e);
                    icon.setAttribute('data-feather', 'alert-circle');
                    feather.replace();
                });
                icon.setAttribute('data-feather', 'pause');
            } else {
                audio.pause();
                icon.setAttribute('data-feather', 'play');
            }
            feather.replace();
        });
        
        // Reset button when audio ends
        audio.addEventListener('ended', () => {
            icon.setAttribute('data-feather', 'play');
            feather.replace();
        });
    });
    
    // Initialize feather icons
    feather.replace();
});     