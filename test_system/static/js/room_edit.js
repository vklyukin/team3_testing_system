let avg_time = document.getElementById('avg_time');
let amount_stud = document.getElementById('amount_stud');
let number = document.getElementById('room_number');
let numbers = [];

const Submit = () => {
    if (number.value == "") {
        alert("This field should not be empty");
    } else if (!numbers.includes(parseInt(number.value))) {
        fetch(BASE_PATH + 'api/room/', {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "X-CSRFToken": getCookie("csrftoken"),
                "Accept": "application/json",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                number: parseInt(number.value),
                amount_stud: amount_stud.value,
                avg_time: avg_time.value,
            })
        }).then(function (response) {
            if (response.status === 201) {
                location.reload();
            }
        });
    } else {
        alert("This room is already in action");
    }
};

const Start = () => {
    let table = document.getElementById('table');
    fetch(BASE_PATH + 'api/room/', { //fetch get request to get array of questions
        method: 'get'
    }).then(function (response) {
        return response.json(); //reading request like a json object
    })
        .then(function (json) {
            if (json.length !== 0) {
                for (let i = 0; i < json.length; ++i) {
                    numbers[i] = json[i].number;
                    let tr = document.createElement('tr');
                    let number_td = document.createElement('td');
                    let delete_td = document.createElement('td');
                    delete_td.setAttribute("class", "left");
                    number_td.setAttribute("class", "center");
                    let number_div = document.createElement('h2');
                    number_div.innerHTML = "Room " + json[i].number;
                    number_td.appendChild(number_div);
                    tr.appendChild(number_td);
                    let delete_button = document.createElement("button");
                    delete_button.innerHTML = "Delete";
                    delete_button.setAttribute("class", "btn btn-outline-danger");
                    delete_button.setAttribute("onclick", "SendDelete(" + json[i].pk + ")");
                    delete_td.appendChild(delete_button);
                    tr.appendChild(delete_td);
                    table.appendChild(tr);
                }
            }
        });
};

const SendDelete = pk => {
    fetch(BASE_PATH + 'api/room/' + pk + '/', { //sending fetch put request to add changed question to the Data Base
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
