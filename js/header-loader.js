// ===== HEADER LOADER =====

/**
 * Загружает header из отдельного файла и вставляет его в начало body
 * Используется для модульности кода
 */
async function loadHeader() {
  try {
    // Определяем базовый путь в зависимости от местоположения страницы
    const currentPath = window.location.pathname;
    let basePath = 'components/';
    if (currentPath.includes('/pages/') || currentPath.endsWith('home.html') || currentPath.endsWith('service.html')) {
      basePath = '../components/';
    }
    const response = await fetch(basePath + 'header.html');
    if (!response.ok) {
      console.error('Не удалось загрузить header');
      return;
    }
    const headerHTML = await response.text();
    const headerElement = document.querySelector('header');
    if (headerElement) {
      // Если header.html содержит только содержимое без тега <header>, оборачиваем
      if (!headerHTML.trim().startsWith('<header')) {
        headerElement.innerHTML = headerHTML;
      } else {
        headerElement.outerHTML = headerHTML;
      }
    } else {
      document.body.insertAdjacentHTML('afterbegin', headerHTML);
    }

    // Диспатчим событие после загрузки header
    document.dispatchEvent(new Event('headerLoaded'));
  } catch (error) {
    console.error('Ошибка при загрузке header:', error);
  }
}

// Загружаем header при загрузке DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadHeader);
} else {
  loadHeader();
}

