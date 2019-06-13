history.pushState(null, null, location.href);
window.onpopstate = function () {
    history.go(1);
};

fetch(BASE_PATH + 'api/mark/', {
  method: 'get'
}).then(function (response) {
  return response.json();
}).then(function (json) {
  if (json[0].position !== -1) {
    window.location.href = BASE_PATH + 'speaking/info/';
  }
});
