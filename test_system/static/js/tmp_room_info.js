history.pushState(null, null, location.href);
window.onpopstate = function () {
    history.go(1);
};

let minutes = 0;
let hours = 0;
let seconds = 0;

function RoomList() {
  window.location.href = BASE_PATH + 'speaking/choose/';
}

function GetRoom(room_pk) {
  fetch(BASE_PATH + 'api/room/' + room_pk + '/', {
    method: 'get'
  }).then(function (response) {
    return response.json();
  }).then(function (json) {
    let card_header = document.getElementById('info_header');
    card_header.innerHTML = 'Your current room number is <b>' + json.number + '</b>';
    let info_time = document.getElementById('info_time');
    info_time.innerHTML = 'Average waiting time:';
    let info_wait = document.getElementById('info_wait');
    waiting_time = (json.amount_stud * parseFloat(json.avg_time)) / json.amount_teach;
    minutes = waiting_time % 60;
    hours = waiting_time - minutes;
    hours = hours / 60;
    seconds = minutes;
    minutes = Math.floor(minutes);
    seconds = seconds - minutes;
    seconds = seconds * 60;
    minutes = minutes.toFixed();
    seconds = seconds.toFixed();
    hours = hours.toFixed();
    info_wait.innerHTML = '<b>' + hours + ':' + minutes + ':' + seconds + '</b>';
  })
}

function init() {
  fillCard();
  var x = setInterval(function() {
    fillCard();
  }, 60000);
}

function fillCard() {
  fetch(BASE_PATH + 'api/mark/', {
    method: 'get'
  }).then(function (response) {
    return response.json();
  }).then(function (json) {
    if (json[0].room == null) {
      window.location.href = BASE_PATH + 'speaking/choose/';
    }
    if (json[0].position === -1) {
      window.location.href = BASE_PATH + 'speaking/thanks/';
    }
    GetRoom(json[0].room);
    let info_position = document.getElementById('info_position');
    info_position.innerHTML = '<b>' + json[0].position + '</b>';
  });
  let info_queue = document.getElementById('info_queue');
  info_queue.innerHTML = 'Your position in the queue for the speaking part:';
}
