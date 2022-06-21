//GRABS ELEMENTS FROM DOM
const form = document.querySelector("form")
const gameOfThrones_data = document.querySelector("#GoT_information")
const userInput = document.querySelector("#character_name")
const submitButton = document.getElementById("submit_button")
const dropdown = document.getElementById("dropdown")
const RL_info_container = document.querySelector(".RL_info_container")
const Movie_info_container = document.querySelector(".Movie_info_container")

//API LINKS FROM TMDB
const template_link = "https://api.themoviedb.org/3"
const api_key = "api_key=ec10365ffbcc2266acba94ede8276efe"
const search_person = template_link + "/search/person?" + api_key + "&query="
const person_details = template_link + "/person/"
const person_img_location = "https://image.tmdb.org/t/p/original"

//FUNCTION FOR GoT CHARACTER DATA
function characterData(data) {
  let realName = ""
  let gameOfThrones_culture = ""
  let gameOfThrones_aliase = ""
  let gameOfThrones_title = ""
  const gameOfThrones_character = data[0].name
  const gameOfThrones_DOB = data[0].born

  for (let i = 0; i < data.length; i++) {
    if (data[i]["playedBy"][0].length > 1) {
      realName = data[i]["playedBy"][0]
    }

    if (data[i]["culture"].length > 1) {
      gameOfThrones_culture = data[i]["culture"]
    }

    if (data[i]["aliases"].length > 1) {
      gameOfThrones_aliase = data[i]["aliases"].join(", ")
    }

    if (data[i]["titles"].length > 0) {
      gameOfThrones_title = data[i]["titles"].slice(-1).toString()
    }
  }
  return {
    gameOfThrones_aliase,
    gameOfThrones_title,
    gameOfThrones_DOB,
    gameOfThrones_character,
    realName,
    gameOfThrones_culture,
  }
}

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

// FUNCTION TO GET ALL NAMES
const getallName = () => {
  let allName = []
  for (let i = 1; i <= 43; i++) {
    fetch(
      `https://www.anapioficeandfire.com/api/characters?page=${i}&pageSize=50`
    )
      .then((response) => response.json())
      .then((data) => {
        for (let j = 0; j < data.length; j++) {
          if (data[j]["name"].length > 0 && data[j]["playedBy"][0].length > 1) {
            allName.push(data[j]["name"])
          }
        }
      })
  }
  return allName
}

// FUNCTION FOR DROP DOWN MENU

function dropDownMenu() {
  const allNames = getallName()

  userInput.addEventListener("keyup", (event) => {
    removeAllChildNodes(dropdown)
    const searchName = event.target.value.toUpperCase()

    const filteredChar = allNames.filter((character) => {
      return character.toUpperCase().includes(searchName)
    })

    for (let i = 0; i < filteredChar.length; i++) {
      const option_value = document.createElement("option")
      option_value.innerHTML = filteredChar[i]
      dropdown.appendChild(option_value)
    }
  })
}

dropDownMenu()

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

//FUNCTION TO CREATE INTRODUCTION HTML

function createIntro(obj) {
  const nameEl = document.createElement("p")
  nameEl.className = "character_introduction"
  nameEl.innerHTML = ` 

  <span class='extracted_data_style'>${obj.gameOfThrones_character} </span>   
  was played by <span class='extracted_data_style'> ${obj.realName} </span>. 
  
  <span class='extracted_data_style'>  ${obj.gameOfThrones_character} </span>
  was born <span class='extracted_data_style'> ${obj.gameOfThrones_DOB}</span>. 
  
  From the <span class='extracted_data_style'> ${obj.gameOfThrones_culture}'s </span> culture 
  and  <span class='extracted_data_style'> ${obj.gameOfThrones_title}</span>. 
  

  <span class='extracted_data_style'> ${obj.gameOfThrones_character} </span> 
  is also known as <span class='extracted_data_style'>  ${obj.gameOfThrones_aliase}</span>. 
  
  Let's learn more about <span class='extracted_data_style'>${obj.realName}'s</span> rise to fame!  
  `
  gameOfThrones_data.appendChild(nameEl)
}

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

//GET GAME OF THRONES BOOKS FUNCTION

function getBooks(obj) {
  let allBooks = []
  const author = obj[0].authors[0]

  for (let i = 0; i < obj.length; i++) {
    let books = obj[i].name
    allBooks.push(books)
  }
  return { allBooks, author }
}

