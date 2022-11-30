var cards = document.querySelectorAll(".card");
var backSides = document.querySelectorAll(".back");
var imagesCounter = 1;
var card = null;
var imageElement = null;
var imageName = null;
var boardInactive = false;
var count = 0;
var players = [
    { "name": "Islam", "score": 0 },
    { "name": "Ahmed", "score": 0 },
    { "name": "Mona", "score": 0 },
    { "name": "Sara", "score": 0 }
]
var catsField1 = ["cats/cat1.jpg", "cats/cat1.jpg", "cats/cat2.jpg", "cats/cat2.jpg", "cats/cat3.jpg", "cats/cat3.jpg", "cats/cat4.jpg", "cats/cat4.jpg", "cats/cat5.jpg", "cats/cat5.jpg", "cats/cat6.jpg", "cats/cat6.jpg"];

function createGame() {
    document.getElementById("mainMenu").style.visibility = "collapse";
    document.getElementById("createGame").style.visibility = "visible";
}

function start() {
    document.getElementById("createGame").style.visibility = "collapse";
    document.getElementById("field1").style.visibility = "visible";
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));

        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

shuffleArray(catsField1);

function flipCard() {
    if (boardInactive == false) {
        this.classList.add("flipped");
    }
}

function unflipCard(firstCard, secondCard) {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
}

cards.forEach(card => card.addEventListener("click", flipCard));

for (var i = 0; i < catsField1.length; i++) {
    var image = document.getElementById("p" + imagesCounter);

    image.src = catsField1[i];
    imagesCounter++;
}

function takeImage(index) {
    if (count == 0) {
        card = document.getElementsByClassName("card").item(index);
        cardOnclick = card.getAttribute("onclick");
        imageElement = document.getElementsByClassName("back").item(index);
        imageName = imageElement.getAttribute("src");
        card.removeAttribute("onclick");
        count++;
    }
    else if (count == 1) {
        var cardMatch = document.getElementsByClassName("card").item(index);
        cardMatchOnclick = cardMatch.getAttribute("onclick");
        var imageElementMatch = document.getElementsByClassName("back").item(index);
        var imageNameMatch = imageElementMatch.getAttribute("src");
        cardMatch.removeAttribute("onclick");
        if (imageName != imageNameMatch) {
            setTimeout(() => {
                unflipCard(card, cardMatch);
                card.setAttribute("onclick", cardOnclick);
                cardMatch.setAttribute("onclick", cardMatchOnclick);
                card = null
                imageElement = null;
                imageName = null;
                count = 0;
            }, 1000);
        }
    }
}