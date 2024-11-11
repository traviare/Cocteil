import {
  catalogJeans,
  catalogDress,
  catalogShirts,
  productFilters,
  rangeInputs,
  rangeValue,
  priceInputs,
  sizeFilterWrap,
  colorFilterWrap,
  priceFilterWrap,
  sizeFilter,
  colorFilter,
  selectedBtnRating,
  selectedBtnPrice,
  selectedBtnDiscount,
  selectedBtnDate,
  btnRange,
  btnSize,
  btnColor,
  pageNavBtnSort,
  pageNavBtnFilter,
  productsSort,
  containerCatalog,
  wordsDictionary,
} from "./vars";

import {
  renderProducts,
  translateWordToRussian,
  addColor,
  getFinalPrice,
} from "./common";

export function loadProductCatalog(products) {
  const filtrJeans = products.filter((product) => product.category == "Джинсы");
  const filtrDress = products.filter(
    (product) => product.category == "Платья и сарафаны"
  );
  const filtrShirts = products.filter(
    (product) => product.category == "Блузки и рубашки"
  );

  filtersRender(catalogJeans, filtrJeans);
  filtersRender(catalogDress, filtrDress);
  filtersRender(catalogShirts, filtrShirts);
  getFiltersValueAndRenderProducts(products);
}

function filtersRender(catalogPage, products) {
  if (catalogPage != null) {
    addSize(products);
    addColorCatalog(products);
  }
}

function addSize(category) {
  const size = category.map((product) => {
    return product.size;
  });
  const arr = [].concat(...size);
  const uniqCategorySize = [...new Set(arr)];
  const sizeUpperCase = uniqCategorySize.map((size) => size.toUpperCase());
  const order = ["XS", "S", "M", "L", "XL"];
  const sortSize = sizeUpperCase.sort(function (a, b) {
    return order.indexOf(a) - order.indexOf(b);
  });
  sortSize.forEach((size) => {
    const sizeBtnHTML = `
    <label>
  <input type="radio" name="size" value="${size}">
  ${size}
</label>`;
    sizeFilterWrap.insertAdjacentHTML("beforeend", sizeBtnHTML);
  });
}

function addColorCatalog(category) {
  const color = category.map((product) => product.color);
  const arr = [].concat(...color);
  const ruWordsColors = [...new Set(arr)];
  addColor(colorFilterWrap, ruWordsColors);
}

function priceRange(onPriceChange) {
  const priceGap = 100;

  priceInputs.forEach((input) => {
    input.addEventListener("input", (e) => {
      let minPrice = parseInt(priceInputs[0].value);
      let maxPrice = parseInt(priceInputs[1].value);

      if (minPrice < 0) {
        priceInputs[0].value = 0;
        minPrice = 0;
      }

      if (maxPrice > 10000) {
        priceInputs[1].value = 10000;
        maxPrice = 10000;
      }

      if (maxPrice - minPrice < priceGap) {
        if (e.target.classList.contains("price-range__min")) {
          priceInputs[0].value = maxPrice - priceGap;
        } else {
          priceInputs[1].value = minPrice + priceGap;
        }
      } else {
        if (e.target.classList.contains("price-range__min")) {
          rangeInputs[0].value = minPrice;
          rangeValue.style.left = `${(minPrice / rangeInputs[0].max) * 100}%`;
        } else {
          rangeInputs[1].value = maxPrice;
          rangeValue.style.right = `${
            100 - (maxPrice / rangeInputs[1].max) * 100
          }%`;
        }
      }
    });
  });

  rangeInputs.forEach((input) => {
    input.addEventListener("input", (e) => {
      const minVal = parseInt(rangeInputs[0].value);
      const maxVal = parseInt(rangeInputs[1].value);

      if (maxVal - minVal < priceGap) {
        if (e.target.classList.contains("range-input__min")) {
          rangeInputs[0].value = maxVal - priceGap;
        } else {
          rangeInputs[1].value = minVal + priceGap;
        }
      } else {
        priceInputs[0].value = minVal;
        priceInputs[1].value = maxVal;

        rangeValue.style.left = `${(minVal / rangeInputs[0].max) * 100}%`;
        rangeValue.style.right = `${
          100 - (maxVal / rangeInputs[1].max) * 100
        }%`;
      }

      onPriceChange(minVal, maxVal);
    });
  });
}

