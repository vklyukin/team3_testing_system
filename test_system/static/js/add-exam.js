const BASE_PATH = 'http://localhost:5000/';

const Start = () => {
  const q_duration_div = document.getElementById('q_start');
  const q_duration_container = document.getElementById('q_start_cont');
  const picker = new Picker(q_duration_div, {
    format: 'HH:mm',
    container: q_duration_container,
    controls: true,
    inline: true,
    headers: true,
    rows: 2
  });
};

const Startt = () => {
  const q_duration_div = document.getElementById('q_date');
  const q_duration_container = document.getElementById('q_date_cont');
  const picker = new Picker(q_duration_div, {
    format: 'YYYY-MM-D',
    container: q_duration_container,
    controls: true,
    inline: true,
    headers: true,
    rows: 3
  });
};

const Starttt = () => {
  const q_duration_div = document.getElementById('q_finish');
  const q_duration_container = document.getElementById('q_finish_cont');
  const picker = new Picker(q_duration_div, {
    format: 'HH:mm',
    container: q_duration_container,
    controls: true,
    inline: true,
    headers: true,
    rows: 2
  });
};

const SendPost = () => {
       if( q_major.value!=="---"&&q_stream.value!==""&&timecheck(q_start.textContent,q_finish.textContent)){
  fetch(BASE_PATH + 'api/exam/', {
      method: "POST",
      credentials: "same-origin", //including cookie information
      headers: {
        "X-CSRFToken": getCookie("csrftoken"), //token to check user validation
          "Accept": "application/json",
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({major:  q_major.value, stream: q_stream.value, start: (q_date.textContent+"T"+q_start.textContent+":00+03:00"), finish: (q_date.textContent+"T"+q_finish.textContent+":00+03:00")},null,4)
    })
    .then(function (response) {
      if(response.status === 201){
        window.location.href = BASE_PATH + 'stream-settings/';
      }
    })}
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


function timerebuild(str)
{
    let cdatetime=str.split("T");
    let cdatetime2=cdatetime[1].split("+");
    let mas=cdatetime2[0].split(":");
    return mas[0]+":"+mas[1];
}

function daterebuild(str)
{
    let cdatetime=str.split("T");
    let cdatetime2=cdatetime[0].split("-");
    return cdatetime2[0]+"-"+cdatetime2[1]+"-"+cdatetime2[2];
}


function timecheck(str1,str2)
{
    let mas1=str1.split(":");
    let mas2=str2.split(":");
    let val=(+mas2[0])*3600+(+mas2[1])*60-(+mas1[0])*3600-(+mas1[1])*60;
    if (val>0) return true;
    else return false;
}