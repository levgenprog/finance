// ===== ФИЛЬТР НОВОСТЕЙ ПО ГОДАМ =====

/**
 * Инициализация фильтрации новостей по годам
 * Переключает активный класс для выбранного года
 */
document.addEventListener('DOMContentLoaded', function () {
    const newsYears = document.querySelectorAll('.news-year');

    newsYears.forEach(year => {
        year.addEventListener('click', function () {
            // Удаляем активный класс у всех годов
            newsYears.forEach(y => y.classList.remove('news-year--active'));

            // Добавляем активный класс кликнутому году
            this.classList.add('news-year--active');

            // Здесь в будущем можно добавить логику фильтрации контента
            console.log('Filtered by year:', this.textContent.trim());
        });
    });
});
