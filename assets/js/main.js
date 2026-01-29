document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const btn = document.querySelector('.mobile-menu-button');
    const menu = document.querySelector('.mobile-menu');

    if (btn && menu) {
        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });
    }
    
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('shadow-md');
                navbar.classList.add('bg-white/95');
            } else {
                navbar.classList.remove('shadow-md');
                navbar.classList.remove('bg-white/95');
            }
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
