let user;
let orderrow;
let current;
let procesed;
let notime;
let count=0;
let anser=-1;
let stop=false;
let havetime=false;
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
    return "qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq100qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq100qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq100qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq100qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq100qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq100qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq100qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq100qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq100qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq100qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq100qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq100qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq100qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq100qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq100";
}


function isreading(task)
{
        if(task["is_reading"]==true) {
        document.getElementById("reading").textContent=gettext();
        document.getElementById("reading").style.fontSize="2vh";
        document.getElementById("textbu").style.display="inline";
        document.getElementById("endbu").style.width="40%";
        document.getElementById("endbu").style.right="5%";
    }
    else {
        document.getElementById("reading").textContent=gettext();
        document.getElementById("reading").style.fontSize="2vh";
        document.getElementById("textbu").style.display="none";
        document.getElementById("endbu").style.width="40%";
        document.getElementById("endbu").style.right="30%";
    }
}


function sendanswer(json)
{
    let nm=JSON.parse(json)["pk"];
   // alert(nm);
    put("http://localhost:5000/api/answer/"+nm+"/",json);
}

function sizes(curtask)
{
    if((+curtask["answ_option1"].length>0)
        &(+curtask["answ_option2"].length>0)
        &(+curtask["answ_option3"].length>0)
        &(+curtask["answ_option4"].length>0)
        &(+curtask["text"].length>0))
    {
    document.getElementById("txt").style.fontSize="2vh";
	document.getElementById("first").style.fontSize="2.15vh";
	document.getElementById("second").style.fontSize="2.15vh";
	document.getElementById("third").style.fontSize="2.15vh";
	document.getElementById("fourth").style.fontSize="2.15vh";
    }
        if((+curtask["answ_option1"].length>50)
        &(+curtask["answ_option2"].length>50)
        &(+curtask["answ_option3"].length>50)
        &(+curtask["answ_option4"].length>50)
        &(+curtask["text"].length>50))
    {
    document.getElementById("txt").style.fontSize="1.75vh";
	document.getElementById("first").style.fontSize="2vh";
	document.getElementById("second").style.fontSize="2vh";
	document.getElementById("third").style.fontSize="2vh";
	document.getElementById("fourth").style.fontSize="2vh";
    }
    
        if((+curtask["answ_option1"].length>150)
        &(++curtask["answ_option2"].length>150)
        &(+curtask["answ_option3"].length>150)
        &(+curtask["answ_option4"].length>150)
        &(+curtask["text"].length>150))
    {
    document.getElementById("txt").style.fontSize="1.5vh";
	document.getElementById("first").style.fontSize="1.7vh";
	document.getElementById("second").style.fontSize="1.7vh";
	document.getElementById("third").style.fontSize="1.7vh";
	document.getElementById("fourth").style.fontSize="1.7vh";
    }
    
        if((+curtask["answ_option1"].length>250)
        &(+curtask["answ_option2"].length>250)
        &(+curtask["answ_option3"].length>250)
        &(+curtask["answ_option4"].length>250)
        &(+curtask["text"].length>250))
    {
    document.getElementById("txt").style.fontSize="1.2vh";
	document.getElementById("first").style.fontSize="1.4vh";
	document.getElementById("second").style.fontSize="1.4vh";
	document.getElementById("third").style.fontSize="1.4vh";
	document.getElementById("fourth").style.fontSize="1.4vh";
    }
        if((+curtask["answ_option1"].length>350)
        &(+curtask["answ_option2"].length>350)
        &(+curtask["answ_option3"].length>350)
        &(+curtask["answ_option4"].length>350)
        &(+curtask["text"].length>350))
    {
    document.getElementById("txt").style.fontSize="1vh";
	document.getElementById("first").style.fontSize="1.2vh";
	document.getElementById("second").style.fontSize="1.2vh";
	document.getElementById("third").style.fontSize="1.2vh";
	document.getElementById("fourth").style.fontSize="1.2vh";
    }
}


