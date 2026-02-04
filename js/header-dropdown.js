// ===== HEADER LOADER & DROPDOWN LOGIC =====

// ===== CENTRALIZED DROPDOWN LOGIC =====

const dropdownData = {
  '/about': [
    { text: 'История', url: '/pages/history.html' },
    { text: 'Команда', url: '/pages/team.html' },
    { text: 'Новости', url: '/pages/news.html' },
    { text: 'Документы клиентам', url: '/pages/licence.html' },
    { text: 'Раскрытие информации', url: '/pages/information.html' },
  ],
  '/services': [
    { text: 'Инвестиционное консультирование', url: '/pages/service-pers.html' },
    { text: 'Брокерское обслуживание', url: '/pages/service-broker.html' },
    { text: 'Доверительное управление', url: '/pages/service-indiv.html' },
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
    // Get category from span or li element
    const trigger = item.querySelector('span[accesskey]');
    if (!trigger) {
      console.log(`Item ${index} has no span with accesskey`);
      return;
    }

    const category = trigger.getAttribute('accesskey');
    console.log(`Setting up item ${index}: category=${category}`);

    // Проверяем есть ли данные для этой категории в dropdownData
    if (!dropdownData[category]) {
      console.log('Skipping item without dropdown data');
      return;
    }

    // Функция для открытия dropdown
    const openDropdown = () => {
      clearTimeout(timeoutId);
      const items = dropdownData[category];
      if (!items || items.length === 0) {
        console.log(`No items for category ${category}`);
        return;
      }
      renderDropdownContent(category);
      dropdownContent.style.display = 'block';
      setTimeout(() => {
        dropdownContent.style.opacity = '1';
        dropdownContent.style.visibility = 'visible';
      }, 10);
    };

    // Функция для закрытия dropdown
    const closeDropdown = () => {
      timeoutId = setTimeout(() => {
        dropdownContent.style.opacity = '0';
        dropdownContent.style.visibility = 'hidden';
        setTimeout(() => {
          dropdownContent.style.display = 'none';
        }, 300);
      }, 150);
    };

    // При наведении на li элемент
    item.addEventListener('mouseenter', openDropdown);

    item.addEventListener('mouseleave', (e) => {
      const relatedTarget = e.relatedTarget;
      if (relatedTarget && (relatedTarget === dropdownContent || dropdownContent.contains(relatedTarget))) {
        console.log('Moving to dropdown, keeping it open');
        return;
      }
      closeDropdown();
    });

    // Also add hover listener to the span trigger
    trigger.addEventListener('mouseenter', openDropdown);
    trigger.addEventListener('mouseleave', (e) => {
      const relatedTarget = e.relatedTarget;
      if (relatedTarget && (relatedTarget === dropdownContent || dropdownContent.contains(relatedTarget))) {
        return;
      }
      closeDropdown();
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
