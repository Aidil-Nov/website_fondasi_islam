// Ambil elemen-elemen yang diperlukan
const menuBtn = document.getElementById('menu-btn'); // Tombol menu di top bar
const sidebar = document.getElementById('sidebar'); // Sidebar
const sidebarOverlay = document.createElement('div'); // Overlay yang akan menutupi area di luar sidebar

// Tambahkan overlay ke dalam body, sebagai elemen background
sidebarOverlay.classList.add('sidebar-overlay');
document.body.appendChild(sidebarOverlay);

// Fungsi untuk membuka dan menutup sidebar
menuBtn.addEventListener('click', () => {
  sidebar.classList.toggle('active'); // Toggle sidebar
  if (sidebar.classList.contains('active')) {
    sidebarOverlay.style.display = 'block'; // Menampilkan overlay saat sidebar aktif
  } else {
    sidebarOverlay.style.display = 'none'; // Menyembunyikan overlay saat sidebar tidak aktif
  }
});

// Fungsi untuk menutup sidebar jika overlay diklik
sidebarOverlay.addEventListener('click', () => {
  sidebar.classList.remove('active'); // Menutup sidebar
  sidebarOverlay.style.display = 'none'; // Menyembunyikan overlay
});

// Menutup sidebar jika area di luar sidebar diklik
window.addEventListener('click', (event) => {
  if (!sidebar.contains(event.target) && !menuBtn.contains(event.target) && !sidebarOverlay.contains(event.target)) {
    sidebar.classList.remove('active'); // Menutup sidebar jika diklik di luar area
    sidebarOverlay.style.display = 'none'; // Menyembunyikan overlay
  }
});
