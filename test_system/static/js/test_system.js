let curNumber;
let Allinfo;
let Allansers;
let anser;
let procesed;
let curpk;
let id=0;

class exclude{
  constructor(answer,user,question,started)
    {
        this.answer=answer;
        this.user=user;
        this.question=question;
        this.started=started;
    }
}


function getValues()
{
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:5000/api/question/', false);
    xhr.send();
    return JSON.parse(xhr.response);
}

/*
//testcode
function getValues(info)
{    
    str ='[\{"pk":1,"number":1,"text":"a","answ_correct":1,"answ_option1":"aa","answ_option2":"aaa","answ_option3":"aaaa","answ_option4":"aaaaa","duration":"00:00:05"\}, \{"pk":1,"number":2,"text":"b","answ_correct":3,"answ_option1":"bb","answ_option2":"bbb","answ_option3":"bbbb","answ_option4":"bbbbb","duration":"00:00:10"\}, \{"pk":1,"number":3,"text":"c","answ_correct":2,"answ_option1":"cc","answ_option2":"ccc","answ_option3":"cccc","answ_option4":"ccccc","duration":"00:01:10"\},\{"pk":1,"number":4,"text":"d","answ_correct":0,"answ_option1":"dd","answ_option2":"ddd","answ_option3":"dddd","answ_option4":"ddddd","duration":"00:01:03"\}]';
    var mas=JSON.parse(str);
    return mas;
	
}
//testcode



  headers: {
          "X-CSRFToken": getCookie("csrftoken"), //token to check user validation
          "Accept": "application/json",
          'Content-Type': 'application/json'
        },

function sendValues(json)
{
var xhr = new XMLHttpRequest();
xhr.open("PUT", 'http://localhost:5000/api/answer/'+id+'/', true);
id++;
xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
xhr.setRequestHeader('X-CSRFToken', getCookie("csrftoken"));
xhr.withCredentials = true;
xhr.send(json);
alert("sended");
}
function getValues()
{
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:5000/api/answers/', false);
    xhr.send();
    alert(JSON.parse(xhr.response));
    return JSON.parse(xhr.response);
}
function sendValues(json)
{
fetch('http://localhost:5000/api/answers/' + id + '/', { //sending fetch put request to add changed question to the Data Base
        method: "PUT",
        credentials: "same-origin", //including cookie information
        headers: {
          "X-CSRFToken": getCookie("csrftoken"), //token to check user validation
          "Accept": "application/json",
          'Content-Type': 'application/json'
        },
        //making json from data that was piked on the lines above
        body:JSON.stringify({ pk: q_pk.innerHTML, number: q_number.innerHTML, text: q_text.value, answ_correct: selected, answ_option1: q_ans_1.value, answ_option2: q_ans_2.value, answ_option3: q_ans_3.value, answ_option4: q_ans_4.value,})
      })

*/



function sendValues()
{
var xhr = new XMLHttpRequest();
let js=JSON.stringify(new exclude(anser,Allansers[curNumber]["user"],curpk,true));
alert(js);  
xhr.open("PUT", 'http://localhost:5000/api/answer/'+curpk+'/', true);
xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
xhr.setRequestHeader('X-CSRFToken', getCookie("csrftoken"));
xhr.send(js);
alert("sended");
}

function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

function getAnswers()
{
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:5000/api/answer/', false);
    xhr.send();
    let ansArr = JSON.parse(xhr.response);
    ansArr = sortByKey(ansArr, "number");
//    alert(JSON.stringify(ansArr));
    return ansArr;
}

function init()
{
    let vals=getValues();
    let valls=getAnswers();
    Allinfo=vals;
    Allansers=valls;
    curNumber=0;
    curpk=Allinfo[curNumber]["pk"];
    procesed=false;
    gettask();
    startTimer(Allinfo[curNumber]["duration"]);
}

