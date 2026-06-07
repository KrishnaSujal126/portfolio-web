const body = document.body;
const themeToggle = document.getElementById('theme-toggle');
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
const typingElement = document.getElementById('typing');
const contactForm = document.getElementById('contact-form');

const typedWords = [
  'Full Stack Developer',
  'Web Developer',
  'Problem Solver',
  'Java Enthusiast'
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function updateThemeIcon() {
  const icon = themeToggle.querySelector('i');
  if (body.classList.contains('dark')) {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
  }
}

function loadTheme() {
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme === 'dark') {
    body.classList.add('dark');
  }
  updateThemeIcon();
}

function toggleTheme() {
  body.classList.toggle('dark');
  const theme = body.classList.contains('dark') ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
  updateThemeIcon();
}

function toggleMenu() {
  navLinks.classList.toggle('active');
}

function typeText() {
  const currentWord = typedWords[wordIndex];
  const displayedText = currentWord.substring(0, charIndex);
  typingElement.textContent = displayedText;

  if (!isDeleting) {
    if (charIndex < currentWord.length) {
      charIndex += 1;
    } else {
      isDeleting = true;
      return setTimeout(typeText, 2000);
    }
  } else {
    if (charIndex > 0) {
      charIndex -= 1;
    } else {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % typedWords.length;
    }
  }

  const speed = isDeleting ? 80 : 120;
  setTimeout(typeText, speed);
}

function init() {
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  if (menuBtn) {
    menuBtn.addEventListener('click', toggleMenu);
  }

  if (navLinks) {
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }

  if (typingElement) {
    typeText();
  }

  if (contactForm) {
    contactForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const statusEl = document.getElementById('contact-status');
      const formData = {
        name: contactForm.name.value,
        email: contactForm.email.value,
        subject: contactForm.subject.value,
        message: contactForm.message.value,
      };

      statusEl.textContent = 'Sending message...';
      statusEl.className = 'contact-status';

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        const result = await response.json();
        if (response.ok) {
          statusEl.textContent = result.message;
          statusEl.classList.add('status-success');
          contactForm.reset();
        } else {
          statusEl.textContent = result.message || 'Failed to send message.';
          statusEl.classList.add('status-error');
        }
      } catch (error) {
        statusEl.textContent = 'Network error. Please try again later.';
        statusEl.classList.add('status-error');
      }
    });
  }

  loadTheme();
  loadProjects();
  loadCertificates();
}

async function loadProjects() {
  const projectContainer = document.getElementById('project-container');
  if (!projectContainer) return;

  try {
    const response = await fetch('/api/projects');
    const projects = await response.json();
    projectContainer.innerHTML = projects
      .map(
        (project) => `
          <div class="project-card">
            <img src="${project.image}" alt="${project.title} project screenshot">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-links">
              <a href="${project.demoUrl || '#'}" target="_blank" rel="noopener">Live Demo</a>
              <a href="${project.githubUrl || '#'}" target="_blank" rel="noopener">GitHub</a>
            </div>
          </div>
        `
      )
      .join('');
  } catch (error) {
    projectContainer.innerHTML = '<p class="loading-text">Unable to load projects right now.</p>';
  }
}

async function loadCertificates() {
  const certificateList = document.getElementById('certificate-list');
  if (!certificateList) return;

  try {
    const response = await fetch('/api/certificates');
    const certificates = await response.json();
    certificateList.innerHTML = certificates
      .map((certificate) => `<li>${certificate.title}</li>`)
      .join('');
  } catch (error) {
    certificateList.innerHTML = '<li>Unable to load certificates.</li>';
  }
}

init();

