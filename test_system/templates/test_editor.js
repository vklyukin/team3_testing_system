function SendGet() {
    return fetch('http://localhost:5000/api/question/', {
        method: 'get'
    })
           .then(function (response) {
               return response.text();
           })
           .then(function (text) {
               var div = document.createElement("div");
               div.setAttribute("id", "reload");
               document.body.appendChild(div);
               div.innerHTML = text;
           })
}
//https://stackoverflow.com/questions/3515523/javascript-how-to-generate-formatted-easy-to-read-json-straight-from-an-object
