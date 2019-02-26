let scale_B_l = document.getElementById('scale_B_l');
let scale_B_h = document.getElementById('scale_B_h');
let scale_E_l = document.getElementById('scale_E_l');
let scale_E_h = document.getElementById('scale_E_h');
let scale_PI_l = document.getElementById('scale_PI_l');
let scale_PI_h = document.getElementById('scale_PI_h');
let scale_I_l = document.getElementById('scale_I_l');
let scale_I_h = document.getElementById('scale_I_h');
let scale_UI_l = document.getElementById('scale_UI_l');
let scale_UI_h = document.getElementById('scale_UI_h');
let scale_A_l = document.getElementById('scale_A_l');
let scale_A_h = document.getElementById('scale_A_h');

scale_B_h.addEventListener('input', function(event) {
  if (Number.parseInt(scale_B_h.value) > 0) {
    scale_B_h.removeAttribute("class");
    scale_B_h.setAttribute("class", "form-control is-valid");
    scale_E_l.value = Number.parseInt(scale_B_h.value) + 1;
    scale_E_h.value = 0;
    scale_E_h.removeAttribute("class");
    scale_E_h.setAttribute("class", "form-control");
    scale_PI_h.value = 0;
    scale_PI_l.value = 0;
    scale_PI_h.removeAttribute("class");
    scale_PI_h.setAttribute("class", "form-control");
    scale_I_h.value = 0;
    scale_I_l.value = 0;
    scale_I_h.removeAttribute("class");
    scale_I_h.setAttribute("class", "form-control");
    scale_UI_h.value = 0;
    scale_UI_l.value = 0;
    scale_UI_h.removeAttribute("class");
    scale_UI_h.setAttribute("class", "form-control");
    scale_A_h.value = 0;
    scale_A_l.value = 0;
    scale_A_h.removeAttribute("class");
    scale_A_h.setAttribute("class", "form-control");
  }
  else {
    scale_B_h.removeAttribute("class");
    scale_B_h.setAttribute("class", "form-control is-invalid");
  }
}, false);

scale_E_h.addEventListener('input', function(event) {
  if (Number.parseInt(scale_E_h.value) > Number.parseInt(scale_E_l.value)) {
    scale_E_h.removeAttribute("class");
    scale_E_h.setAttribute("class", "form-control is-valid");
    scale_PI_l.value = Number.parseInt(scale_E_h.value) + 1;
    scale_PI_h.value = 0;
    scale_PI_h.removeAttribute("class");
    scale_PI_h.setAttribute("class", "form-control");
    scale_I_h.value = 0;
    scale_I_l.value = 0;
    scale_I_h.removeAttribute("class");
    scale_I_h.setAttribute("class", "form-control");
    scale_UI_h.value = 0;
    scale_UI_l.value = 0;
    scale_UI_h.removeAttribute("class");
    scale_UI_h.setAttribute("class", "form-control");
    scale_A_h.value = 0;
    scale_A_l.value = 0;
    scale_A_h.removeAttribute("class");
    scale_A_h.setAttribute("class", "form-control");
  }
  else {
    scale_E_h.removeAttribute("class");
    scale_E_h.setAttribute("class", "form-control is-invalid");
  }
}, false);

scale_PI_h.addEventListener('input', function(event){
  if (Number.parseInt(scale_PI_h.value) > Number.parseInt(scale_PI_l.value)) {
    scale_PI_h.removeAttribute("class");
    scale_PI_h.setAttribute("class", "form-control is-valid");
    scale_I_l.value = Number.parseInt(scale_PI_h.value) + 1;
    scale_I_h.value = 0;
    scale_I_h.removeAttribute("class");
    scale_I_h.setAttribute("class", "form-control");
    scale_UI_h.value = 0;
    scale_UI_l.value = 0;
    scale_UI_h.removeAttribute("class");
    scale_UI_h.setAttribute("class", "form-control");
    scale_A_h.value = 0;
    scale_A_l.value = 0;
    scale_A_h.removeAttribute("class");
    scale_A_h.setAttribute("class", "form-control");
  }
  else {
    scale_PI_h.removeAttribute("class");
    scale_PI_h.setAttribute("class", "form-control is-invalid");
  }
}, false);

scale_I_h.addEventListener('input', function(event){
  if (Number.parseInt(scale_I_h.value) > Number.parseInt(scale_I_l.value)) {
    scale_I_h.removeAttribute("class");
    scale_I_h.setAttribute("class", "form-control is-valid");
    scale_UI_l.value = Number.parseInt(scale_I_h.value) + 1;
    scale_UI_h.value = 0;
    scale_UI_h.removeAttribute("class");
    scale_UI_h.setAttribute("class", "form-control");
    scale_A_h.value = 0;
    scale_A_l.value = 0;
    scale_A_h.removeAttribute("class");
    scale_A_h.setAttribute("class", "form-control");
  }
  else {
    scale_I_h.removeAttribute("class");
    scale_I_h.setAttribute("class", "form-control is-invalid");
  }
}, false);

scale_UI_h.addEventListener('input', function(event) {
  if (Number.parseInt(scale_UI_h.value) > Number.parseInt(scale_UI_l.value)) {
    scale_UI_h.removeAttribute("class");
    scale_UI_h.setAttribute("class", "form-control is-valid");
    scale_A_l.value = Number.parseInt(scale_UI_h.value) + 1;
    scale_A_h.value = 0;
    scale_A_h.removeAttribute("class");
    scale_A_h.setAttribute("class", "form-control");
  }
  else {
    scale_UI_h.removeAttribute("class");
    scale_UI_h.setAttribute("class", "form-control is-invalid");
  }
}, false);

scale_A_h.addEventListener('input', function(event){
  if (Number.parseInt(scale_A_h.value) > Number.parseInt(scale_A_l.value)) {
    scale_A_h.removeAttribute("class");
    scale_A_h.setAttribute("class", "form-control is-valid");
  }
  else {
    scale_A_h.removeAttribute("class");
    scale_A_h.setAttribute("class", "form-control is-invalid");
  }
}, false);

function Send() {
  if (Number.parseInt(scale_B_h.value) === 0 || Number.parseInt(scale_E_h.value) === 0 || Number.parseInt(scale_PI_h.value) === 0 || Number.parseInt(scale_I_h.value) === 0 || Number.parseInt(scale_UI_h.value) === 0 || Number.parseInt(scale_A_h.value) === 0 || scale_B_h.className == "form-control is-invalid" || scale_E_h.className == "form-control is-invalid" || scale_PI_h.className == "form-control is-invalid" || scale_I_h.className == "form-control is-invalid" || scale_UI_h.className == "form-control is-invalid" || scale_A_h.className == "form-control is-invalid") {
    alert("Correct invalid fields!")
  }
  else {

  }
}
