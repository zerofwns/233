function createTaskManager() {
  let tasks = JSON.parse(localStorage.getItem('todo_tasks')) || [];

  const saveToStorage = () => {
    localStorage.setItem('todo_tasks', JSON.stringify(tasks));
  };

  return {
    addTask(text) {
      const task = {
        id: Date.now(),
        text: text,
        done: false
      };
      tasks.push(task);
      saveToStorage();
    },

    removeTask(id) {
      tasks = tasks.filter(task => task.id !== id);
      saveToStorage();
    },

    toggleTask(id) {
      tasks = tasks.map(task => {
        if (task.id === id) {
          return { ...task, done: !task.done };
        }
        return task;
      });
      saveToStorage();
    },

    getAll() {
      return [...tasks];
    },

    getStats() {
      const total = tasks.length;
      const completed = tasks.filter(task => task.done).length;
      const active = total - completed;
      return { total, active, completed };
    }
  };
}

const app = {
  manager: createTaskManager(),

  init() {
    const addBtn = document.getElementById('addBtn');
    const taskInput = document.getElementById('taskInput');

    addBtn.addEventListener('click', () => {
      this.addTaskHandler();
    });

    taskInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        this.addTaskHandler();
      }
    });

    this.render();
  },

  addTaskHandler() {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();

    if (!text) {
      return;
    }

    this.manager.addTask(text);
    taskInput.value = '';
    this.render();
  },

  render() {
    const tasksList = document.getElementById('tasksList');
    const statsBlock = document.getElementById('stats');

    tasksList.innerHTML = '';

    const tasks = this.manager.getAll();

    tasks.forEach(task => {
      const taskDiv = document.createElement('div');
      taskDiv.className = `task ${task.done ? 'done' : ''}`;

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = task.done;
      checkbox.addEventListener('change', () => {
        this.manager.toggleTask(task.id);
        this.render();
      });

      const taskText = document.createElement('span');
      taskText.className = 'task-text';
      taskText.textContent = task.text;
      taskText.addEventListener('click', () => {
        this.manager.toggleTask(task.id);
        this.render();
      });

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = '×';
      deleteBtn.addEventListener('click', () => {
        this.manager.removeTask(task.id);
        this.render();
      });

      taskDiv.appendChild(checkbox);
      taskDiv.appendChild(taskText);
      taskDiv.appendChild(deleteBtn);

      tasksList.appendChild(taskDiv);
    });

    const stats = this.manager.getStats();
    statsBlock.textContent = `Всего: ${stats.total} | Активных: ${stats.active} | Выполненных: ${stats.completed}`;
  }
};

app.init();
