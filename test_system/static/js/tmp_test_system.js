let question_number = document.getElementById('question_number');
let question_text = document.getElementById('question_text');
let answer1 = document.getElementById('question_answer1');
let answer2 = document.getElementById('question_answer2');
let answer3 = document.getElementById('question_answer3');
let answer4 = document.getElementById('question_answer4');
let count = 0;
let questions;
let question_reading_text;
let question_reading_container = document.createElement('div');
let question_reading;
let question_next = document.getElementById('question_next');

function default_choose() {
  if (answer1.className == "btn btn-block answer_selected") {
    answer1.className = answer1.className.replace(/\bbtn btn-block answer_selected\b/g, "");
    let name1 = "btn btn-block answer_selected";
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

function next_question() {
  fill_questions(questions, count);
  default_choose();
}

function fill_questions(json, i) {
  const n = json.length;
  if (i < n) {
    if (json[i].is_reading == true) {
      question_reading.style.visibility = 'visible';
      question_reading_text.appendChild(question_reading_container);
    } else {
      if (question_reading_text.childNodes.length != 0) {
        question_reading.style.visibility = 'hidden';
        question_reading_text.removeChild(question_reading_text.childNodes[0]);
      }
    }
    question_number.innerHTML = 'Task ' + (i + 1) + ' out of ' + n;
    question_text.innerHTML = json[i].text;
    answer1.innerHTML = json[i].answ_option1;
    answer2.innerHTML = json[i].answ_option2;
    answer3.innerHTML = json[i].answ_option3;
    answer4.innerHTML = json[i].answ_option4;
    count += 1;
  }
}

function init() {
  question_reading_text = document.getElementById('question_reading');
  question_reading = document.getElementById('reading_text');
  fetch(BASE_PATH + 'api/question/text', {
    method: 'get'
  }).then(function (response) {
    return response.json();
  }).then(function (json) {
    question_reading_container.innerHTML = json[0].text;
  });
  fetch(BASE_PATH + 'api/question/', {
    method: 'get'
  }).then(function (response) {
      return response.json();
  }).then(function (json) {
    questions = json;
    fill_questions(questions, count);
  });
}
