const BASE_PATH = 'http://localhost:5000/';
history.pushState(null, null, location.href);
    window.onpopstate = function () {
        history.go(1);
    };

const SendGet = () => { //function that get all questions from the server side
  return fetch(BASE_PATH + 'api/question/', { //fetch get request to get array of questions
    method: 'get'
  })
      .then(function (response) {
        return response.json(); //reading request like a json object
      })
      .then(function (json) {
        if (json.length === undefined){
          let but = document.getElementById('sub_but');
          let add_butt = document.getElementById('add_butt');
          let table = document.getElementById('q_table');
          let div_body = document.getElementById('card-body-table');
          let div = document.createElement('div');
          div.setAttribute("class", "h5 mb-0 font-weight-bold text-gray-800");
          div.innerHTML = json.detail;
          but.setAttribute("hidden", "hidden");
          add_butt.setAttribute("hidden", "hidden");
          table.setAttribute("hidden", "hidden");
          div_body.appendChild(div);
        }
        else {
          const q_table_body = document.getElementById("q_table_body"); //get table object from HTML code by its id

          for (let i = 0; i < json.length; ++i) { //loop that fill that table with content gathered from server side
            const q_tr = document.createElement("tr"); //creating <tr> element in HTML
            q_table_body.appendChild(q_tr); //append table object with this tr object created on the line above

            const q_id = document.createElement("td"); //creating <th> element
            let q_pk = "q_pk_"; //unique id for this element, will be used to call it by id later
            q_pk = q_pk.concat(i);
            q_id.setAttribute("id", q_pk); //setting id
            q_id.setAttribute("scope", "row"); //setting attributes
            q_id.setAttribute("hidden", "hidden"); //make it hidden
            q_tr.appendChild(q_id); //append it to the table
            q_id.innerHTML = json[i].pk; //append content to created object

            //All futher actions were done similary, parsing json that we got from server side by get fetch request

            const q_number = document.createElement("td");
            let q_num = "q_";
            q_num = q_num.concat(json[i].pk);
            q_number.setAttribute("id", q_num);
            q_tr.appendChild(q_number);
            q_number.innerHTML = i + 1;

            const q_text = document.createElement("textarea");
            let q_str1 = "q_text_";
            const q_text_wrapper = document.createElement("td");
            q_text.setAttribute("style", "width: 200px;");
            q_text.setAttribute("id", q_str1.concat(json[i].pk));
            q_text.setAttribute("class", "form-control");
            q_text.innerHTML = json[i].text;
            q_text_wrapper.appendChild(q_text);
            q_tr.appendChild(q_text_wrapper);

            const q_answ1_div = document.createElement("div");
            const q_answ1 = document.createElement("input");
            const q_answ1_wrapper = document.createElement("td");
            let q_ans_1 = "q_ans_";
            q_ans_1 = q_ans_1.concat(json[i].pk);
            q_ans_1 = q_ans_1.concat("_1");
            q_answ1.setAttribute("type", "text");
            q_answ1.setAttribute("class", "form-control");
            q_answ1.setAttribute("style", "width: 200px;");
            q_answ1.setAttribute("value", json[i].answ_option1);
            q_answ1.setAttribute("id", q_ans_1);
            q_answ1_div.innerHTML = "1";
            q_answ1_div.appendChild(q_answ1);
            q_answ1_wrapper.appendChild(q_answ1_div);
            q_tr.appendChild(q_answ1_wrapper);

            const p1 = document.createElement("p");
            const q_answ2_div = document.createElement("div");
            const q_answ2 = document.createElement("input");
            let q_ans_2 = "q_ans_";
            q_ans_2 = q_ans_2.concat(json[i].pk);
            q_ans_2 = q_ans_2.concat("_2");
            q_answ2.setAttribute("type", "text");
            q_answ2.setAttribute("class", "form-control");
            q_answ2.setAttribute("style", "width: 200px;");
            q_answ2.setAttribute("value", json[i].answ_option2);
            q_answ2.setAttribute("id", q_ans_2);
            q_answ2_div.innerHTML = "2";
            q_answ2_div.appendChild(q_answ2);
            q_answ1_wrapper.appendChild(p1);
            q_answ1_wrapper.appendChild(q_answ2_div);

            const p2 = document.createElement("p");
            const q_answ3_div = document.createElement("div");
            const q_answ3 = document.createElement("input");
            let q_ans_3 = "q_ans_";
            q_ans_3 = q_ans_3.concat(json[i].pk);
            q_ans_3 = q_ans_3.concat("_3");
            q_answ3.setAttribute("type", "text");
            q_answ3.setAttribute("class", "form-control");
            q_answ3.setAttribute("style", "width: 200px;");
            q_answ3.setAttribute("value", json[i].answ_option3);
            q_answ3.setAttribute("id", q_ans_3);
            q_answ3_div.innerHTML = "3";
            q_answ3_div.appendChild(q_answ3);
            q_answ1_wrapper.appendChild(p2);
            q_answ1_wrapper.appendChild(q_answ3_div);

            const p3 = document.createElement("p");
            const q_answ4_div = document.createElement("div");
            const q_answ4 = document.createElement("input");
            let q_ans_4 = "q_ans_";
            q_ans_4 = q_ans_4.concat(json[i].pk);
            q_ans_4 = q_ans_4.concat("_4");
            q_answ4.setAttribute("type", "text");
            q_answ4.setAttribute("class", "form-control");
            q_answ4.setAttribute("style", "width: 200px;");
            q_answ4.setAttribute("value", json[i].answ_option4);
            q_answ4.setAttribute("id", q_ans_4);
            q_answ4_div.innerHTML = "4";
            q_answ4_div.appendChild(q_answ4);
            q_answ1_wrapper.appendChild(p3);
            q_answ1_wrapper.appendChild(q_answ4_div);

            const q_corr_wrapper = document.createElement("select");
            let q_corr = "q_corr_";
            q_corr_wrapper.setAttribute("class", "custom-select form-control");
            q_corr_wrapper.setAttribute("id", q_corr.concat(json[i].pk));
            const q_corr1 = document.createElement("option");
            q_corr1.innerHTML = "1";
            const q_corr2 = document.createElement("option");
            q_corr2.innerHTML = "2";
            const q_corr3 = document.createElement("option");
            q_corr3.innerHTML = "3";
            const q_corr4 = document.createElement("option");
            q_corr4.innerHTML = "4";
            if (json[i].answ_correct === 0) { //choose which option will be choosen by default based on the json
              q_corr1.setAttribute("selected", "selected");
            } else if (json[i].answ_correct === 1) {
              q_corr2.setAttribute("selected", "selected");
            } else if (json[i].answ_correct === 2) {
              q_corr3.setAttribute("selected", "selected");
            } else if (json[i].answ_correct === 3) {
              q_corr4.setAttribute("selected", "selected");
            }
            q_corr_wrapper.appendChild(q_corr1);
            q_corr_wrapper.appendChild(q_corr2);
            q_corr_wrapper.appendChild(q_corr3);
            q_corr_wrapper.appendChild(q_corr4);
            const q_corr_wrapper_th = document.createElement("td");
            q_corr_wrapper_th.appendChild(q_corr_wrapper);
            q_tr.appendChild(q_corr_wrapper_th);

            const q_duration_div = document.createElement("div");
            const q_duration_container = document.createElement("div");
            q_duration_container.setAttribute("class", "picker-container");
            const q_duration_th = document.createElement("td");
            q_duration_div.innerHTML = json[i].duration;
            let q_duration_ID = "q_dur_";
            q_duration_ID = q_duration_ID.concat(json[i].pk);
            q_duration_div.setAttribute("class", "js-inline-picker");
            q_duration_div.setAttribute("id", q_duration_ID);
            const picker = new Picker(q_duration_div, {
              format: 'HH:mm:ss',
              container: q_duration_container,
              controls: true,
              inline: true,
              headers: true,
              rows: 3
            });
            q_duration_th.appendChild(q_duration_div);
            q_duration_th.appendChild(q_duration_container);
            q_tr.appendChild(q_duration_th);

            const q_reading = document.createElement("input");
            q_reading.setAttribute("type", "checkbox");
            let q_reading_ID = "q_reading_";
            q_reading_ID = q_reading_ID.concat(json[i].pk);
            q_reading.setAttribute("id", q_reading_ID);
            if(json[i].is_reading === true){
              q_reading.setAttribute("checked", "checked");
            }
            const q_reading_th = document.createElement("td");
            q_reading_th.setAttribute("class", "center");
            q_reading_th.appendChild(q_reading);
            q_tr.appendChild(q_reading_th);

            const delete_button = document.createElement("button");
            delete_button.setAttribute("class", "btn btn-outline-danger");
            delete_button.setAttribute("onclick", 'SendDelete(' + json[i].pk + ')');
            delete_button.innerHTML = "Delete"
            const delete_button_th = document.createElement("td");
            delete_button_th.setAttribute("class", "center");
            delete_button_th.appendChild(delete_button);
            q_tr.appendChild(delete_button_th);
          }
        }
      });
};

