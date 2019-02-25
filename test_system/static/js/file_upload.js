history.pushState(null, null, location.href);
    window.onpopstate = function () {
        history.go(1);
    };

const input_f = document.getElementById('test_file');
const input_k = document.getElementById('test_keys');

input_f.addEventListener('change', updateLabelF);
input_k.addEventListener('change', updateLabelK);

function updateLabelF() {
  const label_f = document.getElementById('file_l');
  label_f.innerHTML = input_f.files[0].name;
}

function updateLabelK() {
  const label_k = document.getElementById('keys_l');
  label_k.innerHTML = input_k.files[0].name;
}

function PreSubmit() {
  const div = document.getElementById('second_stage');
  div.style.display = "block";
}
