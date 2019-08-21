const select = document.getElementById('room_select');
let pk;
const tableBodyQueue = document.getElementById('table');
const table_checked = document.getElementById('table_checked');

const TableFill = (q_table_body, json) => {
    const q_tr = document.createElement("tr");
    q_table_body.appendChild(q_tr);

    let q_test_student = document.createElement("td");
    let q_test_student_FN_div = document.createElement("div");
    let q_test_student_LN_div = document.createElement("div");
    let q_test_student_FAN_div = document.createElement("div");
    q_test_student_LN_div.setAttribute("id", 'second_name_' + json.pk);
    q_test_student_FN_div.setAttribute("id", 'first_name_' + json.pk);
    q_test_student_FAN_div.setAttribute("id", 'fathers_name_' + json.pk);
    let space = document.createElement("div");
    space.innerHTML = " ";
    q_test_student_FN_div.innerHTML = json.first_name; //name
    q_test_student_LN_div.innerHTML = json.second_name; //surname
    q_test_student_FAN_div.innerHTML = json.fathers_name; //fathers_name
    q_test_student.appendChild(q_test_student_LN_div);
    q_test_student.appendChild(space);
    q_test_student.appendChild(q_test_student_FN_div);
    q_test_student.appendChild(space);
    q_test_student.appendChild(q_test_student_FAN_div);
    q_tr.appendChild(q_test_student);

    let q_test_major = document.createElement("td");
    q_test_major.setAttribute("hidden", "hidden");
    let q_test_major_div = document.createElement("div");
    q_test_major_div.setAttribute("id", 'major_' + json.pk);
    q_test_major_div.innerHTML = json.major;
    q_test_major.appendChild(q_test_major_div);
    q_tr.appendChild(q_test_major);

    const q_test_mark_wr = document.createElement("td");
    q_test_mark_wr.setAttribute("hidden", "hidden");
    let q_test_mark = document.createElement("input");
    q_test_mark.setAttribute("class", "form-control");
    let q_test_mark_id = 'q_test_mark_' + json.pk;
    q_test_mark.setAttribute("id", q_test_mark_id);
    q_test_mark.setAttribute("value", json.test_mark);
    q_test_mark_wr.appendChild(q_test_mark);
    q_tr.appendChild(q_test_mark_wr);

    const q_test_level_wrapper = document.createElement("select");
    let q_test_level_ = "q_test_level_";
    q_test_level_wrapper.setAttribute("class", "custom-select form-control");
    q_test_level_wrapper.setAttribute("id", q_test_level_.concat(json.pk));
    const q_test_level_1 = document.createElement("option");
    q_test_level_1.innerHTML = "Beginner";
    q_test_level_1.setAttribute("value", "A1");
    const q_test_level_2 = document.createElement("option");
    q_test_level_2.innerHTML = "Elementary";
    q_test_level_2.setAttribute("value", "A2");
    const q_test_level_3 = document.createElement("option");
    q_test_level_3.innerHTML = "Pre-Intermediate";
    q_test_level_3.setAttribute("value", "B1");
    const q_test_level_4 = document.createElement("option");
    q_test_level_4.innerHTML = "Intermediate";
    q_test_level_4.setAttribute("value", "B2");
    const q_test_level_5 = document.createElement("option");
    q_test_level_5.innerHTML = "Upper-Intermediate";
    q_test_level_5.setAttribute("value", "C1");
    const q_test_level_6 = document.createElement("option");
    q_test_level_6.innerHTML = "Advanced";
    q_test_level_6.setAttribute("value", "C2");
    if (json.test_level === "A1") { //choose which option will be choosen by default based on the json
        q_test_level_1.setAttribute("selected", "selected");
    } else if (json.test_level === "A2") {
        q_test_level_2.setAttribute("selected", "selected");
    } else if (json.test_level === "B1") {
        q_test_level_3.setAttribute("selected", "selected");
    } else if (json.test_level === "B2") {
        q_test_level_4.setAttribute("selected", "selected");
    } else if (json.test_level === "C1") {
        q_test_level_5.setAttribute("selected", "selected");
    } else if (json.test_level === "C2") {
        q_test_level_6.setAttribute("selected", "selected");
    }
    q_test_level_wrapper.appendChild(q_test_level_1);
    q_test_level_wrapper.appendChild(q_test_level_2);
    q_test_level_wrapper.appendChild(q_test_level_3);
    q_test_level_wrapper.appendChild(q_test_level_4);
    q_test_level_wrapper.appendChild(q_test_level_5);
    q_test_level_wrapper.appendChild(q_test_level_6);
    const q_test_level_wrapper_th = document.createElement("td");
    q_test_level_wrapper_th.setAttribute("hidden", "hidden");
    q_test_level_wrapper_th.appendChild(q_test_level_wrapper);
    q_tr.appendChild(q_test_level_wrapper_th);

    const q_test_removed = document.createElement("input");
    q_test_removed.setAttribute("type", "checkbox");
    let q_test_removed_ID = "q_test_removed_";
    q_test_removed_ID = q_test_removed_ID.concat(json.pk);
    q_test_removed.setAttribute("id", q_test_removed_ID);
    if (json.removed === true) {
        q_test_removed.setAttribute("checked", "checked");
    }
    const q_test_removed_th = document.createElement("td");
    q_test_removed_th.setAttribute("hidden", "hidden");
    q_test_removed_th.setAttribute("class", "center");
    q_test_removed_th.appendChild(q_test_removed);
    q_tr.appendChild(q_test_removed_th);

    const q_speaking_level_wrapper = document.createElement("select");
    let q_speaking_level_ = "q_speaking_level_";
    q_speaking_level_wrapper.setAttribute("class", "custom-select form-control");
    q_speaking_level_wrapper.setAttribute("id", q_speaking_level_.concat(json.pk));
    const q_speaking_level_1 = document.createElement("option");
    q_speaking_level_1.innerHTML = "Beginner -";
    q_speaking_level_1.setAttribute("value", "A1m");
    const q_speaking_level_2 = document.createElement("option");
    q_speaking_level_2.innerHTML = "Beginner +";
    q_speaking_level_2.setAttribute("value", "A1p");
    const q_speaking_level_3 = document.createElement("option");
    q_speaking_level_3.innerHTML = "Elementary -";
    q_speaking_level_3.setAttribute("value", "A2m");
    const q_speaking_level_4 = document.createElement("option");
    q_speaking_level_4.innerHTML = "Elementary +";
    q_speaking_level_4.setAttribute("value", "A2p");
    const q_speaking_level_5 = document.createElement("option");
    q_speaking_level_5.innerHTML = "Pre-Intermediate -";
    q_speaking_level_5.setAttribute("value", "B1m");
    const q_speaking_level_6 = document.createElement("option");
    q_speaking_level_6.innerHTML = "Pre-Intermediate +";
    q_speaking_level_6.setAttribute("value", "B1p");
    const q_speaking_level_7 = document.createElement("option");
    q_speaking_level_7.innerHTML = "Intermediate -";
    q_speaking_level_7.setAttribute("value", "B2m");
    const q_speaking_level_8 = document.createElement("option");
    q_speaking_level_8.innerHTML = "Intermediate +";
    q_speaking_level_8.setAttribute("value", "B2p");
    const q_speaking_level_9 = document.createElement("option");
    q_speaking_level_9.innerHTML = "Upper-Intermediate -";
    q_speaking_level_9.setAttribute("value", "C1m");
    const q_speaking_level_10 = document.createElement("option");
    q_speaking_level_10.innerHTML = "Upper-Intermediate +";
    q_speaking_level_10.setAttribute("value", "C1p");
    const q_speaking_level_11 = document.createElement("option");
    q_speaking_level_11.innerHTML = "Advanced -";
    q_speaking_level_11.setAttribute("value", "C2m");
    const q_speaking_level_12 = document.createElement("option");
    q_speaking_level_12.innerHTML = "Advanced +";
    q_speaking_level_12.setAttribute("value", "C2p");
    if (json.speaking_mark === "A1m") { //choose which option will be choosen by default based on the json
        q_speaking_level_1.setAttribute("selected", "selected");
    } else if (json.speaking_mark === "A1p") {
        q_speaking_level_2.setAttribute("selected", "selected");
    } else if (json.speaking_mark === "A2m") {
        q_speaking_level_3.setAttribute("selected", "selected");
    } else if (json.speaking_mark === "A2p") {
        q_speaking_level_4.setAttribute("selected", "selected");
    } else if (json.speaking_mark === "B1m") {
        q_speaking_level_5.setAttribute("selected", "selected");
    } else if (json.speaking_mark === "B1p") {
        q_speaking_level_6.setAttribute("selected", "selected");
    } else if (json.speaking_mark === "B2m") {
        q_speaking_level_7.setAttribute("selected", "selected");
    } else if (json.speaking_mark === "B2p") {
        q_speaking_level_8.setAttribute("selected", "selected");
    } else if (json.speaking_mark === "C1m") {
        q_speaking_level_9.setAttribute("selected", "selected");
    } else if (json.speaking_mark === "C1p") {
        q_speaking_level_10.setAttribute("selected", "selected");
    } else if (json.speaking_mark === "C2m") {
        q_speaking_level_11.setAttribute("selected", "selected");
    } else if (json.speaking_mark === "C2p") {
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
    q_level_wrapper.setAttribute("id", q_level_.concat(json.pk));
    const q_level_1 = document.createElement("option");
    q_level_1.innerHTML = "Beginner";
    q_level_1.setAttribute("value", "A1");
    const q_level_2 = document.createElement("option");
    q_level_2.innerHTML = "Elementary";
    q_level_2.setAttribute("value", "A2");
    const q_level_3 = document.createElement("option");
    q_level_3.innerHTML = "Pre-Intermediate";
    q_level_3.setAttribute("value", "B1");
    const q_level_4 = document.createElement("option");
    q_level_4.innerHTML = "Intermediate";
    q_level_4.setAttribute("value", "B2");
    const q_level_5 = document.createElement("option");
    q_level_5.innerHTML = "Upper-Intermediate";
    q_level_5.setAttribute("value", "C1");
    const q_level_6 = document.createElement("option");
    q_level_6.innerHTML = "Advanced";
    q_level_6.setAttribute("value", "C2");
    if (json.level === "A1") { //choose which option will be choosen by default based on the json
        q_level_1.setAttribute("selected", "selected");
    } else if (json.level === "A2") {
        q_level_2.setAttribute("selected", "selected");
    } else if (json.level === "B1") {
        q_level_3.setAttribute("selected", "selected");
    } else if (json.level === "B2") {
        q_level_4.setAttribute("selected", "selected");
    } else if (json.level === "C1") {
        q_level_5.setAttribute("selected", "selected");
    } else if (json.level === "C2") {
        q_level_6.setAttribute("selected", "selected");
    }
    q_level_wrapper.appendChild(q_level_1);
    q_level_wrapper.appendChild(q_level_2);
    q_level_wrapper.appendChild(q_level_3);
    q_level_wrapper.appendChild(q_level_4);
    q_level_wrapper.appendChild(q_level_5);
    q_level_wrapper.appendChild(q_level_6);
    const q_level_wrapper_th = document.createElement("td");
    q_level_wrapper_th.setAttribute("hidden", "hidden");
    q_level_wrapper_th.appendChild(q_level_wrapper);
    q_tr.appendChild(q_level_wrapper_th);

    let q_test_user = document.createElement("td");
    let q_test_user_div = document.createElement("div");
    q_test_user_div.setAttribute("id", 'q_test_user_' + json.pk);
    q_test_user_div.innerHTML = json.user;
    q_test_user.appendChild(q_test_user_div);
    q_tr.appendChild(q_test_user);
    q_test_user.setAttribute("hidden", "hidden");

    let q_test_speaking = document.createElement("td");
    let q_test_speaking_div = document.createElement("div");
    q_test_speaking_div.setAttribute("id", 'q_test_speaking_' + json.pk);
    q_test_speaking_div.innerHTML = json.speaking;
    q_test_speaking.appendChild(q_test_speaking_div);
    q_tr.appendChild(q_test_speaking);
    q_test_speaking.setAttribute("hidden", "hidden");

    let q_test_room = document.createElement("td");
    let q_test_room_div = document.createElement("div");
    q_test_room_div.setAttribute("id", 'q_test_room_' + json.pk);
    q_test_room_div.innerHTML = json.room;
    q_test_room.appendChild(q_test_room_div);
    q_tr.appendChild(q_test_room);
    q_test_room.setAttribute("hidden", "hidden");

    const q_test_position_wr = document.createElement("td");
    let q_test_position = document.createElement("input");
    q_test_position.setAttribute("class", "form-control");
    let q_test_position_id = 'q_test_position_' + json.pk;
    q_test_position.setAttribute("id", q_test_position_id);
    q_test_position.setAttribute("value", json.position);
    q_test_position_wr.appendChild(q_test_position);
    q_tr.appendChild(q_test_position_wr);
    q_test_position_wr.setAttribute("hidden", "hidden");

    const q_test_confident = document.createElement("input");
    q_test_confident.setAttribute("type", "checkbox");
    let q_test_confident_ID = "q_test_confident_";
    q_test_confident_ID = q_test_confident_ID.concat(json.pk);
    q_test_confident.setAttribute("id", q_test_confident_ID);
    if (json.confident === true) {
        q_test_confident.setAttribute("checked", "checked");
    }
    const q_test_confident_th = document.createElement("td");
    q_test_confident_th.setAttribute("class", "center");
    q_test_confident_th.appendChild(q_test_confident);
    q_tr.appendChild(q_test_confident_th);

    const submit_button = document.createElement("button");
    submit_button.setAttribute("class", "btn btn-outline-primary");
    submit_button.setAttribute("onclick", 'SendPut(' + json.pk + ')');
    submit_button.innerHTML = "Submit";
    const submit_button_th = document.createElement("td");
    submit_button_th.setAttribute("class", "center");
    submit_button_th.appendChild(submit_button);
    q_tr.appendChild(submit_button_th);
};

const sortrule = () => function (a, b) {
    if (a.position > b.position) {
        return 1;
    } else if (a.position < b.position) {
        return -1;
    }
    return 0;
};

const changeEventHandlerPOST = event => {
    if (!event.target.value) {
        alert('Please Select One');
    } else {
        let selected = select.options[select.selectedIndex].value;
        fetch(BASE_PATH + 'api/speaking/', {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "X-CSRFToken": getCookie("csrftoken"),
                "Accept": "application/json",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({room: selected,})
        }).then(function (response) {
            if (response.status === 201) {
                location.reload();
            }
        });
    }
};

const changeEventHandlerPUT = event => {
    let selected = select.options[select.selectedIndex].value;
    fetch(BASE_PATH + 'api/speaking/' + pk + '/', {
        method: "PUT",
        credentials: "same-origin",
        headers: {
            "X-CSRFToken": getCookie("csrftoken"),
            "Accept": "application/json",
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({pk: pk, room: selected,})
    }).then(function (response) {
        if (response.status === 200) {
            location.reload();
        }
    });
};

const Start = () => {
    fetch(BASE_PATH + 'api/speaking/', { //fetch get request to get array of questions
        method: 'get'
    }).then(function (response) {
        return response.json(); //reading request like a json object
    })
        .then(function (json) {
            if (json.length !== 0) {
                pk = json[0].pk;
                let teacher_room = json[0].room;
                fetch(BASE_PATH + 'api/room/', { //fetch get request to get array of questions
                    method: 'get'
                }).then(function (response) {
                    return response.json(); //reading request like a json object
                })
                    .then(function (json) {
                        if (json.length !== 0) {
                            let select = document.getElementById('room_select');
                            for (let i = 0; i < json.length; ++i) {
                                let option = document.createElement('option');
                                option.innerHTML = json[i].number;
                                option.setAttribute("value", json[i].pk);
                                if (json[i].pk === teacher_room) {
                                    option.setAttribute("selected", "selected");
                                }
                                select.appendChild(option);
                            }
                        } else {
                            window.location.href = BASE_PATH + 'dashboard/room_edit/';
                        }
                    });

                select.onchange = changeEventHandlerPUT;
            } else {
                fetch(BASE_PATH + 'api/room/', { //fetch get request to get array of questions
                    method: 'get'
                }).then(function (response) {
                    return response.json(); //reading request like a json object
                })
                    .then(function (json) {
                        if (json.length !== 0) {
                            let select = document.getElementById('room_select');
                            let default_value = document.createElement('option');
                            default_value.setAttribute("selected", "selected");
                            default_value.innerHTML = "---";
                            default_value.setAttribute("value", "");
                            select.appendChild(default_value);
                            for (let i = 0; i < json.length; ++i) {
                                let option = document.createElement('option');
                                option.innerHTML = json[i].number;
                                option.setAttribute("value", json[i].pk);
                                select.appendChild(option);
                            }
                        } else {
                            window.location.href = BASE_PATH + 'dashboard/room_edit/';
                        }
                    });
                select.onchange = changeEventHandlerPOST;
            }
        });

    fetch(BASE_PATH + 'api/mark/by_room/', { //fetch get request to get array of questions
        method: 'get'
    }).then(function (response) {
        return response.json(); //reading request like a json object
    })
        .then(function (json) {
            if (json.length !== 0) {
                json.sort(sortrule());
                for (let i = 0; i < json.length; ++i) {
                    if (json[i].position === -1) {
                        TableFill(table_checked, json[i]);
                    } else {
                        TableFill(tableBodyQueue, json[i]);
                    }
                }
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
    let speaking = document.getElementById('q_test_speaking_' + id).innerHTML;
    let first_name = document.getElementById('first_name_' + id).innerHTML;
    let second_name = document.getElementById('second_name_' + id).innerHTML;
    let room = document.getElementById('q_test_room_' + id).innerHTML;
    let position = document.getElementById('q_test_position_' + id).value;
    let confident = document.getElementById('q_test_confident_' + id).checked;
    let major = document.getElementById('major_' + id).innerHTML;


    fetch(BASE_PATH + 'api/mark/' + id + '/', { //sending fetch put request to add changed question to the Data Base
        method: "PUT",
        credentials: "same-origin", //including cookie information
        headers: {
            "X-CSRFToken": getCookie("csrftoken"), //token to check user validation
            "Accept": "application/json",
            'Content-Type': 'application/json'
        },
        //making json from data that was piked on the lines above
        body: JSON.stringify({
            pk: id,
            major: major,
            user: user,
            test_mark: test_mark,
            test_level: test_level_selected,
            removed: removed,
            speaking: speaking,
            speaking_mark: speaking_mark_selected,
            level: level_selected,
            first_name: first_name,
            second_name: second_name,
            room: room,
            position: -1,
            confident: confident,
        })
    }).then(function (response) {
        if (response.status === 200) {
            location.reload();
        }
    });
};

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