function gettask()
{
            sizes();
            document.getElementById("num").innerHTML = "Task № "+Allinfo[curNumber]["number"];
            document.getElementById("txt").innerHTML =  Allinfo[curNumber]["text"];
            document.getElementById("first").innerHTML = Allinfo[curNumber]["answ_option1"];
            document.getElementById("second").innerHTML = Allinfo[curNumber]["answ_option2"];
            document.getElementById("third").innerHTML = Allinfo[curNumber]["answ_option3"];
            document.getElementById("fourth").innerHTML = Allinfo[curNumber]["answ_option4"];
}

function test(num)
{
    if(num==0&&endtime!=1){
        document.getElementById("anszero").className="anserr";
        document.getElementById("ansone").className="anser";
        document.getElementById("anstwo").className="anser";
        document.getElementById("ansthre").className="anser";
        anser=0; 
    }
    else if(num==1&&endtime!=1){
        document.getElementById("anszero").className="anser";
        document.getElementById("ansone").className="anserr";
        document.getElementById("anstwo").className="anser";
        document.getElementById("ansthre").className="anser";
        anser=1;
    }
    else if(num==2&&endtime!=1){
        document.getElementById("anszero").className="anser";
        document.getElementById("ansone").className="anser";
        document.getElementById("anstwo").className="anserr";
        document.getElementById("ansthre").className="anser";
        anser=2; 
    }
    else if(num==3&&endtime!=1){

        document.getElementById("anszero").className="anser";
        document.getElementById("ansone").className="anser";
        document.getElementById("anstwo").className="anser";
        document.getElementById("ansthre").className="anserr";
        anser=3; 
    }
    else anser=-1;
}

function Next()
{
if(!procesed){
    procesed=true;
    if (document.getElementById("anszero").className=="anserr"||document.getElementById("ansone").className=="anserr"||document.getElementById("anstwo").className=="anserr"||document.getElementById("ansthre").className=="anserr"||endtime==1)
    {
        endtime=1;
        if(curNumber!=Allinfo.length-1) 
        {
            sendValues();
            curNumber++;
            curpk=Allinfo[curNumber]["pk"];
            anser=-1;
            if(curNumber==Allinfo.length-1) document.getElementById("endbu").innerHTML="End session";
            document.getElementById("anszero").className="anser";
            document.getElementById("ansone").className="anser";
            document.getElementById("anstwo").className="anser";
            document.getElementById("ansthre").className="anser";
            gettask();
            startTimer(Allinfo[curNumber]["duration"]);
    }
        
           else {
        sendValues(js);
                 alert("end session");}
}
}

}



function startTimer(sectime)
{
    let tim=document.getElementById("tm");
    let mas=sectime.split(':');
    let seconds=0;
    seconds=(+mas[0])*60*60+(+mas[1])*60+(+mas[2]);
    let max=seconds;
    houres=(seconds-seconds%3600)/3600;
    minutes=(seconds-houres*3600-(seconds-houres*3600)%60)/60;
    secnds=seconds-houres*3600-minutes*60;
    tim.textContent=houres+':'+minutes+':'+(secnds-seconds%1);
    document.getElementById("tmb").style.background = "#4e73df";
    setTimeout(function () {timer(seconds,max,curNumber)}, 500);
}

function timer (seconds,max,crnum) {
	if (seconds >= 0&&crnum==curNumber) 
    {
		let tim=document.getElementById("tm");
        houres=(seconds-seconds%3600)/3600;
		minutes=(seconds-houres*3600-(seconds-houres*3600)%60)/60;
        secnds=seconds-houres*3600-minutes*60;
	    tim.textContent=houres+':'+minutes+':'+(secnds-seconds%1);
        let num=278-(278*seconds/max)+(278*seconds/max)%1;
        if(num<142)
        document.getElementById("tmb").style.background = "rgb("+(78+num)+", 115, 223)";
        else document.getElementById("tmb").style.background = "rgb(220, 115, "+(223-num+142)+")";
		seconds-=0.5;
        endtime=0;
        procesed=false;
		setTimeout(function () {timer(seconds,max,crnum)}, 500);
    }
    else 
    {
        endtime=1;
        procesed=false;
    }
}

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
