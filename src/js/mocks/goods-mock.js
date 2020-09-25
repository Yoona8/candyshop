const getGood = () => {
  return {
    name: 'Name',
    type: 'marshmallow',
    rating: {
      value: 2,
      number: 565
    },
    nutritionFacts: {
      sugar: false
    }
  };
};

export const getGoods = (count) => {
  return new Array(count).fill('').map(getGood);
};
