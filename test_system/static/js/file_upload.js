const but1 = document.getElementById('sub_but1');
const but2 = document.getElementById('sub_but2');

history.pushState(null, null, location.href);
    window.onpopstate = function () {
        history.go(1);
    };

const input_f = document.getElementById('test_file');
const input_k = document.getElementById('test_keys');

const updateLabelF = () => {
  const label_f = document.getElementById('file_l');
  label_f.innerHTML = input_f.files[0].name;
  but1.style.display = "block";
};

const updateLabelK = () => {
  const label_k = document.getElementById('keys_l');
  label_k.innerHTML = input_k.files[0].name;
  but2.style.display = "block";
};

input_f.addEventListener('change', updateLabelF);
input_k.addEventListener('change', updateLabelK);

const PreSubmit = () => {
  but1.style.display = "none";
  const div = document.getElementById('second_stage');
  div.style.display = "block";
};
