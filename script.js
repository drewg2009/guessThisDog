
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
let myModal;

window.onload = init()

async function init() {
    const breedsResponse = await fetch('https://dog.ceo/api/breeds/list/all')
    breedsJson = await breedsResponse.json()
    breedNamesList = Object.keys(breedsJson.message)
    myModal = new bootstrap.Modal('#myModal', { keyboard: false })
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
    document.getElementById('helperText').innerText = ''
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
    myModal.hide()
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
    const interval = setInterval(function () {
        decrementTime()
        if (timeLeft === 0) {
            clearInterval(interval)
            document.getElementById("finalScoreMessage").innerText = 'Final score: ' + score
            myModal.show()
        }
    }, secondsToMs(1))
}

async function pass() {
    await loadNewDog()
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
        document.getElementById('helperText').innerText = ''
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