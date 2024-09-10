// writer.js

// Initialize the page by loading notes from localStorage
document.addEventListener("DOMContentLoaded", () => {
    const notesContainer = document.getElementById('notes-container');
    const addNoteButton = document.getElementById('add-note-btn');
    const lastSavedElement = document.getElementById('last-saved');

    let notes = JSON.parse(localStorage.getItem('notes')) || [];

    // Function to display saved notes
    const displayNotes = () => {
        notesContainer.innerHTML = '';
        notes.forEach((note, index) => {
            addNoteElement(note, index);
        });
    };

    // Add a new note textarea and remove button
    const addNoteElement = (noteContent = '', index = notes.length) => {
        const noteDiv = document.createElement('div');
        noteDiv.classList.add('note-div');

        const textarea = document.createElement('textarea');
        textarea.value = noteContent;
        textarea.addEventListener('input', (e) => {
            notes[index] = e.target.value;
        });

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => {
            notes.splice(index, 1);
            saveNotes();
            displayNotes();
        });

        noteDiv.appendChild(textarea);
        noteDiv.appendChild(removeButton);
        notesContainer.appendChild(noteDiv);
    };

    // Function to save notes in localStorage
    const saveNotes = () => {
        localStorage.setItem('notes', JSON.stringify(notes));
        const now = new Date().toLocaleTimeString();
        lastSavedElement.textContent = `Last Saved: ${now}`;
    };

    // Event listener for adding a new note
    addNoteButton.addEventListener('click', () => {
        notes.push('');
        displayNotes();
    });

    // Auto save notes every 2 seconds
    setInterval(saveNotes, 2000);

    // Load and display saved notes on page load
    displayNotes();
});
