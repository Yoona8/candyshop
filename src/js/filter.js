(function () {
  var filterByAvailability = function (filters, goods) {
    if (filters.indexOf('filter-availability') > -1) {
      return goods.filter(function (good) {
        return filters.indexOf('filter-availability') > -1 ? good.amount > 0 : true;
      });
    }

    return goods;
  };

  var filterByFavorite = function (filters, goods) {
    if (filters.indexOf('filter-favorite') > -1) {
      return goods.filter(function (good) {
        return good.favorite;
      });
    }

    return goods;
  };

  var filterByPrice = function (filters, goods) {
    return goods.filter(function (good) {
      return good.price >= filters.min && good.price <= filters.max;
    });
  };

  var sortByPopular = function (goods) {
    return goods;
  };

  var sortByPriceAsc = function (goods) {
    return goods.sort(function (a, b) {
      return a.price - b.price;
    });
  };

  var sortByPriceDesc = function (goods) {
    return goods.sort(function (a, b) {
      return b.price - a.price;
    });
  };

  var sortByRating = function (goods) {
    return goods.sort(function (a, b) {
      return b.rating.value - a.rating.value === 0 ? b.rating.number - a.rating.number : b.rating.value - a.rating.value;
    });
  };

  var sortingInputIdToSortingFunctionName = {
    'filter-popular': sortByPopular,
    'filter-expensive': sortByPriceDesc,
    'filter-cheep': sortByPriceAsc,
    'filter-rating': sortByRating
  };

  var sortGoods = function (filters, goods) {
    if (filters.length > 0) {
      sortingInputIdToSortingFunctionName[filters[0]](goods);
    }

    return;
  };

  var priceQuantityElement = document.querySelector('.range__count');

  var renderPriceQuantity = function () {
    // priceQuantityElement.textContent = '(' + goodsQuantities.price + ')';
  };

  window.filter = {
    init: function (listOfGoods) {
      renderPriceQuantity();
    },

    getFilteredGoods: function (filters, goods) {
      var filteredGoods = goods;

      filteredGoods = filterByTypes(filters.foodTypes, filteredGoods);
      filteredGoods = filterByNutritionFacts(filters.nutritionFacts, filteredGoods);
      filteredGoods = filterByAvailability(filters.other, filteredGoods);
      filteredGoods = filterByFavorite(filters.other, filteredGoods);
      filteredGoods = filterByPrice(filters.prices, filteredGoods);

      sortGoods(filters.sorting, filteredGoods);

      return filteredGoods;
    },

    updateFavoriteQuantity: function (good) {
      goodsQuantities.favorite = good.favorite ? goodsQuantities.favorite + 1 : goodsQuantities.favorite - 1;
      renderFilter();
    },

    updatePriceQuantity: function (number) {
      goodsQuantities.price = number;
      renderPriceQuantity();
    }
  };
})();
