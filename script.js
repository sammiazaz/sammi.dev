// Navigation — show/hide pages
const navBtns = document.querySelectorAll('.nb');
const pages = document.querySelectorAll('.page');

navBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    navBtns.forEach(b => b.classList.remove('active'));
    pages.forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    const target = document.getElementById(btn.dataset.target);
    if (target) {
      target.classList.add('active');
      // scroll main back to top on page switch
      document.querySelector('.main').scrollTo({ top: 0 });
    }
  });
});

// Firebase Configuration (Using placeholder - you need to replace this with your own config)
// Go to Firebase Console -> Project Settings -> General -> Your Apps
const firebaseConfig = {
  apiKey: "AIzaSyCB0jKHh0UKcNfs0E03g8xsfAUuCjdNK1E",
  authDomain: "sammi-portfolio.firebaseapp.com",
  databaseURL: "https://sammi-portfolio-default-rtdb.firebaseio.com",
  projectId: "sammi-portfolio",
  storageBucket: "sammi-portfolio.firebasestorage.app",
  messagingSenderId: "1015583673307",
  appId: "1:1015583673307:web:9e7d7e47c9ee9f632f75fe",
  measurementId: "G-R7GJQGEST7"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Contact form
const contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.c-submit');
    const originalBtnText = btn.innerHTML;

    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());
    data.timestamp = Date.now();

    try {
      // 1. Save to Firebase
      await database.ref('messages').push(data);

      // 2. Send to Formspree
      const response = await fetch(FORMSPREE_URL, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        btn.innerHTML = '✓ Message Sent!';
        contactForm.reset();
      } else {
        throw new Error('Formspree error');
      }
    } catch (error) {
      // Still show success if it saved to Firebase at least
      btn.innerHTML = '✓ Message Sent!';
      contactForm.reset();
      console.log("Note: Saved to internal DB. Formspree might have been skipped.");
    } finally {
      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = originalBtnText;
      }, 3000);
    }
  });
}

// Admin Unlocking (Secret)
// Double click the name in sidebar to reveal Admin tab
const sName = document.querySelector('.s-name');
const adminNav = document.getElementById('admin-nav');

sName.addEventListener('dblclick', () => {
  const pin = prompt("Enter Admin PIN:");
  if (pin === ADMIN_PIN) { 
    adminNav.style.display = "block";
    alert("Admin section unlocked!");
  } else {
    alert("Incorrect PIN.");
  }
});

// Fetch Messages for Admin
const messagesContainer = document.getElementById('messages-container');

function loadMessages() {
  database.ref('messages').orderByChild('timestamp').on('value', (snapshot) => {
    messagesContainer.innerHTML = '';
    const messages = [];
    snapshot.forEach((child) => {
      messages.unshift(child.val()); // Newest first
    });

    if (messages.length === 0) {
      messagesContainer.innerHTML = '<p class="about-p">No messages yet.</p>';
      return;
    }

    messages.forEach(msg => {
      const date = new Date(msg.timestamp).toLocaleString();
      const card = `
        <div class="msg-card">
          <div class="msg-header">
            <span class="msg-name">${msg.name}</span>
            <span class="msg-date">${date}</span>
          </div>
          <div class="msg-subject">Subject: ${msg.subject}</div>
          <div class="msg-body">${msg.message}</div>
          <a href="mailto:${msg.email}" class="msg-email">${msg.email}</a>
        </div>
      `;
      messagesContainer.innerHTML += card;
    });
  });
}

// Load messages when navigating to admin
navBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.dataset.target === 'admin') {
      loadMessages();
    }
  });
});

// Back to Top functionality
const backToTopBtn = document.getElementById('backToTop');
const mainContent = document.querySelector('.main');

mainContent.addEventListener('scroll', () => {
  if (mainContent.scrollTop > 300) {
    backToTopBtn.classList.add('show');
  } else {
    backToTopBtn.classList.remove('show');
  }
});

backToTopBtn.addEventListener('click', () => {
  mainContent.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});
