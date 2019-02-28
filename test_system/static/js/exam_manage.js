const BASE_PATH = 'http://localhost:5000/';
const names = ['Матевосян Армен Арсенович',
'Алмаев Сергей Сергеевич',
'Степанов Евгений Вадимович',
'Серебренников Александр Дмитриевич',
'Оганов Григорий Сергеевич',
'Клюкин	Валерий	Дмитриевич',
'Дубина Дмитрий Олегович',
'Торилов Дмитрий Михайлович',
'Емельяненко Дмитрий Викторович',
'Редникина Дарья Юрьевна',
'Загитов Асгар Ильшатович',
'Белавенцев	Валерий	Евгеньевич',
'Оралин	Илларион Владимирович',
'Соколов Семен Константинович',
'Сафина	Алия Наилевна',
'Карпин	Александр	Николаевич',
'Измайлов	Александр	Александрович',
'Силина	Полина Викторовна'
]
const majors = ['Прикладная математика и информатика',
'Прикладная математика и информатика',
'Прикладная математика и информатика',
'Прикладная математика и информатика',
'Программная инженерия',
'Программная инженерия',
'Программная инженерия',
'Программная инженерия',
'Программная инженерия',
'Программная инженерия',
'Программная инженерия',
'Программная инженерия',
'Программная инженерия',
'Программная инженерия',
'Программная инженерия',
'Программная инженерия',
'Программная инженерия',
'Программная инженерия',
]
history.pushState(null, null, location.href);
    window.onpopstate = function () {
        history.go(1);
    };

