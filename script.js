console.log("JS connected!");

const projects = [
  { id: 1, title: "Сайт-візитка", tech: "HTML/CSS" },
  { id: 2, title: "Todo App", tech: "JavaScript" },
  { id: 3, title: "Портфоліо", tech: "HTML/CSS/JS" }
];

function createProjectCard(project) {
  return `
    <div class="project-card">
      <h3>${project.title}</h3>
      <p>Технології: ${project.tech}</p>
    </div>
  `;
}

const container = document.querySelector('#projects-container');
const searchInput = document.querySelector('#search-input');

function renderProjects(list) {
  if (!container) return;

  const html = list
    .map(project => createProjectCard(project))
    .join('');

  container.innerHTML = html;
}

renderProjects(projects);

if (searchInput) {
  searchInput.addEventListener('input', () => {
    const value = searchInput.value.toLowerCase();

    const filtered = projects.filter(project =>
      project.title.toLowerCase().includes(value)
    );

    renderProjects(filtered);
  });
}

const themeBtn = document.querySelector('#theme-toggle');
const bodyElement = document.body;

if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    bodyElement.classList.toggle('dark-theme');
  });
}

const openBtn = document.querySelector('#open-modal');
const closeBtn = document.querySelector('#close-modal');
const modal = document.querySelector('#modal');

if (openBtn && closeBtn && modal) {
  openBtn.addEventListener('click', () => {
    modal.classList.add('is-open');
  });

  closeBtn.addEventListener('click', () => {
    modal.classList.remove('is-open');
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal) {
    modal.classList.remove('is-open');
  }
});

const form = document.querySelector('#contact-form');
const nameInput = document.querySelector('#user-name');

if (form && nameInput) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (nameInput.value.trim().length < 2) {
      alert("Ім'я має містити щонайменше 2 символи");
    } else {
      alert("Форму відправлено!");
      nameInput.value = '';
      if (modal) modal.classList.remove('is-open');
    }
  });
}

async function loadPosts() {
  const loading = document.querySelector('#loading');
  const postsContainer = document.querySelector('#posts-container');

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');

    if (!response.ok) {
      throw new Error('Server error');
    }

    const data = await response.json();

    const html = data.slice(0, 5)
      .map(post => `
        <div class="post">
          <h3>${post.title}</h3>
          <p>${post.body}</p>
        </div>
      `)
      .join('');

    if (postsContainer) {
      postsContainer.innerHTML = html;
    }

    if (loading) {
      loading.style.display = 'none';
    }

  } catch (error) {
    console.error(error);
    if (loading) {
      loading.textContent = 'Помилка завантаження даних';
    }
  }
}

loadPosts();