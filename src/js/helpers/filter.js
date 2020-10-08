import {Category} from '../consts';

const filterGoodsByCategory = (categoryName, goods) => {
  return goods.filter((good) => good.type === categoryName);
};

export const getFilteredGoods = (goods, filters) => {
  return goods;
};
