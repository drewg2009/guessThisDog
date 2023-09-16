'use client'

import Image from 'next/image'
import { Navbar } from 'react-bootstrap'
import GameNavbar from './gameNavbar'
import GameModal from './gameModal'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {

// let breedNamesList: Array<string> = []
// const hintTypes = ['first3Letters', 'last3Letters']
// const hintTypeDataObjects = {
//     'first3Letters': {
//         message: 'Hint: The first 3 letters are ',
//         getHint: function (str: string) {
//             return str.substring(0, 3)
//         }
//     },
//     'last3Letters': {
//         message: 'Hint: The last 3 letters are ',
//         getHint: function (str: string) {
//             return str.substring(str.length - 3, str.length)
//         }
//     }
// }
// let currentHint: string;
// let breedToGuess;
// let imageToGuess;
// let gameStarted = false
// let isGuessing = false
// let score;
// const duration = 30
// let gameOverModal;
// let zoomModalElement;
// let zoomModal;
// let gameInterval;


// window.onload = init()

// async function init() {
//     const breedsResponse = await fetch('https://dog.ceo/api/breeds/list/all')
//     breedsJson = await breedsResponse.json()
//     breedNamesList = Object.keys(breedsJson.message)
//     gameOverModal = new bootstrap.Modal('#gameOverModal', { keyboard: false })
//     zoomModalElement = document.getElementById('zoomModal')
//     zoomModal = new bootstrap.Modal(zoomModalElement)
// }

// function getRandomBreedName() {
//     var breedName = breedNamesList[Math.floor(Math.random() * breedNamesList.length)];
//     return breedName
// }

// async function imageExists(imageUrl:string) {
//     try {
//         const imageUrlResponse = await fetch(imageUrl)
//     }
//     catch (exception) {
//         return false;
//     }
//     return true
// }

// async function getRandomImageByBreed(breed) {
//     const imagesResponse = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
//     const imagesJson = await imagesResponse.json()
//     const imagePath = imagesJson.message
//     return imagePath
// }

// async function loadNewDog() {
//     currentHint = ''
//     breedToGuess = await getRandomBreedName().trim()
//     imageToGuess = await getRandomImageByBreed(breedToGuess)
//     if (await imageExists(imageToGuess)) {
//         document.getElementById('imageToGuess').src = imageToGuess
//     }
//     else {
//         await loadNewDog()
//     }
// }

// function msToSeconds(ms) {
//     return ms / 1000
// }

// function secondsToMs(sec) {
//     return sec * 1000
// }

// function decrementTime() {
//     timeLeft -= 1
//     document.getElementById('timeLeft').innerText = "Time Left: " + timeLeft
// }

// async function startGame() {
//     gameOverModal.hide()
//     score = 0
//     timeLeft = duration
//     document.getElementById('actionsBeforePlayingRow').style.display = 'none'
//     document.getElementById('actionsWhilePlayingRow').style.display = 'flex'
//     document.getElementById('score').innerText = "Score: " + score
//     document.getElementById('timeLeft').innerText = "Time Left: " + timeLeft
//     gameStarted = true
//     const startButtons = document.getElementsByClassName("startButton")
//     for (let i = 0; i < startButtons.length; i++) {
//         startButtons[i].disabled = true
//     }
//     await loadNewDog()
//     document.getElementById("imageToGuess").style.display = 'inline'
//     gameInterval = setInterval(function () {
//         decrementTime()
//         if (timeLeft === 0) {
//             endGame()
//         }
//     }, secondsToMs(1))
// }

// function endGame() {
//     clearInterval(gameInterval)
//     document.getElementById("finalScoreMessage").innerText = 'Final score: ' + score
//     gameOverModal.show()
//     zoomModal.hide()
// }

// async function pass() {
//     await loadNewDog()
//     document.getElementById('helperText').innerText = ''
// }

// function showHint() {
//     const randomHintType = hintTypes[Math.floor(Math.random() * hintTypes.length)];
//     if (randomHintType === currentHint) {
//         showHint()
//     }
//     else {
//         currentHint = randomHintType
//         const hintObject = hintTypeDataObjects[randomHintType]
//         document.getElementById("helperText").textContent = hintObject.message + `"${hintObject.getHint(breedToGuess)}"`
//     }

// }

// async function guessBreed() {
//     const currentBreedGuess = document.getElementById('guessDogBreedInput').value.trim().toLowerCase()
//     if (currentBreedGuess === breedToGuess) {
//         document.getElementById('helperText').innerText = 'Correct, nice job!'
//         setTimeout(function() {
//             document.getElementById('helperText').innerText = ''
//         }, secondsToMs(1));
//         score++
//         document.getElementById('score').innerText = "Score: " + score
//         await loadNewDog()
//     }
//     else if (currentBreedGuess.includes(breedToGuess) || breedToGuess.includes(currentBreedGuess)) {
//         document.getElementById('helperText').innerText = 'You are warm, keep guessing!'
//     }
//     else {
//         document.getElementById('helperText').innerText = 'Cold, try again!'
//     }
// }

// function zoom() {
//     document.getElementById("zoomedImage").src = imageToGuess
//     zoomModal.show()
// }

  return (
  <>
        {/* <div id="mainContainer" className="container-fluid mx-auto p-2 text-center"> */}
            <GameNavbar />
            {/* <div className="row">
                <div className="col">
                    <p id="score">Score: 0</p>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <p id="timeLeft">Time Left: 0</p>
                </div>
            </div>
            <img id="imageToGuess" src="" alt="dog image goes here" className="img-fluid" />
            <p id="helperText"></p>
            <div id="inputsContainer" className="container-fluid mx-auto p-2 text-center">
                <div className="row">
                    <div className="col">
                        <label id="guessDogBreedInputLabel" for="guessDogBreedInput">Guess dog breed and click guess
                            button</label>
                        <input placeholder="i.e. corgi, stbernard, hound" name="guessDogBreedInput" id="guessDogBreedInput"
                            className="form-control" />
                    </div>
                </div>
                <div id="actionsBeforePlayingRow" className="row">
                    <div className="col">
                        <button id="startButton1" type="button" className="btn btn-success startButton fs-4"
                            onClick="startGame()">Start</button>
                    </div>
                </div>
                <div id="actionsWhilePlayingRow" className="row gy-2">
                    <div className="col">
                        <button id="guessButton" type="button" className="btn btn-primary fs-4"
                            onClick="guessBreed()">Guess</button>
                    </div>
                    <div className="col">
                        <button id="passButton" type="button" className="btn btn-secondary fs-4" onClick="pass()">Pass</button>
                    </div>
                    <div className="col">
                        <button id="hint" type="button" className="btn btn-info fs-4" onClick="showHint()">Hint</button>
                    </div>
                    <div className="col">
                        <button id="startButton2" type="button" className="btn btn-success startButton fs-4"
                            onClick="startGame()">Start</button>
                    </div>
                    <div className="col">
                        <button id="zoom" type="button" className="btn btn-light fs-4" onClick="zoom()">Zoom</button>
                    </div>
                </div>
            </div> */}
        {/* </div> */}
        <GameModal />

</>
  )
}
