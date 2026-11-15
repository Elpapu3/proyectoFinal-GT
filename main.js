const searchInput = document.getElementById('searchInput');
const cards = document.querySelectorAll('.card');
const modal = document.getElementById('characterModal');
const closeModal = document.getElementById('closeModal');
const modalImg = document.getElementById('modalImg');
const modalName = document.getElementById('modalName');
const modalRole = document.getElementById('modalRole');
const modalFruit = document.getElementById('modalFruit');
const modalDream = document.getElementById('modalDream');

searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();

    cards.forEach(card => {
        const name = card.querySelector('h3').textContent.toLowerCase();
        const role = card.querySelector('p').textContent.toLowerCase();

        if (name.includes(query) || role.includes(query)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
});

cards.forEach(card => {
    card.addEventListener('click', () => {
        modalImg.src = card.querySelector('img').src;
        modalName.textContent = card.querySelector('h3').textContent;
        modalRole.textContent = card.querySelector('p').textContent;
        modalFruit.textContent = card.getAttribute('data-fruta');
        modalDream.textContent = card.getAttribute('data-sueno');
        modal.classList.add('active');
    });
});

closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        modal.classList.remove('active');
    }
});