history.pushState(null, null, location.href);
window.onpopstate = function () {
    history.go(1);
};

const rooms_container = document.getElementById('rooms');

function init() {
  fetch(BASE_PATH + 'api/room/', {
    method: 'get'
  }).then(function (response) {
    return response.json();
  }).then(function (json) {
    if (json.length !== undefined) {
      for (let i = 0; i < json.length; ++i) {
        let waiting_time;
        if (json[i].amount_teach === 0) {
          waiting_time = "Undefined";
        } else {
          waiting_time = (json[i].amount_stud * parseInt((json[i].avg_time).slice(3, 5))) / json[i].amount_teach;
        }
        let room = document.createElement('button');
        room.setAttribute('class', 'btn btn-block room-variant');
        // room.innerHTML = '<table style="table-layout: fixed; width: 100%;"><tr><th>Room number</th><th>Number of students</th><th>Number of teachers</th><th>Waiting time</th></tr><tr><td>'
        // + json[i].number + '</td><td>'
        // + json[i].amount_stud + '</td><td>'
        // + json[i].amount_teach + '</td><td>'
        // + waiting_time + ' minutes</td></tr></table>'
        room.innerHTML = '<table style="table-layout: fixed; width: 100%;"><tr><th>Room number</th><td>'
        + json[i].number + '</td></tr><tr><th>Number of students</th><td>'
        + json[i].amount_stud + '</td></tr><tr><th>Number of teachers</th><td>'
        + json[i].amount_teach + '</td></tr><tr><th>Waiting time</th><td>'
        + waiting_time + ' minutes</td></tr></table>'
        rooms_container.appendChild(room);
      }
    }
  });
}
