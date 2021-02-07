const meal = document.getElementById('input');
const button = document.getElementById('button');
button.addEventListener('click', function () {
    const thumbnail = document.getElementById('thumbnail')
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal.value}`)
        .then(res => res.json())
        .then(data => {
            let html = " ";
            for (let index = 0; index < data.meals.length; index++) {
                const element = data.meals[index].strMealThumb;
                const name = data.meals[index].strMeal;
                const id = data.meals[index].idMeal;
                const div = document.getElementById('div');
                div.className = "image_div";
                html += `
                               <div onclick ="mealDetailCall('${id}')" class="col-md-3">
                                   <div class="card mb-5 " style="width: 15rem;height:350px">
                                      <img src=${element} class="card-img-top" alt="...">
                                        <div class="card-body" style="background-color: white">
                                           <p class="card-text text-center" style="color:red;font-weight:600;">${name}</p>
                                        </div>
                                    </div>
                                </div>`

            }

            div.innerHTML = html;
        })
});
const mealDetailCall = id => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(res => res.json())
        .then(data => mealDetail(data))
}
function mealDetail(data) {
    const detail = document.getElementById('div_detail');
    // console.log(data.meals[0].strMealThumb);
    const ingredient = data.meals[0];
    html_2 = ""
    html_2 +=
        `<div class="card" style="width: 26rem;">
                   <img src="${ingredient.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 style="color:hotpink">${data.meals[0].strMeal}</h5>
                    <h5 style="color:forestgreen">Ingredient</h5>
                        <ol>
                        <li>${ingredient.strIngredient1}</li>
                        <li>${ingredient.strIngredient2}</li>
                        <li>${ingredient.strIngredient3}</li>
                        <li>${ingredient.strIngredient4}</li>
                        <li>${ingredient.strIngredient5}</li>
                        <li>${ingredient.strIngredient6}</li>
                        </ol>
                    
                </div>
        </div>`
    detail.innerHTML = html_2;
}
