const mensagem = document.querySelector(".mensagem");
const formulario = document.querySelector(".form");
const nome = document.getElementById("fisrtname");
const sobrenome = document.getElementById("lastname");
const email = document.getElementById("imail");
const numero = document.getElementById("inumber");
const senha = document.getElementById("ipassword");
const csenha = document.getElementById("icpassword");
const gender = document.querySelector(".gender-group");
const feminino = document.getElementById("female");
const masculino = document.getElementById("male");
const outros = document.getElementById("others");
const ndizer = document.getElementById("none")
var sexo;

formulario.onsubmit = (evento) =>{
    if(nome.value == ""){
        evento.preventDefault();
        mensagem.innerHTML ="<p> Digite seu primeiro nome!</p>";
        nome.focus();
        return null;
    }

    if(sobrenome.value == ""){
        evento.preventDefault();
        mensagem.innerHTML ="<p> Digite seu sobrenome!</p>";
        sobrenome.focus();
        return null;
    }

    if(email.value == ""){
        evento.preventDefault();
        mensagem.innerHTML ="<p> Digite seu email!</p>";
        email.focus();
        return null;
    }

    if(numero.value == ""){
        evento.preventDefault();
        mensagem.innerHTML ="<p> Digite seu número!</p>";
        numero.focus();
        return null;
    }

    if(senha.value == ""){
        evento.preventDefault();
        mensagem.innerHTML ="<p> Digite sua senha!</p>";
        senha.focus();
        return null;
    }

    if(csenha.value == ""){
        evento.preventDefault();
        mensagem.innerHTML ="<p> Confirme sua senha!</p>";
        csenha.focus();
        return null;
    }

    if(csenha.value != senha.value){
        evento.preventDefault();
        mensagem.innerHTML ="<p> Senha incorreta!"
        csenha.focus();
        return null;
    }

    if (feminino.checked){
        sexo = "f";
    }

    if (masculino.checked){
        sexo = "m";
    }

    if (outros.checked){
        sexo = "o";
    }

    if (ndizer.checked){
        sexo = "n";
    }

    let dados = JSON.parse(localStorage.getItem("dados")) || [];

    dados.push({
        nome: nome.value + sobrenome.value,
        email: email.value,
        celular: numero.value,
        senha: senha.value,
        sexo : sexo
    })

    localStorage.setItem("dados", JSON.stringify(dados));
    evento.preventDefault();
    alert ("Parabens Cadastro feito com sucesso");
    window.location.assign("login.html");
}