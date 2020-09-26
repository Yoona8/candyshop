import {Category} from '../consts';

const filterGoodsByCategory = (categoryName, goods) => {
  return goods.filter((good) => good.type === categoryName);
};

const getCategoryFilters = (goods) => {
  return Object.values(Category).map((category) => {
    return {
      name: category,
      count: filterGoodsByCategory(category, goods).length
    };
  });
};

export {getCategoryFilters};