function getFiltersValueAndRenderProducts(productsJSON) {
  let filters = {
    category: null,
    color: null,
    size: null,
    priceRange: [0, 10000],
    criteria: null,
  };

  const pageTitle = document.querySelector(".catalog-page-title");
  filters.category = pageTitle.textContent;

  function loadAndRenderProducts() {
    const arrSorted = filterAndSortProducts(productsJSON, filters);
    renderSortedProducts(arrSorted);
  }
  loadAndRenderProducts();

  productFilters.addEventListener("change", function (event) {
    handleInputChange();
    loadAndRenderProducts();
  });

  function handleInputChange() {
    const selectedInputColor = document.querySelector(
      `input[name="color"]:checked`
    );
    const selectedInputSize = document.querySelector(
      `input[name="size"]:checked`
    );
    if (selectedInputColor) {
      const translated = translateWordToRussian(
        selectedInputColor.value,
        wordsDictionary
      );
      filters.color = translated;
    } else {
      filters.color = null;
    }

    if (selectedInputSize) {
      filters.size = selectedInputSize.value.toLowerCase();
    } else {
      filters.size = null;
    }

    priceRange((min, max) => {
      filters.priceRange[0] = min;
      filters.priceRange[1] = max;
    });
  }

  function addSortButtonListeners() {
    function getCriteria(name) {
      filters.criteria = name;
      loadAndRenderProducts();
    }

    selectedBtnRating.addEventListener("click", () =>
      getCriteria(selectedBtnRating.name)
    );
    selectedBtnPrice.addEventListener("click", () =>
      getCriteria(selectedBtnPrice.name)
    );
    selectedBtnDiscount.addEventListener("click", () =>
      getCriteria(selectedBtnDiscount.name)
    );
    selectedBtnDate.addEventListener("click", () =>
      getCriteria(selectedBtnDate.name)
    );
  }

  addSortButtonListeners();

  return filters;
}

function filterAndSortProducts(products, filters) {
  let filteredProducts = products.filter((product) => {
    let matchCategory = filters.category
      ? product.category === filters.category
      : true;
    let matchColor = filters.color
      ? product.color.includes(filters.color)
      : true;
    let matchSize = filters.size ? product.size.includes(filters.size) : true;
    let matchPrice =
      filters.priceRange && filters.priceRange.length === 2
        ? product.price >= filters.priceRange[0] &&
          product.price <= filters.priceRange[1]
        : true;
    return matchCategory && matchColor && matchSize && matchPrice;
  });

  if (filters.criteria) {
    filteredProducts.sort((a, b) => {
      switch (filters.criteria) {
        case "price":
          return getFinalPrice(a) - getFinalPrice(b);
        case "rating":
          return b.rating - a.rating;
        case "discount":
          return b.discount - a.discount;
        case "date":
          return new Date(b.added) - new Date(a.added);
        default:
          return 0;
      }
    });
  }

  return filteredProducts;
}

function renderSortedProducts(arr) {
  const container = getCatalogProductsContainer();

  if (arr.length === 0) {
    container.innerHTML = "";
    const messageHTML = `
    <p class="not-found-message">Товаров не найдено</p>
    `;
    container.insertAdjacentHTML("beforeend", messageHTML);
    return;
  }

  renderProducts(arr, container);
}

function getCatalogProductsContainer() {
  if (catalogJeans != null) {
    return catalogJeans;
  }

  if (catalogDress != null) {
    return catalogDress;
  }

  if (catalogShirts != null) {
    return catalogShirts;
  }

  return null;
}

function handlBtnPrice() {
  priceFilterWrap.classList.toggle("display");
  btnRange.classList.toggle("icon-rotate");
}
function handlBtnSize() {
  sizeFilter.classList.toggle("display");
  btnSize.classList.toggle("icon-rotate");
}
function handlBtnColor() {
  colorFilter.classList.toggle("display");
  btnColor.classList.toggle("icon-rotate");
}

function handlPageNavBtnSort() {
  productsSort.classList.toggle("display-block");
}
function handlPageNavBtnFilter() {
  productFilters.classList.toggle("display-block");
}

if (containerCatalog) {
  btnRange.addEventListener("click", handlBtnPrice);
  btnSize.addEventListener("click", handlBtnSize);
  btnColor.addEventListener("click", handlBtnColor);
  pageNavBtnSort.addEventListener("click", handlPageNavBtnSort);
  productsSort.addEventListener("click", handlPageNavBtnSort);
  pageNavBtnFilter.addEventListener("click", handlPageNavBtnFilter);
}
