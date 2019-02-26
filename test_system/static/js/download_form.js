let isclicked=false;

function download()
{
    if(!isclicked)
    {
        isclicked=true; 
        generate();
        filedownload();
        isclicked=false;
    }
}

function generate()
{
    
}

function filedownload(href)
{
    var link = document.getElementById("invisible");
    onload = link.click();
}