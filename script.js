
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


const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
const captionText = document.getElementById("caption");

document.querySelectorAll('.article-image').forEach(img => {
  img.style.cursor = 'pointer';
  img.addEventListener('click', function() {
    modal.style.display = "block";
    modalImg.src = this.src;
    captionText.innerHTML = this.nextElementSibling.innerHTML;
    
    
    modalImg.style.opacity = '0';
    modalImg.style.transform = 'scale(0.8)';
    setTimeout(() => {
      modalImg.style.opacity = '1';
      modalImg.style.transform = 'scale(1)';
    }, 10);
  });
});


document.querySelector('.close').addEventListener('click', function() {
  modal.style.display = "none";
});


modal.addEventListener('click', function(e) {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});


document.addEventListener('keydown', function(e) {
  if (e.key === "Escape" && modal.style.display === "block") {
    modal.style.display = "none";
  }
});


document.addEventListener('DOMContentLoaded', function() {
    const warning = document.querySelector('.warning-notice');
    
    
    warning.addEventListener('click', function() {
      this.style.animation = 'none';
      void this.offsetWidth; 
      this.style.animation = 'slideIn 0.5s ease-out, pulse 2s';
    });
  });