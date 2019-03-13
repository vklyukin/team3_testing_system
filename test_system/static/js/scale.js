let scale_B_l = document.getElementById('scale_B_l');
let scale_B_h = document.getElementById('scale_B_h');
let scale_E_l = document.getElementById('scale_E_l');
let scale_E_h = document.getElementById('scale_E_h');
let scale_PI_l = document.getElementById('scale_PI_l');
let scale_PI_h = document.getElementById('scale_PI_h');
let scale_I_l = document.getElementById('scale_I_l');
let scale_I_h = document.getElementById('scale_I_h');
let scale_UI_l = document.getElementById('scale_UI_l');
let scale_UI_h = document.getElementById('scale_UI_h');
let scale_A_l = document.getElementById('scale_A_l');
let scale_A_h = document.getElementById('scale_A_h');

const GetScales = () => fetch(BASE_PATH + 'api/scaler/', { //fetch get request to get array of questions
    method: 'get'
}).then(function (response) {
    return response.json(); //reading request like a json object
})
    .then(function (json) {
        scale_B_l.value = json[0].lower;
        scale_B_h.value = json[0].upper;
        scale_E_l.value = json[1].lower;
        scale_E_h.value = json[1].upper;
        scale_PI_l.value = json[2].lower;
        scale_PI_h.value = json[2].upper;
        scale_I_l.value = json[3].lower;
        scale_I_h.value = json[3].upper;
        scale_UI_l.value = json[4].lower;
        scale_UI_h.value = json[4].upper;
        scale_A_l.value = json[5].lower;
        scale_A_h.value = json[5].upper;
    });

scale_B_h.addEventListener('input', function (event) {
    if (Number.parseInt(scale_B_h.value) > 0) {
        scale_B_h.removeAttribute("class");
        scale_B_h.setAttribute("class", "form-control is-valid");
        scale_E_l.value = Number.parseInt(scale_B_h.value) + 1;
        scale_E_h.value = 0;
        scale_E_h.removeAttribute("class");
        scale_E_h.setAttribute("class", "form-control");
        scale_PI_h.value = 0;
        scale_PI_l.value = 0;
        scale_PI_h.removeAttribute("class");
        scale_PI_h.setAttribute("class", "form-control");
        scale_I_h.value = 0;
        scale_I_l.value = 0;
        scale_I_h.removeAttribute("class");
        scale_I_h.setAttribute("class", "form-control");
        scale_UI_h.value = 0;
        scale_UI_l.value = 0;
        scale_UI_h.removeAttribute("class");
        scale_UI_h.setAttribute("class", "form-control");
        scale_A_h.value = 0;
        scale_A_l.value = 0;
        scale_A_h.removeAttribute("class");
        scale_A_h.setAttribute("class", "form-control");
    } else {
        scale_B_h.removeAttribute("class");
        scale_B_h.setAttribute("class", "form-control is-invalid");
    }
}, false);

scale_E_h.addEventListener('input', function (event) {
    if (Number.parseInt(scale_E_h.value) > Number.parseInt(scale_E_l.value)) {
        scale_E_h.removeAttribute("class");
        scale_E_h.setAttribute("class", "form-control is-valid");
        scale_PI_l.value = Number.parseInt(scale_E_h.value) + 1;
        scale_PI_h.value = 0;
        scale_PI_h.removeAttribute("class");
        scale_PI_h.setAttribute("class", "form-control");
        scale_I_h.value = 0;
        scale_I_l.value = 0;
        scale_I_h.removeAttribute("class");
        scale_I_h.setAttribute("class", "form-control");
        scale_UI_h.value = 0;
        scale_UI_l.value = 0;
        scale_UI_h.removeAttribute("class");
        scale_UI_h.setAttribute("class", "form-control");
        scale_A_h.value = 0;
        scale_A_l.value = 0;
        scale_A_h.removeAttribute("class");
        scale_A_h.setAttribute("class", "form-control");
    } else {
        scale_E_h.removeAttribute("class");
        scale_E_h.setAttribute("class", "form-control is-invalid");
    }
}, false);

scale_PI_h.addEventListener('input', function (event) {
    if (Number.parseInt(scale_PI_h.value) > Number.parseInt(scale_PI_l.value)) {
        scale_PI_h.removeAttribute("class");
        scale_PI_h.setAttribute("class", "form-control is-valid");
        scale_I_l.value = Number.parseInt(scale_PI_h.value) + 1;
        scale_I_h.value = 0;
        scale_I_h.removeAttribute("class");
        scale_I_h.setAttribute("class", "form-control");
        scale_UI_h.value = 0;
        scale_UI_l.value = 0;
        scale_UI_h.removeAttribute("class");
        scale_UI_h.setAttribute("class", "form-control");
        scale_A_h.value = 0;
        scale_A_l.value = 0;
        scale_A_h.removeAttribute("class");
        scale_A_h.setAttribute("class", "form-control");
    } else {
        scale_PI_h.removeAttribute("class");
        scale_PI_h.setAttribute("class", "form-control is-invalid");
    }
}, false);

