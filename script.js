/**
 * RIFFLO LANDING PAGE INTERACTIVITY
 * 100% Vanilla JavaScript - Fast, lightweight, zero dependencies
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. MOBILE MENU TOGGLE & ACCESSIBILITY
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  function openMobileMenu() {
    if (!navMenu || !mobileToggle) return;
    navMenu.classList.add('open');
    mobileToggle.classList.add('active');
    mobileToggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
  }

  function closeMobileMenu() {
    if (!navMenu || !mobileToggle) return;
    navMenu.classList.remove('open');
    mobileToggle.classList.remove('active');
    mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  }

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (navMenu.classList.contains('open')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    // Close menu when clicking any navigation link
    document.querySelectorAll('.nav-link, .nav-mobile-cta a').forEach(link => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        closeMobileMenu();
      }
    });

    // Close menu on pressing Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        closeMobileMenu();
      }
    });
  }

  // 4. COMPANIONS CATEGORY FILTER
  const catTabs = document.querySelectorAll('.cat-tab');
  const compCards = document.querySelectorAll('.companion-card');

  catTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      catTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const category = tab.dataset.category;

      compCards.forEach(card => {
        if (category === 'all' || card.dataset.cat === category) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 5. FAQ ACCORDION TOGGLE
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // 6. STAR RATING SELECTOR
  const stars = document.querySelectorAll('.star-rating .star');
  const ratingInput = document.getElementById('selectedRating');

  stars.forEach(star => {
    star.addEventListener('click', () => {
      const rating = parseInt(star.dataset.rating, 10);
      ratingInput.value = rating;
      updateStars(rating);
    });

    star.addEventListener('mouseenter', () => {
      const rating = parseInt(star.dataset.rating, 10);
      highlightStars(rating);
    });
  });

  const starContainer = document.querySelector('.star-rating');
  if (starContainer) {
    starContainer.addEventListener('mouseleave', () => {
      updateStars(parseInt(ratingInput.value, 10));
    });
  }

  function highlightStars(count) {
    stars.forEach(s => {
      const val = parseInt(s.dataset.rating, 10);
      if (val <= count) {
        s.classList.add('hovered');
      } else {
        s.classList.remove('hovered');
      }
    });
  }

  function updateStars(count) {
    stars.forEach(s => {
      const val = parseInt(s.dataset.rating, 10);
      s.classList.remove('hovered');
      if (val <= count) {
        s.classList.add('active');
      } else {
        s.classList.remove('active');
      }
    });
  }

  // 7. USER FEEDBACK SUBMISSION
  const feedbackForm = document.getElementById('feedbackForm');
  const feedbackSuccess = document.getElementById('feedbackSuccess');
  const feedbackWall = document.getElementById('feedbackWall');

  // Load any previously saved feedbacks from localStorage
  const savedFeedbacks = JSON.parse(localStorage.getItem('rifflo_feedbacks') || '[]');
  savedFeedbacks.forEach(item => {
    prependFeedbackCard(item.name, item.rating, item.message);
  });

  if (feedbackForm) {
    feedbackForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('feedbackName').value.trim();
      const rating = parseInt(ratingInput.value, 10);
      const category = document.getElementById('feedbackCategory').value;
      const message = document.getElementById('feedbackMessage').value.trim();

      if (!name || !message) return;

      const newFeedback = {
        name,
        rating,
        category,
        message,
        date: new Date().toLocaleDateString()
      };

      // Save to localStorage
      savedFeedbacks.unshift(newFeedback);
      localStorage.setItem('rifflo_feedbacks', JSON.stringify(savedFeedbacks));

      // Append to UI
      prependFeedbackCard(name, rating, message);

      // Show success
      feedbackSuccess.style.display = 'block';
      feedbackForm.reset();
      updateStars(5);
      showToast('🎉 Thank you! Your feedback has been received.');

      setTimeout(() => {
        feedbackSuccess.style.display = 'none';
      }, 5000);
    });
  }

  function prependFeedbackCard(name, rating, message) {
    if (!feedbackWall) return;
    const starStr = '★'.repeat(rating) + '☆'.repeat(5 - rating);
    const card = document.createElement('div');
    card.className = 'wall-card';
    card.innerHTML = `
      <div class="wall-stars">${starStr}</div>
      <p class="wall-text">"${escapeHtml(message)}"</p>
      <div class="wall-user">— ${escapeHtml(name)}</div>
    `;
    feedbackWall.prepend(card);
  }

  function escapeHtml(str) {
    return str.replace(/[&<>'"]/g, tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));
  }

  // 8. TOAST NOTIFICATION HELPER
  const toast = document.getElementById('toast');
  let toastTimer = null;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.style.display = 'block';

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.style.display = 'none';
    }, 4000);
  }

  // 9. APK DOWNLOAD BUTTONS TRIGGER (SEAMLESS DOWNLOAD WITHOUT PAGE REDIRECT)
  const downloadTriggers = document.querySelectorAll('.download-trigger, #mainDownloadBtn');
  downloadTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const downloadUrl = btn.getAttribute('href');
      showToast('📥 Starting Rifflo APK download... Check your browser downloads.');

      // Background download trigger ensures current page stays active with zero redirects or blank tabs
      const hiddenIframe = document.createElement('iframe');
      hiddenIframe.style.display = 'none';
      hiddenIframe.src = downloadUrl;
      document.body.appendChild(hiddenIframe);

      setTimeout(() => {
        hiddenIframe.remove();
      }, 20000);
    });
  });

});
