const evaluate = () => fetch(BASE_PATH + 'api/mark/evaluate/', { //fetch get request to get array of questions
    method: 'get'
});

const Download = () => {
    var link = document.getElementById("invisible");
    link.click();
};
