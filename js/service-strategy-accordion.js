// ===== АККОРДЕОН СТРАТЕГИЙ =====

/**
 * Инициализация аккордеона для стратегий
 * Позволяет открывать/закрывать описания стратегий
 */
document.addEventListener('DOMContentLoaded', function() {
  const strategyItems = document.querySelectorAll('.strategy-item');
  const strategyToggles = document.querySelectorAll('.strategy-item__toggle');

  strategyToggles.forEach((toggle) => {
    toggle.addEventListener('click', function() {
      const strategyItem = this.closest('.strategy-item');
      const isActive = strategyItem.classList.contains('strategy-item--active');
      const icon = this.querySelector('.accordion-icon');

      // Закрываем все элементы
      strategyItems.forEach(item => {
        item.classList.remove('strategy-item--active');
        const itemIcon = item.querySelector('.accordion-icon');
        if (itemIcon) {
          itemIcon.classList.remove('accordion-icon--minus');
        }
      });

      // Открываем текущий элемент, если он был закрыт
      if (!isActive) {
        strategyItem.classList.add('strategy-item--active');
        icon.classList.add('accordion-icon--minus');
      }
    });
  });
});



