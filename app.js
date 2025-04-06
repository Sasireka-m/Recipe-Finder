document.getElementById('search-btn').addEventListener('click', () => {
    const query = document.getElementById('search-input').value.trim();
    const resultsDiv = document.getElementById('results');
  
    if (query == "") {
      alert("Please enter an ingredient!");
      return;
    }
  
    resultsDiv.innerHTML = "<p> 🔄Searching for recipes...</p>";
  
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        resultsDiv.innerHTML = "";
        if (!data.meals) {
          resultsDiv.innerHTML = "<p>❌No recipes found.Try another ingredient.</p>";
          return;
        }
  
        data.meals.forEach(meal => {
          const recipeDiv = document.createElement('div');
          recipeDiv.classList.add('recipe');
          recipeDiv.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
            <h3>${meal.strMeal}</h3>
            <a href="https://www.themealdb.com/meal/${meal.idMeal}" target="_blank">View Recipe</a>
          `;
          resultsDiv.appendChild(recipeDiv);
        });
      })
      .catch(error => {
        console.error('Error fetching recipes', error);
        resultsDiv.innerHTML = "<p> Error fetching data. Try again later</p>";
      });
  });
  