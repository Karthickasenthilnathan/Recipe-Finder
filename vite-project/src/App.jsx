import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Fetch categories on load
  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then((res) => res.json())
      .then((data) => setCategories(data.categories));
  }, []);

  // Fetch meals (by search or category)
  useEffect(() => {
    let url = "";
    if (search) {
      url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
    } else if (selectedCategory !== "All") {
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`;
    } else {
      url = `https://www.themealdb.com/api/json/v1/1/search.php?s=chicken`; // default
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => setRecipes(data.meals || []));
  }, [search, selectedCategory]);

  return (
    <div className="App">
      <h1>🍲 Recipe Finder</h1>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search recipe..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Categories */}
      <div className="categories">
        <button
          className={selectedCategory === "All" ? "active" : ""}
          onClick={() => setSelectedCategory("All")}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.idCategory}
            className={selectedCategory === cat.strCategory ? "active" : ""}
            onClick={() => setSelectedCategory(cat.strCategory)}
          >
            {cat.strCategory}
          </button>
        ))}
      </div>

      {/* Recipe Cards */}
      <div className="recipe-list">
        {recipes.length > 0 ? (
          recipes.map((meal) => (
            <div className="card" key={meal.idMeal}>
              <img src={meal.strMealThumb} alt={meal.strMeal} />
              <h3>{meal.strMeal}</h3>
              <a
                href={`https://www.themealdb.com/meal/${meal.idMeal}`}
                target="_blank"
                rel="noreferrer"
              >
                View Recipe
              </a>
            </div>
          ))
        ) : (
          <p>No recipes found 😔</p>
        )}
      </div>
    </div>
  );
}

export default App;
