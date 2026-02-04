// ===== АККОРДЕОН КОМАНДЫ =====

/**
 * Инициализация аккордеона для участников команды
 * Позволяет открывать/закрывать цитату и био на мобильных устройствах
 */
document.addEventListener('DOMContentLoaded', function () {
    const teamItems = document.querySelectorAll('.team-item');
    const teamToggles = document.querySelectorAll('.team-item__toggle');

    teamToggles.forEach((toggle) => {
        toggle.addEventListener('click', function (e) {
            e.preventDefault();
            const teamItem = this.closest('.team-item');
            const isActive = teamItem.classList.contains('team-item--active');
            const icon = this.querySelector('.accordion-icon');

            // Закрываем все остальные элементы (опционально, если хотим аккордеон)
            // Если хотим разрешить открывать несколько одновременно, закомментируйте этот блок
            teamItems.forEach(item => {
                if (item !== teamItem) {
                    item.classList.remove('team-item--active');
                    const itemIcon = item.querySelector('.accordion-icon');
                    if (itemIcon) {
                        itemIcon.classList.remove('accordion-icon--minus');
                    }
                }
            });

            // Переключаем текущий элемент
            if (isActive) {
                teamItem.classList.remove('team-item--active');
                if (icon) icon.classList.remove('accordion-icon--minus');
            } else {
                teamItem.classList.add('team-item--active');
                if (icon) icon.classList.add('accordion-icon--minus');
            }
        });
    });
});
