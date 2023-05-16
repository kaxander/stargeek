const mensagem = document.querySelector(".mensagem");
const email = document.getElementById("email");
const senha = document.getElementById("senha");
const formulario = document.getElementById("formulario");

formulario.onsubmit = (evento) => {
    let dados = JSON.parse(localStorage.getItem("dados"));

    dados.forEach (elemento => {
        if (elemento.email === email.value && elemento.senha === senha.value) {
            evento.preventDefault();
            alert("Logado");
            return true;
        }
        
        else  {
            alert("E-mail ou senha incorretos")
            evento.preventDefault();
        }
    });

    localStorage.setItem("dados", JSON.stringify(dados));
    evento.preventDefault();
    window.location.assign("index.html");
}