const botaomodal = document.getElementById("btn");
const cards = document.querySelector(".cards")
const cadastrar = document.querySelector(".add");
const formulario = document.querySelector(".cadmodal");
const concluir = document.querySelector(".btn02");
const fechar = document.querySelector(".btnf");
const botaocadastrar = document.querySelector(".btn");
const botaoeditar = document.querySelector(".btn02")
const nome = document.getElementById("usuario");
const descricao = document.getElementById("descricao");
const foto = document.getElementById("foto");
const idelemento = document.getElementById("idalterar");

botaomodal.onclick = ()=>{
   formulario.style.display = "flex";
   concluir.style.display = "none";
}

fechar.onclick = ()=>{
   formulario.style.display = "none";
}

botaocadastrar.onclick = (evento)=>{
    evento.preventDefault();
    fenvio()
    .then(result =>{
                     if(result){
                        let dados = JSON.parse(localStorage.getItem("catalogo"))||[];
                        dados.push(
                                      {
                                         nome: nome.value,
                                        descricao: descricao.value,
                                        foto: nomeArq
                                        }
                                     )
                        localStorage.setItem("catalogo", JSON.stringify(dados));
                        
                     }else{
                        alert("Houve erro no envio do arquivo");
                     }

                    });
}

var nomeArq;
async function fenvio() { 
    const url = 'http://localhost:3005/upload';
    const arquivo = document.getElementById("foto").files[0];
    const formData = new FormData();
    formData.append('arquivo', arquivo);
    console.log(JSON.stringify(formData));
    try{
         
         var resp = await fetch(url, {
                                       method: 'POST',
                                       body: formData,
                                     }
                               ) 
         if (resp.ok){
           let respText = await resp.text();
           nomeArq = respText;
           return true;
         }
         else{
              return false;
         }
       }
    catch (error) {
        console.error(error);
        return false;
      }
}

function carregarCatalogo(){
   let dados = JSON.parse(localStorage.getItem("catalogo"));
   let divcard = document.createElement("div");
   if(dados == null){
       divcard.innerHTML = "<p>Nenhum item cadastrado</p>";
       cards.style.background = "#201b2c";
       cards.appendChild(divcard);
       return null;
   }

   dados.forEach((elemento, indice) => {
       let divcard = document.createElement("div");
       divcard.setAttribute("class", "card");
       divcard.innerHTML = `<div class="cardimagem"> <img src="img/${elemento.foto}"> </div> 
       <div class="cardnome">${elemento.nome} <p>${elemento.descricao}</p></div>
       <div class ="cardinfo"><i class="bi bi-pencil-fill" onclick="editar(${indice})"></i>
      <i class="bi bi-trash3-fill" onclick="excluir(${indice})"></i>
      </div>
       `;
       cards.appendChild(divcard);
       
   });
}

carregarCatalogo();

function editar(indice){
   nome.value = "";
   descricao.value = "";
   foto.files[0] = null;
   formulario.style.display = "flex";
   botaocadastrar.style.display = "none";
   botaoeditar.style.display = "block";
   
   let dados = JSON.parse(localStorage.getItem("catalogo"));
   nome.value = dados[indice].nome;
   descricao.value = dados[indice].descricao;
   //foto.files[0] = dados[indice].foto;
   idelemento.value = indice;
   fotoa = dados[indice].foto;
}

var fotoa;
botaoeditar.onclick = (evento) =>{
    if ((fotoa != foto.value)&&(foto.value != "")){
    evento.preventDefault();
    fenvio()
    .then(result =>{
                     if(result){
                        salvaEdicao(nomeArq);
                        }
                    });
    }
    else
    {
        salvaEdicao(fotoa);
    } 
}
function salvaEdicao(pfoto){
    let dados = JSON.parse(localStorage.getItem("catalogo"));
    dados[idelemento.value].nome = nome.value;
    dados[idelemento.value].descricao = descricao.value;
    dados[idelemento.value].foto = pfoto;
    localStorage.setItem("catalogo", JSON.stringify(dados));

}

function excluir(indice){
    let dados = JSON.parse(localStorage.getItem("catalogo"));
    if(dados.length == 1)
    {localStorage.clear("catalogo");}
    else{
    dados.splice(indice,1);
    localStorage.setItem("catalogo", JSON.stringify(dados));
    }
    window.location.reload();
}