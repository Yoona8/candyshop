import {Category, NutritionFact} from '../consts';

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

const nutritionFactToFilterFunction = {
  [NutritionFact.GLUTEN_FREE]: filterGoodsGlutenFree,
  [NutritionFact.SUGAR_FREE]: filterGoodsSugarFree,
  [NutritionFact.VEGETARIAN]: filterGoodsVegetarian
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

export {getCategoryFilters, getNutritionFilters};
