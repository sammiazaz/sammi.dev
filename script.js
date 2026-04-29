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
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.c-submit');
  btn.textContent = '✓ Message Sent!';
  setTimeout(() => {
    btn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>';
    e.target.reset();
  }, 3000);
}
