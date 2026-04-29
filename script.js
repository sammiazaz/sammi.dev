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

// Contact form
const contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.c-submit');
    const originalBtnText = btn.innerHTML;

    // Change button state
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

    const formData = new FormData(contactForm);

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        btn.innerHTML = '✓ Message Sent!';
        contactForm.reset();
      } else {
        throw new Error('Oops! There was a problem submitting your form');
      }
    } catch (error) {
      btn.innerHTML = '❌ Failed to Send';
      console.error(error);
    } finally {
      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = originalBtnText;
      }, 3000);
    }
  });
}

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
