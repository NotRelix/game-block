document.addEventListener("DOMContentLoaded", () => {
  const categoryInput = document.querySelector("#category");
  const categoryContainer = document.querySelector(".category-container");
  const categoriesHidden = document.querySelector('#categories-hidden');
  
  let categories = categoriesHidden.value !== '' ? categoriesHidden.value.split(",") : [];
  
  function updateHiddenInput() {
    categoriesHidden.value = categories.join(",");
  }
  
  function renderCategories() {
    categoryContainer.innerHTML = "";
    categories.forEach((category, index) => {
      const div = document.createElement("div");
      div.className = "category-tag";
      div.innerHTML = `<span class="category-icon">${category}</span> <button class="category-remove" type="button" data-index="${index}">-</button>`;
      categoryContainer.appendChild(div);
    });
  }
  
  categoryInput.addEventListener("keydown", (e) => {
    if (
      (e.key === "Enter" || e.key === ",") &&
      categoryInput.value.trim() !== ""
    ) {
      e.preventDefault();
      const value = categoryInput.value.trim();
      if (value && !categories.includes(value)) {
        categories.push(value);
        updateHiddenInput();
        renderCategories();
      }
      categoryInput.value = "";
    }
  });
  
  categoryContainer.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const index = e.target.getAttribute("data-index");
      categories.splice(index, 1);
      updateHiddenInput();
      renderCategories();
    }
  });

  renderCategories();
})

