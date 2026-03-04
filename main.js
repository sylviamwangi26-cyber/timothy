document.addEventListener('DOMContentLoaded', () => {
    // Current page highlighting
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Mobile Menu Toggle
    const navToggle = document.createElement('div');
    navToggle.className = 'nav-toggle';
    navToggle.innerHTML = '<span></span><span></span><span></span>';
    document.body.appendChild(navToggle);

    const navSidebar = document.querySelector('.nav-sidebar');

    navToggle.addEventListener('click', () => {
        navSidebar.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close menu when clicking outside (for mobile)
    document.addEventListener('click', (e) => {
        if (!navSidebar.contains(e.target) && !navToggle.contains(e.target) && navSidebar.classList.contains('active')) {
            navSidebar.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });

    // Simple page transition wrapper
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
            // Close mobile menu if open
            navSidebar.classList.remove('active');
            navToggle.classList.remove('active');

            if (link.hostname === window.location.hostname && !link.hash && !link.href.includes('mailto:') && !link.href.includes('wa.me')) {
                e.preventDefault();
                const target = link.href;
                document.querySelector('main').style.opacity = '0';
                document.querySelector('main').style.transform = 'translateY(20px)';
                setTimeout(() => {
                    window.location.href = target;
                }, 300);
            }
        });
    });

    // Reveal main content
    document.querySelector('main').style.transition = 'all 0.6s ease-out';
    document.querySelector('main').style.opacity = '1';
    document.querySelector('main').style.transform = 'translateY(0)';
});
