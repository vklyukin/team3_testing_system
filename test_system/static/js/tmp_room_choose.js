history.pushState(null, null, location.href);
window.onpopstate = function () {
    history.go(1);
};

let mark_info;

function SendRoom(room_pk) {
  return fetch(BASE_PATH + 'api/mark/' + mark_info.pk + '/', {
    method: "PUT",
    credentials: "same-origin", //including cookie information
    headers: {
        "X-CSRFToken": getCookie("csrftoken"), //token to check user validation
        "Accept": "application/json",
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        pk: mark_info.pk,
        user: mark_info.user,
        room: room_pk,
        position: mark_info.position,
        first_name: mark_info.first_name,
        second_name: mark_info.second_name,
        removed: mark_info.removed,
    })
  }).then(function (response) {
    if (response.status === 200) {
      window.location.href = BASE_PATH + 'speaking/info/';
    }
  });
}

const sortrule = () => function (a, b) {
    if (a.number > b.number) {
        return 1;
    } else if (a.number < b.number) {
        return -1;
    }
    return 0;
};

function RoomCard() {
  window.location.href = BASE_PATH + 'speaking/info/';
}

function init() {
  const rooms_container = document.getElementById('rooms');
  let minutes = 0;
  let hours = 0;
  let seconds = 0;

  fetch(BASE_PATH + 'api/answer/', {
    method: 'get'
  }).then(function (response) {
    return response.json();
  }).then(function (json) {
    if (json.length !== 0 && mark_info.removed == false) {
      window.location.href = BASE_PATH + 'test_system/test/';
    } else {
      fetch(BASE_PATH + 'api/user-exam/', {
        method: 'get'
      }).then(function (response) {
        return response.json();
      }).then(function (json) {
        if (json.length == 0) {
          window.location.href = BASE_PATH + 'stream_choose/choose/';
        } else {
          fetch(BASE_PATH + 'api/mark/', {
            method: 'get'
          }).then(function (response) {
            return response.json();
          }).then(function (json) {
            if (json[0].position === -1) {
              window.location.href = BASE_PATH + 'speaking/thanks/';
            } else {
              mark_info = json[0];

              fetch(BASE_PATH + 'api/room/', {
                method: 'get'
              }).then(function (response) {
                return response.json();
              }).then(function (json) {
                if (json.length !== undefined) {
                  json.sort(sortrule());
                  for (let i = 0; i < json.length; ++i) {
                    let waiting_time;
                    if (json[i].amount_teach === 0) {
                      continue;
                    } else {
                      waiting_time = (json[i].amount_stud * parseFloat(json[i].avg_time)) / json[i].amount_teach;
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
                    }
                    let room = document.createElement('button');
                    if (mark_info.room === json[i].pk) {
                      room.setAttribute('class', 'btn room-choosen');
                      room.setAttribute('onclick', 'RoomCard()');
                      room.innerHTML = '<p class="room_number"><b>Room ' + json[i].number + '</b></p><p class="room_number"><b>Your Room</b></p><table style="table-layout: fixed; width: 100%;"><tr><th>Waiting</th><td>'
                      + hours + ':' + minutes + ':' + seconds + '</td></tr></table>';
                    } else {
                      room.setAttribute('class', 'btn room-variant');
                      room.setAttribute('onclick', 'SendRoom(' + json[i].pk + ')');
                      room.innerHTML = '<p class="room_number"><b>Room ' + json[i].number + '</b></p><table style="table-layout: fixed; width: 100%;"><tr><th>Students</th><td>'
                      + json[i].amount_stud + '</td></tr><tr><th>Teachers</th><td>'
                      + json[i].amount_teach + '</td></tr><tr><th>Waiting</th><td>'
                      + hours + ':' + minutes + ':' + seconds + '</td></tr></table>';
                    }
                    rooms_container.appendChild(room);
                  }
                }
              });
            }
          });
        }
      });
    }
  });
}

const getCookie = name => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = jQuery.trim(cookies[i]);
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
};
