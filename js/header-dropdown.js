// ===== HEADER LOADER & DROPDOWN LOGIC =====

// ===== CENTRALIZED DROPDOWN LOGIC =====

const dropdownData = {
  '/about': [
    { text: 'Команда', url: '/about/team' },
    { text: 'Документы клиентам', url: '/about/documents' },
    { text: 'Раскрытие информации', url: '/about/information' },
    { text: 'Вакансии', url: '/about/careers' }
  ],
  '/strategy': [
    { text: 'Инвестиционное консультирование', url: '/strategy/ik' },
    { text: 'Доверительное управление', url: '/strategy/du' },
    { text: 'Cresco Баланс', url: '/strategy/balance' },
    { text: 'Cresco Эксперт', url: '/strategy/expert' },
    { text: 'Cresco Перспектива', url: '/strategy/perspective' },
    { text: 'Cresco Привилегия', url: '/strategy/premium' },
    { text: 'Cresco Бизнес', url: '/strategy/business' },
    { text: 'Cresco Защита', url: '/strategy/protection' }
  ],
  '/public': [
    { text: 'Новости', url: '/public/news' }
  ]
};

/**
 * Рендерит элементы dropdown меню
 */
function renderDropdownContent(category) {
  const dropdownGrid = document.getElementById('dropdownGrid');
  if (!dropdownGrid) return;

  const items = dropdownData[category] || [];

  // Очищаем содержимое
  dropdownGrid.innerHTML = '';

  // Динамически определяем количество колонок
  let columns;
  if (items.length <= 3) {
    columns = 1; // 1-3 элемента: 1 колонка
  } else if (items.length <= 6) {
    columns = 2; // 4-6 элемента: 2 колонки
  } else {
    columns = 3; // 7+ элементов: 3 колонки
  }

  // Вычисляем количество строк
  const rows = Math.ceil(items.length / columns);

  // Устанавливаем grid параметры
  dropdownGrid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
  dropdownGrid.style.gridTemplateRows = `repeat(${rows}, auto)`;

  console.log(`Rendering ${items.length} items: ${columns} columns × ${rows} rows`);

  // Добавляем элементы (создаём li > a > div.link-wrapper)
  items.forEach(item => {
    const li = document.createElement('li');
    const link = document.createElement('a');
    link.href = item.url;

    const wrapper = document.createElement('div');
    wrapper.className = 'link-wrapper';
    wrapper.textContent = item.text;

    link.appendChild(wrapper);
    li.appendChild(link);
    dropdownGrid.appendChild(li);
  });
}


/**
 * Инициализация dropdown логики
 */
function initDropdown() {
  console.log('initDropdown called');

  const dropdownItems = document.querySelectorAll('.dropdown > li');
  const dropdownContent = document.getElementById('dropdownContent');

  console.log('Found dropdown items:', dropdownItems.length);
  console.log('Dropdown content:', dropdownContent);

  if (!dropdownContent) {
    console.error('dropdownContent not found!');
    return;
  }

  if (dropdownItems.length === 0) {
    console.error('No dropdown items found!');
    return;
  }

  let timeoutId = null;

  dropdownItems.forEach((item, index) => {
    const trigger = item.querySelector('a');
    if (!trigger) return;

    // Используем href вместо data-dropdown-category
    const category = trigger.getAttribute('href');
    console.log(`Setting up item ${index}: category=${category}`);

    // Проверяем есть ли данные для этой категории в dropdownData
    if (!dropdownData[category]) {
      console.log('Skipping item without dropdown data');
      return;
    }

    // При наведении на li элемент
    item.addEventListener('mouseenter', () => {
      clearTimeout(timeoutId);

      // Проверяем есть ли данные для этой категории
      const items = dropdownData[category];
      if (!items || items.length === 0) {
        console.log(`No items for category ${category}`);
        return;
      }

      // Рендерим контент для этой категории
      renderDropdownContent(category);

      // Показываем dropdown
      dropdownContent.style.display = 'block';
      setTimeout(() => {
        dropdownContent.style.opacity = '1';
        dropdownContent.style.visibility = 'visible';
      }, 10);
    });

    item.addEventListener('mouseleave', (e) => {
      // Проверяем, не ушли ли мы на dropdown
      const relatedTarget = e.relatedTarget;
      if (relatedTarget && (relatedTarget === dropdownContent || dropdownContent.contains(relatedTarget))) {
        console.log('Moving to dropdown, keeping it open');
        return;
      }

      timeoutId = setTimeout(() => {
        dropdownContent.style.opacity = '0';
        dropdownContent.style.visibility = 'hidden';
        setTimeout(() => {
          dropdownContent.style.display = 'none';
        }, 300);
      }, 150);
    });
  });

  // При наведении на сам dropdown - оставляем открытым
  dropdownContent.addEventListener('mouseenter', () => {
    clearTimeout(timeoutId);
  });

  dropdownContent.addEventListener('mouseleave', () => {
    timeoutId = setTimeout(() => {
      dropdownContent.style.opacity = '0';
      dropdownContent.style.visibility = 'hidden';
      setTimeout(() => {
        dropdownContent.style.display = 'none';
      }, 300);
    }, 150);
  });
}


// Реинициализируем после загрузки header
document.addEventListener('headerLoaded', () => {
  console.log('Header loaded event received, reinitializing');
  initDropdown();
});