const SendGet = () => { //function that get all questions from the server side
  return fetch(BASE_PATH + 'api/mark/', { //fetch get request to get array of questions
    method: 'get'
  })
      .then(function (response) {
        return response.json(); //reading request like a json object
      })
      .then(function (json) {
        const q_table_body = document.getElementById("q_table_body"); //get table object from HTML code by its id
        for (let i = 0; i < json.length; ++i) {
          const q_tr = document.createElement("tr");
          q_table_body.appendChild(q_tr);

          let q_test_student = document.createElement("td");
          let q_test_student_div = document.createElement("div");
          q_test_student_div.innerHTML = names[i];
          q_test_student.appendChild(q_test_student_div);
          q_tr.appendChild(q_test_student);

          let q_test_major = document.createElement("td");
          let q_test_major_div = document.createElement("div");
          q_test_major_div.innerHTML = majors[i];
          q_test_major.appendChild(q_test_major_div);
          q_tr.appendChild(q_test_major);

          const q_test_mark_wr = document.createElement("td");
          let q_test_mark = document.createElement("input");
          q_test_mark.setAttribute("class", "form-control");
          let q_test_mark_id = 'q_test_mark_' + json[i].pk;
          q_test_mark.setAttribute("id", q_test_mark_id);
          q_test_mark.setAttribute("value", json[i].test_mark);
          let q_test_mark_script = document.createElement("script");
          q_test_mark_script.innerHTML = "bootstrapValidate('#" + q_test_mark_id + "', 'regex:^[0-9]+$:Only numbers')";
          q_test_mark_wr.appendChild(q_test_mark);
          q_test_mark_wr.appendChild(q_test_mark_script);
          q_tr.appendChild(q_test_mark_wr);

          const q_test_level_wrapper = document.createElement("select");
          let q_test_level_ = "q_test_level_";
          q_test_level_wrapper.setAttribute("class", "custom-select form-control");
          q_test_level_wrapper.setAttribute("id", q_test_level_.concat(json[i].pk));
          const q_test_level_1 = document.createElement("option");
          q_test_level_1.innerHTML = "A1";
          const q_test_level_2 = document.createElement("option");
          q_test_level_2.innerHTML = "A2";
          const q_test_level_3 = document.createElement("option");
          q_test_level_3.innerHTML = "B1";
          const q_test_level_4 = document.createElement("option");
          q_test_level_4.innerHTML = "B2";
          const q_test_level_5 = document.createElement("option");
          q_test_level_5.innerHTML = "C1";
          const q_test_level_6 = document.createElement("option");
          q_test_level_6.innerHTML = "C2";
          if (json[i].test_level === "A1") { //choose which option will be choosen by default based on the json
            q_test_level_1.setAttribute("selected", "selected");
          } else if (json[i].test_level === "A2") {
            q_test_level_2.setAttribute("selected", "selected");
          } else if (json[i].test_level === "B1") {
            q_test_level_3.setAttribute("selected", "selected");
          } else if (json[i].test_level === "B2") {
            q_test_level_4.setAttribute("selected", "selected");
          } else if (json[i].test_level === "C1") {
            q_test_level_5.setAttribute("selected", "selected");
          } else if (json[i].test_level === "C2") {
            q_test_level_6.setAttribute("selected", "selected");
          }
          q_test_level_wrapper.appendChild(q_test_level_1);
          q_test_level_wrapper.appendChild(q_test_level_2);
          q_test_level_wrapper.appendChild(q_test_level_3);
          q_test_level_wrapper.appendChild(q_test_level_4);
          q_test_level_wrapper.appendChild(q_test_level_5);
          q_test_level_wrapper.appendChild(q_test_level_6);
          const q_test_level_wrapper_th = document.createElement("td");
          q_test_level_wrapper_th.appendChild(q_test_level_wrapper);
          q_tr.appendChild(q_test_level_wrapper_th);

          const q_test_removed = document.createElement("input");
          q_test_removed.setAttribute("type", "checkbox");
          let q_test_removed_ID = "q_test_removed_";
          q_test_removed_ID = q_test_removed_ID.concat(json[i].pk);
          q_test_removed.setAttribute("id", q_test_removed_ID);
          if(json[i].removed === true){
            q_test_removed.setAttribute("checked", "checked");
          }
          const q_test_removed_th = document.createElement("td");
          q_test_removed_th.setAttribute("class", "center");
          q_test_removed_th.appendChild(q_test_removed);
          q_tr.appendChild(q_test_removed_th);

          const q_speaking_level_wrapper = document.createElement("select");
            let q_speaking_level_ = "q_speaking_level_";
            q_speaking_level_wrapper.setAttribute("class", "custom-select form-control");
            q_speaking_level_wrapper.setAttribute("id", q_speaking_level_.concat(json[i].pk));
            const q_speaking_level_1 = document.createElement("option");
            q_speaking_level_1.innerHTML = "A1m";
            const q_speaking_level_2 = document.createElement("option");
            q_speaking_level_2.innerHTML = "A1p";
            const q_speaking_level_3 = document.createElement("option");
            q_speaking_level_3.innerHTML = "A2m";
            const q_speaking_level_4 = document.createElement("option");
            q_speaking_level_4.innerHTML = "A2p";
            const q_speaking_level_5 = document.createElement("option");
            q_speaking_level_5.innerHTML = "B1m";
            const q_speaking_level_6 = document.createElement("option");
            q_speaking_level_6.innerHTML = "B1p";
            const q_speaking_level_7 = document.createElement("option");
            q_speaking_level_7.innerHTML = "B2m";
            const q_speaking_level_8 = document.createElement("option");
            q_speaking_level_8.innerHTML = "B2p";
            const q_speaking_level_9 = document.createElement("option");
            q_speaking_level_9.innerHTML = "C1m";
            const q_speaking_level_10 = document.createElement("option");
            q_speaking_level_10.innerHTML = "C1p";
            const q_speaking_level_11 = document.createElement("option");
            q_speaking_level_11.innerHTML = "C2m";
            const q_speaking_level_12 = document.createElement("option");
            q_speaking_level_12.innerHTML = "C2p";
            if (json[i].speaking_mark === "A1m") { //choose which option will be choosen by default based on the json
              q_speaking_level_1.setAttribute("selected", "selected");
            } else if (json[i].speaking_mark === "A1p") {
              q_speaking_level_2.setAttribute("selected", "selected");
            } else if (json[i].speaking_mark === "A2m") {
              q_speaking_level_3.setAttribute("selected", "selected");
            } else if (json[i].speaking_mark === "A2p") {
              q_speaking_level_4.setAttribute("selected", "selected");
            } else if (json[i].speaking_mark === "B1m") {
              q_speaking_level_5.setAttribute("selected", "selected");
            } else if (json[i].speaking_mark === "B1p") {
              q_speaking_level_6.setAttribute("selected", "selected");
            } else if (json[i].speaking_mark === "B2m") {
              q_speaking_level_7.setAttribute("selected", "selected");
            } else if (json[i].speaking_mark === "B2p") {
              q_speaking_level_8.setAttribute("selected", "selected");
            } else if (json[i].speaking_mark === "C1m") {
              q_speaking_level_9.setAttribute("selected", "selected");
            } else if (json[i].speaking_mark === "C1p") {
              q_speaking_level_10.setAttribute("selected", "selected");
            } else if (json[i].speaking_mark === "C2m") {
              q_speaking_level_11.setAttribute("selected", "selected");
            } else if (json[i].speaking_mark === "C2p") {
              q_speaking_level_12.setAttribute("selected", "selected");
            }
            q_speaking_level_wrapper.appendChild(q_speaking_level_1);
            q_speaking_level_wrapper.appendChild(q_speaking_level_2);
            q_speaking_level_wrapper.appendChild(q_speaking_level_3);
            q_speaking_level_wrapper.appendChild(q_speaking_level_4);
            q_speaking_level_wrapper.appendChild(q_speaking_level_5);
            q_speaking_level_wrapper.appendChild(q_speaking_level_6);
            q_speaking_level_wrapper.appendChild(q_speaking_level_7);
            q_speaking_level_wrapper.appendChild(q_speaking_level_8);
            q_speaking_level_wrapper.appendChild(q_speaking_level_9);
            q_speaking_level_wrapper.appendChild(q_speaking_level_10);
            q_speaking_level_wrapper.appendChild(q_speaking_level_11);
            q_speaking_level_wrapper.appendChild(q_speaking_level_12);
            const q_speaking_level_wrapper_th = document.createElement("td");
            q_speaking_level_wrapper_th.appendChild(q_speaking_level_wrapper);
            q_tr.appendChild(q_speaking_level_wrapper_th);

            const q_level_wrapper = document.createElement("select");
            let q_level_ = "q_level_";
            q_level_wrapper.setAttribute("class", "custom-select form-control");
            q_level_wrapper.setAttribute("id", q_level_.concat(json[i].pk));
            const q_level_1 = document.createElement("option");
            q_level_1.innerHTML = "A1";
            const q_level_2 = document.createElement("option");
            q_level_2.innerHTML = "A2";
            const q_level_3 = document.createElement("option");
            q_level_3.innerHTML = "B1";
            const q_level_4 = document.createElement("option");
            q_level_4.innerHTML = "B2";
            const q_level_5 = document.createElement("option");
            q_level_5.innerHTML = "C1";
            const q_level_6 = document.createElement("option");
            q_level_6.innerHTML = "C2";
            if (json[i].level === "A1") { //choose which option will be choosen by default based on the json
              q_level_1.setAttribute("selected", "selected");
            } else if (json[i].level === "A2") {
              q_level_2.setAttribute("selected", "selected");
            } else if (json[i].level === "B1") {
              q_level_3.setAttribute("selected", "selected");
            } else if (json[i].level === "B2") {
              q_level_4.setAttribute("selected", "selected");
            } else if (json[i].level === "C1") {
              q_level_5.setAttribute("selected", "selected");
            } else if (json[i].level === "C2") {
              q_level_6.setAttribute("selected", "selected");
            }
            q_level_wrapper.appendChild(q_level_1);
            q_level_wrapper.appendChild(q_level_2);
            q_level_wrapper.appendChild(q_level_3);
            q_level_wrapper.appendChild(q_level_4);
            q_level_wrapper.appendChild(q_level_5);
            q_level_wrapper.appendChild(q_level_6);
            const q_level_wrapper_th = document.createElement("td");
            q_level_wrapper_th.appendChild(q_level_wrapper);
            q_tr.appendChild(q_level_wrapper_th);

            let q_test_user = document.createElement("td");
            let q_test_user_div = document.createElement("div");
            q_test_user_div.setAttribute("id", 'q_test_user_' + json[i].pk);
            q_test_user_div.innerHTML = json[i].user;
            q_test_user.appendChild(q_test_user_div);
            q_tr.appendChild(q_test_user);
            q_test_user.setAttribute("hidden", "hidden");

            const submit_button = document.createElement("button");
            submit_button.setAttribute("class", "btn btn-outline-primary");
            submit_button.setAttribute("onclick", 'SendPut(' + json[i].pk + ')');
            submit_button.innerHTML = "Submit"
            const submit_button_th = document.createElement("td");
            submit_button_th.setAttribute("class", "center");
            submit_button_th.appendChild(submit_button);
            q_tr.appendChild(submit_button_th);
        }
      });
};

