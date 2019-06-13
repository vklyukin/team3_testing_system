let question_number = document.getElementById('question_number');
let question_text = document.getElementById('question_text');
let answer1 = document.getElementById('question_answer1');
let answer2 = document.getElementById('question_answer2');
let answer3 = document.getElementById('question_answer3');
let answer4 = document.getElementById('question_answer4');
let count = 0;
let answer_objects;
let question_reading_text;
let question_reading_container = document.createElement('div');
let question_reading;
let question_next = document.getElementById('question_next');
let test_time = document.getElementById('test_time');
let countDownDateHourAndHalf;
let timeNow;
let countDownDateExamEnd;
let countDownDateSessionEnd;
let now;
let exam_id;
let max_question_number = 0;

const sortrule = () => function (a, b) {
    if (a.number > b.number) {
        return 1;
    } else if (a.number < b.number) {
        return -1;
    }
    return 0;
};

function default_choose() {
  if (answer1.className == "btn btn-block answer_selected") {
    answer1.className = answer1.className.replace(/\bbtn btn-block answer_selected\b/g, "");
    let name1 = "btn btn-block question_variant";
    let arr1 = answer1.className.split(" ");
    if (arr1.indexOf(name1) == -1) {
      answer1.className += name1;
    }
  }
  if (answer2.className == "btn btn-block answer_selected") {
    answer2.className = answer2.className.replace(/\bbtn btn-block answer_selected\b/g, "");
    let name2 = "btn btn-block question_variant";
    let arr2 = answer2.className.split(" ");
    if (arr2.indexOf(name2) == -1) {
      answer2.className += name2;
    }
  }
  if (answer3.className == "btn btn-block answer_selected") {
    answer3.className = answer3.className.replace(/\bbtn btn-block answer_selected\b/g, "");
    let name3 = "btn btn-block question_variant";
    let arr3 = answer3.className.split(" ");
    if (arr3.indexOf(name3) == -1) {
      answer3.className += name3;
    }
  }
  if (answer4.className == "btn btn-block answer_selected") {
    answer4.className = answer4.className.replace(/\bbtn btn-block answer_selected\b/g, "");
    let name4 = "btn btn-block question_variant";
    let arr4 = answer4.className.split(" ");
    if (arr4.indexOf(name4) == -1) {
      answer4.className += name4;
    }
  }
}

function button1_choose() {
  if (answer2.className == "btn btn-block answer_selected") {
    answer2.className = answer2.className.replace(/\bbtn btn-block answer_selected\b/g, "");
    let name2 = "btn btn-block question_variant";
    let arr2 = answer2.className.split(" ");
    if (arr2.indexOf(name2) == -1) {
      answer2.className += name2;
    }
  }
  if (answer3.className == "btn btn-block answer_selected") {
    answer3.className = answer3.className.replace(/\bbtn btn-block answer_selected\b/g, "");
    let name3 = "btn btn-block question_variant";
    let arr3 = answer3.className.split(" ");
    if (arr3.indexOf(name3) == -1) {
      answer3.className += name3;
    }
  }
  if (answer4.className == "btn btn-block answer_selected") {
    answer4.className = answer4.className.replace(/\bbtn btn-block answer_selected\b/g, "");
    let name4 = "btn btn-block question_variant";
    let arr4 = answer4.className.split(" ");
    if (arr4.indexOf(name4) == -1) {
      answer4.className += name4;
    }
  }
  if (answer1.className == "btn btn-block question_variant") {
    answer1.className = answer1.className.replace(/\bbtn btn-block question_variant\b/g, "");
    let name1 = "btn btn-block answer_selected";
    let arr1 = answer1.className.split(" ");
    if (arr1.indexOf(name1) == -1) {
      answer1.className += name1;
    }
  }
}

function button2_choose() {
  if (answer1.className == "btn btn-block answer_selected") {
    answer1.className = answer1.className.replace(/\bbtn btn-block answer_selected\b/g, "");
    let name1 = "btn btn-block question_variant";
    let arr1 = answer1.className.split(" ");
    if (arr1.indexOf(name1) == -1) {
      answer1.className += name1;
    }
  }
  if (answer3.className == "btn btn-block answer_selected") {
    answer3.className = answer3.className.replace(/\bbtn btn-block answer_selected\b/g, "");
    let name3 = "btn btn-block question_variant";
    let arr3 = answer3.className.split(" ");
    if (arr3.indexOf(name3) == -1) {
      answer3.className += name3;
    }
  }
  if (answer4.className == "btn btn-block answer_selected") {
    answer4.className = answer4.className.replace(/\bbtn btn-block answer_selected\b/g, "");
    let name4 = "btn btn-block question_variant";
    let arr4 = answer4.className.split(" ");
    if (arr4.indexOf(name4) == -1) {
      answer4.className += name4;
    }
  }
  if (answer2.className == "btn btn-block question_variant") {
    answer2.className = answer2.className.replace(/\bbtn btn-block question_variant\b/g, "");
    let name2 = "btn btn-block answer_selected";
    let arr2 = answer2.className.split(" ");
    if (arr2.indexOf(name2) == -1) {
      answer2.className += name2;
    }
  }
}

