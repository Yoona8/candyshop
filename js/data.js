'use strict';

(function () {
  var NAMES = [
    'Чесночные сливки',
    'Огуречный педант',
    'Молочная хрюша',
    'Грибной шейк',
    'Баклажановое безумие',
    'Паприколу итальяно',
    'Нинзя-удар васаби',
    'Хитрый баклажан',
    'Горчичный вызов',
    'Кедровая липучка',
    'Корманный портвейн',
    'Чилийский задира',
    'Беконовый взрыв',
    'Арахис vs виноград',
    'Сельдерейная душа',
    'Початок в бутылке',
    'Чернющий мистер чеснок',
    'Раша федераша',
    'Кислая мина',
    'Кукурузное утро',
    'Икорный фуршет',
    'Новогоднее настроение',
    'С пивком потянет',
    'Мисс креветка',
    'Бесконечный взрыв',
    'Невинные винные',
    'Бельгийское пенное',
    'Острый язычок'
  ];

  var INGREDIENTS = [
    'молоко',
    'сливки',
    'вода',
    'пищевой краситель',
    'патока',
    'ароматизатор бекона',
    'ароматизатор свинца',
    'ароматизатор дуба, идентичный натуральному',
    'ароматизатор картофеля',
    'лимонная кислота',
    'загуститель',
    'эмульгатор',
    'консервант: сорбат калия',
    'посолочная смесь: соль, нитрит натрия',
    'ксилит',
    'карбамид',
    'вилларибо',
    'виллабаджо'
  ];

  var IMAGES = [
    'gum-cedar.jpg',
    'gum-chile.jpg',
    'gum-eggplant.jpg',
    'gum-mustard.jpg',
    'gum-portwine.jpg',
    'gum-wasabi.jpg',
    'ice-cucumber.jpg',
    'ice-eggplant.jpg',
    'ice-garlic.jpg',
    'ice-italian.jpg',
    'ice-mushroom.jpg',
    'ice-pig.jpg',
    'marmalade-beer.jpg',
    'marmalade-caviar.jpg',
    'marmalade-corn.jpg',
    'marmalade-new-year.jpg',
    'marmalade-sour.jpg',
    'marshmallow-bacon.jpg',
    'marshmallow-beer.jpg',
    'marshmallow-shrimp.jpg',
    'marshmallow-spicy.jpg',
    'marshmallow-wine.jpg',
    'soda-bacon.jpg',
    'soda-celery.jpg',
    'soda-cob.jpg',
    'soda-garlic.jpg',
    'soda-peanut-grapes.jpg',
    'soda-russian.jpg'
  ];

  var NUMBER_OF_GOODS = 26;

  var getContents = function (count) {
    var ingredients = window.utility.getRandomItemsFromArray(INGREDIENTS, count);
    var content = ingredients.join(', ');

    return content.charAt(0).toUpperCase() + content.slice(1);
  };

  window.data = {
    getGoods: function () {
      var goods = [];
      var names = NAMES.slice();
      var images = IMAGES.slice();

      for (var i = 0; i < NUMBER_OF_GOODS; i++) {
        var randomNameIndex = window.utility.getRandomInt(0, names.length - 1);
        var randomName = names[randomNameIndex];
        var randomImageIndex = window.utility.getRandomInt(0, images.length - 1);
        var randomImage = 'img/cards/' + images[randomImageIndex];

        names.splice(randomNameIndex, 1);
        images.splice(randomImageIndex, 1);

        var good = {
          name: randomName,
          image: randomImage,
          amount: window.utility.getRandomInt(0, 20),
          price: window.utility.getRandomInt(100, 1500),
          weight: window.utility.getRandomInt(30, 300),
          rating: {
            value: window.utility.getRandomInt(1, 5),
            number: window.utility.getRandomInt(10, 900)
          },
          nutritionFacts: {
            sugar: !!window.utility.getRandomInt(0, 1),
            energy: window.utility.getRandomInt(70, 500),
            contents: getContents(3)
          }
        };

        goods.push(good);
      }

      return goods;
    }
  };
})();
