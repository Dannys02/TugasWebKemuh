// Toggle Dark Mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    if (document.body.classList.contains('dark-mode')) {
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i> Mode Terang';
        localStorage.setItem('darkMode', 'enabled');
    } else {
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i> Mode Gelap';
        localStorage.setItem('darkMode', 'disabled');
    }
}

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    document.getElementById('darkModeToggle').innerHTML = '<i class="fas fa-sun"></i> Mode Terang';
}

// Print Functionality
document.getElementById('printBtn').addEventListener('click', function() {
    window.print();
});

// Smooth Scrolling for Table of Contents
document.querySelectorAll('.toc a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 20,
            behavior: 'smooth'
        });
        
        // Add active class to clicked item
        document.querySelectorAll('.toc a').forEach(item => {
            item.classList.remove('active');
        });
        this.classList.add('active');
    });
});

// Add animation on scroll
function animateOnScroll() {
    const sections = document.querySelectorAll('.section');
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.85) {
            section.style.animation = 'fadeInUp 0.6s ease-out forwards';
        }
    });
}

// Progress bar functionality
function updateProgressBar() {
    const winHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset;
    const scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;
    const progressBar = document.getElementById('progressBar');
    
    progressBar.style.width = scrollPercent + '%';
}

// Scroll to top function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Download materi function
document.getElementById('downloadBtn').addEventListener('click', function() {
    // Membuat elemen <a> sementara untuk mengunduh
    const link = document.createElement('a');
    link.href = '#'; // Ganti dengan URL file PDF yang sesungguhnya
    link.download = 'Kepribadian_Muhammadiyah_Bab_3.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Notifikasi untuk pengguna
    alert('Materi "Kepribadian Muhammadiyah Bab 3" akan segera diunduh. Jika tidak, pastikan file tersedia di server.');
});

// Add event listeners
window.addEventListener('scroll', function() {
    animateOnScroll();
    updateProgressBar();
    
    // Add active class to current section in TOC while scrolling
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.toc a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - 100)) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === currentSection) {
            link.classList.add('active');
        }
    });
});

// Initial call to animate visible sections and set up progress bar
animateOnScroll();
updateProgressBar();