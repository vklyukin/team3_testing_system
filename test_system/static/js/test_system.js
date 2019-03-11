const BASE_PATH = 'http://localhost:5000/';
let user;
let orderrow;
let procesed = false;
let notime;
let count = 0;
let anser = -1;
let k = 0;
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

const get = path => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', path, false);
    xhr.send();
    return xhr.response;
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

const put = (path, json) => {
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
};

const sortByKey = (array, key) => array.sort(function (a, b) {
    let x = a[key];
    let y = b[key];
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
});

const get_answers = () => sortByKey(JSON.parse(get(BASE_PATH + 'api/answer/')), "number");

const get_answer = num => JSON.parse(get(BASE_PATH + 'api/answer/' + num + "/"));

const get_task = num => JSON.parse(get(BASE_PATH + 'api/question/' + num + "/"));

const get_text = () => (JSON.parse(get(BASE_PATH + 'api/question/text/')))[0]["text"];

const is_reading = task => {
    if (task["is_reading"] === true) {
        document.getElementById("reading").innerHTML = get_text();
        document.getElementById("reading").style.fontSize = "2vh";
        document.getElementById("textbu").style.display = "inline";
        document.getElementById("endbu").style.width = "40%";
        document.getElementById("endbu").style.right = "5%";
    } else {
        document.getElementById("reading").innerHTML = get_text();
        document.getElementById("reading").style.fontSize = "2vh";
        document.getElementById("textbu").style.display = "none";
        document.getElementById("endbu").style.width = "40%";
        document.getElementById("endbu").style.right = "30%";
    }
};

const send_answer = json => {
    put(BASE_PATH + 'api/answer/' + (JSON.parse(json)["pk"]) + "/", json);
};

const set_font_sizes = current_task => {
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
};


const fill_question_form = json => {
    set_font_sizes(json);
    document.getElementById("num").innerHTML = "Task № " + (count + 1);
    document.getElementById("txt").innerHTML = json["text"];
    document.getElementById("first").innerHTML = json["answ_option1"];
    document.getElementById("second").innerHTML = json["answ_option2"];
    document.getElementById("third").innerHTML = json["answ_option3"];
    document.getElementById("fourth").innerHTML = json["answ_option4"];
    document.getElementById("tmb").style.background = "#4e73df";
};

const start_timer = sectime => {
    stop = false;
    let mas = sectime.split(':');
    let seconds = (+mas[0]) * 60 * 60 + (+mas[1]) * 60 + (+mas[2]) - 0.01;
    houres = (seconds - seconds % 3600) / 3600;
    minutes = (seconds - houres * 3600 - (seconds - houres * 3600) % 60) / 60;
    secnds = seconds - houres * 3600 - minutes * 60;
    document.getElementById("tm").textContent = houres + ':' + minutes + ':' + (secnds - seconds % 1 + 1);
    document.getElementById("tmb").style.background = "#4e73df";
    seconds -= 1;

    let dt = current_task.duration;
    let time = dt.split(":");
    delta = (+time[0]) * 3600 + (+time[1]) * 60 + (+time[2]);
    setTimeout(function () {
        timer_work_mode(seconds, delta, curent)
    }, 1000);
};

const stop_timer = () => {
    document.getElementById("tmb").style.background = "red";
    let g = new answer(curent["pk"], curent["number"], anser, curent["user"], curent["question"], curent["time_started"]);
    send_answer(JSON.stringify(g));
    endtime = true;
    stop = true;
};


const timer_work_mode = (seconds, maxseconds, number) => {
    if (number === curent) {
        if (seconds > 0) {
            houres = (seconds - seconds % 3600) / 3600;
            minutes = (seconds - houres * 3600 - (seconds - houres * 3600) % 60) / 60;
            secnds = seconds - houres * 3600 - minutes * 60;
            document.getElementById("tm").textContent = houres + ':' + minutes + ':' + (secnds - seconds % 1 + 1);
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
            stop_timer();
        }
    }

};

const select = num => {
    if (!procesed) {
        procesed = true;
        if (num === 0 && !stop) {
            document.getElementById("anszero").className = "anserr";
            document.getElementById("ansone").className = "anser";
            document.getElementById("anstwo").className = "anser";
            document.getElementById("ansthre").className = "anser";
            anser = 0;
        } else if (num === 1 && !stop) {
            document.getElementById("anszero").className = "anser";
            document.getElementById("ansone").className = "anserr";
            document.getElementById("anstwo").className = "anser";
            document.getElementById("ansthre").className = "anser";
            anser = 1;
        } else if (num === 2 && !stop) {
            document.getElementById("anszero").className = "anser";
            document.getElementById("ansone").className = "anser";
            document.getElementById("anstwo").className = "anserr";
            document.getElementById("ansthre").className = "anser";
            anser = 2;
        } else if (num === 3 && !stop) {

            document.getElementById("anszero").className = "anser";
            document.getElementById("ansone").className = "anser";
            document.getElementById("anstwo").className = "anser";
            document.getElementById("ansthre").className = "anserr";
            anser = 3;
        } else anser = -1;
        procesed = false;
    }
};