scale_I_h.addEventListener('input', function (event) {
    if (Number.parseInt(scale_I_h.value) > Number.parseInt(scale_I_l.value)) {
        scale_I_h.removeAttribute("class");
        scale_I_h.setAttribute("class", "form-control is-valid");
        scale_UI_l.value = Number.parseInt(scale_I_h.value) + 1;
        scale_UI_h.value = 0;
        scale_UI_h.removeAttribute("class");
        scale_UI_h.setAttribute("class", "form-control");
        scale_A_h.value = 0;
        scale_A_l.value = 0;
        scale_A_h.removeAttribute("class");
        scale_A_h.setAttribute("class", "form-control");
    } else {
        scale_I_h.removeAttribute("class");
        scale_I_h.setAttribute("class", "form-control is-invalid");
    }
}, false);

scale_UI_h.addEventListener('input', function (event) {
    if (Number.parseInt(scale_UI_h.value) > Number.parseInt(scale_UI_l.value)) {
        scale_UI_h.removeAttribute("class");
        scale_UI_h.setAttribute("class", "form-control is-valid");
        scale_A_l.value = Number.parseInt(scale_UI_h.value) + 1;
        scale_A_h.value = 0;
        scale_A_h.removeAttribute("class");
        scale_A_h.setAttribute("class", "form-control");
    } else {
        scale_UI_h.removeAttribute("class");
        scale_UI_h.setAttribute("class", "form-control is-invalid");
    }
}, false);

scale_A_h.addEventListener('input', function (event) {
    if (Number.parseInt(scale_A_h.value) > Number.parseInt(scale_A_l.value)) {
        scale_A_h.removeAttribute("class");
        scale_A_h.setAttribute("class", "form-control is-valid");
    } else {
        scale_A_h.removeAttribute("class");
        scale_A_h.setAttribute("class", "form-control is-invalid");
    }
}, false);

const Send = () => {
    if (Number.parseInt(scale_B_h.value) === 0 || Number.parseInt(scale_E_h.value) === 0 || Number.parseInt(scale_PI_h.value) === 0 || Number.parseInt(scale_I_h.value) === 0 || Number.parseInt(scale_UI_h.value) === 0 || Number.parseInt(scale_A_h.value) === 0 || scale_B_h.className == "form-control is-invalid" || scale_E_h.className == "form-control is-invalid" || scale_PI_h.className == "form-control is-invalid" || scale_I_h.className == "form-control is-invalid" || scale_UI_h.className == "form-control is-invalid" || scale_A_h.className == "form-control is-invalid") {
        alert("Correct invalid fields!")
    } else {
        fetch(BASE_PATH + 'api/scaler/' + 1 + '/', {
            method: "PUT",
            credentials: "same-origin",
            headers: {
                "X-CSRFToken": getCookie("csrftoken"),
                "Accept": "application/json",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({lower: scale_B_l.value, upper: scale_B_h.value, level: "A1",})
        });

        fetch(BASE_PATH + 'api/scaler/' + 2 + '/', {
            method: "PUT",
            credentials: "same-origin",
            headers: {
                "X-CSRFToken": getCookie("csrftoken"),
                "Accept": "application/json",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({lower: scale_E_l.value, upper: scale_E_h.value, level: "A2",})
        });

        fetch(BASE_PATH + 'api/scaler/' + 3 + '/', {
            method: "PUT",
            credentials: "same-origin",
            headers: {
                "X-CSRFToken": getCookie("csrftoken"),
                "Accept": "application/json",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({lower: scale_PI_l.value, upper: scale_PI_h.value, level: "B1",})
        });

        fetch(BASE_PATH + 'api/scaler/' + 4 + '/', {
            method: "PUT",
            credentials: "same-origin",
            headers: {
                "X-CSRFToken": getCookie("csrftoken"),
                "Accept": "application/json",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({lower: scale_I_l.value, upper: scale_I_h.value, level: "B2",})
        });

        fetch(BASE_PATH + 'api/scaler/' + 5 + '/', {
            method: "PUT",
            credentials: "same-origin",
            headers: {
                "X-CSRFToken": getCookie("csrftoken"),
                "Accept": "application/json",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({lower: scale_UI_l.value, upper: scale_UI_h.value, level: "C1",})
        });

        fetch(BASE_PATH + 'api/scaler/' + 6 + '/', {
            method: "PUT",
            credentials: "same-origin",
            headers: {
                "X-CSRFToken": getCookie("csrftoken"),
                "Accept": "application/json",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({lower: scale_A_l.value, upper: scale_A_h.value, level: "C2",})
        }).then(function (response) {
            if (response.status === 200) {
                location.reload();
            }
        });
    }
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
