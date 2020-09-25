(function () {
  var kindToGoodsQuantityByKindsKey = {
    'Зефир': 'marshmallows',
    'Жевательная резинка': 'gums',
    'Мармелад': 'marmalades',
    'Мороженое': 'iceCreams',
    'Газировка': 'sodas'
  };

  var filterInputIdToGoodQuantityKey = {
    'filter-marshmallows': 'marshmallows',
    'filter-gum': 'gums',
    'filter-marmalade': 'marmalades',
    'filter-icecream': 'iceCreams',
    'filter-soda': 'sodas',
    'filter-sugar-free': 'noSugar',
    'filter-gluten-free': 'noGluten',
    'filter-vegetarian': 'vegetarian',
    'filter-availability': 'inStore',
    'filter-favorite': 'favorite'
  };

  var filterKindToInputId = {
    'Зефир': 'filter-marshmallows',
    'Жевательная резинка': 'filter-gum',
    'Мармелад': 'filter-marmalade',
    'Мороженое': 'filter-icecream',
    'Газировка': 'filter-soda'
  };

  var goodsQuantities = {
    marshmallows: 0,
    gums: 0,
    marmalades: 0,
    iceCreams: 0,
    sodas: 0,
    noGluten: 0,
    noSugar: 0,
    vegetarian: 0,
    inStore: 0,
    favorite: 0
  };

  var setQuantities = function (goods) {
    goods.forEach(function (good) {
      var kindKey = kindToGoodsQuantityByKindsKey[good.kind];
      goodsQuantities.noSugar = !good.nutritionFacts.sugar ? goodsQuantities.noSugar + 1 : goodsQuantities.noSugar;
      goodsQuantities.noGluten = !good.nutritionFacts.gluten ? goodsQuantities.noGluten + 1 : goodsQuantities.noGluten;
      goodsQuantities.vegetarian = good.nutritionFacts.vegetarian ? goodsQuantities.vegetarian + 1 : goodsQuantities.vegetarian;
      goodsQuantities.inStore = good.amount > 0 ? goodsQuantities.inStore + 1 : goodsQuantities.inStore;
      goodsQuantities.favorite = good.favorite ? goodsQuantities.favorite + 1 : goodsQuantities.favorite;
      goodsQuantities[kindKey]++;
    });

    goodsQuantities.price = goods.length;
  };

  var renderFilter = function () {
    Object.keys(filterInputIdToGoodQuantityKey).forEach(function (key) {
      document.querySelector('#' + key + ' ~ .input-btn__item-count').textContent = '(' + goodsQuantities[filterInputIdToGoodQuantityKey[key]] + ')';
    });
  };

  var filterByTypes = function (filters, goods) {
    if (filters.length > 0) {
      return goods.filter(function (good) {
        var filterKind = filterKindToInputId[good.kind];
        var isApplied = filters.indexOf(filterKind) > -1;
        return isApplied;
      });
    }

    return goods;
  };

  var filterByNutritionFacts = function (filters, goods) {
    if (filters.length > 0) {
      return goods.filter(function (good) {
        return filters.indexOf('filter-sugar-free') > -1 ? !good.nutritionFacts.sugar : true;
      }).filter(function (good) {
        return filters.indexOf('filter-gluten-free') > -1 ? !good.nutritionFacts.gluten : true;
      }).filter(function (good) {
        return filters.indexOf('filter-vegetarian') > -1 ? good.nutritionFacts.vegetarian : true;
      });
    }

    return goods;
  };

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
    priceQuantityElement.textContent = '(' + goodsQuantities.price + ')';
  };

  window.filter = {
    init: function (listOfGoods) {
      setQuantities(listOfGoods);
      renderFilter();
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