const SendPut = (id) => { //function that checks for the changes in the questions and send them to the server side
  let test_mark = document.getElementById('q_test_mark_' + id).value;
  let test_level = document.getElementById('q_test_level_' + id);
  let test_level_selected = test_level.options[test_level.selectedIndex].value;
  let removed = document.getElementById('q_test_removed_' + id).checked;
  let speaking_mark = document.getElementById('q_speaking_level_' + id);
  let speaking_mark_selected = speaking_mark.options[speaking_mark.selectedIndex].value;
  let level = document.getElementById('q_level_' + id);
  let level_selected = level.options[level.selectedIndex].value;
  let user = document.getElementById('q_test_user_' + id).innerHTML;


  fetch(BASE_PATH + 'api/mark/' + id + '/', { //sending fetch put request to add changed question to the Data Base
      method: "PUT",
      credentials: "same-origin", //including cookie information
      headers: {
        "X-CSRFToken": getCookie("csrftoken"), //token to check user validation
        "Accept": "application/json",
        'Content-Type': 'application/json'
      },
      //making json from data that was piked on the lines above
      body:JSON.stringify({pk: id, test_mark: test_mark, test_level: test_level_selected, removed: removed, speaking_mark: speaking_mark_selected, level: level_selected, user: user, speaking: null,})
    }).then(function (response) {
      // if(response.status === 200 && i === elem_count - 2){
      //   location.reload();
      // }
    });
};

//function that retutn cookie by its name, taken from django documentation
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

function myFunction() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("q_table");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}