function fillquastion(json)
{
    sizes(json);
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
    seconds-=1;
    setTimeout(function () {timerwork(seconds,seconds,curent)}, 1000);
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
		seconds-=1;
        procesed=false;
		setTimeout(function () {timerwork(seconds,maxseconds,number)}, 1000);
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
    if (count<orderrow.length-1)
        {
        count++;
        /*
        if(curtask["is_reading"]=="true"&&gettask(+getanswer(+orderrow[count-1]["pk"])["question"])["is_reading"]=="false")    
        {
            alert("Text");  
            document.getElementById("tmb").style.display="block"; 
            document.getElementById("lstr").style.zIndex=0;
            document.getElementById("rdng").style.zIndex=1;
            document.getElementById("qsns").style.zIndex=0;
            document.getElementById("lend").style.zIndex=0;
        }   */
             let g= new answer(curent["pk"],curent["number"],anser,curent["user"],curent["question"],curent["time_started"]);
             sendanswer(JSON.stringify(g)); 
            
            
            
if(count==-1)
        {
            document.getElementById("tmb").style.display="none"; 
            document.getElementById("lstr").style.zIndex=1;
            document.getElementById("rdng").style.zIndex=-1;
            document.getElementById("qsns").style.zIndex=-1;
            document.getElementById("lend").style.zIndex=-1;
            document.getElementById("clear").style.zIndex=0;
        }
    else if(count==orderrow.length)
        {
            document.getElementById("tmb").style.display="none"; 
            document.getElementById("lstr").style.zIndex=-1;
            document.getElementById("rdng").style.zIndex=-1;
            document.getElementById("qsns").style.zIndex=-1;
            document.getElementById("lend").style.zIndex=1;
            document.getElementById("clear").style.zIndex=0;
            
        }
    else{
    document.getElementById("tmb").style.display="block"; 
    curent=getanswer(+orderrow[count]["pk"]); 
    curans=getanswer(+orderrow[count]["pk"]); 
    curtask=gettask(+curent["question"]);
    fillquastion(curtask);
    timerstart(curtask["duration"]);
    document.getElementById("rdng").style.zIndex=1;
    document.getElementById("qsns").style.zIndex=2;
    isreading(curtask);
    }
             document.getElementById("anszero").className="anser";
             document.getElementById("ansone").className="anser";
             document.getElementById("anstwo").className="anser";
             document.getElementById("ansthre").className="anser";
             notime=false;
             endtime=false;
             anser=-1;
             stop=false;
            
        }
        else
        {
            document.getElementById("tmb").style.display="none"; 
            let g= new answer(curent["pk"],curent["number"],anser,curent["user"],curent["question"],curent["time_started"]);
            sendanswer(JSON.stringify(g)); 
            document.getElementById("lstr").style.zIndex=-1;
            document.getElementById("rdng").style.zIndex=-1;
            document.getElementById("qsns").style.zIndex=-1;
            document.getElementById("lend").style.zIndex=1;
            document.getElementById("clear").style.zIndex=0;
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
            document.getElementById("lstr").style.zIndex=-1;
            document.getElementById("rdng").style.zIndex=1;
            document.getElementById("qsns").style.zIndex=-1;
            document.getElementById("lend").style.zIndex=-1;
            document.getElementById("clear").style.zIndex=0;
            procesed=false;
        }
}

function onqsnsmenuswitch()
{
    if(!procesed)
    {
            procesed=true;
            document.getElementById("lstr").style.zIndex=-1;
            document.getElementById("rdng").style.zIndex=-1;
            document.getElementById("qsns").style.zIndex=1;
            document.getElementById("lend").style.zIndex=-1;
            document.getElementById("clear").style.zIndex=0;
            procesed=false;
    }

}

function gettime(ans,tsk)
{
    let str=JSON.parse(get("http://localhost:5000/api/time/"))["time"]
    let mas=str.split(':');
    let houres=(+mas[0].substring(mas[0].length-2,mas[0].length));
    let minutes=(+mas[1]);
    let secnds=(+mas[2].substring(0,2));
    let delta=houres*3600+minutes*60+secnds;
    str=ans["time_started"];
    mas=str.split(':');
    houres=(+mas[0].substring(mas[0].length-2,mas[0].length));
    minutes=(+mas[1]);
    secnds=(+mas[2].substring(0,2));
    delta=delta-(houres*3600+minutes*60+secnds);
    str=tsk["duration"];
    mas=str.split(':');
    houres=(+mas[0]);
    minutes=(+mas[1]);
    secnds=(+mas[2]);
    delta=delta-(houres*3600+minutes*60+secnds);
    if (delta<0) return true;
    else return false;
}