function createBooks(obj) {
  const booksEl = document.createElement("p")
  booksEl.className = "character_introduction"
  booksEl.innerHTML = `  

           A Song of Ice and Fire is a series of 10 novels by  
           <span class='extracted_data_style'> ${obj.author} </span>.   

           You can read more about the author, 

           <a href="https://en.wikipedia.org/wiki/George_R._R._Martin">
           <span class='extracted_data_style'> ${obj.author} </span>
           </a> here. <br><br>

           Books

           <span class='GoT_books'> <ol> </span>
              <a href="https://en.wikipedia.org/wiki/A_Game_of_Thrones"><li>${obj.allBooks[0]}</li></a>
              <a href="https://en.wikipedia.org/wiki/A_Clash_of_Kings"><li>${obj.allBooks[1]}</li></a>
              <a href="https://en.wikipedia.org/wiki/A_Storm_of_Swords"><li>${obj.allBooks[2]}</li></a>
              <a href="https://en.wikipedia.org/wiki/Tales_of_Dunk_and_Egg#The_Hedge_Knight"><li>${obj.allBooks[3]}</li></a>
              <a href="https://en.wikipedia.org/wiki/A_Feast_for_Crows"><li>${obj.allBooks[4]}</li></a>
              <a href="https://en.wikipedia.org/wiki/Tales_of_Dunk_and_Egg#The_Sworn_Sword"><li>${obj.allBooks[5]}</li></a>
              <a href="https://en.wikipedia.org/wiki/Tales_of_Dunk_and_Egg#The_Mystery_Knight"><li>${obj.allBooks[6]}</li></a>
              <a href="https://en.wikipedia.org/wiki/A_Dance_with_Dragons"><li>${obj.allBooks[7]}</li></a>
              <a href="https://en.wikipedia.org/wiki/The_Princess_and_the_Queen"><li>${obj.allBooks[8]}</li></a>
              <a href="https://en.wikipedia.org/wiki/The_Rogue_Prince"><li>${obj.allBooks[9]}</li></a>
            </ol>
           `

  gameOfThrones_data.appendChild(booksEl)
}

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

//FUNCTION FOR GETTING PERSONAL DATA FROM TMDB

const getPersonDetailByTMDB = (id) => {
  fetch(`${person_details}${id}?${api_key}&language=en-US`)
    .then((response) => response.json())

    .then((data) => {
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

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

//FUNCTION TO GET IMAGE FROM TMDB

const getImgByTMDB = (id) => {
  fetch(`${person_details}${id}/images?${api_key}`)
    .then((response) => response.json())
    .then((data) => {
      const RL_info_header = document.createElement("h2")
      RL_info_container.appendChild(RL_info_header)
      RL_info_header.textContent = "Real info of the Actor"

      const RL_hr = document.createElement("hr")
      RL_info_container.appendChild(RL_hr)

      const actor_img = document.createElement("IMG")
      actor_img.setAttribute("width", "20%")
      RL_info_container.appendChild(actor_img)
      actor_img.src = `${person_img_location}${data["profiles"][0]["file_path"]}`
    })
    .catch(console.error)
}

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

//FUNCTION TO GET ALL MOVIE DATA
const getMovieInfoByTMDB = (id) => {
  fetch(`${person_details}${id}/movie_credits?${api_key}&language=en-US`)
    .then((response) => response.json())
    .then((data) => {
      const movie_header = document.createElement("h2")
      Movie_info_container.appendChild(movie_header)
      movie_header.textContent = "Movies from the Actor"

      const RL_hr = document.createElement("hr")
      Movie_info_container.appendChild(RL_hr)

      const movie_box_container = document.createElement("div")
      movie_box_container.setAttribute("class", "movie_box_container")
      Movie_info_container.appendChild(movie_box_container)

      data.cast.forEach((ele) => {
        const movie_box = document.createElement("div")
        movie_box.setAttribute("class", "movie_box")
        movie_box_container.appendChild(movie_box)

        const movie_poster = document.createElement("IMG")
        const IMDB_link_direct = document.createElement("p")
        const IMDB_link = document.createElement("a")
        IMDB_link_direct.setAttribute("class", "poster_overlay")
        movie_poster.setAttribute("class", "movie_poster")
        IMDB_link.appendChild(movie_poster)
        IMDB_link.appendChild(IMDB_link_direct)
        movie_box.appendChild(IMDB_link)
        IMDB_link_direct.textContent = `Click to see more on IMDB`
        movie_poster.setAttribute("width", "230px")

        if (ele["poster_path"] != null) {
          movie_poster.src = `${person_img_location}${ele["poster_path"]}`
          movie_poster.alt = `${ele["title"]}`
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

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

// CLEAR THE CONTENT BEFORE SEARCH AGAIN

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

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

form.addEventListener("submit", (event) => {
  event.preventDefault()

  clearPage()

  // GAME OF THRONES API
  fetch(`https://anapioficeandfire.com/api/characters?name=${userInput.value}`)
    .then((response) => response.json())

    .then((GoT) => {
      let data = characterData(GoT)
      createIntro(data)

      fetch(`https://www.anapioficeandfire.com/api/books`)
        .then((response) => response.json())

        .then((book) => {
          let booksData = getBooks(book)
          createBooks(booksData)
        })

      // GET THE ID FROM REAL NAME
      fetch(`${search_person}${data.realName}`)
        .then((response) => response.json())
        .then((data) => {
          actorId = data["results"][0]["id"]

          getImgByTMDB(actorId)
          getMovieInfoByTMDB(actorId)
          getPersonDetailByTMDB(actorId)
        })
    })

    .catch((error) => {
      const userGuess = userInput.value
      const firstLetter = userGuess.substring(0, 1).toUpperCase()

      gameOfThrones_data.innerHTML = `
      
      The character <span class='invalid_entry'> ${userGuess}</span> 
      does not exist in our database 😥. Please try again! <br> <br>  
    
      Search Hints: <br><br> 
      "Daenerys Targaryen" ✅
      "Daenerys" ❌ <br><br>  

      To find a character with the letter 
      <span class='invalid_entry'>${firstLetter}</span> 
      in it, simply type the letter in and use our auto fill menu.
      `
      console.log(error)
    })
})
