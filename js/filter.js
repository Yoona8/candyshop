'use strict';

(function () {
  var goods = [];

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

  var filterInputIdToKind = {
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

  var setQuantities = function () {
    goods.forEach(function (good) {
      var kindKey = kindToGoodsQuantityByKindsKey[good.kind];
      goodsQuantities.noSugar = !good.nutritionFacts.sugar ? goodsQuantities.noSugar + 1 : goodsQuantities.noSugar;
      goodsQuantities.noGluten = !good.nutritionFacts.gluten ? goodsQuantities.noGluten + 1 : goodsQuantities.noGluten;
      goodsQuantities.vegetarian = good.nutritionFacts.vegetarian ? goodsQuantities.vegetarian + 1 : goodsQuantities.vegetarian;
      goodsQuantities.inStore = good.amount > 0 ? goodsQuantities.inStore + 1 : goodsQuantities.inStore;
      goodsQuantities[kindKey]++;
    });
  };

  var renderFilter = function () {
    Object.keys(filterInputIdToGoodQuantityKey).forEach(function (key) {
      document.querySelector('#' + key + ' ~ .input-btn__item-count').textContent = '(' + goodsQuantities[filterInputIdToGoodQuantityKey[key]] + ')';
    });
  };

  var appliedFilters = {};

  var getSortedGoods = function () {
    var sortedGoods = goods.filter(function (good) {
      var filterKind = filterInputIdToKind[good.kind];
      return appliedFilters[filterKind];
    });

    if (appliedFilters['filter-sugar-free']) {
      sortedGoods = sortedGoods.filter(function (good) {
        return !good.nutritionFacts.sugar;
      });
    }

    if (appliedFilters['filter-gluten-free']) {
      sortedGoods = sortedGoods.filter(function (good) {
        return !good.nutritionFacts.gluten;
      });
    }

    if (appliedFilters['filter-vegetarian']) {
      sortedGoods = sortedGoods.filter(function (good) {
        return good.nutritionFacts.vegetarian;
      });
    }

    return sortedGoods;
  };

  window.filter = {
    init: function (listOfGoods) {
      goods = listOfGoods;
      setQuantities();
      renderFilter();
    },

    getGoods: function (filters) {
      appliedFilters = filters;
      return getSortedGoods();
    }
  };
})();