function button3_choose() {
  if (answer1.className == "btn btn-block answer_selected") {
    answer1.className = answer1.className.replace(/\bbtn btn-block answer_selected\b/g, "");
    let name1 = "btn btn-block question_variant";
    let arr1 = answer1.className.split(" ");
    if (arr1.indexOf(name1) == -1) {
      answer1.className += name1;
    }
  }
  if (answer2.className == "btn btn-block answer_selected") {
    answer2.className = answer2.className.replace(/\bbtn btn-block answer_selected\b/g, "");
    let name2 = "btn btn-block question_variant";
    let arr2 = answer2.className.split(" ");
    if (arr2.indexOf(name2) == -1) {
      answer2.className += name2;
    }
  }
  if (answer4.className == "btn btn-block answer_selected") {
    answer4.className = answer4.className.replace(/\bbtn btn-block answer_selected\b/g, "");
    let name4 = "btn btn-block question_variant";
    let arr4 = answer4.className.split(" ");
    if (arr4.indexOf(name4) == -1) {
      answer4.className += name4;
    }
  }
  if (answer3.className == "btn btn-block question_variant") {
    answer3.className = answer3.className.replace(/\bbtn btn-block question_variant\b/g, "");
    let name3 = "btn btn-block answer_selected";
    let arr3 = answer3.className.split(" ");
    if (arr3.indexOf(name3) == -1) {
      answer3.className += name3;
    }
  }
}

function button4_choose() {
  if (answer1.className == "btn btn-block answer_selected") {
    answer1.className = answer1.className.replace(/\bbtn btn-block answer_selected\b/g, "");
    let name1 = "btn btn-block question_variant";
    let arr1 = answer1.className.split(" ");
    if (arr1.indexOf(name1) == -1) {
      answer1.className += name1;
    }
  }
  if (answer2.className == "btn btn-block answer_selected") {
    answer2.className = answer2.className.replace(/\bbtn btn-block answer_selected\b/g, "");
    let name2 = "btn btn-block question_variant";
    let arr2 = answer2.className.split(" ");
    if (arr2.indexOf(name2) == -1) {
      answer2.className += name2;
    }
  }
  if (answer3.className == "btn btn-block answer_selected") {
    answer3.className = answer3.className.replace(/\bbtn btn-block answer_selected\b/g, "");
    let name3 = "btn btn-block question_variant";
    let arr3 = answer3.className.split(" ");
    if (arr3.indexOf(name3) == -1) {
      answer3.className += name3;
    }
  }
  if (answer4.className == "btn btn-block question_variant") {
    answer4.className = answer4.className.replace(/\bbtn btn-block question_variant\b/g, "");
    let name4 = "btn btn-block answer_selected";
    let arr4 = answer4.className.split(" ");
    if (arr4.indexOf(name4) == -1) {
      answer4.className += name4;
    }
  }
}

function SendAnswer(answer) {
  fetch(BASE_PATH + 'api/answer/' + answer_objects[count].pk + '/', {
    method: "PUT",
    credentials: "same-origin", //including cookie information
    headers: {
        "X-CSRFToken": getCookie("csrftoken"), //token to check user validation
        "Accept": "application/json",
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        pk: answer_objects[count].pk,
        number: answer_objects[count].number,
        answer: answer,
        user: answer_objects[count].user,
        question: answer_objects[count].question,
    })
  });
}

function FillNextQuestion() {
  ++count;
  if (count < answer_objects.length) {
    fill_question(answer_objects[count]);
    default_choose();
  } else {
    fetch(BASE_PATH + 'api/answer/finish/', {
      method: "POST",
      credentials: "same-origin",
      headers: {
          "X-CSRFToken": getCookie("csrftoken"),
          "Accept": "application/json"
      }
    }).then(function (response) {
      if (response.status === 200) {
        window.location.href = BASE_PATH + 'speaking/choose/';
      }
    });
  }
}

function next_question() {
  if (answer1.className == "btn btn-block answer_selected") {
    SendAnswer(0);
    FillNextQuestion();
  } else if (answer2.className == "btn btn-block answer_selected") {
    SendAnswer(1);
    FillNextQuestion();
  } else if (answer3.className == "btn btn-block answer_selected") {
    SendAnswer(2);
    FillNextQuestion();
  } else if (answer4.className == "btn btn-block answer_selected") {
    SendAnswer(3);
    FillNextQuestion();
  } else {
    if (confirm("Are you sure you want to leave this question unanswered?")) {
      SendAnswer(-1);
      FillNextQuestion();
    }
  }
}

