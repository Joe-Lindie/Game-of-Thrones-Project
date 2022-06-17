//GRABS ELEMENTS FROM DOM
const form = document.querySelector("form")
const gameOfThrones_data = document.querySelector("#GoT_information")
const userInput = document.querySelector("#character_name")
//API LINKS FROM TMDB
const template_link = "https://api.themoviedb.org/3"
const api_key = "api_key=ec10365ffbcc2266acba94ede8276efe"
const search_person = template_link + "/search/person?" + api_key + "&query="
const person_details = template_link + "/person/"
const person_img_location = "https://image.tmdb.org/t/p/original"

form.addEventListener("submit", (event) => {
  event.preventDefault()
  // I made a funtion to clear the page each time before people search
  clearPage()

  // GAME OF THRONES API
  fetch(`https://anapioficeandfire.com/api/characters?name=${userInput.value}`)
    .then((response) => response.json())

    .then((GoT) => {
      // LOOP THROUGH DIFFERENT ARRAYS FOR REAL NAME AND CULTURE
      for (let i = 0; i < GoT.length; i++) {
        if (GoT[i]["playedBy"][0].length > 1) {
          realName = GoT[i]["playedBy"][0]
        }

        if (GoT[i]["culture"].length > 1) {
          gameOfThrones_culture = GoT[i]["culture"]
        }
      }

      const gameOfThrones_character = GoT[0].name
      const gameOfThrones_DOB = GoT[0].born
      const gameOfThrones_title = GoT[0].titles.slice(-1)

      // ACTOR'S / ACTRESS'S REAL NAME
      // CHARACTER'S DATE OF BIRTH
      // CHARACTER'S TITLE
      // CHARACTER'S CULTURE
      // FIND OUT MORE ABOUT CHARACTER

      const nameEl = document.createElement("p")
      nameEl.className = "character_introduction"
      const nameNode = document.createTextNode(
        `${gameOfThrones_character} was played by ${realName}. 
        ${gameOfThrones_character} was born ${gameOfThrones_DOB}. 
        From the ${gameOfThrones_culture}'s culture and ${gameOfThrones_title}. 
        Let's learn more about ${realName} rise to fame!`
      )

      nameEl.appendChild(nameNode)
      gameOfThrones_data.appendChild(nameEl)

      // get the ID from real Name
      fetch(`${search_person}${realName}`)
        .then((response) => response.json())
        .then((data) => {
          actorId = data["results"][0]["id"]

          getPersonDetailByTMDB(actorId)
          getImgByTMDB(actorId)
          getMovieInfoByTMDB(actorId)
        })
    })
})

// functions to get info from TMDB and add to the html page

const RL_info_container = document.querySelector(".RL_info_container")
const Movie_info_container = document.querySelector(".Movie_info_container")

const getPersonDetailByTMDB = (id) => {
  fetch(`${person_details}${id}?${api_key}&language=en-US`)
    .then((response) => response.json())
    .then((data) => {
      const RL_info_header = document.createElement("h2")
      RL_info_container.appendChild(RL_info_header)
      RL_info_header.textContent = "Real info about the Actor"

      const RL_container = document.createElement("div")
      RL_info_container.appendChild(RL_container)

      const RL_name = document.createElement("p")
      RL_container.appendChild(RL_name)
      RL_name.textContent = `Name: ${data["name"]}`

      const RL_DOB = document.createElement("p")
      RL_container.appendChild(RL_DOB)
      RL_DOB.textContent = `DOB: ${data["birthday"]}`

      const RL_gender = document.createElement("p")
      RL_container.appendChild(RL_gender)
      if (data["gender"] == 1) {
        RL_gender.textContent = "Gender: Female"
      } else if (data["gender"] == 2) RL_gender.textContent = "Gender: Male"
    })
    .catch(console.error)
}
const getImgByTMDB = (id) => {
  fetch(`${person_details}${id}/images?${api_key}`)
    .then((response) => response.json())
    .then((data) => {
      const actor_img = document.createElement("IMG")
      actor_img.setAttribute("width", "20%")
      gameOfThrones_data.append(actor_img)
      actor_img.src = `${person_img_location}${data["profiles"][0]["file_path"]}`
    })
    .catch(console.error)
}

const getMovieInfoByTMDB = (id) => {
  fetch(`${person_details}${id}/movie_credits?${api_key}&language=en-US`)
    .then((response) => response.json())
    .then((data) => {
      const movie_header = document.createElement("h2")
      Movie_info_container.appendChild(movie_header)
      movie_header.textContent = "Movies from the Actor"
      data.cast.forEach((ele) => {
        const movie_container = document.createElement("div")
        Movie_info_container.appendChild(movie_container)

        const movie_poster = document.createElement("IMG")
        movie_container.appendChild(movie_poster)
        movie_poster.setAttribute("width", "25%")
        if (ele["poster_path"] != null) {
          movie_poster.src = `${person_img_location}${ele["poster_path"]}`
        }

        const movie_title = document.createElement("p")
        movie_container.appendChild(movie_title)
        movie_title.textContent = `Movie title: ${ele["title"]}`

        const movie_releaseDate = document.createElement("p")
        movie_container.appendChild(movie_releaseDate)
        movie_releaseDate.textContent = `Release Date: ${ele["release_date"]}`
      })
    })
    .catch(console.error)
}

// clear the content before search again

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild)
  }
}

function clearPage() {
  removeAllChildNodes(RL_info_container)
  removeAllChildNodes(Movie_info_container)
  removeAllChildNodes(gameOfThrones_data)
}
