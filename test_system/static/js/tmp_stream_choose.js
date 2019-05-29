history.pushState(null, null, location.href);
window.onpopstate = function () {
    history.go(1);
};

const strems_ami = document.getElementById('streams_ami');
const strems_se = document.getElementById('streams_se');
let time_now;

function check_time() {
  fetch(BASE_PATH + 'api/time/', {
    method: 'get'
  }).then(function (response) {
    return response.json();
  }).then(function (json) {
    time_now = json.time;
  });
}

function init() {
  check_time();
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
        // stream_button.innerHTML = '<table style="table-layout: fixed; width: 100%;"><tr><td>'
        // + json[i].stream + '</td><td>'
        // + start_str.slice(11, 16) + '</td><td>'
        // + finish_str.slice(11, 16) + '</td></table>';
        stream_button.innerHTML = '<table style="table-layout: fixed; width: 100%;"><tr><td>'
        + json[i].stream + '</td><td>1 hour 30 minutes</td><tr></table>';
        if (json[i].start_button === false) {
          stream_button.setAttribute('disabled', 'disabled');
        }
        if (json[i].major == "SE" && date == start_str.slice(0, 10)) {
          streams_se.appendChild(stream_button);
        } else if (json[i].major == "AMI" && date == start_str.slice(0, 10)){
          streams_ami.appendChild(stream_button);
        }
      }
    }
  });
}
