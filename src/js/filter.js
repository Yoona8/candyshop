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

  window.filter = {
    getFilteredGoods: function (filters, goods) {
      var filteredGoods = goods;

      filteredGoods = filterByAvailability(filters.other, filteredGoods);
      filteredGoods = filterByFavorite(filters.other, filteredGoods);
      filteredGoods = filterByPrice(filters.prices, filteredGoods);

      return filteredGoods;
    },

    updateFavoriteQuantity: function (good) {
    },

    updatePriceQuantity: function (number) {
      renderPriceQuantity();
    }
  };
})();
