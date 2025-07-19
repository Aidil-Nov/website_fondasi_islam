document.addEventListener("DOMContentLoaded", function () {
  feather.replace();

  document.getElementById("current-year").textContent =
    new Date().getFullYear();

  const mobileToggle = document.querySelector(".mobile-menu-toggle");
  const sidebar = document.querySelector(".sidebar");
  const overlay = document.querySelector(".sidebar-overlay");

  if (mobileToggle && sidebar) {
    mobileToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      sidebar.classList.toggle("active");
      this.setAttribute("aria-expanded", sidebar.classList.contains("active"));
    });

    if (overlay) {
      overlay.addEventListener("click", function () {
        sidebar.classList.remove("active");
        mobileToggle.setAttribute("aria-expanded", "false");
      });
    }

    document.addEventListener("click", function (e) {
      if (!sidebar.contains(e.target) && !mobileToggle.contains(e.target)) {
        sidebar.classList.remove("active");
        mobileToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  document.querySelectorAll(".audio-item").forEach((item) => {
    const playBtn = item.querySelector(".play-btn");
    const audio = new Audio(item.getAttribute("data-audio"));
    const progressBar = item.querySelector("progress");
    const durationEl = item.querySelector(".audio-duration");
    const icon = playBtn.querySelector("i");

    const formatTime = (secs) => {
      const minutes = Math.floor(secs / 60) || 0;
      const seconds = Math.floor(secs % 60) || 0;
      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    audio.addEventListener("timeupdate", () => {
      if (!isNaN(audio.duration)) {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.value = progress || 0;
      }
    });

    audio.addEventListener("loadedmetadata", () => {
      if (!isNaN(audio.duration)) {
        durationEl.textContent = formatTime(audio.duration);
      }
    });

    audio.addEventListener("error", () => {
      console.error("Error loading audio:", item.getAttribute("data-audio"));
      playBtn.disabled = true;
      icon.setAttribute("data-feather", "alert-circle");
      feather.replace();
    });

    playBtn.addEventListener("click", (e) => {
      e.preventDefault();

      document.querySelectorAll("audio").forEach((otherAudio) => {
        if (otherAudio !== audio && !otherAudio.paused) {
          otherAudio.pause();
          otherAudio.currentTime = 0;
          const otherBtn = otherAudio
            .closest(".audio-item")
            .querySelector(".play-btn");
          const otherIcon = otherBtn.querySelector("i");
          otherIcon.setAttribute("data-feather", "play");
          feather.replace();
        }
      });

      if (audio.paused) {
        audio.play().catch((e) => {
          console.error("Playback failed:", e);
          icon.setAttribute("data-feather", "alert-circle");
          feather.replace();
        });
        icon.setAttribute("data-feather", "pause");
      } else {
        audio.pause();
        icon.setAttribute("data-feather", "play");
      }
      feather.replace();
    });

    audio.addEventListener("ended", () => {
      icon.setAttribute("data-feather", "play");
      feather.replace();
      progressBar.value = 0;
    });

    progressBar.addEventListener("click", (e) => {
      if (!isNaN(audio.duration)) {
        const percent = e.offsetX / progressBar.offsetWidth;
        audio.currentTime = percent * audio.duration;
      }
    });
  });

  const lazyLoadIframes = () => {
    const iframes = document.querySelectorAll(".video-wrapper iframe");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const iframe = entry.target;
            iframe.src = iframe.dataset.src || iframe.src;
            observer.unobserve(iframe);
          }
        });
      },
      { rootMargin: "200px" }
    );

    iframes.forEach((iframe) => {
      if (iframe.getAttribute("data-src")) {
        observer.observe(iframe);
      }
    });
  };

  window.addEventListener("load", lazyLoadIframes);
});
