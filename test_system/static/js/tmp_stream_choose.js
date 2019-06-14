history.pushState(null, null, location.href);
window.onpopstate = function () {
    history.go(1);
};

function SendPost(id) {
  return fetch(BASE_PATH + 'api/user-exam/', {
    method: 'post',
    credentials: "same-origin",
    headers: {
        "X-CSRFToken": getCookie("csrftoken"),
        "Accept": "application/json",
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        exam: id,
    })
  }).then(function (response) {
    if (response.status === 201) {
      window.location.href = BASE_PATH + 'test_system/test/';
    }
  });
}

function init() {
  const strems = document.getElementById('streams');
  let time_now;
  fetch(BASE_PATH + 'api/mark/', {
    method: 'get'
  }).then(function (response) {
    return response.json();
  }).then(function (json) {
    if (json[0].position !== 0 && json[0].room != null) {
      window.location.href = BASE_PATH + 'speaking/info/';
    } else if (json[0].position !== 0 && json[0].room == null) {
      window.location.href = BASE_PATH + 'speaking/info/';
    } else if (json[0].removed == true) {
      window.location.href = BASE_PATH + 'speaking/info/';
    } else {
      localStorage.removeItem('time');
      fetch(BASE_PATH + 'api/time/', {
        method: 'get'
      }).then(function (response) {
        return response.json();
      }).then(function (json) {
        time_now = json.time;

        fetch(BASE_PATH + 'api/exam/', {
          method: 'get'
        }).then(function (response) {
          return response.json();
        }).then(function (json) {
          if (json.length !== undefined) {
            let date = time_now.slice(0, 10);
            for(let i = 0; i < json.length; ++i) {
              let stream_button = document.createElement("button");
              let start_str = json[i].start;
              let finish_str = json[i].finish;
              stream_button.setAttribute('class', 'btn btn-block stream-variant');
              stream_button.setAttribute('onclick', 'SendPost(' + json[i].pk + ')');
              stream_button.innerHTML = '<table style="table-layout: fixed; width: 100%;"><tr><td>'
              + json[i].stream + '</td><td>1 hour 30 minutes</td><tr></table>';
              if (json[i].start_button === false) {
                stream_button.setAttribute('disabled', 'disabled');
              }
              if (date == start_str.slice(0, 10)) {
                streams.appendChild(stream_button);
              }
            }
          }
        });
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
