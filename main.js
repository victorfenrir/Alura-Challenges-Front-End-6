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

var inputCPF = document.querySelector("#cpf");

inputCPF.addEventListener("keypress", function(e) {

    var keyCode = (e.keyCode ? e.keyCode : e.which);
  
  if (keyCode < 47 && keyCode > 58) {
    e.preventDefault();
  }

});

