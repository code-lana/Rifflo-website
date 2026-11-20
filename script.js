/**
 * RIFFLO LANDING PAGE INTERACTIVITY
 * 100% Vanilla JavaScript - Fast, lightweight, zero dependencies
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. MOBILE MENU TOGGLE
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    // Close menu when clicking any nav link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // 2. PHONE MOCKUP - CHARACTER SWITCHER & CONVERSATIONS
  const companionData = {
    mom: {
      name: "Mom",
      badge: "Family",
      avatar: "assets/characters/avatar_mom.png",
      moods: ["Tired / Stressed", "Feeling Low", "Happy"],
      chat: [
        { sender: 'ai', text: "Hey sweetheart, did you have dinner? It's getting late... You look a little tired today. Is everything okay? ❤️", time: '11:42 PM' },
        { sender: 'user', text: "Yeah mom, just had an exhausting day at work and my mind feels overwhelmed... Just needed someone to talk to.", time: '11:43 PM' },
        { sender: 'ai', text: "Take a deep breath and drink some water. You worked so hard today, and I'm proud of you. I'm always here to listen. You are never alone.", time: '11:43 PM' }
      ]
    },
    brother: {
      name: "Kabir (Brother)",
      badge: "Brother",
      avatar: "assets/characters/avatar_brother.png",
      moods: ["Need Advice", "Bored", "Hyped"],
      chat: [
        { sender: 'ai', text: "Hey bro! Where have you been hiding? Haven't heard from you all day! Everything good?", time: '10:15 PM' },
        { sender: 'user', text: "Feeling a bit anxious today honestly... career decisions and future plans are getting overwhelming.", time: '10:16 PM' },
        { sender: 'ai', text: "Hey, don't overthink it man! You're working hard and I know you'll crush it. Want to talk through it or play a quick game?", time: '10:17 PM' }
      ]
    },
    bestie: {
      name: "Rohan (Best Friend)",
      badge: "Friends",
      avatar: "assets/characters/avatar_best_friend_male.png",
      moods: ["Vent Out", "Fun", "Late Night"],
      chat: [
        { sender: 'ai', text: "Yo! Still awake? I knew you'd be online at this hour.", time: '12:05 AM' },
        { sender: 'user', text: "Yeah, can't fall asleep... thoughts are running a mile a minute.", time: '12:06 AM' },
        { sender: 'ai', text: "Tell me what's on your mind. Zero judgment here, just let it all out. I'm listening.", time: '12:07 AM' }
      ]
    },
    sister: {
      name: "Ananya (Sister)",
      badge: "Sister",
      avatar: "assets/characters/avatar_sister.png",
      moods: ["Catch Up", "Sad", "Grateful"],
      chat: [
        { sender: 'ai', text: "Hey! How are you doing? You forgot to tell me how your big presentation went today!", time: '09:20 PM' },
        { sender: 'user', text: "It went fine, but I'm just nervous waiting for the outcome.", time: '09:21 PM' },
        { sender: 'ai', text: "You always stress before the good news! You did great, trust me. Get ready to celebrate soon! 🎉", time: '09:22 PM' }
      ]
    }
  };

  const mockAvatar = document.getElementById('mockAvatar');
  const mockName = document.getElementById('mockName');
  const mockChatArea = document.getElementById('mockChatArea');
  const switcherBtns = document.querySelectorAll('.switcher-btn');

  function renderMockChat(charKey) {
    const data = companionData[charKey];
    if (!data) return;

    if (mockAvatar) mockAvatar.src = data.avatar;
    if (mockName) mockName.textContent = data.name;

    if (mockChatArea) {
      let html = `<div class="chat-time">Today, 11:42 PM</div>`;
      data.chat.forEach(msg => {
        html += `
          <div class="chat-msg ${msg.sender}">
            <div class="bubble">${msg.text}</div>
            <span class="msg-stamp">${msg.time}</span>
          </div>
        `;
      });
      mockChatArea.innerHTML = html;
    }
  }

  switcherBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      switcherBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const charKey = btn.dataset.char;
      renderMockChat(charKey);
    });
  });

  // 3. MOOD SELECTOR IN PHONE MOCKUP
  const moodBtns = document.querySelectorAll('.mock-mood');
  moodBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      moodBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const mood = btn.dataset.mood;
      showToast(`Mood set to: ${mood} ❤️`);
    });
  });

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
