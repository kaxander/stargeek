const mensagem = document.querySelector(".mensagem");
const formulario = document.querySelector(".form");
const nome = document.getElementById("firstname");
const sobrenome = document.getElementById("lastname");
const email = document.getElementById("email");
const numero = document.getElementById("number");
const senha = document.getElementById("password");
const csenha = document.getElementById("cpassword");

formulario.onsubmit = (evento) =>{
    if(nome.value == ""){
        evento.preventDefault();
        mensagem.innerHTML ="<p> Digite seu primeiro nome!</p>"
        nome.focus();
        return null;
    }
}