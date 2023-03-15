// proviamo a scrivere una funzione che vuole stampare un messaggio in console
// dopo aver contato fino a 3

let countUntilThree = function () {
  setTimeout(() => {
    console.log('conto fino a 3...')
  }, 3000)
}

let start = function () {
  countUntilThree() // ci mette 3 secondi
  console.log('...fatto!') // istantanea
}

// start()

// la mia riga 12 viene eseguita immediatamente, perchè è sincrona, mentre
// la funzione countUntilThree, mettendoci 3 secondi per stampare il messaggio,
// arriva dopo... io vorrei l'inverso!

// SOLUZIONE 1) soluzione con callbacks
// una "callback" è una funzione passata come parametro ad un'altra funzione

let countUntilThreeWithCallback = function (func) {
  setTimeout(() => {
    console.log('conto fino a 3...')
    func()
  }, 3000)
}

let startWithCallback = function () {
  countUntilThreeWithCallback(() => {
    console.log('...fatto!')
  })
}

// startWithCallback()

// SOLUZIONE 2) soluzione con promises

let countUntilThreeWithPromise = function () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('conto fino a 3...')
      if (5 > 10) {
        // simuliamo un errore, impossibile nella situazione attuale
        reject()
      }
      resolve() // risolviamo la promise, luce verde!
    }, 3000)
  })
}

// adesso dobbiamo trovare il modo di lanciare il nostro console.log('fatto'),
// che risiede sempre in un altro blocco, DOPO la conclusione di countUntilThreeWithPromise

let startWithPromise = function () {
  countUntilThreeWithPromise()
    .then(() => {
      // il blocco then verrà eseguito solamente se la Promise
      // viene risolta, nel momento in cui lancia resolve()
      console.log('finito!')
    })
    .catch(() => {
      console.log('ERROREEEEE! :(')
    })
}

startWithPromise()
