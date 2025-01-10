const daysTag = document.querySelector('.days');
const currentDate = document.querySelector('.current-date');
const prevNextIcon = document.querySelectorAll('.icons span');
const notesContainer = document.getElementById('notes-container');

// Initialize date
let date = new Date();
let currYear = date.getFullYear();
let currMonth = date.getMonth();

const months = [
  'January', 'February', 'March', 'April', 'May', 'June', 
  'July', 'August', 'September', 'October', 'November', 'December'
];

const renderCalendar = () => {
  const firstDayofMonth = new Date(currYear, currMonth, 1).getDay();
  const lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
  const lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay();
  const lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
  let liTag = '';

  for (let i = firstDayofMonth; i > 0; i--) {
    liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
  }

  for (let i = 1; i <= lastDateofMonth; i++) {
    liTag += `<li data-date="${i}">${i}</li>`;
  }

  for (let i = lastDayofMonth; i < 6; i++) {
    liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
  }

  currentDate.innerText = `${months[currMonth]} ${currYear}`;
  daysTag.innerHTML = liTag;

  document.querySelectorAll('.days li').forEach((day) => {
    day.addEventListener('click', () => createStickyNote(day.dataset.date));
  });
};

const createStickyNote = (day) => {
  const noteTitle = `${day} ${months[currMonth]} ${currYear} Sticky Note`;

  const note = document.createElement('div');
  note.classList.add('sticky-note');

  note.innerHTML = `
    <h3>${noteTitle}</h3>
    <div class="tasks">
      <ul>
        <li><input type="checkbox" /> Task 1</li>
        <li><input type="checkbox" /> Task 2</li>
        <li><input type="checkbox" /> Task 3</li>
      </ul>
    </div>
    <div class="note-footer">
      <button>&times;</button>
    </div>
  `;

  const closeBtn = note.querySelector('button');
  closeBtn.addEventListener('click', () => {
    notesContainer.removeChild(note);
  });

  const taskCheckboxes = note.querySelectorAll('.tasks input[type="checkbox"]');
  taskCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
      const task = checkbox.parentElement;
      if (checkbox.checked) {
        task.style.textDecoration = 'line-through';
        task.style.color = '#999';
      } else {
        task.style.textDecoration = 'none';
        task.style.color = 'black';
      }
    });
  });

  notesContainer.appendChild(note);
};

prevNextIcon.forEach((icon) => {
  icon.addEventListener('click', () => {
    currMonth = icon.id === 'prev' ? currMonth - 1 : currMonth + 1;

    if (currMonth < 0 || currMonth > 11) {
      date = new Date(currYear, currMonth, new Date().getDate());
      currYear = date.getFullYear();
      currMonth = date.getMonth();
    } else {
      date = new Date();
    }
    renderCalendar();
  });
});

renderCalendar();
