let user;
let orderrow;
let current;
let procesed;
let notime;
let count=0;
let anser=-1;
let stop=false;

let curtask;
let curans;

class answer{
  constructor(pk,number,answer,user,question,time_started)
    {
        this.pk=pk;
        this.number=number;
        this.answer=answer;
        this.user=user;
        this.question=question;
        this.time_started=time_started;
        
    }
}

class task{
  constructor(pk,number,text,answ_correct,answ_option1,answ_option2,answ_option3,answ_option4,duration,is_reading)
    {
        this.pk=pk;
        this.number=number;
        this.text=text;
        this.answ_correct=answ_correct;
        this.answ_option1=answ_option1;
        this.answ_option2=answ_option2;
        this.answ_option3=answ_option3;
        this.answ_option4=answ_option4;
        this.duration=duration;
        this.is_reading=is_reading;
    }
}



function get(way)
{
    let xhr = new XMLHttpRequest();
    xhr.open('GET',way, false);
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

function put(way,package)
{
      fetch(way, { 
        method: "PUT",
        credentials: "same-origin",
        headers: {
          "X-CSRFToken": getCookie("csrftoken"), 
          "Accept": "application/json",
          'Content-Type': 'application/json'
        },
        body:package
      })
   // alert("sended");
}

function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

function getanswers()
{
    return sortByKey(JSON.parse(get("http://localhost:5000/api/answer/")),"number");
}

function getanswer(num)
{
    return JSON.parse(get("http://localhost:5000/api/answer/"+num+"/"));
}

function gettask(num)
{
    return JSON.parse(get("http://localhost:5000/api/question/"+num+"/"));
}

function gettext()
{
    //
    return texttest;
}


function sendanswer(json)
{
    let nm=JSON.parse(json)["pk"];
   // alert(nm);
    put("http://localhost:5000/api/answer/"+nm+"/",json);
}

function fillquastion(json)
{
    document.getElementById("num").innerHTML        = "Task № "+json["number"];
    document.getElementById("txt").innerHTML        = json["text"];
    document.getElementById("first").innerHTML      = json["answ_option1"];
    document.getElementById("second").innerHTML     = json["answ_option2"];
    document.getElementById("third").innerHTML      = json["answ_option3"];
    document.getElementById("fourth").innerHTML     = json["answ_option4"];
    document.getElementById("tmb").style.background = "#4e73df";
}

function timerstart(sectime)
{
    stop=false;
    let mas=sectime.split(':');
    let seconds=(+mas[0])*60*60+(+mas[1])*60+(+mas[2])-0.01;
    houres=(seconds-seconds%3600)/3600;
    minutes=(seconds-houres*3600-(seconds-houres*3600)%60)/60;
    secnds=seconds-houres*3600-minutes*60;
    document.getElementById("tm").textContent=houres+':'+minutes+':'+(secnds-seconds%1+1);
    document.getElementById("tmb").style.background = "#4e73df";
    seconds-=0.025;
    setTimeout(function () {timerwork(seconds,seconds,curent)}, 25);
}

function timerend()
{
   //notime=true;
    endtime=true;
    stop=true;
}


function timerwork(seconds,maxseconds,number)
{
    if(number==curent)
        {
    if (seconds > 0) 
    {
        houres=(seconds-seconds%3600)/3600;
		minutes=(seconds-houres*3600-(seconds-houres*3600)%60)/60;
        secnds=seconds-houres*3600-minutes*60;
	    document.getElementById("tm").textContent=houres+':'+minutes+':'+(secnds-seconds%1+1);
        let num=278-(278*seconds/maxseconds)+(278*seconds/maxseconds)%1;
        if(num<142)
        document.getElementById("tmb").style.background = "rgb("+(78+num)+", 115, 223)";
        else document.getElementById("tmb").style.background = "rgb(220, 115, "+(223-num+142)+")";
		seconds-=0.025;
        procesed=false;
		setTimeout(function () {timerwork(seconds,maxseconds,number)}, 25);
    }
    else 
    {
        houres=(seconds-seconds%3600)/3600;
		minutes=(seconds-houres*3600-(seconds-houres*3600)%60)/60;
        secnds=seconds-houres*3600-minutes*60;
	    document.getElementById("tm").textContent=houres+':'+minutes+':'+(secnds-seconds%1);
        let num=278-(278*seconds/maxseconds)+(278*seconds/maxseconds)%1;
        if(num<142)
        document.getElementById("tmb").style.background = "rgb("+(78+num)+", 115, 223)";
        else document.getElementById("tmb").style.background = "rgb(220, 115, "+(223-num+142)+")";
        timerend();
    }}

}

function select(num)
{
    if(!procesed)
        {
            procesed=true;
    if(num==0&&!stop){
        document.getElementById("anszero").className="anserr";
        document.getElementById("ansone").className="anser";
        document.getElementById("anstwo").className="anser";
        document.getElementById("ansthre").className="anser";
        anser=0; 
    }
    else if(num==1&&!stop){
        document.getElementById("anszero").className="anser";
        document.getElementById("ansone").className="anserr";
        document.getElementById("anstwo").className="anser";
        document.getElementById("ansthre").className="anser";
        anser=1;
    }
    else if(num==2&&!stop){
        document.getElementById("anszero").className="anser";
        document.getElementById("ansone").className="anser";
        document.getElementById("anstwo").className="anserr";
        document.getElementById("ansthre").className="anser";
        anser=2; 
    }
    else if(num==3&&!stop){

        document.getElementById("anszero").className="anser";
        document.getElementById("ansone").className="anser";
        document.getElementById("anstwo").className="anser";
        document.getElementById("ansthre").className="anserr";
        anser=3; 
    }
    else anser=-1;
            procesed=false;
    }
}

function next()
{
    if(!procesed)
    {
    procesed=true;
    if (document.getElementById("anszero").className=="anserr"||document.getElementById("ansone").className=="anserr"||document.getElementById("anstwo").className=="anserr"||document.getElementById("ansthre").className=="anserr"||endtime)
    {
    if (count<orderrow.length)
        {
        count++;
        //if(gettask(+getanswer(+orderrow[count]["pk"])["question"])["is_reading"]=="true"&&gettask(+getanswer(+orderrow[count-1]["pk"])["question"])["is_reading"]=="false")    
        //{
        //    alert("Text");  
        //}   
             let g= new answer(curent["pk"],curent["number"],anser,curent["user"],curent["question"],curent["time_started"]);
             sendanswer(JSON.stringify(g)); 
             curent=getanswer(+orderrow[count]["pk"]); 
             curans=getanswer(+orderrow[count]["pk"]); 
             curtask=gettask(+curent["question"]);
             fillquastion(curans);
             timerstart(curtask["duration"]);
             if(curtask["is_reading"]==true) {    
                document.getElementById("reading").textContent="ssss";
                document.getElementById("textbu").style.display="inline";
                document.getElementById("endbu").style.width="40%";
                document.getElementById("endbu").style.right="5%";
             }   
             else {
                document.getElementById("reading").textContent="ssss";
                document.getElementById("textbu").style.display="none";
                document.getElementById("endbu").style.width="40%";
                document.getElementById("endbu").style.right="30%";
             }
             if(count==orderrow.length-1) document.getElementById("endbu").innerHTML="End session";
             document.getElementById("anszero").className="anser";
             document.getElementById("ansone").className="anser";
             document.getElementById("anstwo").className="anser";
             document.getElementById("ansthre").className="anser";
             notime=false;
             endtime=false;
             anser=-1;
             stop=false;
        }
}
}
    procesed=false;
}

function ontetxmenuswitch()
{
        if(!procesed)
        {
            procesed=true;
            document.getElementById("rdng").style.zIndex=2;
            document.getElementById("qsns").style.zIndex=1;
            procesed=false;
        }
}

function onqsnsmenuswitch()
{
    if(!procesed)
    {
            procesed=true;
            document.getElementById("rdng").style.zIndex=1;
            document.getElementById("qsns").style.zIndex=2;
            procesed=false;
    }

}

function findstop()
{
    for(i=0;i<orderrow.length;i++)
    {
        if(orderrow[i]["time_started"]==null)  {
            return i;
        }
    }
    return orderrow.length-1;
}



function initialization()
{
    orderrow=getanswers();
    count=findstop();
    curent=getanswer(+orderrow[count]["pk"]); 
    curans=getanswer(+orderrow[count]["pk"]); 
    curtask=gettask(+curent["question"]);
    fillquastion(curtask);
    timerstart(curtask["duration"]);
    document.getElementById("rdng").style.zIndex=1;
    document.getElementById("qsns").style.zIndex=2;
    if(curtask["is_reading"]==true) {
        document.getElementById("reading").textContent="gettext()";
        document.getElementById("textbu").style.display="inline";
        document.getElementById("endbu").style.width="40%";
        document.getElementById("endbu").style.right="5%";
    }
    else {
        document.getElementById("reading").textContent="gettext()";
        document.getElementById("textbu").style.display="none";
        document.getElementById("endbu").style.width="40%";
        document.getElementById("endbu").style.right="30%";
    }
}

/*
function sizes()
{
    if((+Allinfo[curNumber]["answ_option1"].length>0)
        &(+Allinfo[curNumber]["answ_option2"].length>0)
        &(+Allinfo[curNumber]["answ_option3"].length>0)
        &(+Allinfo[curNumber]["answ_option4"].length>0)
        &(+Allinfo[curNumber]["text"].length>0))
    {
    document.getElementById("txt").style.fontSize="2vh";
	document.getElementById("first").style.fontSize="2.15vh";
	document.getElementById("second").style.fontSize="2.15vh";
	document.getElementById("third").style.fontSize="2.15vh";
	document.getElementById("fourth").style.fontSize="2.15vh";
    }
        if((+Allinfo[curNumber]["answ_option1"].length>50)
        &(+Allinfo[curNumber]["answ_option2"].length>50)
        &(+Allinfo[curNumber]["answ_option3"].length>50)
        &(+Allinfo[curNumber]["answ_option4"].length>50)
        &(+Allinfo[curNumber]["text"].length>50))
    {
    document.getElementById("txt").style.fontSize="1.75vh";
	document.getElementById("first").style.fontSize="2vh";
	document.getElementById("second").style.fontSize="2vh";
	document.getElementById("third").style.fontSize="2vh";
	document.getElementById("fourth").style.fontSize="2vh";
    }
    
        if((+Allinfo[curNumber]["answ_option1"].length>150)
        &(+Allinfo[curNumber]["answ_option2"].length>150)
        &(+Allinfo[curNumber]["answ_option3"].length>150)
        &(+Allinfo[curNumber]["answ_option4"].length>150)
        &(+Allinfo[curNumber]["text"].length>150))
    {
    document.getElementById("txt").style.fontSize="1.5vh";
	document.getElementById("first").style.fontSize="1.75vh";
	document.getElementById("second").style.fontSize="1.75vh";
	document.getElementById("third").style.fontSize="1.75vh";
	document.getElementById("fourth").style.fontSize="1.75vh";
    }
    
        if((+Allinfo[curNumber]["answ_option1"].length>250)
        &(+Allinfo[curNumber]["answ_option2"].length>250)
        &(+Allinfo[curNumber]["answ_option3"].length>250)
        &(+Allinfo[curNumber]["answ_option4"].length>250)
        &(+Allinfo[curNumber]["text"].length>250))
    {
    document.getElementById("txt").style.fontSize="1.25vh";
	document.getElementById("first").style.fontSize="1.5vh";
	document.getElementById("second").style.fontSize="1.5vh";
	document.getElementById("third").style.fontSize="1.5vh";
	document.getElementById("fourth").style.fontSize="1.5vh";
    }
        if((+Allinfo[curNumber]["answ_option1"].length>350)
        &(+Allinfo[curNumber]["answ_option2"].length>350)
        &(+Allinfo[curNumber]["answ_option3"].length>350)
        &(+Allinfo[curNumber]["answ_option4"].length>350)
        &(+Allinfo[curNumber]["text"].length>350))
    {
    document.getElementById("txt").style.fontSize="1vh";
	document.getElementById("first").style.fontSize="1.25vh";
	document.getElementById("second").style.fontSize="1.25vh";
	document.getElementById("third").style.fontSize="1.25vh";
	document.getElementById("fourth").style.fontSize="1.25vh";
    }
}
*/