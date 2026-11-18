const searchInput = document.getElementById('searchInput');
const cardGrid = document.getElementById('cardGrid');

const openFormBtn = document.getElementById('openFormBtn');
const formModal = document.getElementById('formModal');
const closeFormBtn = document.getElementById('closeFormBtn');
const addForm = document.getElementById('addCharacterForm');

const modal = document.getElementById('characterModal');
const closeModal = document.getElementById('closeModal');
const modalImg = document.getElementById('modalImg');
const modalName = document.getElementById('modalName');
const modalRole = document.getElementById('modalRole');
const modalFruit = document.getElementById('modalFruit');
const modalDream = document.getElementById('modalDream');

const forumForm = document.getElementById('forumForm');
const commentsList = document.getElementById('commentsList');

document.addEventListener('DOMContentLoaded', () => {
    loadSavedCharacters();
    renderComments();
});

searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    const allCards = cardGrid.querySelectorAll('.card');

    allCards.forEach(card => {
        const name = card.querySelector('h3').textContent.toLowerCase();
        const role = card.querySelector('p').textContent.toLowerCase();

        if (name.includes(query) || role.includes(query)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
});

cardGrid.addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    if (!card) return;

    modalImg.src = card.querySelector('img').src;
    modalName.textContent = card.querySelector('h3').textContent;
    modalRole.textContent = card.querySelector('p').textContent;
    modalFruit.textContent = card.getAttribute('data-fruta');
    modalDream.textContent = card.getAttribute('data-sueno');
    modal.classList.add('active');
});

openFormBtn.addEventListener('click', () => {
    formModal.classList.add('active');
});

closeFormBtn.addEventListener('click', () => {
    formModal.classList.remove('active');
});

addForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('newName').value.trim();
    const role = document.getElementById('newRole').value.trim();
    const imgUrl = document.getElementById('newImg').value.trim();
    const fruit = document.getElementById('newFruit').value.trim();
    const dream = document.getElementById('newDream').value.trim();

    const newCharacter = { name, role, imgUrl, fruit, dream };

    const characters = JSON.parse(localStorage.getItem('onePieceCharacters')) || [];
    characters.push(newCharacter);
    localStorage.setItem('onePieceCharacters', JSON.stringify(characters));

    appendCardToDOM(newCharacter);

    addForm.reset();
    formModal.classList.remove('active');
});

function appendCardToDOM(char) {
    const newCard = document.createElement('div');
    newCard.classList.add('card');
    newCard.setAttribute('data-fruta', char.fruit);
    newCard.setAttribute('data-sueno', char.dream);

    newCard.innerHTML = `
        <div class="card-img">
            <img src="${char.imgUrl}" alt="${char.name}" onerror="this.src='https://via.placeholder.com/300x320?text=Sin+Imagen'">
        </div>
        <h3>${char.name}</h3>
        <p>${char.role}</p>
    `;

    cardGrid.appendChild(newCard);
}

function loadSavedCharacters() {
    const characters = JSON.parse(localStorage.getItem('onePieceCharacters')) || [];
    characters.forEach(char => {
        appendCardToDOM(char);
    });
}

forumForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const author = document.getElementById('forumUser').value.trim();
    const text = document.getElementById('forumComment').value.trim();
    const date = new Date().toLocaleDateString('es-AR', { 
        day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' 
    });

    const newComment = { author, text, date };
    const comments = JSON.parse(localStorage.getItem('onePieceComments')) || [];
    
    comments.unshift(newComment);
    localStorage.setItem('onePieceComments', JSON.stringify(comments));

    forumForm.reset();
    renderComments();
});

function renderComments() {
    const comments = JSON.parse(localStorage.getItem('onePieceComments')) || [];
    
    if (comments.length === 0) {
        commentsList.innerHTML = `<p style="text-align: center; color: var(--text-muted);">Sé el primero en dejar tu teoría sobre el One Piece...</p>`;
        return;
    }

    commentsList.innerHTML = '';

    comments.forEach(c => {
        const commentCard = document.createElement('div');
        commentCard.classList.add('comment-card');
        commentCard.innerHTML = `
            <div class="comment-header">
                <span class="comment-author">🏴‍☠️ ${escapeHTML(c.author)}</span>
                <span class="comment-date">${c.date}</span>
            </div>
            <p class="comment-text">${escapeHTML(c.text)}</p>
        `;
        commentsList.appendChild(commentCard);
    });
}

function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}

closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
});

window.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
    if (e.target === formModal) formModal.classList.remove('active');
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        modal.classList.remove('active');
        formModal.classList.remove('active');
    }
});