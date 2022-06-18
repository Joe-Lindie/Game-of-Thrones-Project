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

        if (GoT[i]["aliases"].length > 1) {
          gameOfThrones_aliase = GoT[i]["aliases"].join(", ")
        }
      }

      const gameOfThrones_character = GoT[0].name
      const gameOfThrones_DOB = GoT[0].born
      const gameOfThrones_title = GoT[0].titles.slice(-1)

      // ACTOR'S/ACTRESS'S REAL NAME
      // CHARACTER'S DATE OF BIRTH
      // CHARACTER'S ALIASES
      // CHARACTER'S TITLE
      // CHARACTER'S CULTURE
      // FIND OUT MORE ABOUT CHARACTER

      const nameEl = document.createElement("p")
      nameEl.className = "character_introduction"
      nameEl.innerHTML = ` 

      <span class='extracted_data_style'>${gameOfThrones_character} </span>   
      was played by <span class='extracted_data_style'> ${realName} </span>. 
      
      <span class='extracted_data_style'>  ${gameOfThrones_character} </span>
      was born <span class='extracted_data_style'> ${gameOfThrones_DOB}</span>. 
      
      From the <span class='extracted_data_style'> ${gameOfThrones_culture}'s </span> culture 
      and  <span class='extracted_data_style'> ${gameOfThrones_title}</span>. 
      
  
      <span class='extracted_data_style'> ${gameOfThrones_character} </span> 
      is also known as <span class='extracted_data_style'>  ${gameOfThrones_aliase}</span>. 
      
      Let's learn more about <span class='extracted_data_style'>${realName}'s</span> rise to fame!  
      
      `
      gameOfThrones_data.appendChild(nameEl)

      fetch(`https://www.anapioficeandfire.com/api/books`)
        .then((response) => response.json())

        .then((book) => {
          console.log(book)
          const author = book[0].authors[0]

          const booksEl = document.createElement("p")
          booksEl.className = "character_introduction"
          booksEl.innerHTML = `  

           You can read more about the author, 

           <a href="https://en.wikipedia.org/wiki/George_R._R._Martin" target="_blank">
           <span class='extracted_data_style'> ${author} </span>
           </a>

           here`

          gameOfThrones_data.appendChild(booksEl)
        })

      // GET THE ID FROM REAL NAME
      fetch(`${search_person}${realName}`)
        .then((response) => response.json())
        .then((data) => {
          actorId = data["results"][0]["id"]

          getImgByTMDB(actorId)
          getMovieInfoByTMDB(actorId)
          getPersonDetailByTMDB(actorId)
        })
    })

    .catch((error) => {
      gameOfThrones_data.innerHTML = `
      
      The character <span class='invalid_entry'> ${userInput.value}</span> 
      does not exist in our database 😥. Please try again! <br> <br>   
      
      Search Hints: <br><br> 
      "Daenerys Targaryen" ✅
      "Daenerys" ❌ <br> 
      
      "Jon Snow" ✅
      "Jon" ❌
      `
      console.log(error)
    })
})

// functions to get info from TMDB and add to the html page

const RL_info_container = document.querySelector(".RL_info_container")
const Movie_info_container = document.querySelector(".Movie_info_container")

const getPersonDetailByTMDB = (id) => {
  fetch(`${person_details}${id}?${api_key}&language=en-US`)
    .then((response) => response.json())
    .then((data) => {
      // const RL_info_header = document.createElement("h2")
      // RL_info_container.appendChild(RL_info_header)
      // RL_info_header.textContent = "Real info of the Actor"

      const RL_container = document.createElement("div")
      RL_container.setAttribute("class", "RL_info")
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
      const RL_info_header = document.createElement("h2")
      RL_info_container.appendChild(RL_info_header)
      RL_info_header.textContent = "Real info of the Actor"

      const actor_img = document.createElement("IMG")
      actor_img.setAttribute("width", "20%")
      RL_info_container.appendChild(actor_img)
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

      const movie_box_container = document.createElement("div")
      movie_box_container.setAttribute("class", "movie_box_container")
      Movie_info_container.appendChild(movie_box_container)

      data.cast.forEach((ele) => {
        const movie_box = document.createElement("div")
        movie_box.setAttribute("class", "movie_box")
        movie_box_container.appendChild(movie_box)

        const movie_poster = document.createElement("IMG")
        const IMDB_link = document.createElement("a")
        movie_poster.setAttribute("class", "movie_poster")
        IMDB_link.appendChild(movie_poster)
        movie_box.appendChild(IMDB_link)
        movie_poster.setAttribute("width", "230px")
        if (ele["poster_path"] != null) {
          movie_poster.src = `${person_img_location}${ele["poster_path"]}`
        } else {
          movie_poster.src = `no_poster.png`
        }

        fetch(
          `https://api.themoviedb.org/3/movie/${ele["id"]}/external_ids?${api_key}`
        )
          .then((response) => response.json())
          .then((data) => {
            if (ele["id"] == data["id"]) {
              IMDB_link.href = `https://www.imdb.com/title/${data.imdb_id}`
            }
          })

        const movie_title = document.createElement("p")
        movie_box.appendChild(movie_title)
        movie_title.textContent = `<<${ele["title"]}>>`

        const movie_releaseDate = document.createElement("p")
        movie_box.appendChild(movie_releaseDate)
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
