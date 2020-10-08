import {Option} from '../consts';

const filterGoodsAvailable = (goods) => {
  return goods.filter((good) => good.amount > 0);
};

const filterGoodsFavorite = (goods) => {
  return goods.filter((good) => good.isFavorite);
};

const optionToFilterFunction = {
  [Option.FAVORITE]: filterGoodsFavorite,
  [Option.IN_STOCK]: filterGoodsAvailable
};

const getOptionFilters = (goods) => {
  return Object.values(Option).map((option) => {
    return {
      name: option,
      count: optionToFilterFunction[option](goods).length
    };
  });
};

export {
  getOptionFilters
};
