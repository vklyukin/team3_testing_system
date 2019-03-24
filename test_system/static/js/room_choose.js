let mas=[];
let block=false;

class room {
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

class roomsm {
     constructor(_room) {
        this.room=_room;
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
    return JSON.parse(get(BASE_PATH + 'api/room/'));
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
    let cur = JSON.parse(get(BASE_PATH + 'api/time/'))["time"]
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
    let st=+qwe["amount_stud"]-1;
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
    checkend();
    mas=getinfo();
    let usr=JSON.parse(get(BASE_PATH + 'api/mark/'))[0];
    for(i=0;i<mas.length;i++)
    {
    if(mas[i]["pk"]!=usr["room"]){
    let time=counttime(mas[i]);
    let text="Room №"+mas[i]["number"]+"<br>Students - "+mas[i]["amount_stud"]+"<br>Teachers - "+mas[i]["amount_teach"]+"<br>Waiting time<br>"+time;
    let obj=document.createElement("div");
    obj.setAttribute("class","variant");
    obj.setAttribute("id","var"+i);

    let objtext=document.createElement("div");
    objtext.setAttribute("class","textform");
    objtext.innerHTML=text;
    let objin=document.createElement("button");
    objin.style.color="#858796";
    objin.setAttribute("class","choose");
    objin.setAttribute("id","var"+i+"btn");
    objin.innerHTML="<span id='txt"+i+"'>Submit</span>";
    objin.setAttribute("display","none");
    let circle=document.createElement("span")
    circle.setAttribute("class","spinner");
    circle.setAttribute("id","rnd"+i);
    circle.style.display="none";
    objin.onclick=function(){
    if(!block){
    document.getElementById("txt"+(this.id).substring(3,4)+"").style.display="none";
    document.getElementById("rnd"+(this.id).substring(3,4)+"").style.display="block";
    block=true;
    sendchoose(this.id);
    }
    }
    objin.appendChild(circle);
    obj.appendChild(objtext);
    obj.appendChild(objin);

    obj.onclick=function()
    {
        if(!block){
        if(this.style.height==="225px") {
        }
        else
        {
         this.style.height="225px";
         document.getElementById(this.id+"btn").style.display="inline-block";

         for(j=0;j<mas.length;j++)
         {
            if(+(this.id).substring(3)!==j)
            {
            document.getElementById("var"+j+"btn").style.display="none";
            document.getElementById("var"+j).style.height="175px";
            }
         }
        }
        }
    }
    document.getElementById("tst").appendChild(obj);
    }
        else{

    let time=counttime(mas[i]);
    let text="Return to my room";
    let obj=document.createElement("div");
    obj.setAttribute("class","variant");
    obj.setAttribute("id","var"+i);

    let objtext=document.createElement("div");
    objtext.setAttribute("class","textformm");
    objtext.innerHTML=text;
    let objin=document.createElement("button");
    objin.style.color="#858796";
    objin.setAttribute("class","choose");
    objin.setAttribute("id","var"+i+"btn");
    objin.innerHTML="<span id='txt"+i+"'>Submit</span>";
    objin.setAttribute("display","none");
    let circle=document.createElement("span")
    circle.setAttribute("class","spinner");
    circle.setAttribute("id","rnd"+i);
    circle.style.display="none";
    objin.onclick=function(){
    if(!block){
    document.getElementById("txt"+(this.id).substring(3,4)+"").style.display="none";
    document.getElementById("rnd"+(this.id).substring(3,4)+"").style.display="block";
    block=true;
    window.location.href = BASE_PATH + 'speaking/info/';
    }
    }
    objin.appendChild(circle);
    obj.appendChild(objtext);
    obj.appendChild(objin);

    obj.onclick=function()
    {
        if(!block){
        if(this.style.height==="225px") {
        }
        else
        {
         this.style.height="225px";
         document.getElementById(this.id+"btn").style.display="inline-block";

         for(j=0;j<mas.length;j++)
         {
            if(+(this.id).substring(3)!==j)
            {
            document.getElementById("var"+j+"btn").style.display="none";
            document.getElementById("var"+j).style.height="175px";
            }
         }
        }
        }
    }
    document.getElementById("tst").appendChild(obj);


        }
    }
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

function sendchoose(id)
{
    id=id.substr(0, id.length - 3);
    id=id.substr(3, id.length);
    let usr=JSON.parse(get(BASE_PATH + 'api/mark/'))[0];
    let jsn=JSON.stringify(new roomsm(mas[id]["pk"]));
    fetch(BASE_PATH + 'api/mark/'+usr["pk"]+'/', { //sending fetch put request to add changed question to the Data Base
        method: "PUT",
        credentials: "same-origin", //including cookie information
        headers: {
        "X-CSRFToken": getCookie("csrftoken"), //token to check user validation
        "Accept": "application/json",
        'Content-Type': 'application/json'
        },
        body: jsn
      }).then(function (response) {
        if(response.status === 200){
            window.location.href = BASE_PATH + 'speaking/info/';
        }
      })
}




function checkend()
{
    let user =JSON.parse(get(BASE_PATH + 'api/mark/'));
    if(+user[0]["position"]===-1)
    {
        window.location.href = BASE_PATH + 'speaking/thanks/';
    }
}
