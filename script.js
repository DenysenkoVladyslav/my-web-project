console.log("JS connected!");

const projects = [
  { id: 1, title: "Сайт-візитка", tech: "HTML/CSS" },
  { id: 2, title: "Todo App", tech: "JavaScript" },
  { id: 3, title: "Портфоліо", tech: "HTML/CSS/JS" }
];

let allPosts = [];

const projectsContainer = document.querySelector('#projects-container');
const searchInput = document.querySelector('#search-input');
const postsContainer = document.querySelector('#posts-container');

function createProjectCard(project) {
  return `
    <div class="project-card">
      <h3>${project.title}</h3>
      <p>Технології: ${project.tech}</p>
    </div>
  `;
}

function renderProjects(list) {
  if (!projectsContainer) return;

  const html = list
    .map(project => createProjectCard(project))
    .join('');

  projectsContainer.innerHTML = html;
}

function renderPosts(list) {
  if (!postsContainer) return;

  const html = list
    .map(post => `
      <div class="post">
        <h3>${post.title}</h3>
        <p>${post.body}</p>
      </div>
    `)
    .join('');

  postsContainer.innerHTML = html;
}

async function loadPosts() {
  const loading = document.querySelector('#loading');

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');

    if (!response.ok) {
      throw new Error('Помилка сервера');
    }

    const data = await response.json();
    allPosts = data.slice(0, 10);

    renderPosts(allPosts);

    if (loading) {
      loading.style.display = 'none';
    }

  } catch (error) {
    console.error(error);
    if (loading) {
      loading.textContent = 'Помилка завантаження';
    }
  }
}

renderProjects(projects);
loadPosts();

if (searchInput) {
  searchInput.addEventListener('input', () => {
    const value = searchInput.value.toLowerCase();

    const filteredProjects = projects.filter(project =>
      project.title.toLowerCase().includes(value)
    );
    renderProjects(filteredProjects);

    const filteredPosts = allPosts.filter(post =>
      post.title.toLowerCase().includes(value)
    );
    renderPosts(filteredPosts);
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

let tasks = [];

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const data = localStorage.getItem('tasks');
    if (data) {
        tasks = JSON.parse(data);
    }
}

const input = document.querySelector('#task-input');
const addBtn = document.querySelector('#add-task');
const list = document.querySelector('#task-list');

if (addBtn && input && list) {
    addBtn.addEventListener('click', () => {
        const value = input.value.trim();

        if (value === '') return;

        tasks.push({ text: value });
        saveTasks();
        renderTasks();

        input.value = '';
    });
}

function renderTasks() {
    if (!list) return;
    list.innerHTML = '';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task.text;

        const btn = document.createElement('button');
        btn.textContent = 'X';

        btn.addEventListener('click', () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });

        li.appendChild(btn);
        list.appendChild(li);
    });
}

loadTasks();
renderTasks();