import React from "react";
import "./CategoryNavigation.css";

export  function CategoryNavigation({ onCategoryClick }) {
  const categories = [
    "Shirts",
    "Pants",
    "Accessories",
    "Mobiles",
    "Mobile Accessories",
  ];

  return (
    <div className="category-navigation">
      <button
        className="category-btn"
        onClick={() => onCategoryClick("")}
      >
        All
      </button>

      {categories.map((category) => (
        <button
          key={category}
          className="category-btn"
          onClick={() => onCategoryClick(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}