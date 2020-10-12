const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    hasFlippedCard = false;
    checkForMatch();
}

function checkForMatch() {
    if (firstCard.dataset.card === secondCard.dataset.card) {
        disableCards();
        return;
    }

    unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function shuffle() {
    let usedPositions = new Array(12);
    usedPositions.fill(false);

    cards.forEach((card) => {
        let randomPosition = Math.floor(Math.random() * 12);
        while (usedPositions[randomPosition]) {
            randomPosition = Math.floor(Math.random() * 12);            
        }
        usedPositions[randomPosition] = true;
        card.style.order = randomPosition;
    });
}

function revealCards() {
    lockBoard = true;
    
    cards.forEach((card) => {
        card.classList.add('flip');        
    });

    setTimeout(() => {
        cards.forEach((card) => {
            card.classList.remove('flip');
        });
        lockBoard = false;
    }, 1500);
}

(function begin() {
    shuffle();
    setTimeout(revealCards(), 1500);
})();

cards.forEach((card) => {
    card.addEventListener('click', flipCard);
})