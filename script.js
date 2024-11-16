const notesContainer = document.getElementById('notes');
const noteInput = document.getElementById('note-input');

function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notesContainer.innerHTML = '';
    notes.forEach((note, index) => {
        const noteElement = document.createElement('div');
        noteElement.className = 'note';
        
        const noteText = document.createElement('div');
        noteText.className = 'note-text';
        noteText.textContent = note;
        noteElement.appendChild(noteText);

        const buttonsDiv = document.createElement('div');
        buttonsDiv.className = 'buttons';

        const editBtn = document.createElement('button');
        editBtn.textContent = '編輯';
        editBtn.onclick = () => editNote(index);
        
        const copyBtn = document.createElement('button');
        copyBtn.textContent = '複製';
        copyBtn.onclick = () => copyToClipboard(note);
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '刪除';
        deleteBtn.onclick = () => deleteNote(index);

        buttonsDiv.appendChild(editBtn);
        buttonsDiv.appendChild(copyBtn);
        buttonsDiv.appendChild(deleteBtn);
        noteElement.appendChild(buttonsDiv);

        notesContainer.appendChild(noteElement);
    });
}

function addNote() {
    const note = noteInput.value.trim();
    if (note) {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.push(note);
        localStorage.setItem('notes', JSON.stringify(notes));
        noteInput.value = '';
        loadNotes();
    }
}

function editNote(index) {
    const notes = JSON.parse(localStorage.getItem('notes'));
    const newNote = prompt('編輯筆記', notes[index]);
    if (newNote !== null) {
        notes[index] = newNote;
        localStorage.setItem('notes', JSON.stringify(notes));
        loadNotes();
    }
}

function deleteNote(index) {
    const notes = JSON.parse(localStorage.getItem('notes'));
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    loadNotes();
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('已複製到剪貼簿');
    });
}

loadNotes();
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
        .then(() => console.log('Service Worker Registered'));
}
