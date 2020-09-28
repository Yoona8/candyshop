import {Category, NutritionFact, Option} from '../consts';

const filterGoodsByCategory = (categoryName, goods) => {
  return goods.filter((good) => good.type === categoryName);
};

const filterGoodsGlutenFree = (goods) => {
  return goods.filter((good) => good.nutritionFacts.isGluten);
};

const filterGoodsSugarFree = (goods) => {
  return goods.filter((good) => good.nutritionFacts.isSugar);
};

const filterGoodsVegetarian = (goods) => {
  return goods.filter((good) => good.nutritionFacts.isVegetarian);
};

const filterGoodsAvailable = (goods) => {
  return goods.filter((good) => good.amount > 0);
};

const filterGoodsFavorite = (goods) => {
  return goods.filter((good) => good.isFavorite);
};

const nutritionFactToFilterFunction = {
  [NutritionFact.GLUTEN_FREE]: filterGoodsGlutenFree,
  [NutritionFact.SUGAR_FREE]: filterGoodsSugarFree,
  [NutritionFact.VEGETARIAN]: filterGoodsVegetarian
};

const optionToFilterFunction = {
  [Option.FAVORITE]: filterGoodsFavorite,
  [Option.IN_STOCK]: filterGoodsAvailable
};

const getCategoryFilters = (goods) => {
  return Object.values(Category).map((category) => {
    return {
      name: category,
      count: filterGoodsByCategory(category, goods).length
    };
  });
};

const getNutritionFilters = (goods) => {
  return Object.values(NutritionFact).map((fact) => {
    return {
      name: fact,
      count: nutritionFactToFilterFunction[fact](goods).length
    };
  });
};

const getOptionFilters = (goods) => {
  return Object.values(Option).map((option) => {
    return {
      name: option,
      count: optionToFilterFunction[option](goods).length
    }
  });
};

export {
  getCategoryFilters,
  getNutritionFilters,
  getOptionFilters
};
