// reader.js

// Initialize the page by retrieving notes from localStorage
document.addEventListener("DOMContentLoaded", () => {
    const notesDisplay = document.getElementById('notes-display');
    const lastRetrievedElement = document.getElementById('last-retrieved');

    // Function to display saved notes
    const displayNotes = () => {
        notesDisplay.innerHTML = ''; // Clear the container

        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.forEach((note) => {
            const noteDiv = document.createElement('div');
            noteDiv.classList.add('note-div');
            
            const noteContent = document.createElement('p');
            noteContent.textContent = note;
            noteDiv.appendChild(noteContent);

            notesDisplay.appendChild(noteDiv);
        });

        const now = new Date().toLocaleTimeString();
        lastRetrievedElement.textContent = `Last Retrieved: ${now}`;
    };

    // Retrieve notes every 2 seconds
    setInterval(displayNotes, 2000);

    // Display notes on page load
    displayNotes();
});