const SendChanges = () => { //function that checks for the changes in the questions and send them to the server side
  let elem_count = document.getElementById("q_table").rows.length; //number of questions
  for (let i = 0; i < elem_count - 1; ++i) { //loop that check all questions
    let q_pk = document.getElementById('q_pk_' + i).innerHTML; //getting question's pk
    let q_number = document.getElementById('q_' + q_pk); //getting question's number
    let q_text = document.getElementById('q_text_' + q_pk); //getting question's text
    let q_ans_1 = document.getElementById('q_ans_' + q_pk + '_1'); //getting question's answer option 1
    let q_ans_2 = document.getElementById('q_ans_' + q_pk + '_2'); //getting question's answer option 2
    let q_ans_3 = document.getElementById('q_ans_' + q_pk + '_3'); //getting question's answer option 3
    let q_ans_4 = document.getElementById('q_ans_' + q_pk + '_4'); //getting question's answer option 4
    let q_corr = document.getElementById('q_corr_' + q_pk); //getting question's correct answer wrapper
    let selected = q_corr.options[q_corr.selectedIndex].value - 1; //getting question's correct answer
    let q_dur = document.getElementById('q_dur_' + q_pk);
    let q_reading = document.getElementById('q_reading_' + q_pk);
    fetch(BASE_PATH + 'api/question/' + q_pk + '/', { //sending fetch put request to add changed question to the Data Base
        method: "PUT",
        credentials: "same-origin", //including cookie information
        headers: {
          "X-CSRFToken": getCookie("csrftoken"), //token to check user validation
          "Accept": "application/json",
          'Content-Type': 'application/json'
        },
        //making json from data that was piked on the lines above
        body:JSON.stringify({ pk: q_pk, number: q_number.innerHTML, text: q_text.value, answ_correct: selected, answ_option1: q_ans_1.value, answ_option2: q_ans_2.value, answ_option3: q_ans_3.value, answ_option4: q_ans_4.value, duration: q_dur.innerHTML, is_reading: q_reading.checked,})
      }).then(function (response) {
        if(response.status === 200 && i === elem_count - 2){
          location.reload();
        }
      })
  }
};

const SendDelete = pk => {
  fetch(BASE_PATH + 'api/question/' + pk + '/', { //sending fetch put request to add changed question to the Data Base
      method: "DELETE",
      credentials: "same-origin", //including cookie information
      headers: {
        "X-CSRFToken": getCookie("csrftoken"), //token to check user validation
        "Accept": "application/json",
        'Content-Type': 'application/json'
      }
    }).then(function (response) {
      if(response.status === 204){
        location.reload();
      }
    })
};

const AddQ = () => {
  location.href = BASE_PATH + 'test_editor/add/';
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
