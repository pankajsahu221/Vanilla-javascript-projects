const searchForm = document.querySelector("form");
const searchResult = document.querySelector(".search-result");
const searchBtn = document.querySelector(".search-btn");
const app = document.querySelector(".app");
let searchQuery = '';
const apiID = '9139cdbf' ; 
const api = '2d872fd3a40edd4fdefce65f053fe5c2' ;


searchForm.addEventListener("submit",function(e){
    e.preventDefault();
    
    // loading icon
    searchBtn.innerHTML = `<i class="fas fa-circle-notch fa-spin"></i>` ; 

    let input = e.target.querySelector('input').value ; 
    console.log(input);
    // e.target.querySelector('input').value = '' ;


     const baseUrl = `https://api.edamam.com/search?q=${input}&app_id=${apiID}&app_key=${api}&to=24`;

     fetch(baseUrl)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            generateResult(data.hits)
            console.log(data.hits);
        })     
})

function generateResult(results){
    let items = '' ;
    items = results.map((item)=>{
        return `
         <div class="item">
            <img src="${item.recipe.image}" class="item-img">
            <div class="item-detail">
                <div class="item-name-viewrecipe">
                    <h2 class="item-name">${item.recipe.label}</h2>
                    <a class="view-rec-btn" href="${item.recipe.url}" target="_blank">View recipe</a>
                </div>
                <p class="item-data">Calorie : ${Math.floor(item.recipe.calories)} </p>
                <p class="item-data">Health label : ${item.recipe.healthLabels} </p>
            </div>
          </div>`;
    }).join("");

    if(items === '') searchResult.innerHTML = `<h2 class="error-msg">Please check the Dish's name</h2>` ;
    else searchResult.innerHTML = items ; 

    // search icon
    searchBtn.innerHTML = `<i class="fa fa-search"></i>` ; 
}
