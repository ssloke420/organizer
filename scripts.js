// Load saved data when the page loads
document.addEventListener('DOMContentLoaded', function() {
    loadReminders();
    loadNotes();
    loadLinks();
    loadFiles();
});

// Reminders
function addReminder() {
    const reminderInput = document.getElementById('reminder-input');
    const reminderList = document.getElementById('reminder-list');
    
    if (reminderInput.value.trim() !== "") {
        const listItem = document.createElement('li');
        listItem.textContent = reminderInput.value;
        reminderList.appendChild(listItem);
        saveReminders();
        reminderInput.value = "";
    }
}

function saveReminders() {
    const reminderList = document.getElementById('reminder-list');
    const reminders = [];
    
    reminderList.querySelectorAll('li').forEach(item => {
        reminders.push(item.textContent);
    });

    localStorage.setItem('reminders', JSON.stringify(reminders));
}

function loadReminders() {
    const savedReminders = JSON.parse(localStorage.getItem('reminders'));
    const reminderList = document.getElementById('reminder-list');

    if (savedReminders) {
        savedReminders.forEach(reminder => {
            const listItem = document.createElement('li');
            listItem.textContent = reminder;
            reminderList.appendChild(listItem);
        });
    }
}

// Notes
function saveNote() {
    const notesInput = document.getElementById('notes-input');
    const savedNote = document.getElementById('saved-note');

    if (notesInput.value.trim() !== "") {
        savedNote.textContent = notesInput.value;
        localStorage.setItem('note', notesInput.value);
        notesInput.value = "";
    }
}

function loadNotes() {
    const savedNote = localStorage.getItem('note');
    const noteElement = document.getElementById('saved-note');
    if (savedNote) {
        noteElement.textContent = savedNote;
    }
}

// Links
function addLink() {
    const linkInput = document.getElementById('link-input');
    const linksList = document.getElementById('links-list');

    if (linkInput.value.trim() !== "") {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = linkInput.value;
        link.textContent = linkInput.value;
        link.target = "_blank";
        listItem.appendChild(link);
        linksList.appendChild(listItem);
        saveLinks();
        linkInput.value = "";
    }
}

function saveLinks() {
    const linksList = document.getElementById('links-list');
    const links = [];

    linksList.querySelectorAll('li a').forEach(link => {
        links.push(link.href);
    });

    localStorage.setItem('links', JSON.stringify(links));
}

function loadLinks() {
    const savedLinks = JSON.parse(localStorage.getItem('links'));
    const linksList = document.getElementById('links-list');

    if (savedLinks) {
        savedLinks.forEach(linkURL => {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = linkURL;
            link.textContent = linkURL;
            link.target = "_blank";
            listItem.appendChild(link);
            linksList.appendChild(listItem);
        });
    }
}

// Files
function loadFiles() {
    const filesList = document.getElementById('files-list');
    const savedFiles = JSON.parse(localStorage.getItem('files')) || [];

    savedFiles.forEach(fileName => {
        const listItem = document.createElement('li');
        listItem.textContent = fileName;
        filesList.appendChild(listItem);
    });
}

document.getElementById('file-input').addEventListener('change', function() {
    const filesList = document.getElementById('files-list');
    const file = this.files[0];
    const savedFiles = JSON.parse(localStorage.getItem('files')) || [];

    if (file) {
        const listItem = document.createElement('li');
        listItem.textContent = file.name;
        filesList.appendChild(listItem);

        savedFiles.push(file.name);
        localStorage.setItem('files', JSON.stringify(savedFiles));
    }
});
