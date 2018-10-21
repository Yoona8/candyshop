'use strict';

(function () {
  var Code = {
    SUCCESS: 200,
    NOT_FOUND_ERROR: 404,
    SERVER_ERROR: 500
  };

  var setupXhr = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    var onDataLoaded = function () {
      if (xhr.status === Code.SUCCESS) {
        onSuccess(xhr.response);
      } else {
        onError('Ошибка: ' + xhr.status + ' ' + xhr.statusText);
      }
    };

    xhr.addEventListener('load', onDataLoaded);

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения.');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 30000;

    return xhr;

  };

  window.ajax = {
    load: function (url, onSuccess, onError) {
      var xhr = setupXhr(onSuccess, onError);

      xhr.open('GET', url);
      xhr.send();
    },

    save: function (data, url, onSuccess, onError) {
      var xhr = setupXhr(onSuccess, onError);

      xhr.timeout = 30;

      xhr.open('POST', url);
      xhr.send(data);
    }
  };
})();
