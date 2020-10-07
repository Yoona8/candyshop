const IMAGES = [
  'gum-apple.jpg',
  'gum-chile.jpg',
  'gum-eggplant.jpg',
  'gum-garlic.jpg',
  'ice-corn.jpg',
  'ice-cucumber.jpg',
  'ice-eggplant.jpg',
  'marmalade-caviar.jpg',
  'marmalade-corn.jpg',
  'marshmallow-best.jpg',
  'marshmallow-salt.jpg',
  'soda-carrot.jpg',
  'soda-celery.jpg'
];
const NAMES = [
  'Miss shrimp',
  'Black garlic',
  'Pine slime',
  'Corn morning',
  'Pocket treat',
  'Eggplant ice',
  'Berry breeze',
  'Cucumber ice',
  'Wasabi kick',
  'Mushroom soda',
  'Mustard heaven',
  'Peanut cream'
];
const TYPES = [
  'marshmallow',
  'gum',
  'ice-cream',
  'soda',
  'marmalade'
];
const INGREDIENTS = [
  'cream',
  'food coloring',
  'garlic',
  'salt',
  'lemon',
  'shrimp',
  'sugar'
];

const getRandomInt = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
};

const getRandomItemsFromArray = (arr) => {
  const resultArray = [];

  for (let i = 0; i < 10; i++) {
    resultArray.push(arr[getRandomInt(0, arr.length - 1)]);
  }

  return resultArray;
};

const getGood = () => {
  return {
    id: Date.now() + Math.random(),
    name: NAMES[getRandomInt(0, NAMES.length - 1)],
    type: TYPES[getRandomInt(0, TYPES.length - 1)],
    image: IMAGES[getRandomInt(0, IMAGES.length - 1)],
    price: getRandomInt(1, 30),
    weight: getRandomInt(10, 100),
    amount: getRandomInt(0, 50),
    isFavorite: !getRandomInt(0, 1),
    rating: {
      value: getRandomInt(0, 5),
      number: getRandomInt(0, 1000)
    },
    nutritionFacts: {
      isSugar: !getRandomInt(0, 1),
      isGluten: !getRandomInt(0, 1),
      isVegetarian: !getRandomInt(0, 1),
      energy: getRandomInt(100, 1000),
      contents: new Set(getRandomItemsFromArray(INGREDIENTS))
    }
  };
};

export const getGoods = (count) => {
  return new Array(count).fill('').map(getGood);
};
