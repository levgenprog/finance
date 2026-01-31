// ===== АККОРДЕОН УСЛУГ =====

/**
 * Инициализация аккордеона для услуг
 * Позволяет открывать/закрывать описания услуг
 */
document.addEventListener('DOMContentLoaded', function() {
  const serviceItems = document.querySelectorAll('.service-item');
  const serviceToggles = document.querySelectorAll('.service-toggle');

  serviceToggles.forEach((toggle, index) => {
    toggle.addEventListener('click', function() {
      const serviceItem = this.closest('.service-item');
      const isActive = serviceItem.classList.contains('service-item--active');
      const icon = this.querySelector('.accordion-icon');

      // Закрываем все элементы
      serviceItems.forEach(item => {
        item.classList.remove('service-item--active');
        const itemIcon = item.querySelector('.accordion-icon');
        if (itemIcon) {
          itemIcon.classList.remove('accordion-icon--minus');
        }
      });

      // Открываем текущий элемент, если он был закрыт
      if (!isActive) {
        serviceItem.classList.add('service-item--active');
        icon.classList.add('accordion-icon--minus');
      }
    });
  });
});

