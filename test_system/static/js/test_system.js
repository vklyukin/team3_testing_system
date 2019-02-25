let user;
let orderrow;
let procesed;
let notime;
let count = 0;
let anser = -1;
let k=0;
let stop = false;
let have_unused_time = false;
let current_task;
let current_answer;

class answer {
    constructor(pk, number, answer, user, question, time_started) {
        this.pk = pk;
        this.number = number;
        this.answer = answer;
        this.user = user;
        this.question = question;
        this.time_started = time_started;
    }
}

class task {
    constructor(pk, number, text, answ_correct, answ_option1, answ_option2, answ_option3, answ_option4, duration, is_reading) {
        this.pk = pk;
        this.number = number;
        this.text = text;
        this.answ_correct = answ_correct;
        this.answ_option1 = answ_option1;
        this.answ_option2 = answ_option2;
        this.answ_option3 = answ_option3;
        this.answ_option4 = answ_option4;
        this.duration = duration;
        this.is_reading = is_reading;
    }
}

function get(path) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', path, false);
    xhr.send();
    return xhr.response;
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

function put(path, json) {
    fetch(path, {
        method: "PUT",
        credentials: "same-origin",
        headers: {
            "X-CSRFToken": getCookie("csrftoken"),
            "Accept": "application/json",
            'Content-Type': 'application/json'
        },
        body: json
    })
}

