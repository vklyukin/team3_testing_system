let mas=[];
let user;
let room;
let block=false;

class roomsm {
     constructor(_room) {
        this.room=_room;
    }
}

class rooom {
    constructor(_pk,_user,_room,_position,_first_name,_second_name,_removed) {
        this.pk=_pk;
        this.user=_user;
        this.room=_room;
        this.position=_position;
        this.first_name=_first_name;
        this.second_name=_second_name;
        this.removed=_removed;
    }
}


function get(path) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', path, false);
    xhr.send();
    return xhr.response;
}

function post(path,json) {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', path, false);
    xhr.send(json);
    return xhr.response;
}


function getinfo()
{
    return JSON.parse(get(BASE_PATH + 'api/mark/'));
}


function parseinfo(txt1,txt2,stream)
{
    let dt=txt1;
    let datetime=dt.split("T");
    let date=datetime[0].split("-");
    let datetime2=datetime[1].split("+");
    let time=datetime2[0].split(":");
    let text=stream+"<br>"+ date[2]+"."+date[1]+"."+date[0]+"<br>"+"Start : "+time[0]+":"+time[1]+"<br>"+"Finish : ";
    dt=txt2;
    datetime=dt.split("T");
    date=datetime[0].split("-");
    datetime2=datetime[1].split("+");
    time=datetime2[0].split(":");
    text=text+time[0]+":"+time[1];
    return text;
}


function checkstreamtime(stream) {
    let cur = JSON.parse(get(BASE_PATH + '/api/time/'))["time"]
    let tst = stream["finish"];
    let cdatetime=cur.split("T");
    let cdate=cdatetime[0].split("-");
    let cdatetime2=cdatetime[1].split("+");
    let ctime=cdatetime2[0].split(":");

    let tdatetime=tst.split("T");
    let tdate=tdatetime[0].split("-");
    let tdatetime2=tdatetime[1].split("+");
    let ttime=tdatetime2[0].split(":");

    if ((+cdate[0])<(+tdate[0])||((+cdate[1])<(+tdate[1])&&(+cdate[0])<=(+tdate[0]))||((+cdate[2])<(+tdate[2])&&(+cdate[1])<=(+tdate[1])&&(+cdate[0])<=(+tdate[0])))
    {
        return true;
    }
    else   if ((+cdate[0])===(+tdate[0])&&(+cdate[1])===(+tdate[1])&&(+cdate[2])===(+tdate[2]))
    {
       if((+ctime[0])*3600+(+ctime[1])*60+(+ctime[2])-(+ttime[0])*3600-(+ttime[1])*60-(+ttime[2])<0)
       return true;
    }
    else return false;
}

function counttime(qwe)
{
    let kf=0;
    let st=+user[0]["position"];
    let tch=+qwe["amount_teach"];
    if(qwe["amount_teach"]>0)
    kf=(st-st%tch)/tch;
    else return "inf";
    let ctime=qwe["avg_time"].split(":");
    let time=(+ctime[0])*3600+(+ctime[1])*60+(+ctime[2]);
    let seconds=time*kf;

    let minutes = (seconds - (seconds) % 60) / 60;

    return minutes+" minutes";
}

function test()
{
    user=getinfo();
    checkend(user);
    if(null!==user[0]["room"]){
    room=JSON.parse(get(BASE_PATH + 'api/room/'+user[0]["room"]+'/'));
    document.getElementById("in0").innerHTML=room["number"];
    document.getElementById("in1").innerHTML=user[0]["position"];
    document.getElementById("in2").innerHTML=counttime(room);
    document.getElementById("clear").style.zIndex=-1;
    document.getElementById("tst").style.zIndex = 1;
    setTimeout(function () {
        test();
    }, 60000);
    }
    else sendchoose();

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





function sendchoose()
{
    window.location.href = BASE_PATH + 'speaking/choose/';
}



function back()
{
    document.getElementById("clear").style.zIndex = 10;
    sendchoose();
}



function yes()
{
    document.getElementById("clear").style.zIndex = 1;
        sendchoose();

}


function no()
{
    document.getElementById("assk").style.zIndex = -1;
    document.getElementById("tst").style.zIndex = 1;
}


function checkend(user)
{
    if(+user[0]["position"]===-1)
    {
        window.location.href = BASE_PATH + 'speaking/thanks/';
    }
}
