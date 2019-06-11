const SendPost = () => {
    const q_number = document.getElementById('q_number').innerHTML;
    const q_text = document.getElementById('q_text').value;
    const q_answ_1 = document.getElementById('q_ans_1').value;
    const q_answ_2 = document.getElementById('q_ans_2').value;
    const q_answ_3 = document.getElementById('q_ans_3').value;
    const q_answ_4 = document.getElementById('q_ans_4').value;
    const q_corr = document.getElementById('q_corr');
    let selected = q_corr.options[q_corr.selectedIndex].value - 1;
    const q_reading = document.getElementById('q_reading').checked;
    fetch(BASE_PATH + 'api/question/', {
        method: "POST",
        credentials: "same-origin", //including cookie information
        headers: {
            "X-CSRFToken": getCookie("csrftoken"), //token to check user validation
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            number: q_number,
            text: q_text,
            answ_correct: selected,
            answ_option1: q_answ_1,
            answ_option2: q_answ_2,
            answ_option3: q_answ_3,
            answ_option4: q_answ_4,
            is_reading: q_reading,
        })
    }).then(function (response) {
        if (response.status === 201) {
            window.location.href = BASE_PATH + 'test_editor/';
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
