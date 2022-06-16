//GRABS ELEMENTS FROM DOM
const form = document.querySelector("form")
const gameOfThrones_data = document.querySelector("#GoT_information")
const userInput = document.querySelector("#character_name")

form.addEventListener("submit", (event) => {
  event.preventDefault()

  // GAME OF THRONES API
  fetch(`https://anapioficeandfire.com/api/characters?name=${userInput.value}`)
    .then((response) => response.json())

    .then((GoT) => {
      console.log(GoT)
      const realName = GoT[0].playedBy[0]
      const gameOfThrones_character = GoT[0].name
      const gameOfThrones_DOB = GoT[0].born
      const gameOfThrones_title = GoT[0].titles.slice(-1)
      const gameOfThrones_culture = GoT[0].culture

      // ACTOR'S / ACTRESS'S REAL NAME
      const newNameEl = document.createElement("p")
      const nodeName = document.createTextNode(
        `${gameOfThrones_character} is played by ${realName}`
      )

      newNameEl.appendChild(nodeName)
      gameOfThrones_data.appendChild(newNameEl)

      // CHARACTER'S DATE OF BIRTH
      const newDOBEl = document.createElement("p")
      const nodeDOB = document.createTextNode(
        `${gameOfThrones_character}'s was born ${gameOfThrones_DOB}`
      )
      newDOBEl.appendChild(nodeDOB)
      gameOfThrones_data.appendChild(newDOBEl)

      // CHARACTER'S TITLE
      const newtitleEl = document.createElement("p")
      const nodeTitle = document.createTextNode(`${gameOfThrones_title}`)
      newtitleEl.appendChild(nodeTitle)
      gameOfThrones_data.appendChild(newtitleEl)

      // CHARACTER'S CULTURE
      const newCultureEl = document.createElement("p")
      const nodeCulture = document.createTextNode(
        `Is from the ${gameOfThrones_culture}'s culture`
      )
      newCultureEl.appendChild(nodeCulture)
      gameOfThrones_data.appendChild(newCultureEl)

      // FIND OUT MORE ABOUT CHARACTER
      const moreInfo = document.createElement("p")
      const nodeInfo = document.createTextNode(
        `Find out more about ${gameOfThrones_character}`
      )
      moreInfo.appendChild(nodeInfo)
      gameOfThrones_data.appendChild(moreInfo)
    })
})
