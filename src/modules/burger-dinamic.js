document.addEventListener('DOMContentLoaded', () => {
  const burgerMenu = document.getElementById('burger-menu');
  const mobileNav = document.getElementById('mobile-nav');
  // Іконки для бургер-меню та хрестика
  const burgerIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#fffbf2" d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"/></svg>`;
  const closeIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="#fffbf2" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>`;

  burgerMenu.addEventListener('click', () => {
    mobileNav.classList.toggle('active');

    // Змінюємо іконку в залежності від стану меню
    if (mobileNav.classList.contains('active')) {
      burgerMenu.innerHTML = closeIcon;
    } else {
      burgerMenu.innerHTML = burgerIcon;
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const dropdownTrigger = document.querySelectorAll('.dropdown-trigger-chat');
  const dropdown = document.querySelectorAll('.dropdown-chat');

  dropdownTrigger.forEach((trigger, index) => {
    // Додаємо обробник події для кожного тригера
    trigger.addEventListener('click', () => {
      dropdown[index].classList.toggle('active-chat'); // Показуємо/ховаємо відповідний список
      // Додаємо зміну іконки
      const arrow = trigger.querySelector('.dropdown-arrow');

      // Перевіряємо, чи вже відкрито підменю
      const isOpen = trigger.classList.contains('open');

      // Змінюємо клас для відкриття/закриття
      trigger.classList.toggle('open');

      // Міняємо іконку в залежності від стану
      if (isOpen) {
        arrow.innerHTML = '<path fill="#fffbf2" d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/>';
      } else {
        arrow.innerHTML = '<path fill="#fffbf2" d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"/>';
      }
    });

    // Закрити дропдаун, якщо натиснути за межами його області
    window.addEventListener('click', (event) => {
      if (!event.target.matches('.dropdown-trigger-chat')) {
        dropdown.forEach((menu) => {
          if (menu.classList.contains('active-chat')) {
            menu.classList.remove('active-chat');
          }
        });
      }
    });
  });

  // Обробник події для кнопки бургер-меню
  document.getElementById('burger-menu').addEventListener('click', function () {
    const searchTrigger = document.getElementById('search-trigger');

    // Додаємо або прибираємо клас для зміни стилів
    searchTrigger.classList.toggle('active');
  });
});