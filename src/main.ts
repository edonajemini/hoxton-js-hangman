import './style.css'
type State = {
  word: string
  characters: string[]
  maxmistakes: number
  streak: number
}

const WORDS = [
  'edona',
  'pranvera',
  'edi',
  'musli',
  'jemini'
]

function getarandomWord () {
  let randomletter = Math.floor(Math.random() * WORDS.length)
  return WORDS[randomletter]
}

let state: State = {
  word: getarandomWord(),
  characters: [],
  maxmistakes: 5,
  streak: 0
}

function restart () {
  state.word = getarandomWord()
  state.characters = []
  render()
}
function getthewrongasnwers () {
  return state.characters.filter(char => !state.word.includes(char))
}

function getthewrongasnwersCount () {
  let mistakes = getthewrongasnwers()
  return mistakes.length
}

function getthecorrectanswers () {
  return state.characters.filter(char => state.word.includes(char))
}

function ifWon () {
  for (let char of state.word) {
    if (!state.characters.includes(char)) return false
  }
  return true
}

function ifLost () {
  return getthewrongasnwersCount() >= state.maxmistakes
}

function renderWord () {
  let wordEl = document.createElement('div')
  wordEl.className = 'word'

  let correctGuesses = getthecorrectanswers()

  for (let char of state.word) {
    let charEl = document.createElement('span')
    charEl.className = 'char'

    if (correctGuesses.includes(char)) {
      charEl.textContent = char
    } else {
      charEl.textContent = '_'
    }

    wordEl.append(charEl)
  }
  return wordEl
}

function renderthewrongasnwers() {
  let mistakesSpan = document.createElement('div')
  mistakesSpan.className = 'mistakes'
  mistakesSpan.textContent = `Mistakes: ${getthewrongasnwers()} (${getthewrongasnwersCount()})`
  return mistakesSpan
}

function renderWinningMessage () {
  let winMessageDiv = document.createElement('div')
  let winMessageP = document.createElement('p')
  winMessageP.textContent = 'You win, congrats!'
  let restartButton = document.createElement('button')
  restartButton.textContent = 'RESTART'
  restartButton.className = 'restart-button'
  restartButton.addEventListener('click', function () {
    state.streak++
    restart()
  })

  winMessageDiv.append(winMessageP, restartButton)

  return winMessageDiv
}

function renderLosingMessage () {
  let lostMessageDiv = document.createElement('div')

  let lostMessageP = document.createElement('p')
  lostMessageP.textContent = `You lost! The word was: ${state.word}`

  let restartButton = document.createElement('button')
  restartButton.textContent = 'RESTART'
  restartButton.className = 'restart-button'
  restartButton.addEventListener('click', function () {
    state.streak = 0
    restart()
  })

  lostMessageDiv.append(lostMessageP, restartButton)

  return lostMessageDiv
}

function renderStreak () {
  let streakDiv = document.createElement('div')
  streakDiv.className = 'streak'
  streakDiv.textContent = `Streak: ${state.streak}`
  return streakDiv
}

function render () {
  let appEl = document.querySelector('#app')
  if (appEl === null) return
  appEl.textContent = ''

  let wordEl = renderWord()
  let mistakesSpan = renderthewrongasnwers()
  let streakEl = renderStreak()

  appEl.append(wordEl, mistakesSpan, streakEl)

  if (ifWon()) {
    let winningMessageDiv = renderWinningMessage()
    appEl.append(winningMessageDiv)
  }

  if (ifLost()) {
    let losingMessageDiv = renderLosingMessage()
    appEl.append(losingMessageDiv)
  }
}

function listenToUserKeypresses () {
  document.addEventListener('keyup', function (event) {
    let guess = event.key.toLowerCase()

    let letters = 'abcdefghijklmnopqrstuvwxyz'

    if (!letters.includes(guess)) return
    if (state.characters.includes(guess)) return
    if (ifLost()) return
    if (ifWon()) return
    state.characters.push(guess)
    render()
  })
}

listenToUserKeypresses()
render()

