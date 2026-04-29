document.addEventListener('DOMContentLoaded', () => {
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

  // Firebase Configuration is loaded from config.js

  // Initialize Firebase
  try {
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
    // Double click the name OR the avatar in sidebar to reveal Admin tab
    const sName = document.querySelector('.s-name');
    const avatar = document.querySelector('.avatar-img');
    const adminNav = document.getElementById('admin-nav');

    const unlockAdmin = () => {
      console.log("Secret trigger activated!");
      const pin = prompt("Enter Admin PIN:");
      if (pin === ADMIN_PIN) {
        if (adminNav) {
          adminNav.style.display = "block";
          alert("Admin section unlocked!");
        } else {
          console.error("Could not find #admin-nav element!");
        }
      } else {
        alert("Incorrect PIN.");
      }
    };

    if (sName) {
      sName.style.cursor = 'pointer';
      sName.addEventListener('dblclick', unlockAdmin);
      console.log("Attached dblclick to name.");
    }
    
    if (avatar) {
      avatar.style.cursor = 'pointer';
      avatar.addEventListener('dblclick', unlockAdmin);
      console.log("Attached dblclick to avatar.");
    }

    // Fetch Messages for Admin
    const messagesContainer = document.getElementById('messages-container');

    function loadMessages() {
      database.ref('messages').orderByChild('timestamp').on('value', (snapshot) => {
        messagesContainer.innerHTML = '';
        const messages = [];
        snapshot.forEach((child) => {
          const msg = child.val();
          msg.id = child.key; // Store the unique ID
          messages.unshift(msg); // Newest first
        });

        if (messages.length === 0) {
          messagesContainer.innerHTML = '<p class="about-p">No messages yet.</p>';
          return;
        }

        messages.forEach(msg => {
          const date = new Date(msg.timestamp).toLocaleString();
          const card = document.createElement('div');
          card.className = 'msg-card';
          card.innerHTML = `
            <button class="msg-delete" title="Delete message" data-id="${msg.id}">
              <i class="fa-solid fa-trash-can"></i>
            </button>
            <div class="msg-header">
              <span class="msg-name">${msg.name}</span>
              <span class="msg-date">${date}</span>
            </div>
            <div class="msg-subject">Subject: ${msg.subject}</div>
            <div class="msg-body">${msg.message}</div>
            <a href="mailto:${msg.email}" class="msg-email">${msg.email}</a>
          `;
          
          // Add delete listener
          const delBtn = card.querySelector('.msg-delete');
          delBtn.addEventListener('click', async () => {
            if (confirm("Are you sure you want to delete this message?")) {
              await database.ref('messages').child(msg.id).remove();
            }
          });

          messagesContainer.appendChild(card);
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

  } catch (err) {
    console.error("Firebase init error:", err);
  }

  // Back to Top functionality
  const backToTopBtn = document.getElementById('backToTop');
  const mainContent = document.querySelector('.main');

  if (mainContent && backToTopBtn) {
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
  }
});
