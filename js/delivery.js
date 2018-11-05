'use strict';

(function () {
  var deliver = document.querySelector('.deliver');
  var courier = deliver.querySelector('.deliver__courier');
  var courierInputs = courier.querySelectorAll('input');
  var store = deliver.querySelector('.deliver__store');
  var storeInputs = store.querySelectorAll('input');
  var currentDeliveryOption = deliver.querySelector('.toggle-btn__input:checked').id;

  var setDeliveryFields = function (current) {
    window.utility.toggleFields(courierInputs, current === 'deliver__courier');
    window.utility.toggleFields(storeInputs, current !== 'deliver__courier');
  };

  var initDeliveryOptions = function (current) {
    courier.classList.add('visually-hidden');
    store.classList.add('visually-hidden');
    deliver.querySelector('.' + current).classList.remove('visually-hidden');

    setDeliveryFields(current);
  };

  var renderCheckedDeliveryOption = function (option) {
    if (currentDeliveryOption) {
      deliver.querySelector('.' + currentDeliveryOption).classList.add('visually-hidden');
    }

    deliver.querySelector('.' + option).classList.remove('visually-hidden');

    setDeliveryFields(option);

    currentDeliveryOption = option;
  };

  var onDeliverToggleClick = function (e) {
    if (e.target.classList.contains('toggle-btn__input')) {
      renderCheckedDeliveryOption(e.target.id);
    }
  };

  var storeDeliveryMap = store.querySelector('.deliver__store-map-img');

  var onStoreCheckboxClick = function (e) {
    var option = e.target.id;
    var optionPrefix = 'store-';
    var imgPath = 'img/map/';
    var imgExt = '.jpg';

    storeDeliveryMap.src = imgPath + option.replace(optionPrefix, '') + imgExt;
  };

  initDeliveryOptions(currentDeliveryOption);
  deliver.addEventListener('change', onDeliverToggleClick);
  store.addEventListener('change', onStoreCheckboxClick);
})();
