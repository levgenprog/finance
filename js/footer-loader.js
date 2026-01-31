// ===== FOOTER LOADER =====

/**
 * Загружает footer из отдельного файла и вставляет его в конец body
 * Используется для модульности кода
 */
async function loadFooter() {
  try {
    // Определяем базовый путь в зависимости от местоположения страницы
    const currentPath = window.location.pathname;
    let basePath = 'components/';
    if (currentPath.includes('/pages/') || currentPath.endsWith('home.html') || currentPath.endsWith('service.html')) {
      basePath = '../components/';
    }
    const response = await fetch(basePath + 'footer.html');
    if (!response.ok) {
      console.error('Не удалось загрузить footer');
      return;
    }
    const footerHTML = await response.text();
    const footerContainer = document.getElementById('footerContainer');
    if (footerContainer) {
      footerContainer.innerHTML = footerHTML;
    } else {
      document.body.insertAdjacentHTML('beforeend', footerHTML);
    }
  } catch (error) {
    console.error('Ошибка при загрузке footer:', error);
  }
}

// Загружаем footer при загрузке DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadFooter);
} else {
  loadFooter();
}

