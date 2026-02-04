/**
 * CALLBACK MODAL LOADER & MANAGER
 */

async function initCallbackModal() {
  const container = document.getElementById('callbackModalContainer');
  if (!container) return;

  try {
    // Determine base path
    const currentPath = window.location.pathname;
    let basePath = 'components/';
    if (currentPath.includes('/pages/') || currentPath.endsWith('home.html')) {
      basePath = '../components/';
    }

    const response = await fetch(basePath + 'callback-modal.html');
    if (!response.ok) return;

    container.innerHTML = await response.text();

    const modal = document.getElementById('callbackModal');
    const closeBtns = [
      document.getElementById('closeModal'),
      document.getElementById('successCloseBtn')
    ];
    const form = document.getElementById('callbackForm');
    const formContainer = document.getElementById('modalFormContainer');
    const successContainer = document.getElementById('modalSuccessContainer');

    // Close modal function
    const closeModal = () => {
      modal.classList.remove('active');
      document.body.classList.remove('modal-open');
      // Reset after animation
      setTimeout(() => {
        formContainer.classList.remove('hidden');
        successContainer.classList.add('hidden');
        form.reset();
      }, 300);
    };

    // Close buttons
    closeBtns.forEach(btn => {
      if (btn) btn.addEventListener('click', closeModal);
    });

    // Close on click outside
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    // Handle form submission
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        // Here you would normally send data to server
        // Simulation of success:
        formContainer.classList.add('hidden');
        successContainer.classList.remove('hidden');
      });
    }

    // Global trigger function
    window.openCallbackModal = () => {
      modal.classList.add('active');
      document.body.classList.add('modal-open');
    };

    // Attach to all relevant buttons
    document.addEventListener('click', (e) => {
      const target = e.target.closest('button, a');
      if (!target) return;

      const text = target.innerText.toUpperCase();
      if (text.includes('ПОЛУЧИТЬ КОНСУЛЬТАЦИЮ') || 
          text.includes('ОБСУДИТЬ СТРАТЕГИЮ') || 
          text.includes('СВЯЖИТЕСЬ СО МНОЙ')) {
        e.preventDefault();
        window.openCallbackModal();
      }
    });

  } catch (error) {
    console.error('Error loading callback modal:', error);
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCallbackModal);
} else {
  initCallbackModal();
}
