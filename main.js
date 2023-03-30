var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
acc[i].addEventListener("click", function() {
  /* Toggle between adding and removing the "active" class,
  to highlight the button that controls the panel */
  this.classList.toggle("active");

  /* Toggle between hiding and showing the active panel */
  var panel = this.nextElementSibling;
  if (panel.style.display === "block") {
  panel.style.display = "none";
  } else {
  panel.style.display = "block";
  }
});
} 

var inputNome = document.querySelector("#nome");

inputNome.addEventListener("keypress", function(e) {

  var keyCode = (e.keyCode ? e.keyCode : e.which);

if (keyCode > 47 && keyCode < 58) {
  e.preventDefault();
}

});

//Função para impedir letras no campo do CPF

var inputCPF = document.querySelector("#cpf");

inputCPF.addEventListener("keypress", function(e) {

  var keyCode = (e.keyCode ? e.keyCode : e.which);

if (keyCode < 47 && keyCode > 58) {
  e.preventDefault();
}

});

//Função para validação de CPF

function validarCPF(cpf) {
cpf = cpf.replace(/[^\d]+/g,'');

if(cpf == '') {
  document.getElementById("cpf-error").style.display = "block";
  document.getElementById("nascimento").setAttribute("disabled", "");
  return false;
}

// Elimina CPFs invalidos conhecidos
if (cpf.length != 11 || 
  cpf == "00000000000" || 
  cpf == "11111111111" || 
  cpf == "22222222222" || 
  cpf == "33333333333" || 
  cpf == "44444444444" || 
  cpf == "55555555555" || 
  cpf == "66666666666" || 
  cpf == "77777777777" || 
  cpf == "88888888888" || 
  cpf == "99999999999")
{
  document.getElementById("cpf-error").style.display = "block";
  document.getElementById("nascimento").setAttribute("disabled", "");
  return false;
}

// Valida 1o digito
add = 0;
for (i=0; i < 9; i ++) {
  add += parseInt(cpf.charAt(i)) * (10 - i);
}
rev = 11 - (add % 11);
if (rev == 10 || rev == 11) {
  rev = 0;
}
if (rev != parseInt(cpf.charAt(9))) {
  document.getElementById("cpf-error").style.display = "block";
  document.getElementById("nascimento").setAttribute("disabled", "");
  return false;
}

// Valida 2o digito
add = 0;
for (i = 0; i < 10; i ++) {
  add += parseInt(cpf.charAt(i)) * (11 - i);
}
rev = 11 - (add % 11);
if (rev == 10 || rev == 11) {
  rev = 0;
}
if (rev != parseInt(cpf.charAt(10))) {
  document.getElementById("cpf-error").style.display = "block";
  document.getElementById("nascimento").setAttribute("disabled", "");
  return false;
}

// CPF válido
document.getElementById("cpf-error").style.display = "none";
document.getElementById("nascimento").removeAttribute("disabled");
return true;
}

// selecione o botão de envio do formulário pelo ID
const botaoAvancar = document.querySelector('#botao-avancar');

// selecione todos os campos de entrada de texto no formulário
const camposDeEntrada = document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"], input[type="date"], textarea');

// adicione um manipulador de eventos para a tecla Enter em cada campo de entrada de texto
camposDeEntrada.forEach(function(campo) {
  campo.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault(); // impedir a ação padrão (pressionar o botão)
      return false;
    }
  });
});

// adicione um evento de clique ao botão
botaoAvancar.addEventListener('click', function(event) {
  // previna o envio do formulário
  event.preventDefault();

  // retorne false para impedir o envio do formulário
  return false;
});