function fill_question(answer_object) {
  fetch(BASE_PATH + 'api/question/' + answer_object.question + '/', {
    method: 'get'
  }).then(function (response) {
    return response.json();
  }).then(function (json) {
    if (json.is_reading == true) {
      question_reading.style.visibility = 'visible';
      question_reading_text.appendChild(question_reading_container);
    } else {
      if (question_reading_text.childNodes.length != 0) {
        question_reading.style.visibility = 'hidden';
        question_reading_text.removeChild(question_reading_text.childNodes[0]);
      }
    }
    question_number.innerHTML = 'Task ' + answer_object.number + ' out of ' + max_question_number;
    question_text.innerHTML = json.text;
    answer1.innerHTML = json.answ_option1;
    answer2.innerHTML = json.answ_option2;
    answer3.innerHTML = json.answ_option3;
    answer4.innerHTML = json.answ_option4;
  });
}

const time_exam_end = async () => {
  const response = await fetch(BASE_PATH + 'api/exam/' + exam_id + '/');
  const json = await response.json();
  countDownDateExamEnd = new Date((json.finish).slice(0, 19));
}

const get_exam_id = async () => {
  const response = await fetch(BASE_PATH + 'api/user-exam/');
  const json = await response.json();
  if (json.length == 0) {
    window.location.href = BASE_PATH + 'stream_choose/choose/';
  } else {
    exam_id = json[0].exam;
  }
}

const time_now = async () => {
  const response = await fetch(BASE_PATH + 'api/time/');
  const json = await response.json();
  timeNow = new Date((json.time).slice(0, 19));
}

function init() {
  get_exam_id();
  var x = setInterval(function() {
    now = new Date();
    var countDownDate = localStorage.getItem('time');
    if (countDownDate == null || countDownDate == "Invalid Date") {
      time_now();
      time_exam_end();
      countDownDateHourAndHalf = new Date();
      countDownDateHourAndHalf.setHours(countDownDateHourAndHalf.getHours() + 1);
      countDownDateHourAndHalf.setMinutes(countDownDateHourAndHalf.getMinutes() + 30);
      time_now();
      time_exam_end();
      if (countDownDateHourAndHalf - now <= countDownDateExamEnd - timeNow) {
        localStorage.setItem('time', countDownDateHourAndHalf.toString());
        countDownDate = countDownDateHourAndHalf;
      } else {
        var countDownDateExamEnd_number = Date.parse(countDownDateExamEnd);
        var timeNow_number = Date.parse(timeNow);
        var dist = countDownDateExamEnd_number - timeNow_number;
        countDownDateSessionEnd = now;
        countDownDateSessionEnd.setHours(countDownDateSessionEnd.getHours() + Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        countDownDateSessionEnd.setMinutes(countDownDateSessionEnd.getMinutes() + Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60)));
        countDownDateSessionEnd.setSeconds(countDownDateSessionEnd.getSeconds() + Math.floor((dist % (1000 * 60)) / 1000));
        localStorage.setItem('time', countDownDateSessionEnd.toString());
        countDownDate = countDownDateSessionEnd;
      }
    } else {
      countDownDate = Date.parse(localStorage.getItem('time'));
    }
    var distance = countDownDate - now;
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    if (!Number.isNaN(hours) || !Number.isNaN(minutes) || !Number.isNaN(seconds)) {
      test_time.innerHTML = hours + ":" + minutes + ":" + seconds;
    }
    if (distance < 0) {
      clearInterval(x);
      fetch(BASE_PATH + 'api/answer/finish/', {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "X-CSRFToken": getCookie("csrftoken"),
            "Accept": "application/json"
        }
      }).then(function (response) {
        if (response.status === 200) {
          location.reload(true);
          window.location.href = BASE_PATH + 'speaking/info/';
        }
      });
    }
  }, 1000);
  question_reading_text = document.getElementById('question_reading');
  question_reading = document.getElementById('reading_text');
  fetch(BASE_PATH + 'api/question/text', {
    method: 'get'
  }).then(function (response) {
    return response.json();
  }).then(function (json) {
    question_reading_container.innerHTML = json[0].text;
  });
  fetch(BASE_PATH + 'api/answer/', {
    method: 'get'
  }).then(function (response) {
      return response.json();
  }).then(function (json) {
    if (json.length !== 0) {
      json.sort(sortrule());
      max_question_number = json[json.length - 1].number;
      answer_objects = json;
      fill_question(answer_objects[0])
    } else {
      window.location.href = BASE_PATH + 'speaking/choose/';
    }
  });
}

function EndTest() {
  if (confirm("Are you sure you want to abort the test?")) {
    fetch(BASE_PATH + 'api/answer/finish/', {
      method: "POST",
      credentials: "same-origin",
      headers: {
          "X-CSRFToken": getCookie("csrftoken"),
          "Accept": "application/json"
      }
    }).then(function (response) {
      if (response.status === 200) {
        location.reload(true);
        window.location.href = BASE_PATH + 'speaking/choose/';
      }
    });
  }
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
