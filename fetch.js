// fetch() è un metodo integrato in ogni browser moderno
// ci permetterà di inviare una request ad un server (e ottenere una response)

// fetch() TORNA UNA PROMISE!

// utilizziamo fetch per ottenere informazioni da un server:
// due elementi fondamentali per eseguire una chiamata HTTP:
// 1) URL che volete contattare
// 2) il METODO da utilizzare (GET, POST, PUT, DELETE)

// il metodo di default sarà sempre e comunque GET

// fetch('https://jsonplaceholder.typicode.com/photos')
// questa chiamata già funziona, nel tab "network" del vostro browser potete ottenere
// i dettagli

//...però io voglio utilizzare questi dati nel mio codice!

fetch('https://jsonplaceholder.typicode.com/users')
  .then((response) => {
    // come parametro di then() troveremo l'oggetto response restituito dal server
    console.log(response)
    // l'oggetto response contiene tante cose, lo statusCode, la proprietà
    // ...ma dov'è l'array di utenti? (o, più genericamente, il body della response?)
    // per ottenere il body di questa response devo utilizzare un metodo che si chiama
    // .json()
    // ...purtroppo, .json() torna il corpo della response all'interno di una Promise
    // perchè potenzialmente potrebbe metterci del tempo!
    return response.json()
  })
  .then((data) => {
    // qui la promise di .json() è stata completata!
    // il parametro di questo then è il corpo della response
    console.log(data) // array di 10 utenti!
    // è qui dentro che voi avete a disposizione l'array!
    // ora che abbiamo data possiamo manipolare il dom!
    let usersListReference = document.getElementById('users-list')

    // nasconde il paragrafo 'LOADING...'
    document.getElementById('loading').classList.add('d-none')

    data.forEach((user) => {
      let newLi = document.createElement('li')
      newLi.innerText = user.name + ' | ' + user.email
      newLi.classList.add('text-danger', 'vincenzo')
      usersListReference.appendChild(newLi)
    })
  })
  .catch((err) => {
    console.log(err)
  })

// creiamo una chiamata di tipo POST, per CREARE un nuovo contenuto
fetch('https://jsonplaceholder.typicode.com/comments', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    userId: 'Stefano',
    title: 'Nuovo commento',
    body: 'Questo è un nuovo commento',
  }),
})
  .then((response) => console.log(response))
  .catch((err) => {
    console.log(err)
  })