function stillhavetime(ans,tsk)
{
    let str=JSON.parse(get("http://localhost:5000/api/time/"))["time"]
    let mas=str.split(':');
    let houres=(+mas[0].substring(mas[0].length-2,mas[0].length));
    let minutes=(+mas[1]);
    let secnds=(+mas[2].substring(0,2));
    let delta=houres*3600+minutes*60+secnds;
    str=ans["time_started"];
    mas=str.split(':');
    houres=(+mas[0].substring(mas[0].length-2,mas[0].length));
    minutes=(+mas[1]);
    secnds=(+mas[2].substring(0,2));
    delta=delta-(houres*3600+minutes*60+secnds);
    str=tsk["duration"];
    mas=str.split(':');
    houres=(+mas[0]);
    minutes=(+mas[1]);
    secnds=(+mas[2]);
    delta=(houres*3600+minutes*60+secnds)-delta;
    houres=delta/3600;
    minutes=(delta-houres*3600)/60;
    secnds=delta-minutes*60-houres*3600;
    return houres+":"+minutes+":"+secnds;
}



function findstop()
{
    havetime=false;
    for(i=0;i<orderrow.length;i++)
    {
        if(orderrow[i]["time_started"]==null)  {
            if(i>0)
            {
                let ans=getanswer(+orderrow[i-1]["pk"]); 
                let tsk=gettask(+ans["question"]);
                if (gettime(ans,tsk))
                {
                    havetime=true;
                        break;
                }
                else 
                {
                    break;
                }
            }
            else {
                break;}
            
        }
    }
    if (havetime)i--;
    if(i==0&&orderrow[i]["time_started"]==null) return -1;
    if(i==0&&orderrow[i]["time_started"]!=null) return i;
    if (i==orderrow.length)
    {

        let ans=getanswer(+orderrow[i-1]["pk"]); 
        let tsk=gettask(+ans["question"]);
        if(orderrow[i-1]["time_started"]==null){
            return i-1;
        }
        if(gettime(ans,tsk)&&ans["answer"]!=0&&ans["answer"]!=1&&ans["answer"]!=2&&ans["answer"]!=3){
            havetime=true;
            return i-1;
        }
        else{
            document.getElementById("lstr").style.zIndex=-1;
            document.getElementById("rdng").style.zIndex=-1;
            document.getElementById("qsns").style.zIndex=-1;
            document.getElementById("lend").style.zIndex=1;
            document.getElementById("clear").style.zIndex=0;
    return orderrow.length;
        }
    } else return i;

}

function endsession()
{
    alert("End Session");
}

function startsession()
{
    count=0;
    curent=getanswer(+orderrow[count]["pk"]); 
    curans=getanswer(+orderrow[count]["pk"]); 
    curtask=gettask(+curent["question"]);
    fillquastion(curtask);
    timerstart(curtask["duration"]);
    document.getElementById("rdng").style.zIndex=1;
    document.getElementById("qsns").style.zIndex=2;
    isreading(curtask);
     document.getElementById("tmb").style.display="block"; 
            document.getElementById("lstr").style.zIndex=-1;
            document.getElementById("rdng").style.zIndex=-1;
            document.getElementById("qsns").style.zIndex=1;
            document.getElementById("lend").style.zIndex=-1;
            document.getElementById("clear").style.zIndex=0;
}



function initialization()
{
document.getElementById("tmb").style.display="none"; 
document.getElementById("clear").style.zIndex=100;

    orderrow=getanswers();
    count=findstop();
    if(count==-1)
        {
            document.getElementById("tmb").style.display="none"; 
            document.getElementById("lstr").style.zIndex=1;
            document.getElementById("rdng").style.zIndex=-1;
            document.getElementById("qsns").style.zIndex=-1;
            document.getElementById("lend").style.zIndex=-1;
            document.getElementById("clear").style.zIndex=0;
        }
    else if(count==orderrow.length)
        {
            document.getElementById("tmb").style.display="none"; 
            document.getElementById("lstr").style.zIndex=-1;
            document.getElementById("rdng").style.zIndex=-1;
            document.getElementById("qsns").style.zIndex=-1;
            document.getElementById("lend").style.zIndex=1;
            document.getElementById("clear").style.zIndex=0;
        }
    else{
    document.getElementById("tmb").style.display="block"; 
    curent=getanswer(+orderrow[count]["pk"]); 
    curans=getanswer(+orderrow[count]["pk"]); 
    curtask=gettask(+curent["question"]);
    fillquastion(curtask);
    if(havetime) timerstart(stillhavetime(curans,curtask));
    else timerstart(curtask["duration"]);
    document.getElementById("rdng").style.zIndex=1;
    document.getElementById("qsns").style.zIndex=2;
    isreading(curtask);
    }
    document.getElementById("clear").style.zIndex=0;
}

