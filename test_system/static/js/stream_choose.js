let mas=[];
let block=false;

class exam {
    constructor(exam) {
        this.exam = exam;
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
    return JSON.parse(get(BASE_PATH + 'api/exam/'));
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

function checkstreamtimestrt(stream) {
    let cur = JSON.parse(get(BASE_PATH + 'api/time/'))["time"]
    let tst = stream["start"];
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
        return false;
    }
    else   if ((+cdate[0])===(+tdate[0])&&(+cdate[1])===(+tdate[1])&&(+cdate[2])===(+tdate[2]))
    {
       if((+ctime[0])*3600+(+ctime[1])*60+(+ctime[2])-(+ttime[0])*3600-(+ttime[1])*60-(+ttime[2])>0)
       return true;
    }
    return false;
}


function test()
{
    checkend();
    mas=getinfo();
    if(mas.length===0)window.location.href = BASE_PATH + 'speaking/choose/';
    for(i=0;i<mas.length;i++)
    {
    if(checkstreamtime(mas[i])){
    let text=parseinfo(mas[i]["start"],mas[i]["finish"],mas[i]["stream"]);
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
        if (checkstreamtimestrt(mas[+(this.id).substring(3)])){
        if(!block){
        if(this.style.height==="200px") {
            //document.getElementById(this.id+"btn").style.display="none";
            //this.style.height="150px";
        }
        else
        {
         this.style.height="200px";
         document.getElementById(this.id+"btn").style.display="inline-block";

         for(j=0;j<mas.length;j++)
         {
            if(+(this.id).substring(3)!==j)
            {
            document.getElementById("var"+j+"btn").style.display="none";
            document.getElementById("var"+j).style.height="150px";
            }
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
    let jsn=JSON.stringify(new exam(mas[id]["pk"]));
    fetch(BASE_PATH + 'api/user-exam/', { //sending fetch put request to add changed question to the Data Base
        method: "POST",
        credentials: "same-origin", //including cookie information
        headers: {
          "X-CSRFToken": getCookie("csrftoken"), //token to check user validation
          "Accept": "application/json",
          'Content-Type': 'application/json'
        },
        //making json from data that was piked on the lines above
        body: jsn
      }).then(function (response) {
        if(response.status === 201){
            window.location.href = BASE_PATH + 'test_system/test/'
        }
      })
}



function checkend()
{
    let user =JSON.parse(get(BASE_PATH + 'api/mark/'));
    if(user[0]["removed"]===true)
    {
        window.location.href = BASE_PATH + 'speaking/choose/';
    }
}
