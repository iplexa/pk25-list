
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

    // Секретная функция
    let clickCount = 0;
    const header = document.querySelector('.article-header h1');
    const secretModal = document.getElementById('secretModal');
    const secretInput = document.getElementById('secretInput');
    const secretSubmit = document.getElementById('secretSubmit');
    const secretClose = document.getElementById('secretClose');
    const fullscreenContainer = document.getElementById('fullscreenContainer');
    const fullscreenClose = document.getElementById('fullscreenClose');

    // Обработчик клика по заголовку
    header.addEventListener('click', function() {
        clickCount++;
        console.log('Клик #' + clickCount); // Для отладки
        
        if (clickCount === 5) {
            secretModal.style.display = 'block';
            secretInput.focus();
            clickCount = 0; // Сбрасываем счетчик
        }
        
        // Сбрасываем счетчик через 3 секунды если не достигли 5 кликов
        setTimeout(() => {
            if (clickCount < 5) {
                clickCount = 0;
            }
        }, 3000);
    });

    // Обработчик закрытия секретного модального окна
    secretClose.addEventListener('click', function() {
        secretModal.style.display = 'none';
        secretInput.value = '';
    });

    // Закрытие при клике вне модального окна
    secretModal.addEventListener('click', function(e) {
        if (e.target === secretModal) {
            secretModal.style.display = 'none';
            secretInput.value = '';
        }
    });

    // Обработчик кнопки подтверждения
    secretSubmit.addEventListener('click', function() {
        checkSecretCode();
    });

    // Обработчик Enter в поле ввода
    secretInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkSecretCode();
        }
    });

    // Функция проверки кодового слова
    function checkSecretCode() {
        const code = secretInput.value.trim();
        
        if (code.toUpperCase() === 'МИРЭА') {
            secretModal.style.display = 'none';
            secretInput.value = '';
            showFullscreenImage();
        } else if (code === '!help') {
            secretModal.style.display = 'none';
            secretInput.value = '';
            showHelpModal();
        } else {
            // Показываем ошибку
            secretInput.style.borderColor = '#e74c3c';
            secretInput.placeholder = 'Неверное кодовое слово (попробуйте !help)';
            secretInput.value = '';
            
            setTimeout(() => {
                secretInput.style.borderColor = '#ddd';
                secretInput.placeholder = 'Кодовое слово';
            }, 3000);
        }
    }

    // Функция показа полноэкранного изображения
    function showFullscreenImage() {
        fullscreenContainer.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Отключаем прокрутку
        updateEasterEggCount(); // Считаем эту пасхалку тоже
    }

    // Обработчик закрытия полноэкранного режима
    fullscreenClose.addEventListener('click', function() {
        closeFullscreen();
    });

    // Этот обработчик ESC удален, так как есть общий ниже

    // Функция закрытия полноэкранного режима
    function closeFullscreen() {
        fullscreenContainer.style.display = 'none';
        document.body.style.overflow = 'auto'; // Включаем прокрутку обратно
    }

    // Закрытие при клике на фон (не на изображение)
    fullscreenContainer.addEventListener('click', function(e) {
        if (e.target === fullscreenContainer) {
            closeFullscreen();
        }
    });

    // ========== ПАСХАЛКИ ==========
    
    // Переменные для пасхалок
    let easterEggsFound = 0;
    const maxEasterEggs = 6;
    
    // 1. KONAMI CODE (↑↑↓↓←→←→BA)
    const konamiCode = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];
    let konamiProgress = 0;
    let matrixActive = false;

    document.addEventListener('keydown', function(e) {
        if (e.code === konamiCode[konamiProgress]) {
            konamiProgress++;
            if (konamiProgress === konamiCode.length) {
                activateMatrix();
                konamiProgress = 0;
                updateEasterEggCount();
            }
        } else {
            konamiProgress = 0;
        }
    });

    function activateMatrix() {
        if (matrixActive) return;
        matrixActive = true;
        
        const matrixContainer = document.getElementById('matrixRain');
        matrixContainer.style.display = 'block';
        
        // Создаем падающие символы
        for (let i = 0; i < 50; i++) {
            setTimeout(() => createMatrixColumn(), i * 100);
        }
        
        // Автоматически отключаем через 10 секунд
        setTimeout(() => {
            matrixContainer.style.display = 'none';
            matrixActive = false;
        }, 10000);
    }

    function createMatrixColumn() {
        const symbols = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()';
        const column = document.createElement('div');
        column.className = 'matrix-column';
        column.style.left = Math.random() * 100 + '%';
        column.style.animationDuration = (Math.random() * 3 + 2) + 's';
        
        let text = '';
        for (let i = 0; i < 20; i++) {
            text += symbols[Math.floor(Math.random() * symbols.length)] + '<br>';
        }
        column.innerHTML = text;
        
        document.getElementById('matrixRain').appendChild(column);
        
        // Удаляем колонку после анимации
        setTimeout(() => {
            if (column.parentNode) {
                column.parentNode.removeChild(column);
            }
        }, 5000);
    }

    // 2. ДОЛГОЕ УДЕРЖАНИЕ КНОПКИ "КОНКУРСНЫЕ СПИСКИ"
    const competitionButton = document.querySelector('a[href*="list.php"]');
    let holdTimer;
    let memeMode = false;

    competitionButton.addEventListener('mousedown', function(e) {
        e.preventDefault();
        holdTimer = setTimeout(() => {
            activateMemeMode();
            updateEasterEggCount();
        }, 3000);
    });

    competitionButton.addEventListener('mouseup', function() {
        clearTimeout(holdTimer);
    });

    competitionButton.addEventListener('mouseleave', function() {
        clearTimeout(holdTimer);
    });

    function activateMemeMode() {
        if (memeMode) {
            document.body.classList.remove('meme-mode');
            memeMode = false;
        } else {
            document.body.classList.add('meme-mode');
            memeMode = true;
            
            // Автоматически отключаем через 15 секунд
            setTimeout(() => {
                document.body.classList.remove('meme-mode');
                memeMode = false;
            }, 15000);
        }
    }

    // 3. СЕКРЕТНОЕ СЛОВО "ADMIN"
    let typedText = '';
    let adminPanelActive = false;

    document.addEventListener('keypress', function(e) {
        // Игнорируем если фокус в input поле
        if (e.target.tagName === 'INPUT') return;
        
        typedText += e.key.toLowerCase();
        
        // Проверяем последние 5 символов
        if (typedText.slice(-5) === 'admin') {
            showAdminPanel();
            typedText = '';
            updateEasterEggCount();
        }
        
        // Очищаем если строка слишком длинная
        if (typedText.length > 10) {
            typedText = typedText.slice(-5);
        }
    });

    function showAdminPanel() {
        if (adminPanelActive) return;
        adminPanelActive = true;
        
        const adminPanel = document.getElementById('adminPanel');
        adminPanel.style.display = 'block';
        
        // Анимация загрузки
        const progress = document.getElementById('loadingProgress');
        let width = 0;
        const loadingInterval = setInterval(() => {
            width += Math.random() * 10;
            if (width >= 100) {
                width = 100;
                clearInterval(loadingInterval);
            }
            progress.style.width = width + '%';
        }, 100);
        
        // Обновляем статистику каждые 2 секунды
        const statsInterval = setInterval(() => {
            if (!adminPanelActive) {
                clearInterval(statsInterval);
                return;
            }
            updateAdminStats();
        }, 2000);
    }

    function updateAdminStats() {
        document.getElementById('visitors').textContent = Math.floor(Math.random() * 9000) + 1000;
        document.getElementById('sessions').textContent = Math.floor(Math.random() * 100) + 10;
        document.getElementById('cpu').textContent = Math.floor(Math.random() * 40) + 30 + '%';
        document.getElementById('ram').textContent = (Math.random() * 3 + 2).toFixed(1) + '/8 ГБ';
    }

    // Закрытие админ панели
    document.getElementById('adminClose').addEventListener('click', function() {
        document.getElementById('adminPanel').style.display = 'none';
        adminPanelActive = false;
    });

    // 4. ДИСКОТЕКА (10 кликов по предупреждению)
    let warningClicks = 0;
    let discoMode = false;
    const warningElement = document.querySelector('.warning-notice');

    warningElement.addEventListener('click', function() {
        warningClicks++;
        
        if (warningClicks === 10) {
            activateDiscoMode();
            warningClicks = 0;
            updateEasterEggCount();
        }
        
        // Сбрасываем счетчик через 5 секунд
        setTimeout(() => {
            if (warningClicks < 10) {
                warningClicks = 0;
            }
        }, 5000);
    });

    function activateDiscoMode() {
        if (discoMode) {
            document.body.classList.remove('disco-mode');
            discoMode = false;
        } else {
            document.body.classList.add('disco-mode');
            discoMode = true;
            
            // Автоматически отключаем через 20 секунд
            setTimeout(() => {
                document.body.classList.remove('disco-mode');
                discoMode = false;
            }, 20000);
        }
    }

    // 5. РАДУЖНЫЙ ТЕКСТ (Ctrl+Shift+R)
    let rainbowMode = false;

    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.shiftKey && e.code === 'KeyR') {
            e.preventDefault();
            activateRainbowMode();
            updateEasterEggCount();
        }
    });

    function activateRainbowMode() {
        const textElements = document.querySelectorAll('p, h1, h2, h3, li, span, div');
        
        if (rainbowMode) {
            textElements.forEach(el => el.classList.remove('rainbow-text'));
            rainbowMode = false;
        } else {
            textElements.forEach(el => {
                if (!el.closest('.admin-panel') && !el.closest('.modal')) {
                    el.classList.add('rainbow-text');
                }
            });
            rainbowMode = true;
            
            // Автоматически отключаем через 30 секунд
            setTimeout(() => {
                textElements.forEach(el => el.classList.remove('rainbow-text'));
                rainbowMode = false;
            }, 30000);
        }
    }

    // Функция обновления счетчика пасхалок
    function updateEasterEggCount() {
        easterEggsFound = Math.min(easterEggsFound + 1, 6); // Теперь 6 пасхалок (включая секретную МИРЭА)
        const easterEggElement = document.getElementById('easterEggs');
        const helpEasterEggElement = document.getElementById('helpEasterEggCount');
        
        if (easterEggElement) {
            easterEggElement.textContent = `${easterEggsFound}/6`;
        }
        if (helpEasterEggElement) {
            helpEasterEggElement.textContent = `${easterEggsFound}/6`;
        }
        
        // Если найдены все пасхалки
        if (easterEggsFound === 6) {
            setTimeout(() => {
                alert('🎉 Поздравляем! Вы нашли все пасхалки! 🎉\n\nВы настоящий исследователь секретов!');
            }, 500);
        }
    }

    // Функция показа окна справки
    function showHelpModal() {
        const helpModal = document.getElementById('helpModal');
        helpModal.style.display = 'block';
        
        // Обновляем счетчик в справке
        const helpEasterEggElement = document.getElementById('helpEasterEggCount');
        if (helpEasterEggElement) {
            helpEasterEggElement.textContent = `${easterEggsFound}/6`;
        }
    }

    // Обработчики для окна справки
    const helpModal = document.getElementById('helpModal');
    const helpClose = document.getElementById('helpClose');

    helpClose.addEventListener('click', function() {
        helpModal.style.display = 'none';
    });

    helpModal.addEventListener('click', function(e) {
        if (e.target === helpModal) {
            helpModal.style.display = 'none';
        }
    });

    // Обновляем обработчик ESC для включения окна справки
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (fullscreenContainer.style.display === 'block') {
                closeFullscreen();
            }
            if (secretModal.style.display === 'block') {
                secretModal.style.display = 'none';
                secretInput.value = '';
            }
            if (helpModal.style.display === 'block') {
                helpModal.style.display = 'none';
            }
        }
    });

    // Инициализация статистики при загрузке
    updateAdminStats();
  });