function sortByKey(array, key) {
    return array.sort(function (a, b) {
        let x = a[key];
        let y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

function get_answers() {
    return sortByKey(JSON.parse(get("http://localhost:5000/api/answer/")), "number");
}

function get_answer(num) {
    return JSON.parse(get("http://localhost:5000/api/answer/" + num + "/"));
}

function get_task(num) {
    return JSON.parse(get("http://localhost:5000/api/question/" + num + "/"));
}

function get_text() {
    return (JSON.parse(get("http://localhost:5000/api/question/text/1/")))["text"];
}

function is_reading(task) {
    if (task["is_reading"] === true) {
        document.getElementById("reading").textContent = get_text();
        document.getElementById("reading").style.fontSize = "2vh";
        document.getElementById("textbu").style.display = "inline";
        document.getElementById("endbu").style.width = "40%";
        document.getElementById("endbu").style.right = "5%";
    } else {
        document.getElementById("reading").textContent = get_text();
        document.getElementById("reading").style.fontSize = "2vh";
        document.getElementById("textbu").style.display = "none";
        document.getElementById("endbu").style.width = "40%";
        document.getElementById("endbu").style.right = "30%";
    }
}

function send_answer(json) {
    put("http://localhost:5000/api/answer/" + (JSON.parse(json)["pk"]) + "/", json);
}

function set_font_sizes(current_task) {
    if ((+current_task["answ_option1"].length > 0)
        & (+current_task["answ_option2"].length > 0)
        & (+current_task["answ_option3"].length > 0)
        & (+current_task["answ_option4"].length > 0)
        & (+current_task["text"].length > 0)) {
        document.getElementById("txt").style.fontSize = "2vh";
        document.getElementById("first").style.fontSize = "2.15vh";
        document.getElementById("second").style.fontSize = "2.15vh";
        document.getElementById("third").style.fontSize = "2.15vh";
        document.getElementById("fourth").style.fontSize = "2.15vh";
    }
    if ((+current_task["answ_option1"].length > 50)
        & (+current_task["answ_option2"].length > 50)
        & (+current_task["answ_option3"].length > 50)
        & (+current_task["answ_option4"].length > 50)
        & (+current_task["text"].length > 50)) {
        document.getElementById("txt").style.fontSize = "1.75vh";
        document.getElementById("first").style.fontSize = "2vh";
        document.getElementById("second").style.fontSize = "2vh";
        document.getElementById("third").style.fontSize = "2vh";
        document.getElementById("fourth").style.fontSize = "2vh";
    }

    if ((+current_task["answ_option1"].length > 150)
        & (++current_task["answ_option2"].length > 150)
        & (+current_task["answ_option3"].length > 150)
        & (+current_task["answ_option4"].length > 150)
        & (+current_task["text"].length > 150)) {
        document.getElementById("txt").style.fontSize = "1.5vh";
        document.getElementById("first").style.fontSize = "1.7vh";
        document.getElementById("second").style.fontSize = "1.7vh";
        document.getElementById("third").style.fontSize = "1.7vh";
        document.getElementById("fourth").style.fontSize = "1.7vh";
    }

    if ((+current_task["answ_option1"].length > 250)
        & (+current_task["answ_option2"].length > 250)
        & (+current_task["answ_option3"].length > 250)
        & (+current_task["answ_option4"].length > 250)
        & (+current_task["text"].length > 250)) {
        document.getElementById("txt").style.fontSize = "1.2vh";
        document.getElementById("first").style.fontSize = "1.4vh";
        document.getElementById("second").style.fontSize = "1.4vh";
        document.getElementById("third").style.fontSize = "1.4vh";
        document.getElementById("fourth").style.fontSize = "1.4vh";
    }
    if ((+current_task["answ_option1"].length > 350)
        & (+current_task["answ_option2"].length > 350)
        & (+current_task["answ_option3"].length > 350)
        & (+current_task["answ_option4"].length > 350)
        & (+current_task["text"].length > 350)) {
        document.getElementById("txt").style.fontSize = "1vh";
        document.getElementById("first").style.fontSize = "1.2vh";
        document.getElementById("second").style.fontSize = "1.2vh";
        document.getElementById("third").style.fontSize = "1.2vh";
        document.getElementById("fourth").style.fontSize = "1.2vh";
    }
}


function fill_question_form(json) {
    set_font_sizes(json);
    document.getElementById("num").innerHTML = "Task № " + (count+1);
    document.getElementById("txt").innerHTML = json["text"];
    document.getElementById("first").innerHTML = json["answ_option1"];
    document.getElementById("second").innerHTML = json["answ_option2"];
    document.getElementById("third").innerHTML = json["answ_option3"];
    document.getElementById("fourth").innerHTML = json["answ_option4"];
    document.getElementById("tmb").style.background = "#4e73df";
   // k++;
}

function start_timer(sectime) {
    stop = false;
    let mas = sectime.split(':');
    let seconds = (+mas[0]) * 60 * 60 + (+mas[1]) * 60 + (+mas[2]) - 0.01;
    houres = (seconds - seconds % 3600) / 3600;
    minutes = (seconds - houres * 3600 - (seconds - houres * 3600) % 60) / 60;
    secnds = seconds - houres * 3600 - minutes * 60;
    document.getElementById("tm").textContent = houres + ':' + minutes + ':' + (secnds - seconds % 1 + 1);
    document.getElementById("tmb").style.background = "#4e73df";
    seconds -= 1;
    setTimeout(function () {
        timer_work_mode(seconds, seconds, curent)
    }, 1000);
}

function stop_timer() {
    endtime = true;
    stop = true;
}


function timer_work_mode(seconds, maxseconds, number) {
    if (number == curent) {
        if (seconds > 0) {
            houres = (seconds - seconds % 3600) / 3600;
            minutes = (seconds - houres * 3600 - (seconds - houres * 3600) % 60) / 60;
            secnds = seconds - houres * 3600 - minutes * 60;
            document.getElementById("tm").textContent = houres + ':' + minutes + ':' + (secnds - seconds % 1 + 1);
            let num = 278 - (278 * seconds / maxseconds) + (278 * seconds / maxseconds) % 1;
            if (num < 142)
                document.getElementById("tmb").style.background = "rgb(" + (78 + num) + ", 115, 223)";
            else document.getElementById("tmb").style.background = "rgb(220, 115, " + (223 - num + 142) + ")";
            seconds -= 1;
            procesed = false;
            setTimeout(function () {
                timer_work_mode(seconds, maxseconds, number)
            }, 1000);
        } else {
            houres = (seconds - seconds % 3600) / 3600;
            minutes = (seconds - houres * 3600 - (seconds - houres * 3600) % 60) / 60;
            secnds = seconds - houres * 3600 - minutes * 60;
            document.getElementById("tm").textContent = houres + ':' + minutes + ':' + (secnds - seconds % 1);
            let num = 278 - (278 * seconds / maxseconds) + (278 * seconds / maxseconds) % 1;
            if (num < 142)
                document.getElementById("tmb").style.background = "rgb(" + (78 + num) + ", 115, 223)";
            else document.getElementById("tmb").style.background = "rgb(220, 115, " + (223 - num + 142) + ")";
            stop_timer();
        }
    }

}

function select(num) {
    if (!procesed) {
        procesed = true;
        if (num == 0 && !stop) {
            document.getElementById("anszero").className = "anserr";
            document.getElementById("ansone").className = "anser";
            document.getElementById("anstwo").className = "anser";
            document.getElementById("ansthre").className = "anser";
            anser = 0;
        } else if (num == 1 && !stop) {
            document.getElementById("anszero").className = "anser";
            document.getElementById("ansone").className = "anserr";
            document.getElementById("anstwo").className = "anser";
            document.getElementById("ansthre").className = "anser";
            anser = 1;
        } else if (num == 2 && !stop) {
            document.getElementById("anszero").className = "anser";
            document.getElementById("ansone").className = "anser";
            document.getElementById("anstwo").className = "anserr";
            document.getElementById("ansthre").className = "anser";
            anser = 2;
        } else if (num == 3 && !stop) {

            document.getElementById("anszero").className = "anser";
            document.getElementById("ansone").className = "anser";
            document.getElementById("anstwo").className = "anser";
            document.getElementById("ansthre").className = "anserr";
            anser = 3;
        } else anser = -1;
        procesed = false;
    }
}

function next() {
    if (!procesed) {
        procesed = true;
        if (document.getElementById("anszero").className === "anserr" || document.getElementById("ansone").className === "anserr" || document.getElementById("anstwo").className === "anserr" || document.getElementById("ansthre").className === "anserr" || endtime) {
            if (count < orderrow.length - 1) {
                count++;
                let g = new answer(curent["pk"], curent["number"], anser, curent["user"], curent["question"], curent["time_started"]);
                send_answer(JSON.stringify(g));
                if (count === -1) {
                    document.getElementById("tmb").style.display = "none";
                    document.getElementById("lstr").style.zIndex = 1;
                    document.getElementById("rdng").style.zIndex = -1;
                    document.getElementById("qsns").style.zIndex = -1;
                    document.getElementById("lend").style.zIndex = -1;
                    document.getElementById("clear").style.zIndex = 0;
                } else if (count === orderrow.length) {
                    document.getElementById("tmb").style.display = "none";
                    document.getElementById("lstr").style.zIndex = -1;
                    document.getElementById("rdng").style.zIndex = -1;
                    document.getElementById("qsns").style.zIndex = -1;
                    document.getElementById("lend").style.zIndex = 1;
                    document.getElementById("clear").style.zIndex = 0;

                } else {
                    document.getElementById("tmb").style.display = "block";
                    curent = get_answer(+orderrow[count]["pk"]);
                    current_answer = get_answer(+orderrow[count]["pk"]);
                    current_task = get_task(+curent["question"]);
                    fill_question_form(current_task);
                    start_timer(current_task["duration"]);
                    document.getElementById("rdng").style.zIndex = 1;
                    document.getElementById("qsns").style.zIndex = 2;
                    is_reading(current_task);
                }
                document.getElementById("anszero").className = "anser";
                document.getElementById("ansone").className = "anser";
                document.getElementById("anstwo").className = "anser";
                document.getElementById("ansthre").className = "anser";
                notime = false;
                endtime = false;
                anser = -1;
                stop = false;

            } else {
                document.getElementById("tmb").style.display = "none";
                let g = new answer(curent["pk"], curent["number"], anser, curent["user"], curent["question"], curent["time_started"]);
                send_answer(JSON.stringify(g));
                document.getElementById("lstr").style.zIndex = -1;
                document.getElementById("rdng").style.zIndex = -1;
                document.getElementById("qsns").style.zIndex = -1;
                document.getElementById("lend").style.zIndex = 1;
                document.getElementById("clear").style.zIndex = 0;
            }
        }
    }
    procesed = false;
}

function ontetxmenuswitch() {
    if (!procesed) {
        procesed = true;
        document.getElementById("lstr").style.zIndex = -1;
        document.getElementById("rdng").style.zIndex = 1;
        document.getElementById("qsns").style.zIndex = -1;
        document.getElementById("lend").style.zIndex = -1;
        document.getElementById("clear").style.zIndex = 0;
        procesed = false;
    }
}

function onqsnsmenuswitch() {
    if (!procesed) {
        procesed = true;
        document.getElementById("lstr").style.zIndex = -1;
        document.getElementById("rdng").style.zIndex = -1;
        document.getElementById("qsns").style.zIndex = 1;
        document.getElementById("lend").style.zIndex = -1;
        document.getElementById("clear").style.zIndex = 0;
        procesed = false;
    }

}

function gettime(ans, tsk) {
    let str = JSON.parse(get("http://localhost:5000/api/time/"))["time"]
    let mas = str.split(':');
    let houres = (+mas[0].substring(mas[0].length - 2, mas[0].length));
    let minutes = (+mas[1]);
    let secnds = (+mas[2].substring(0, 2));
    let delta = houres * 3600 + minutes * 60 + secnds;
    str = ans["time_started"];
    mas = str.split(':');
    houres = (+mas[0].substring(mas[0].length - 2, mas[0].length));
    minutes = (+mas[1]);
    secnds = (+mas[2].substring(0, 2));
    delta = delta - (houres * 3600 + minutes * 60 + secnds);
    str = tsk["duration"];
    mas = str.split(':');
    houres = (+mas[0]);
    minutes = (+mas[1]);
    secnds = (+mas[2]);
    delta = delta - (houres * 3600 + minutes * 60 + secnds);
    if (delta < 0) return true;
    else return false;
}

function stillhavetime(ans, tsk) {
    let str = JSON.parse(get("http://localhost:5000/api/time/"))["time"]
    let mas = str.split(':');
    let houres = (+mas[0].substring(mas[0].length - 2, mas[0].length));
    let minutes = (+mas[1]);
    let secnds = (+mas[2].substring(0, 2));
    let delta = houres * 3600 + minutes * 60 + secnds;
    str = ans["time_started"];
    mas = str.split(':');
    houres = (+mas[0].substring(mas[0].length - 2, mas[0].length));
    minutes = (+mas[1]);
    secnds = (+mas[2].substring(0, 2));
    delta = delta - (houres * 3600 + minutes * 60 + secnds);
    str = tsk["duration"];
    mas = str.split(':');
    houres = (+mas[0]);
    minutes = (+mas[1]);
    secnds = (+mas[2]);
    delta = (houres * 3600 + minutes * 60 + secnds) - delta;
    houres = delta / 3600;
    minutes = (delta - houres * 3600) / 60;
    secnds = delta - minutes * 60 - houres * 3600;
    return houres + ":" + minutes + ":" + secnds;
}


function findstop() {
    have_unused_time = false;
    for (i = 0; i < orderrow.length; i++) {
        if (orderrow[i]["time_started"] == null) {
            if (i > 0) {
                let ans = get_answer(+orderrow[i - 1]["pk"]);
                let tsk = get_task(+ans["question"]);
                if (gettime(ans, tsk)) {
                    have_unused_time = true;
                    break;
                } else {
                    break;
                }
            } else {
                break;
            }

        }
    }
    if (have_unused_time) i--;
    if (i === 0 && orderrow[i]["time_started"] == null) return -1;
    if (i === 0 && orderrow[i]["time_started"] != null) {return i;}
    if (i === orderrow.length) {

        let ans = get_answer(+orderrow[i - 1]["pk"]);
        let tsk = get_task(+ans["question"]);
        if (orderrow[i - 1]["time_started"] == null) {
            return i - 1;
        }
        if (gettime(ans, tsk) && ans["answer"] !== 0 && ans["answer"] !==1 && ans["answer"] !==2 && ans["answer"] !== 3) {
            have_unused_time = true;
            return i - 1;
        } else {
            document.getElementById("lstr").style.zIndex = -1;
            document.getElementById("rdng").style.zIndex = -1;
            document.getElementById("qsns").style.zIndex = -1;
            document.getElementById("lend").style.zIndex = 1;
            document.getElementById("clear").style.zIndex = 0;
            return orderrow.length;
        }
    } else return i;

}

function endsession() {
    alert("End Session");
}

function startsession() {
    count = 0;
    curent = get_answer(+orderrow[count]["pk"]);
    current_answer = get_answer(+orderrow[count]["pk"]);
    current_task = get_task(+curent["question"]);
    fill_question_form(current_task);
    start_timer(current_task["duration"]);
    document.getElementById("rdng").style.zIndex = 1;
    document.getElementById("qsns").style.zIndex = 2;
    is_reading(current_task);
    document.getElementById("tmb").style.display = "block";
    document.getElementById("lstr").style.zIndex = -1;
    document.getElementById("rdng").style.zIndex = -1;
    document.getElementById("qsns").style.zIndex = 1;
    document.getElementById("lend").style.zIndex = -1;
    document.getElementById("clear").style.zIndex = 0;
}


function initialization() {
    document.getElementById("tmb").style.display = "none";
    document.getElementById("clear").style.zIndex = 100;

    orderrow = get_answers();
    count = findstop();
    if (count === -1) {
        document.getElementById("tmb").style.display = "none";
        document.getElementById("lstr").style.zIndex = 1;
        document.getElementById("rdng").style.zIndex = -1;
        document.getElementById("qsns").style.zIndex = -1;
        document.getElementById("lend").style.zIndex = -1;
        document.getElementById("clear").style.zIndex = 0;
    } else if (count === orderrow.length) {
        document.getElementById("tmb").style.display = "none";
        document.getElementById("lstr").style.zIndex = -1;
        document.getElementById("rdng").style.zIndex = -1;
        document.getElementById("qsns").style.zIndex = -1;
        document.getElementById("lend").style.zIndex = 1;
        document.getElementById("clear").style.zIndex = 0;
    } else {
        document.getElementById("tmb").style.display = "block";
        curent = get_answer(+orderrow[count]["pk"]);
        current_answer = get_answer(+orderrow[count]["pk"]);
        current_task = get_task(+curent["question"]);
        fill_question_form(current_task);
        if (have_unused_time) start_timer(stillhavetime(current_answer, current_task));
        else start_timer(current_task["duration"]);
        document.getElementById("rdng").style.zIndex = 1;
        document.getElementById("qsns").style.zIndex = 2;
        is_reading(current_task);
    }
    document.getElementById("clear").style.zIndex = 0;
}

