// ===== МОБИЛЬНЫЙ СЛАЙДЕР ДЛЯ ИСТОРИИ =====

/**
 * Инициализация слайдеров для фотографий в истории
 * Добавляет точки навигации и отслеживает прокрутку на мобильных устройствах
 */
document.addEventListener('DOMContentLoaded', function () {
    const isMobile = window.innerWidth <= 768;

    const historyImageContainers = document.querySelectorAll('.history-point-image');

    historyImageContainers.forEach(container => {
        const images = container.querySelectorAll('img');

        // Если изображений больше одного, создаем слайдер
        if (images.length > 1) {
            // Создаем контейнер для точек
            const dotsContainer = document.createElement('div');
            dotsContainer.className = 'history-slider-dots';

            images.forEach((_, index) => {
                const dot = document.createElement('span');
                dot.className = 'history-slider-dot' + (index === 0 ? ' history-slider-dot--active' : '');
                dotsContainer.appendChild(dot);
            });

            // Добавляем точки после изображений
            container.parentElement.appendChild(dotsContainer);

            // Отслеживаем прокрутку для обновления активной точки
            container.addEventListener('scroll', function () {
                const scrollIndex = Math.round(container.scrollLeft / container.clientWidth);
                const dots = dotsContainer.querySelectorAll('.history-slider-dot');

                dots.forEach((dot, index) => {
                    if (index === scrollIndex) {
                        dot.classList.add('history-slider-dot--active');
                    } else {
                        dot.classList.remove('history-slider-dot--active');
                    }
                });
            });
        }
    });
});
