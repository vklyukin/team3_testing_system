const but1 = document.getElementById('sub_but1');

history.pushState(null, null, location.href);
window.onpopstate = () => {
    history.go(1);
};

const input_f = document.getElementById('test_file');

const updateLabelF = () => {
    const label_f = document.getElementById('file_l');
    label_f.innerHTML = input_f.files[0].name;
    but1.style.display = "block";
};

input_f.addEventListener('change', updateLabelF);

const PreSubmit = () => {
    but1.style.display = "none";
};

const Download = () => {
    var link = document.getElementById("invisible");
    link.click();
};
