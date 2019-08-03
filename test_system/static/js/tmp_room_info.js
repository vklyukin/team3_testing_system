history.pushState(null, null, location.href);
window.onpopstate = function () {
    history.go(1);
};

function RoomList() {
  window.location.href = BASE_PATH + 'speaking/choose/';
}

function init() {
  fillCard();
  var x = setInterval(function() {
    fillCard();
  }, 60000);
}

function fillCard() {
  let minutes = 0;
  let hours = 0;
  let seconds = 0;

  fetch(BASE_PATH + 'api/mark/', {
    method: 'get'
  }).then(function (response) {
    return response.json();
  }).then(function (json) {
    if (json[0].position === -1) {
      window.location.href = BASE_PATH + 'speaking/thanks/';
    } else {
      if (json[0].room == null) {
        let card_header = document.getElementById('info_header');
        card_header.innerHTML = 'You must choose room first!';
      } else {
        fetch(BASE_PATH + 'api/room/' + json[0].room + '/', {
          method: 'get'
        }).then(function (response) {
          return response.json();
        }).then(function (json) {
          let card_header = document.getElementById('info_header');
          card_header.innerHTML = 'Your current room number is <b>' + json.number + '</b>';
          let info_time = document.getElementById('info_time');
          info_time.style.visibility = 'visible';
          info_time.innerHTML = 'Average waiting time:';
          let info_wait = document.getElementById('info_wait');
          info_wait.style.visibility = 'visible';
          waiting_time = json.amount_stud / json.amount_teach;
          waiting_time = parseInt(waiting_time.toFixed());
          waiting_time = waiting_time * parseFloat(json.avg_time);
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
        });
        let info_position = document.getElementById('info_position');
        info_position.style.visibility = 'visible';
        info_position.innerHTML = '<b>' + json[0].position + '</b>';
        let info_queue = document.getElementById('info_queue');
        info_queue.style.visibility = 'visible';
        info_queue.innerHTML = 'Your position in the queue for the speaking part:';
      }
    }
  });
}
