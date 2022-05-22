const cards = document.querySelectorAll(".card");

let matchedCard = 0;

let cardA, cardB;

let disableDeck = false;

function flipCard({target: clickedCard}) {
    if(cardA !== clickedCard && !disableDeck) {
        clickedCard.classList.add("flip");
        if(!cardA) {
            return cardA = clickedCard;
        }
        cardB = clickedCard;
        disableDeck = true;
        let imgA = cardA.querySelector(".back-view img").src,
        imgB = cardB.querySelector(".back-view img").src;
        matchCards(imgA, imgB);
    }
}

function matchCards(imgA, imgB) {
    if(imgA === imgB) {
        matched++;
        if(matched == 8) {
            setTimeout(() => {
                return shuffleCard();
            }, 1000);
        }
        cardA.removeEventListener("click", flipCard);
        cardB.removeEventListener("click", flipCard);
        cardA = cardB = "";
        return disableDeck = false;
    }
    setTimeout(() => {
        cardA.classList.add("error");
        cardB.classList.add("shake");
    }, 400);

    setTimeout(() => {
        cardA.classList.remove("error", "flip");
        cardB.classList.remove("error", "flip");
        cardA = cardB = "";
        disableDeck = false;
    }, 1200);
}

function shuffleCard() {
    matched = 0;
    disableDeck = false;
    cardA = cardB = "";
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);
    cards.forEach((card, i) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector(".back-view img");
        imgTag.src = `img/${arr[i]}.png`;
        card.addEventListener("click", flipCard);
    });
}

shuffleCard();
    
cards.forEach(card => {
    card.addEventListener("click", flipCard);
});
