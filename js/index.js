const cards = document.querySelectorAll(".card");

let matchedCard = 0;

let cardA, cardB;

let disableDeck = false;

function flipCard(e)
{
    let clickedCard = e.target;
    clickedCard.classList.add("flip");

    if(clickedCard !== cardA && !disableDeck)
    {
        clickedCard.classList.add("flip");
        if(!cardA)
        {
            return cardA = clickedCard;
        }

        cardB         = clickedCard;
        disableDeck   = true
        let cardAimg  = cardA.querySelector("img").src,
        cardBimg      = cardB.querySelector("img").src;
        matchCards(cardAimg, cardBimg);
    }
}

function matchCards(imgA, imgB)
{
    if(imgA == imgB)
    {
       matchedCard++;

       if(matchedCard == 8)
       {
          setTimeout(()=>
          {
            return shuffleCard();
          }, 1000);
       }

       cardA.removeEventListener("click", flipCard);
       cardB.removeEventListener("click", flipCard);
       cardA = cardB = "";
       return disableDeck   = false;
    }

    setTimeout(() =>
    {
        cardA.classList.add("error");
        cardB.classList.add("error");
    }, 400);

    setTimeout(() =>
    {
        cardA.classList.remove("error", "flip");
        cardB.classList.remove("error", "flip");
        cardA = cardB = "";
        disableDeck   = false;
    }, 1200);
}

function shuffleCard()
{
    matchedCard = 0;
    cardA = cardB = "";
    disableDeck = false;
    let cardArray = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    cardArray.sort(()=> Math.random() > 0.5 ? 1 : -1);

    cards.forEach((card, index) =>
        {
            card.classList.remove("flip");
            let imgTag = card.querySelector("img");
            imgTag.src = `./img/${cardArray[index]}.png`;
            card.addEventListener("click", flipCard);
        });
}

shuffleCard();

cards.forEach(card =>
    {
        card.addEventListener("click", flipCard);
    });