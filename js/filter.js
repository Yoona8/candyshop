'use strict';

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

  var setQuantities = function (goods) {
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

  window.filter = {
    init: function (listOfGoods) {
      setQuantities(listOfGoods);
      renderFilter();
    },

    getFilteredGoods: function (filters, goods) {
      var filteredGoods = goods;

      if (filters.foodTypes.length > 0) {
        filteredGoods = goods.filter(function (good) {
          var filterKind = filterInputIdToKind[good.kind];
          var isApplied = filters.foodTypes.indexOf(filterKind) > -1;
          return isApplied;
        });
      }

      if (filters.nutritionFacts.length > 0) {
        filteredGoods = filteredGoods.filter(function (good) {
          return filters.nutritionFacts.indexOf('filter-sugar-free') > -1 ? !good.nutritionFacts.sugar : true;
        }).filter(function (good) {
          return filters.nutritionFacts.indexOf('filter-gluten-free') > -1 ? !good.nutritionFacts.gluten : true;
        }).filter(function (good) {
          return filters.nutritionFacts.indexOf('filter-vegetarian') > -1 ? good.nutritionFacts.vegetarian : true;
        });
      }

      filteredGoods = filteredGoods.filter(function (good) {
        return filters.other.indexOf('filter-availability') > -1 ? good.amount > 0 : true;
      });

      filteredGoods = filteredGoods.filter(function (good) {
        return good.price >= filters.prices.min && good.price <= filters.prices.max;
      });

      return filteredGoods;
    },

    sortByPrice: function (goods) {
      return goods.sort(function (a, b) {
        return a.price - b.price;
      });
    }
  };
})();
