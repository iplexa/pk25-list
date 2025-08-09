
document.getElementById('current-date').textContent = new Date().toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


const images = document.querySelectorAll('.article-image');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

images.forEach(img => {
    img.style.opacity = 0;
    img.style.transform = 'translateY(20px)';
    img.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(img);
});