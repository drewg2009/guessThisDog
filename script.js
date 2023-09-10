
let breedNamesList = []
const hintTypes = ['first3Letters', 'last3Letters']
const hintTypeDataObjects = {
    'first3Letters': {
        message: 'Hint: The first 3 letters are ',
        getHint: function (str) {
            return str.substring(0, 3)
        }
    },
    'last3Letters': {
        message: 'Hint: The last 3 letters are ',
        getHint: function (str) {
            return str.substring(str.length - 3, str.length)
        }
    }
}
let currentHint;
let breedToGuess;
let imageToGuess;
let gameStarted = false
let isGuessing = false
let score;
const duration = 30
let gameOverModal;
let zoomModalElement;
let zoomModal;
let gameInterval;


window.onload = init()

async function init() {
    const breedsResponse = await fetch('https://dog.ceo/api/breeds/list/all')
    breedsJson = await breedsResponse.json()
    breedNamesList = Object.keys(breedsJson.message)
    gameOverModal = new bootstrap.Modal('#gameOverModal', { keyboard: false })
    zoomModalElement = document.getElementById('zoomModal')
    zoomModal = new bootstrap.Modal(zoomModalElement)
}

function getRandomBreedName() {
    var breedName = breedNamesList[Math.floor(Math.random() * breedNamesList.length)];
    return breedName
}

async function imageExists(imageUrl) {
    try {
        const imageUrlResponse = await fetch(imageUrl)
    }
    catch (exception) {
        return false;
    }
    return true
}

async function getRandomImageByBreed(breed) {
    const imagesResponse = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
    const imagesJson = await imagesResponse.json()
    const imagePath = imagesJson.message
    return imagePath
}

async function loadNewDog() {
    currentHint = ''
    breedToGuess = await getRandomBreedName().trim()
    imageToGuess = await getRandomImageByBreed(breedToGuess)
    if (await imageExists(imageToGuess)) {
        document.getElementById('imageToGuess').src = imageToGuess
    }
    else {
        await loadNewDog()
    }
}

function msToSeconds(ms) {
    return ms / 1000
}

function secondsToMs(sec) {
    return sec * 1000
}

function decrementTime() {
    timeLeft -= 1
    document.getElementById('timeLeft').innerText = "Time Left: " + timeLeft
}

async function startGame() {
    gameOverModal.hide()
    score = 0
    timeLeft = duration
    document.getElementById('actionsBeforePlayingRow').style.display = 'none'
    document.getElementById('actionsWhilePlayingRow').style.display = 'flex'
    document.getElementById('score').innerText = "Score: " + score
    document.getElementById('timeLeft').innerText = "Time Left: " + timeLeft
    gameStarted = true
    const startButtons = document.getElementsByClassName("startButton")
    for (let i = 0; i < startButtons.length; i++) {
        startButtons[i].disabled = true
    }
    await loadNewDog()
    document.getElementById("imageToGuess").style.display = 'inline'
    gameInterval = setInterval(function () {
        decrementTime()
        if (timeLeft === 0) {
            endGame()
        }
    }, secondsToMs(1))
}

function endGame() {
    clearInterval(gameInterval)
    document.getElementById("finalScoreMessage").innerText = 'Final score: ' + score
    gameOverModal.show()
    zoomModal.hide()
}

async function pass() {
    await loadNewDog()
    document.getElementById('helperText').innerText = ''
}

function showHint() {
    const randomHintType = hintTypes[Math.floor(Math.random() * hintTypes.length)];
    if (randomHintType === currentHint) {
        showHint()
    }
    else {
        currentHint = randomHintType
        const hintObject = hintTypeDataObjects[randomHintType]
        document.getElementById("helperText").textContent = hintObject.message + `"${hintObject.getHint(breedToGuess)}"`
    }

}

async function guessBreed() {
    const currentBreedGuess = document.getElementById('guessDogBreedInput').value.trim().toLowerCase()
    if (currentBreedGuess === breedToGuess) {
        document.getElementById('helperText').innerText = 'Correct, nice job!'
        setTimeout(function() {
            document.getElementById('helperText').innerText = ''
        }, secondsToMs(1));
        score++
        document.getElementById('score').innerText = "Score: " + score
        await loadNewDog()
    }
    else if (currentBreedGuess.includes(breedToGuess) || breedToGuess.includes(currentBreedGuess)) {
        document.getElementById('helperText').innerText = 'You are warm, keep guessing!'
    }
    else {
        document.getElementById('helperText').innerText = 'Cold, try again!'
    }
}

function zoom() {
    document.getElementById("zoomedImage").src = imageToGuess
    zoomModal.show()
}