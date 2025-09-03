const fs = require('fs');
const path = require('path');

console.log('Renderer script loaded');
 
const editor = document.getElementById('editor');
const dateInput = document.getElementById('date');
const searchDateInput = document.getElementById('search-date');
const boldBtn = document.getElementById('bold-btn');
const italicBtn = document.getElementById('italic-btn');
const headingBtn = document.getElementById('heading-btn');
const saveBtn = document.getElementById('save-btn');
const loadBtn = document.getElementById('load-btn');
 
// Set today's date
const today = new Date().toISOString().split('T')[0];
dateInput.value = today;

// Formatting buttons
boldBtn.addEventListener('click', () => {
  document.execCommand('bold');
});

italicBtn.addEventListener('click', () => {
  document.execCommand('italic');
});

headingBtn.addEventListener('click', () => {
  document.execCommand('formatBlock', false, 'h2');
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey) {
    switch (e.key.toLowerCase()) {
      case 'b':
        e.preventDefault();
        document.execCommand('bold');
        break;
      case 'i':
        e.preventDefault();
        document.execCommand('italic');
        break;
      case 'h':
        e.preventDefault();
        document.execCommand('formatBlock', false, 'h2');
        break;
    }
  }
});

// Save entry
saveBtn.addEventListener('click', () => {
  console.log('Save button clicked');
  const date = dateInput.value;
  const content = editor.innerHTML;
  const filePath = path.join(__dirname, 'entries', `${date}.json`);
  const dirPath = path.join(__dirname, 'entries');

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }

  const data = JSON.stringify({ content });
  fs.writeFileSync(filePath, data);
  alert('Entry saved!');
});

// Load entry
loadBtn.addEventListener('click', () => {
  console.log('Load button clicked');
  const date = searchDateInput.value;
  const filePath = path.join(__dirname, 'entries', `${date}.json`);

  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, 'utf8');
    const entry = JSON.parse(data);
    editor.innerHTML = entry.content;
    dateInput.value = date;
  } else {
    editor.innerHTML = '';
    alert('No entry found for this date.');
  }
});