const next = () => {
    checkend();
    if (!procesed) {
        procesed = true;
        if (document.getElementById("anszero").className === "anserr" || document.getElementById("ansone").className === "anserr" || document.getElementById("anstwo").className === "anserr" || document.getElementById("ansthre").className === "anserr" || endtime) {
            if (count < orderrow.length - 1) {
                count++;
                let g = new answer(curent["pk"], curent["number"], anser, curent["user"], curent["question"], curent["time_started"]);
                send_answer(JSON.stringify(g));
                if (count === -1) {
                    document.getElementById("tmb").style.display = "none";
                    document.getElementById("tmes").style.display = "none";
                    document.getElementById("tmts").style.display = "none";
                    document.getElementById("t1").style.display = "none";
                    document.getElementById("t2").style.display = "none";
                    document.getElementById("lstr").style.zIndex = 1;
                    document.getElementById("rdng").style.zIndex = -1;
                    document.getElementById("qsns").style.zIndex = -1;
                    document.getElementById("lend").style.zIndex = -1;
                    document.getElementById("clear").style.zIndex = 0;
                } else if (count === orderrow.length) {
                    document.getElementById("tmb").style.display = "none";
                    document.getElementById("tmes").style.display = "none";
                    document.getElementById("tmts").style.display = "none";
                    document.getElementById("t1").style.display = "none";
                    document.getElementById("t2").style.display = "none";
                    document.getElementById("lstr").style.zIndex = -1;
                    document.getElementById("rdng").style.zIndex = -1;
                    document.getElementById("qsns").style.zIndex = -1;
                    document.getElementById("lend").style.zIndex = 1;
                    document.getElementById("clear").style.zIndex = 0;

                } else {
                    document.getElementById("tmb").style.display = "inline-block";
                    document.getElementById("tmes").style.display = "inline-block";
                    document.getElementById("tmts").style.display = "inline-block";
                    document.getElementById("t1").style.display = "inline-block";
                    document.getElementById("t2").style.display = "inline-block";
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
                document.getElementById("tmes").style.display = "none";
                document.getElementById("tmts").style.display = "none";
                document.getElementById("t1").style.display = "none";
                document.getElementById("t2").style.display = "none";
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
};

const ontetxmenuswitch = () => {
    if (!procesed) {
        procesed = true;
        document.getElementById("lstr").style.zIndex = -1;
        document.getElementById("rdng").style.zIndex = 1;
        document.getElementById("qsns").style.zIndex = -1;
        document.getElementById("lend").style.zIndex = -1;
        document.getElementById("clear").style.zIndex = 0;
        procesed = false;
    }
};

const onqsnsmenuswitch = () => {
    if (!procesed) {
        procesed = true;
        document.getElementById("lstr").style.zIndex = -1;
        document.getElementById("rdng").style.zIndex = -1;
        document.getElementById("qsns").style.zIndex = 1;
        document.getElementById("lend").style.zIndex = -1;
        document.getElementById("clear").style.zIndex = 0;
        procesed = false;
    }

};

const gettime = (ans, tsk) => {
    let str = JSON.parse(get(BASE_PATH + 'api/time/'))["time"];
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
};

const stillhavetime = (ans, tsk) => {
    let str = JSON.parse(get(BASE_PATH + 'api/time/'))["time"];
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
};


const findstop = () => {
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
    if (i === 0 && orderrow[i]["time_started"] != null) {
        return i;
    }
    if (i === orderrow.length) {

        let ans = get_answer(+orderrow[i - 1]["pk"]);
        let tsk = get_task(+ans["question"]);
        if (orderrow[i - 1]["time_started"] == null) {
            return i - 1;
        }
        if (gettime(ans, tsk) && ans["answer"] !== -1 && ans["answer"] !== 0 && ans["answer"] !== 1 && ans["answer"] !== 2 && ans["answer"] !== 3) {
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

};

const endsession = () => {
    nextpage();
};

const startsession = () => {
    count = 0;
    curent = get_answer(+orderrow[count]["pk"]);
    current_answer = get_answer(+orderrow[count]["pk"]);
    current_task = get_task(+curent["question"]);
    fill_question_form(current_task);
    start_timer(current_task["duration"]);
    start_timerg(timeleftg());
    document.getElementById("rdng").style.zIndex = 1;
    document.getElementById("qsns").style.zIndex = 2;
    is_reading(current_task);
    document.getElementById("tmb").style.display = "inline-block";
    document.getElementById("tmes").style.display = "inline-block";
    document.getElementById("tmts").style.display = "inline-block";
    document.getElementById("t1").style.display = "inline-block";
    document.getElementById("t2").style.display = "inline-block";
    document.getElementById("lstr").style.zIndex = -1;
    document.getElementById("rdng").style.zIndex = -1;
    document.getElementById("qsns").style.zIndex = 1;
    document.getElementById("lend").style.zIndex = -1;
    document.getElementById("clear").style.zIndex = 0;
};


const initialization = () => {
    document.getElementById("tmb").style.display = "none";
    document.getElementById("tmes").style.display = "none";
    document.getElementById("tmts").style.display = "none";
    document.getElementById("t1").style.display = "none";
    document.getElementById("t2").style.display = "none";
    document.getElementById("clear").style.zIndex = 100;

    orderrow = get_answers();
    count = findstop();
    if (count !== -1 && count !== orderrow.length) checkend();
    if (count === -1) {
        document.getElementById("tmb").style.display = "none";
        document.getElementById("tmes").style.display = "none";
        document.getElementById("tmts").style.display = "none";
        document.getElementById("t1").style.display = "none";
        document.getElementById("t2").style.display = "none";
        document.getElementById("lstr").style.zIndex = 1;
        document.getElementById("rdng").style.zIndex = -1;
        document.getElementById("qsns").style.zIndex = -1;
        document.getElementById("lend").style.zIndex = -1;
        document.getElementById("clear").style.zIndex = 0;
    } else if (count === orderrow.length) {
        document.getElementById("tmb").style.display = "none";
        document.getElementById("tmes").style.display = "none";
        document.getElementById("tmts").style.display = "none";
        document.getElementById("t1").style.display = "none";
        document.getElementById("t2").style.display = "none";
        document.getElementById("lstr").style.zIndex = -1;
        document.getElementById("rdng").style.zIndex = -1;
        document.getElementById("qsns").style.zIndex = -1;
        document.getElementById("lend").style.zIndex = 1;
        document.getElementById("clear").style.zIndex = 0;
    } else {
        document.getElementById("tmb").style.display = "inline-block";
        document.getElementById("tmes").style.display = "inline-block";
        document.getElementById("tmts").style.display = "inline-block";
        document.getElementById("t1").style.display = "inline-block";
        document.getElementById("t2").style.display = "inline-block";
        curent = get_answer(+orderrow[count]["pk"]);
        current_answer = get_answer(+orderrow[count]["pk"]);
        current_task = get_task(+curent["question"]);
        fill_question_form(current_task);
        if (have_unused_time) start_timer(stillhavetime(current_answer, current_task));
        else start_timer(current_task["duration"]);
        start_timerg(timeleftg());
        document.getElementById("rdng").style.zIndex = 1;
        document.getElementById("qsns").style.zIndex = 2;
        is_reading(current_task);
    }
    document.getElementById("clear").style.zIndex = 0;
};


const order66 = () => {
    document.getElementById("tmb").style.display = "none";
    document.getElementById("tmes").style.display = "none";
    document.getElementById("tmts").style.display = "none";
    document.getElementById("t1").style.display = "none";
    document.getElementById("t2").style.display = "none";
    document.getElementById("assk").style.zIndex = 10;
};

const yes = () => {
    document.getElementById("clear").style.zIndex = 1;
    document.getElementById("lstr").style.zIndex = -1;
    document.getElementById("rdng").style.zIndex = -1;
    document.getElementById("qsns").style.zIndex = -1;
    document.getElementById("lend").style.zIndex = -1;
    document.getElementById("assk").style.zIndex = -1;
    setTimeout(function () {
        for (i = count; i < orderrow.length; i++) {
            current_answer = get_answer(+orderrow[i]["pk"]);
            current_task = get_task(+current_answer["question"]);
            let g = new answer(current_answer["pk"], current_answer["number"], -1, current_answer["user"], current_answer["question"], current_answer["time_started"]);
            send_answer(JSON.stringify(g));
        }
        location.reload(true);
    }, 100);
};

const no = () => {
    document.getElementById("assk").style.zIndex = -1;
    document.getElementById("tmb").style.display = "inline-block";
    document.getElementById("tmes").style.display = "inline-block";
    document.getElementById("tmts").style.display = "inline-block";
    document.getElementById("t1").style.display = "inline-block";
    document.getElementById("t2").style.display = "inline-block";
};


const timeleftg = () => {
    let str = JSON.parse(get(BASE_PATH + 'api/time/'))["time"];
    let mas = str.split(':');
    let houres = (+mas[0].substring(mas[0].length - 2, mas[0].length));
    let minutes = (+mas[1]);
    let secnds = (+mas[2].substring(0, 2));
    let delta = houres * 3600 + minutes * 60 + secnds;
    let ex = (JSON.parse(get(BASE_PATH + 'api/user-exam/'))[0]["exam"]);
    let rr = (JSON.parse(get(BASE_PATH + 'api/exam/' + ex + '/')))["finish"];
    let dt = rr;
    let datetime = dt.split("T");
    let date = datetime[0].split("-");
    let datetime2 = datetime[1].split("+");
    let time = datetime2[0].split(":");
    delta = (+time[0]) * 3600 + (+time[1]) * 60 + (+time[2]) - (+delta);
    let h = (delta - delta % 3600) / 3600;
    let m = (delta - h * 3600 - (delta - h * 3600) % 60) / 60;
    let s = delta - m * 60 - h * 3600;
    return h + ":" + m + ":" + s;
};


const start_timerg = sectime => {
    stop = false;
    let mas = sectime.split(':');
    let seconds = (+mas[0]) * 60 * 60 + (+mas[1]) * 60 + (+mas[2]) - 0.01;
    houres = (seconds - seconds % 3600) / 3600;
    minutes = (seconds - houres * 3600 - (seconds - houres * 3600) % 60) / 60;
    secnds = seconds - houres * 3600 - minutes * 60;
    document.getElementById("ts").textContent = houres + ':' + minutes + ':' + (secnds - seconds % 1 + 1);
    document.getElementById("tmts").style.background = "#4e73df";
    let ex = (JSON.parse(get(BASE_PATH + 'api/user-exam/'))[0]["exam"]);
    let rr = (JSON.parse(get(BASE_PATH + 'api/exam/' + ex + '/')))["finish"];
    let dt = rr;
    let datetime = dt.split("T");
    let date = datetime[0].split("-");
    let datetime2 = datetime[1].split("+");
    let time = datetime2[0].split(":");
    let delta = (+time[0]) * 3600 + (+time[1]) * 60 + (+time[2]);
    rr = (JSON.parse(get(BASE_PATH + 'api/exam/' + ex + '/')))["start"];
    dt = rr;
    datetime = dt.split("T");
    date = datetime[0].split("-");
    datetime2 = datetime[1].split("+");
    time = datetime2[0].split(":");
    delta = delta - (+time[0]) * 3600 + (+time[1]) * 60 + (+time[2]);
    seconds -= 1;
    setTimeout(function () {
        timer_work_modeg(seconds, delta)
    }, 1000);
};

const stop_timerg = () => {
    document.getElementById("tmb").style.display = "none";
    document.getElementById("tmes").style.display = "none";
    document.getElementById("tmts").style.display = "none";
    document.getElementById("t1").style.display = "none";
    document.getElementById("t2").style.display = "none";
    setTimeout(function () {
        yes();
    }, 100);
};


const timer_work_modeg = (seconds, maxseconds) => {
    if (seconds > 0) {
        houres = (seconds - seconds % 3600) / 3600;
        minutes = (seconds - houres * 3600 - (seconds - houres * 3600) % 60) / 60;
        secnds = seconds - houres * 3600 - minutes * 60;
        document.getElementById("ts").textContent = houres + ':' + minutes + ':' + (secnds - seconds % 1 + 1);
        seconds -= 1;
        setTimeout(function () {
            timer_work_modeg(seconds, maxseconds)
        }, 1000);
    } else {
        houres = (seconds - seconds % 3600) / 3600;
        minutes = (seconds - houres * 3600 - (seconds - houres * 3600) % 60) / 60;
        secnds = seconds - houres * 3600 - minutes * 60;
        document.getElementById("ts").textContent = houres + ':' + minutes + ':' + (secnds - seconds % 1);
        stop_timerg();
    }

};

const nextpage = () => {
    window.location.href = BASE_PATH + 'speaking/info/';
};


const checkend = () => {
    let user = JSON.parse(get(BASE_PATH + 'api/mark/'));
    if (user[0]["removed"] === true) {
        document.getElementById("clear").style.zIndex = 1;
        document.getElementById("lstr").style.zIndex = -1;
        document.getElementById("rdng").style.zIndex = -1;
        document.getElementById("qsns").style.zIndex = -1;
        document.getElementById("lend").style.zIndex = -1;
        document.getElementById("assk").style.zIndex = -1;
        yes();
        nextpage();
    }
};
