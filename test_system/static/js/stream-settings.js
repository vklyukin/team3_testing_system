const BASE_PATH = 'http://localhost:5000/';
history.pushState(null, null, location.href);
window.onpopstate = function () {
    history.go(1);
};

const SendGet = () => { //function that get all questions from the server side
    return fetch(BASE_PATH + 'api/exam/', { //fetch get request to get array of questions
        method: 'get'
    })
        .then(function (response) {
            return response.json(); //reading request like a json object
        })
        .then(function (json) {
            if (json.length === undefined) {
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
            } else {
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

                    const q_major = document.createElement("textarea");
                    /*
                  const q_major = document.createElement("select");

                  const q_major_opt1 = document.createElement("option");
                  q_major_opt1.textContent="---";
                  const q_major_opt2 = document.createElement("option");
                  q_major_opt2.textContent="Software Engineering";
                  const q_major_opt3 = document.createElement("option");
                  q_major_opt3.textContent="Applied Mathematics and Information Science";
                  let q_str1 = "q_major_";
                    *//*
            let q_str1 = "q_major_";
            const q_major_wrapper = document.createElement("td");
            q_major.setAttribute("id", q_str1.concat(json[i].pk));
            q_major.setAttribute("class", "form-control");
            q_major.innerHTML = json[i].major;
            q_major_wrapper.appendChild(q_major);
            q_tr.appendChild(q_major_wrapper);*/
                    const q_corr_wrapper = document.createElement("select");
                    let q_corr = "q_major_";
                    q_corr_wrapper.setAttribute("class", "custom-select form-control");
                    q_corr_wrapper.setAttribute("id", q_corr.concat(json[i].pk));
                    const q_corr1 = document.createElement("option");
                    q_corr1.innerHTML = "---";
                    const q_corr2 = document.createElement("option");
                    q_corr2.innerHTML = "Software Engineering";
                    const q_corr3 = document.createElement("option");
                    q_corr3.innerHTML = "Applied Mathematics and Information Science";
                    if (json[i].major === "---") { //choose which option will be choosen by default based on the json
                        q_corr1.setAttribute("selected", "selected");
                    } else if (json[i].major === "SE") {
                        q_corr2.setAttribute("selected", "selected");
                    } else if (json[i].major === "AMI") {
                        q_corr3.setAttribute("selected", "selected");
                    }
                    q_corr_wrapper.appendChild(q_corr1);
                    q_corr_wrapper.appendChild(q_corr2);
                    q_corr_wrapper.appendChild(q_corr3);
                    const q_corr_wrapper_th = document.createElement("td");
                    q_corr_wrapper_th.appendChild(q_corr_wrapper);
                    q_tr.appendChild(q_corr_wrapper_th);


                    const q_stream = document.createElement("textarea");
                    let q_strr1 = "q_stream_";
                    const q_stream_wrapper = document.createElement("td");
                    q_stream.setAttribute("id", q_strr1.concat(json[i].pk));
                    q_stream.setAttribute("class", "form-control");
                    q_stream.innerHTML = json[i].stream;
                    q_stream_wrapper.appendChild(q_stream);
                    q_tr.appendChild(q_stream_wrapper);

                    const q_date_div = document.createElement("div");
                    const q_date_container = document.createElement("div");
                    q_date_container.setAttribute("class", "picker-container");
                    const q_date_th = document.createElement("td");
                    q_date_div.innerHTML = daterebuild(json[i].start);
                    let q_date_ID = "q_date_";
                    q_date_ID = q_date_ID.concat(json[i].pk);
                    q_date_div.setAttribute("class", "js-inline-picker");
                    q_date_div.setAttribute("id", q_date_ID);
                    const datepicker = new Picker(q_date_div, {
                        format: 'YYYY-MM-D',
                        container: q_date_container,
                        controls: true,
                        inline: true,
                        headers: true,
                        rows: 3
                    });
                    q_date_th.appendChild(q_date_div);
                    q_date_th.appendChild(q_date_container);
                    q_tr.appendChild(q_date_th);

                    const q_start_div = document.createElement("div");
                    const q_start_container = document.createElement("div");
                    q_start_container.setAttribute("class", "picker-container");
                    const q_start_th = document.createElement("td");
                    q_start_div.innerHTML = timerebuild(json[i].start);
                    let q_start_ID = "q_start_";
                    q_start_ID = q_start_ID.concat(json[i].pk);
                    q_start_div.setAttribute("class", "js-inline-picker");
                    q_start_div.setAttribute("id", q_start_ID);
                    const startpicker = new Picker(q_start_div, {
                        format: 'HH:mm',
                        container: q_start_container,
                        controls: true,
                        inline: true,
                        headers: true,
                        rows: 2
                    });
                    q_start_th.appendChild(q_start_div);
                    q_start_th.appendChild(q_start_container);
                    q_tr.appendChild(q_start_th);

                    const q_finish_div = document.createElement("div");
                    const q_finish_container = document.createElement("div");
                    q_finish_container.setAttribute("class", "picker-container");
                    const q_finish_th = document.createElement("td");
                    q_finish_div.innerHTML = timerebuild(json[i].finish);
                    let q_finish_ID = "q_finish_";
                    q_finish_ID = q_finish_ID.concat(json[i].pk);
                    q_finish_div.setAttribute("class", "js-inline-picker");
                    q_finish_div.setAttribute("id", q_finish_ID);
                    const finishpicker = new Picker(q_finish_div, {
                        format: 'HH:mm',
                        container: q_finish_container,
                        controls: true,
                        inline: true,
                        headers: true,
                        rows: 2
                    });
                    q_finish_th.appendChild(q_finish_div);
                    q_finish_th.appendChild(q_finish_container);
                    q_tr.appendChild(q_finish_th);

                    const delete_button = document.createElement("button");
                    delete_button.setAttribute("class", "btn btn-outline-danger");
                    delete_button.setAttribute("onclick", 'SendDelete(' + json[i].pk + ')');
                    delete_button.innerHTML = "Delete";
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
        let q_major = document.getElementById('q_major_' + q_pk); //getting question's text
        let major = "---";
        if (q_major.value == "Software Engineering") major = "SE";
        if (q_major.value == "Applied Mathematics and Information Science") major = "AMI";
        let q_stream = document.getElementById('q_stream_' + q_pk); //getting question's answer option 1
        let q_date = document.getElementById('q_date_' + q_pk);
        let q_start = document.getElementById('q_start_' + q_pk); //getting question's correct answer wrapper
        let q_finish = document.getElementById('q_finish_' + q_pk);
        fetch(BASE_PATH + 'api/exam/' + q_pk + '/', { //sending fetch put request to add changed question to the Data Base
            method: "PUT",
            credentials: "same-origin", //including cookie information
            headers: {
                "X-CSRFToken": getCookie("csrftoken"), //token to check user validation
                "Accept": "application/json",
                'Content-Type': 'application/json'
            },
            //making json from data that was piked on the lines above
            body: JSON.stringify({
                pk: q_pk,
                major: major,
                stream: q_stream.value,
                start: (q_date.textContent + "T" + q_start.textContent + ":00+03:00"),
                finish: (q_date.textContent + "T" + q_finish.textContent + ":00+03:00")
            })
        }).then(function (response) {
            if (response.status === 200 && i === elem_count - 2) {
                location.reload();
            }
        })
    }
};

const SendDelete = pk => {
    fetch(BASE_PATH + 'api/exam/' + pk + '/', { //sending fetch put request to add changed question to the Data Base
        method: "DELETE",
        credentials: "same-origin", //including cookie information
        headers: {
            "X-CSRFToken": getCookie("csrftoken"), //token to check user validation
            "Accept": "application/json",
            'Content-Type': 'application/json'
        }
    }).then(function (response) {
        if (response.status === 204) {
            location.reload();
        }
    })
};

const AddQ = () => {
    location.href = BASE_PATH + 'dashboard/add_exam/';
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


const timerebuild = str => {
    let cdatetime = str.split("T");
    let cdatetime2 = cdatetime[1].split("+");
    let mas = cdatetime2[0].split(":");
    return mas[0] + ":" + mas[1];
};

const daterebuild = str => {
    let cdatetime = str.split("T");
    let cdatetime2 = cdatetime[0].split("-");
    return cdatetime2[0] + "-" + cdatetime2[1] + "-" + cdatetime2[2];
};
