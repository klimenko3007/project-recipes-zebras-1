
const recipe = document.getElementById('category-wrapper')
//const currentRecipe = document.getElementById('current-recipe-container')
const form = document.getElementById('form')
const recipesContainer = document.getElementById('recipes-container')
const allCheckboxes = document.querySelectorAll('.checkbox')
const ingredientsFilter = document.getElementById('ingredients')

let recipeArrayFiltered;

//Functions that can only be run within fetch
const filterByIngredients = (checkbox) => {   //make sure filters can be applied in any order... but wait... maybe this is a non-problem? because the order shouldn't matter?
    const newArray = recipeArrayFiltered.filter ((element) =>{   
      return element.ingredientLines.length <= Number(checkbox); 
  });
  console.log(newArray)
  updateHTML(newArray)
}
const updateHTML = (array) =>{
  console.log(array);
  recipesContainer.innerHTML = "";
  const lableArray = Array.from(
    array, element => element.label
  );
  console.log(lableArray);
  const pictureArray = Array.from(
    array, element => element.image
  );
  const sourseURLArray = Array.from(
    array, element => element.url
  )
  const sourseArray =Array.from(
    array, element => element.source
  )
  lableArray.forEach((lable, index) => {
  const picture = pictureArray[index];
  const sourceURL = sourseURLArray[index];
  const source = sourseArray[index]
  recipesContainer.innerHTML += `
  <div class="recipe">
  <img class="recipe-img" src="${picture}" alt="">
  <p class="recipe-name">${lable}</p>
  <a class="recipe-link" href="${sourceURL}">${source}</a>
  </div>
  `
})
}

const filterByHealthLable = () =>{
    recipeArrayFiltered = recipeArray.filter((recipe) => {
        return recipe.healthLabels.includes('Alcohol-Free')
      })
}
const start = (userInput) => {
    recipesContainer.innerHTML = "";
    const API = `https://api.edamam.com/search?q=${userInput}&app_key=6aec21ec4b520e9694efcadc0c641e29&app_id=94e5ef74&from=0&to=20`
  fetch(API)
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      const recipeArray = Array.from(
        json.hits, element => element.recipe
      ); 
      recipeArrayFiltered = recipeArray;
      
      const recipeTitleArray = Array.from(
        recipeArrayFiltered, element => element.label
      );
      console.log (recipeTitleArray)
      const recipePictureArray = Array.from(
        recipeArrayFiltered, element => element.image 
      );
      const recipeDietLabelArray = Array.from(
        recipeArrayFiltered, element => element.healthLabels
      )
      const recipeLinkArray =Array.from(
          recipeArrayFiltered, element => element.url
      )
      const recipeSourseArray =Array.from(
        recipeArrayFiltered, element => element.source 
      )

      recipeTitleArray.forEach((lable, index) => {
        const picture = recipePictureArray[index];
        const sourceURL = recipeLinkArray[index];
        const source = recipeSourseArray[index]
        recipesContainer.innerHTML += `
        <div class="recipe">
        <img class="recipe-img" src="${picture}" alt="">
        <p class="recipe-name">${lable}</p>
        <a class="recipe-link" href="${sourceURL}">${source}</a>
        </div>
        `
        // dietLable.forEach(tag =>{
        //   recipesContainer.innerHTML += `
        //   <span class="recipe-health">${tag} </span>
        //   `
        // })
      })
    })

}

//Event Listeners
form.addEventListener('submit', (event) => {
  event.preventDefault()
  const textInput = document.getElementById('text-input').value;
  start(textInput)
})

allCheckboxes.forEach((checkbox)=>{
    checkbox.addEventListener('change', ()=>{
        const checkboxValue = checkbox.value
        console.log(checkboxValue)
        start(checkboxValue)
    })
})
ingredientsFilter.addEventListener('change',() =>{
  const value = ingredientsFilter.value;
  filterByIngredients(value);
})

