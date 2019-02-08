const SendQuestions = () => {
    let reader = new FileReader(); //reader that reads file
    let data = new FormData(); //wrapper for uploaded files
    reader.onload = function (event) { //event that reacts on successful data read
        let contents = event.target.result; //result of the file read
        data.append('file', contents); //append data to the wrapper
        fetch('http://localhost:5000/api/file_upload/', { //fetch post request to load file on the server side
            method: 'POST',
            credentials: "same-origin", //take cookies with this request
            headers: {
                "X-CSRFToken": getCookie("csrftoken") //token for user validation
            },
            body: data //body of the request
        })
    };
    reader.readAsText(document.getElementById('test_file').files[0]) //reader for uploaded file
};

const getCookie = name => { //function that get cookie by name, taken from django documentation
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
