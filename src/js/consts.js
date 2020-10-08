const StorageLoad = {
  EMPTY: 0,
  FEW: 5,
  ENOUGH: 6
};

const Category = {
  ICE_CREAM: 'ice-cream',
  SODA: 'soda',
  GUM: 'gum',
  MARMALADE: 'marmalade',
  MARSHMALLOW: 'marshmallow'
};

const NutritionFact = {
  VEGETARIAN: 'vegetarian',
  SUGAR_FREE: 'sugar-free',
  GLUTEN_FREE: 'gluten-free'
};

const Option = {
  FAVORITE: 'favorites',
  IN_STOCK: 'in-stock'
};

const SortType = {
  POPULAR: 'popular',
  PRICE_HIGH: 'price high',
  PRICE_LOW: 'price low',
  RATING: 'rating'
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR'
};

const UserAction = {
  UPDATE_GOOD: 'UPDATE_GOOD',
  ADD_GOOD_TO_CART: 'ADD_GOOD_TO_CART',
  ADD_FILTER: 'ADD_FILTER',
  REMOVE_FILTER: 'REMOVE_FILTER'
};

export {
  StorageLoad,
  Category,
  NutritionFact,
  Option,
  SortType,
  UpdateType,
  UserAction
};
