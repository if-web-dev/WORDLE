import { templateGrid } from './templateGrid.js';
import { templateKeyboard } from './templateKeyboard.js';
import { words } from './words.js';
import { initializeDarkMode } from './darkmode.js';
import JSConfetti from 'js-confetti'


let attempts = 0;
let currentLine = 1;
let wordLine = Array(5).fill('.');
const modal = document.getElementById("modal");
let modalIsOpen = false;
const jsConfetti = new JSConfetti()


const generateSecretWord = () => {
  const indexRandom = Math.floor(Math.random() * words.length);
  return words[indexRandom].toUpperCase();
}

let secretWord = generateSecretWord()

console.log({"secretWord": secretWord })

const handleKeyDown = (event) => {
  const keyPressed = event.key;
  if ((/^[a-z]$/.test(keyPressed)) || keyPressed === 'Enter' || keyPressed === 'Backspace' ) {
    return keyPressed;
  }
}

const resetGame = () => {
  wordLine = Array(5).fill('.');
  currentLine = 1;
  attempts = 0;
  secretWord = generateSecretWord()
  console.log({"secretWord": secretWord })
}

function openModal(message, word) {
  modalIsOpen = true;
  modal.classList.remove("hidden");
  modal.querySelector("h2").textContent = message;
  modal.querySelector("p").textContent = `Le mot était : ${word}`;
}

function closeModal() {
  modalIsOpen = false; // Mettre la variable de contrôle à false
  modal.classList.add("hidden");
  resetGame();
  clearDisplay();
}

const clearDisplay = () => {
  document.getElementById("grid").innerHTML = templateGrid;
  document.getElementById("keyboard").innerHTML = templateKeyboard;
}

const succed = () => {
  if (wordLine.join('').toUpperCase() === secretWord ) {
    let result = secretWord
    setTimeout(() => {
      openModal("Vous avez gagné", result)
      jsConfetti.addConfetti()
    }, 1900);
  }
}

const lost = () => {
  if (currentLine === 6 && wordLine.every(letter => letter !== '.') && wordLine.join('').toUpperCase() !== secretWord) {
    let result = secretWord;
    setTimeout(() => {
      openModal("Vous avez perdu", result)
    }, 1900);
  }
}

const fillTheGrid = (keyPressed) => {
    //efface le mot
    if (keyPressed === "Backspace" && wordLine.some(letter => letter !== '.')) {
      console.log("efface", currentLine);
      for (let i = wordLine.length - 1; i >= 0; i--) {
        if (wordLine[i] !== '.') {
          wordLine[i] = '.';
          fillTheLane();
          break;
        }
      }
    }
    //rentre une lettre
    if (/^[a-zA-Z]$/.test(keyPressed)) {
      const emptyIndex = wordLine.indexOf('.');
      if (emptyIndex !== -1) {
        wordLine[emptyIndex] = keyPressed.toUpperCase();
        console.log("Valeurs enregistrées:", wordLine, currentLine, );
      }
      fillTheLane();
    }
    //fin de ligne
    if (wordLine.every(letter => letter !== '.') && keyPressed === "Enter") {
      resultReveal();
      if (currentLine === 6) {
        lost();
      } 
      if (wordLine.join('').toUpperCase() === secretWord) {
        succed();
      } else {
        wordLine = Array(5).fill('.');
        currentLine++
        attempts++
      }
    }
   
}

// Fonction pour mettre à jour l'affichage du mot en cours
const fillTheLane = () => {
  const lines = document.querySelectorAll(`#line-${currentLine} div`);
  for (let i = 0; i < wordLine.length; i++) {
    lines[i].textContent = wordLine[i].toUpperCase();
  }
}

const resultReveal = () => {
  let delay = 0;
  const lines = document.querySelectorAll(`#line-${currentLine} div`);
  for (let i = 0; i < wordLine.length; i++) {

    let delayClass = `delay-[${delay}ms]`; // Mise à jour de delayClass à l'intérieur de la boucle

    lines[i].classList.add("text-gray-800", "transition", delayClass, "duration-150", "ease-in-out",);
    document.getElementById(wordLine[i]).classList.add("transition", "delay-[1600ms]", "ease-in-out", "duration-150");

    if (wordLine[i].toUpperCase() !== secretWord[i]) {
      lines[i].classList.remove("bg-[#e0e0e0]");
      lines[i].classList.add("bg-neutral-500");
      document.getElementById(wordLine[i]).classList.add("transition", "ease-in-out", "duration-150", "bg-neutral-500");
    }
    if (secretWord.includes(wordLine[i].toUpperCase())) {
      lines[i].classList.remove("bg-[#e0e0e0]", "bg-neutral-500", "bg-gray-600");
      lines[i].classList.add("bg-amber-300");
      document.getElementById(wordLine[i]).classList.remove("bg-neutral-500");
      document.getElementById(wordLine[i]).classList.add("bg-amber-300");
    }
    if (wordLine[i].toUpperCase() === secretWord[i]) {
      lines[i].classList.remove("bg-amber-300", "dark:bg-transparent");
      lines[i].classList.add("bg-green-500");
      document.getElementById(wordLine[i]).classList.remove("bg-amber-300");
      document.getElementById(wordLine[i]).classList.add("bg-green-500");
      console.log(lines[i])
    }
    delay += 400;
  }
}

// Fonction pour gérer l'événement de pression d'une touche
document.addEventListener("keydown", (event) => {
  if (!modalIsOpen) {
    let keyPressed = handleKeyDown(event);
    fillTheGrid(keyPressed)
  }
});

// Fonction pour gérer l'événement de clic sur le clavier
document.addEventListener("mousedown", (event) => {
  if (!modalIsOpen) {
    const divClicked = event.target;
    if (divClicked.classList.contains('keyBoard')) {
      divClicked.classList.remove('shadow-[0_3px_0_white]', "delay-[1600ms]");
      divClicked.classList.add('translate-y-1');
      fillTheGrid(divClicked.id)
    }
  }
});

// Fonction pour gérer l'événement sur le déclic
document.addEventListener("mouseup", (event) => {
  if (!modalIsOpen) {
    const divClicked = event.target;
    if (divClicked.classList.contains('keyBoard')) {
      divClicked.classList.add('shadow-[0_3px_0_black]');
      divClicked.classList.remove('translate-y-1', "delay-[1600ms]");
    }
    else if (divClicked.classList.contains('keyBoard') && document.documentElement.classList.contains('dark') ) {
      divClicked.classList.add('shadow-[0_3px_0_white]');
      divClicked.classList.remove('translate-y-1', "delay-[1600ms]");
    }
  }
});

modal.querySelector("button").addEventListener("click", (event) => {
  closeModal();
})

document.addEventListener('DOMContentLoaded', (event) => {
  initializeDarkMode();
});