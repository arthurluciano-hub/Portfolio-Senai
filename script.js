const botaoMensagem = document.getElementById("botaoMensagem")
const mensagem = document.getElementById("mensagem")
const aprendizados = [
    {
        tema:'HTML',
        pergunta:'Qual a diferença entre id e class?',
        resposta:'O id identifica um unico elemento. A class pode ser usada em varios elementos',
        entendimento:'Entendi que o uso do id para algo especifico e class para repetir estilos'
    },
    {
    tema:'CSS',
    pergunta:'Qual a diferença entre margin e padding?',
    resposta:'Margin cria espaço externo ao elemento. Padding cria espaço interno entre o conteúdo e a borda.',
    entendimento:'Entendi que margin afasta os elementos e padding cria respiro dentro deles.'
    },
    {
    tema:'JavaScript',
    pergunta:'O que faz o getElementById?',
    resposta:'O getElementById seleciona um elemento HTML através do id.',
    entendimento:'Entendi como conectar o JavaScript com elementos da página HTML.'
    },


]

function alterarTexto(){
    //mensagem.textContent = "Bem-vindo ao meu portfolio! Este projeto foi criado com HTML, CSS e JavaScript"
    alert("Bem-vindo ao meu portfolio! Este projeto foi criado com HTML, CSS e JavaScript")
}

function mostrarTecnologia(tecnologia){
    const texto = document.getElementById("TecnologiaSelecionada");

    texto.textContent = "Voce selecionou: " + tecnologia;
}

/* =========================
   TROCA DE TEMA
========================= */

const botaoTema = document.getElementById("temaBtn");

/* Carregar tema salvo */
window.onload = function(){

    const temaSalvo = localStorage.getItem("tema");

    if(temaSalvo === "light"){

        document.body.classList.add("light-mode");

        if(botaoTema){
            botaoTema.innerHTML = "☾ Dark";
        }

    } else{

        if(botaoTema){
            botaoTema.innerHTML = "☼ Light";
        }
    }
}

/* Trocar tema */
function trocarTema(){

    document.body.classList.toggle("light-mode");

    if(document.body.classList.contains("light-mode")){

        localStorage.setItem("tema", "light");

        botaoTema.innerHTML = "☾ Dark";

    } else{

        localStorage.setItem("tema", "dark");

        botaoTema.innerHTML = "☼ Light";
    }
}

function renderizarAprendizados(lista){
    const listaAprendizados = document.getElementById("listaAprendizados")
    const contadorAprendizados = document.getElementById("contadorAprendizados")

    if("!listaAprendizados || !contadorAprendizados"){
        return;
    }

    listaAprendizados.innerHTML = "";

    for(let cont = 0; cont < lista.length; cont++){
        listaAprendizados.innerHTML += `
        <article class="aprendizadoo">
            <span>${lista[cont].tema}</span>
            <h3>${lista[cont].pergunta}</h3>
            <p><strong>Reposta:</strong> ${lista[cont].resposta}<p>
            <p><strong>O que entendi:</strong> ${lista[cont].entendimento}<p>
            </article>
            `
    }
        
    contadorAprendizados.textContent = "Total de Aprendizados: " + lista.length
}

renderizarAprendizados(aprendizados)
