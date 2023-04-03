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

//Validar data de nascimento

function validadata(){
  var data = document.getElementById("nascimento").value; // pega o valor do input
  data = data.replace(/\//g, "-"); // substitui eventuais barras (ex. IE) "/" por hífen "-"
  var data_array = data.split("-"); // quebra a data em array
  
  // para o IE onde será inserido no formato dd/MM/yyyy
  if(data_array[0].length != 4){
     data = data_array[2]+"-"+data_array[1]+"-"+data_array[0]; // remonto a data no formato yyyy/MM/dd
  }
  
  // comparo as datas e calculo a idade
  var hoje = new Date();
  var nasc  = new Date(data);
  var idade = hoje.getFullYear() - nasc.getFullYear();
  var m = hoje.getMonth() - nasc.getMonth();
  if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) idade--;
  
  if(idade < 12){
     document.getElementById("nasc-error").style.display = "block";
     return false;
  }

  if(idade >= 13){
    return true;
 }
  
  return false;
}

//Salvar dados do formulário em localStorage//

// Obtenha o formulário e adicione um ouvinte de eventos para o evento submit
const form = document.querySelector('#form');
form.addEventListener('submit', function(event) {
  // Impedir o comportamento padrão do envio do formulário
  event.preventDefault();
  
  // Obtenha os valores dos campos do formulário
  const nome = document.querySelector('#nome').value;
  const email = document.querySelector('#email').value;
  const cpf = document.querySelector('#cpf').value;
  const nascimento = document.querySelector('#nascimento').value;
  

  // Armazene os valores do formulário no localStorage
  localStorage.setItem("nome", nome);
  localStorage.setItem('email', email);
  localStorage.setItem('cpf', cpf);
  localStorage.setItem('nascimento', nascimento);
  
  // Redirecione para a página desejada
  window.location.assign("ingressos-comprados.html")
});

// Nome do banco de dados
var DB_NAME = 'dados_form_db';

// Versão do banco de dados
var DB_VERSION = 1;

// Nome da tabela
var TABLE_NAME = 'dados_form';

// Cria ou abre o banco de dados
var request = indexedDB.open(DB_NAME, DB_VERSION);

// Função chamada quando o banco de dados é criado ou atualizado
request.onupgradeneeded = function(event) {
  // Obtém o banco de dados
  var db = event.target.result;

  // Cria a tabela "dados_form" caso ela não exista
  if (!db.objectStoreNames.contains(TABLE_NAME)) {
    var objectStore = db.createObjectStore(TABLE_NAME, { keyPath: 'id', autoIncrement:true });
    objectStore.createIndex('nome', 'nome', { unique: false });
    objectStore.createIndex('email', 'email', { unique: true });
    objectStore.createIndex('cpf', 'cpf', { unique: true });
    objectStore.createIndex('datanasc', 'datanasc', { unique: false });
  }
};


// Função para adicionar os dados do formulário no banco de dados
function adicionarDadosForm(nome, email, cpf, datanasc) {
  // Abre uma transação para acessar a tabela "dados_form"
  var transaction = request.result.transaction(TABLE_NAME, 'readwrite');

  // Obtém a tabela "dados_form"
  var objectStore = transaction.objectStore(TABLE_NAME);

  // Cria um objeto com os dados do formulário
  var dados = {
    nome: nome,
    email: email,
    cpf: cpf,
    datanasc: datanasc
  };

  // Adiciona o objeto na tabela "dados_form"
  var requestAdd = objectStore.add(dados);

  // Trata o resultado da adição
  requestAdd.onsuccess = function(event) {
    console.log('Dados adicionados com sucesso!');
  };

  requestAdd.onerror = function(event) {
    console.log('Erro ao adicionar os dados!');
  };
}

// Função para buscar todos os dados da tabela "dados_form" e exibi-los no console
function buscarDadosForm() {
  // Abre uma transação para acessar a tabela "dados_form"
  var transaction = request.result.transaction(TABLE_NAME, 'readonly');

  // Obtém a tabela "dados_form"
  var objectStore = transaction.objectStore(TABLE_NAME);

  // Cria um cursor para percorrer todos os objetos da tabela
  var requestCursor = objectStore.openCursor();

  // Trata o resultado da busca
  requestCursor.onsuccess = function(event) {
    var cursor = event.target.result;

    if (cursor) {
      console.log(cursor.value);
      cursor.continue();
    } else {
      console.log('Fim da busca.');
    }
  };

  requestCursor.onerror = function(event) {
    console.log('Erro ao buscar os dados!');
  };
}


