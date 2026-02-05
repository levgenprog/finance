// ===== COOKIE BANNER УПРАВЛЕНИЕ =====

/**
 * Инициализация cookie banner
 * Проверяет, принимал ли пользователь cookie раньше,
 * и скрывает баннер, если согласие уже было дано
 */
function initCookieBanner() {
  const banner = document.getElementById("cookieBanner");
  const btn = document.getElementById("acceptCookies");

  if (!banner || !btn) {
    // Элементы еще не загружены, попробуем позже
    setTimeout(initCookieBanner, 100);
    return;
  }

  // Проверяем, принимал ли пользователь cookie раньше
  if (localStorage.getItem("cookiesAccepted")) {
    banner.style.display = "none";
    return;
  }

  // Обработчик клика на кнопку "Принять"
  // Сохраняет согласие в localStorage и скрывает баннер
  btn.addEventListener("click", () => {
    localStorage.setItem("cookiesAccepted", "true");
    banner.style.display = "none";
  });
}

// Используем делегирование событий для надежности
document.addEventListener("click", (e) => {
  if (e.target && e.target.id === "acceptCookies") {
    const banner = document.getElementById("cookieBanner");
    if (banner) {
      localStorage.setItem("cookiesAccepted", "true");
      banner.style.display = "none";
    }
  }
});

// Инициализация при загрузке DOM
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    setTimeout(initCookieBanner, 500); // Даем время на загрузку через fetch
    initMobileMenu();
    initMoreInfo();
  });
} else {
  setTimeout(initCookieBanner, 500);
  initMobileMenu();
  initMoreInfo();
}

// ===== MOBILE MENU УПРАВЛЕНИЕ =====

/**
 * Инициализация мобильного меню
 * Управляет открытием и закрытием меню для планшетов
 */
function initMobileMenu() {
  const menuToggle = document.getElementById("menuToggle");
  const menuClose = document.getElementById("menuClose");
  const menuOverlay = document.getElementById("mobileMenuOverlay");

  if (!menuToggle || !menuClose || !menuOverlay) {
    // Элементы еще не загружены, попробуем позже
    setTimeout(initMobileMenu, 100);
    return;
  }

  // Открытие меню
  menuToggle.addEventListener("click", () => {
    menuOverlay.classList.add("active");
    document.body.classList.add("menu-open"); // Блокируем прокрутку страницы
  });

  // Закрытие меню по кнопке
  menuClose.addEventListener("click", () => {
    menuOverlay.classList.remove("active");
    document.body.classList.remove("menu-open"); // Разблокируем прокрутку
  });

  // Закрытие меню при клике на overlay
  menuOverlay.addEventListener("click", (e) => {
    if (e.target === menuOverlay) {
      menuOverlay.classList.remove("active");
      document.body.classList.remove("menu-open");
    }
  });

  // Закрытие меню при клике на ссылку
  const menuLinks = menuOverlay.querySelectorAll(".mobile-menu__link, .mobile-menu__button, .mobile-menu__login-link, .mobile-menu__phone, .gold-button button");
  menuLinks.forEach(link => {
    link.addEventListener("click", () => {
      menuOverlay.classList.remove("active");
      document.body.classList.remove("menu-open");
    });
  });

  // Закрытие меню по Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menuOverlay.classList.contains("active")) {
      menuOverlay.classList.remove("active");
      document.body.classList.remove("menu-open");
    }
  });
}

// ===== MORE INFO SECTION УПРАВЛЕНИЕ =====

/**
 * Инициализация секции "Раскрытие информации"
 * Управляет раскрытием списка и изменением цвета ссылок при нажатии
 */
function initMoreInfo() {
  const toggleBtn = document.getElementById("moreInfoToggle");
  const itemsContainer = document.getElementById("moreInfoItems");
  const header = document.querySelector(".more-info-header");

  if (!toggleBtn || !itemsContainer) return;

  const toggle = () => {
    toggleBtn.classList.toggle("active");
    itemsContainer.classList.toggle("more-info-items--hidden");
  };

  // Клик по кнопке или всему заголовку
  if (header) {
    header.addEventListener("click", toggle);
  } else {
    toggleBtn.addEventListener("click", toggle);
  }

  // Изменение цвета ссылок при нажатии
  const links = itemsContainer.querySelectorAll(".more-info-item__link");
  links.forEach(link => {
    link.addEventListener("click", function () {
      // Снимаем выделение со всех ссылок
      links.forEach(l => l.classList.remove("more-info-item__link--clicked"));

      // Выделяем текущую
      this.classList.add("more-info-item__link--clicked");
    });
  });
}
