const botaoMensagem = document.getElementById("botaoMensagem");
const mensagem = document.getElementById("mensagem");
const botaoTema = document.getElementById("temaBtn");
const CHAVE_APRENDIZADOS = "portfolioAprendizados";

const aprendizadosPadrao = [
    {
        tema: "HTML",
        pergunta: "Qual é a diferença entre id e class?",
        resposta: "O id identifica um único elemento. A class pode ser usada em vários elementos.",
        entendimento: "Entendi que uso id para algo específico e class para repetir estilos."
    },
    {
        tema: "CSS",
        pergunta: "Quando usar flexbox e grid?",
        resposta: "Flexbox organiza elementos em uma direção. Grid organiza elementos em linhas e colunas.",
        entendimento: "Entendi que grid é melhor para montar áreas com vários cards."
    },
    {
        tema: "JavaScript",
        pergunta: "Para que serve uma função?",
        resposta: "Uma função guarda um conjunto de comandos que podem ser executados quando forem chamados.",
        entendimento: "Entendi que funções ajudam a organizar e reaproveitar código."
    }
];

let aprendizados = carregarAprendizados();
let filtroAtual = "Todos";

function carregarAprendizados(){
    const aprendizadosSalvos = localStorage.getItem(CHAVE_APRENDIZADOS);

    if(!aprendizadosSalvos){
        return [...aprendizadosPadrao];
    }

    try{
        const lista = JSON.parse(aprendizadosSalvos);

        if(Array.isArray(lista)){
            return lista;
        }
    } catch(erro){
        console.warn("Não foi possível carregar os aprendizados salvos.", erro);
    }

    return [...aprendizadosPadrao];
}

function salvarAprendizados(){
    localStorage.setItem(CHAVE_APRENDIZADOS, JSON.stringify(aprendizados));
}

function alterarTexto(){
    alert("Bem-vindo ao meu portfolio! Este projeto foi criado com HTML, CSS e JavaScript");
}

function mostrarTecnologia(tecnologia){
    const texto = document.getElementById("TecnologiaSelecionada");

    if(texto){
        texto.textContent = "Você selecionou: " + tecnologia;
    }
}

function carregarTema(){
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

function trocarTema(){
    document.body.classList.toggle("light-mode");

    if(document.body.classList.contains("light-mode")){
        localStorage.setItem("tema", "light");

        if(botaoTema){
            botaoTema.innerHTML = "☾ Dark";
        }
    } else{
        localStorage.setItem("tema", "dark");

        if(botaoTema){
            botaoTema.innerHTML = "☼ Light";
        }
    }
}

function destacarLinkAtivo(){
    const paginaAtual = window.location.pathname.split("/").pop() || "index.html";
    const links = document.querySelectorAll("nav a");

    links.forEach(function(link){
        const href = link.getAttribute("href");

        if(href === paginaAtual){
            link.classList.add("ativo");
        }
    });
}

function mostrarFeedbackFormulario(mensagemTexto, tipo){
    const feedback = document.getElementById("feedbackFormulario");

    if(!feedback){
        return;
    }

    feedback.textContent = mensagemTexto;
    feedback.className = "feedback-form " + tipo;
}

function limparFeedbackFormulario(){
    const feedback = document.getElementById("feedbackFormulario");

    if(feedback){
        feedback.textContent = "";
        feedback.className = "feedback-form";
    }
}

function alternarFormularioAprendizado(){
    const campos = document.getElementById("camposAprendizado");
    const botao = document.getElementById("botaoNovoRegistro");

    if(!campos || !botao){
        return;
    }

    campos.classList.toggle("oculto-form");
    const estaAberto = !campos.classList.contains("oculto-form");

    botao.textContent = estaAberto ? "Fechar formulário" : "Novo registro";

    if(estaAberto){
        const tema = document.getElementById("tema");

        if(tema){
            tema.focus();
        }
    }
}

function limparFormularioAprendizado(){
    const formulario = document.querySelector(".form-aprendizado");

    if(!formulario){
        return;
    }

    formulario.reset();
    mostrarFeedbackFormulario("Campos limpos. Você pode começar um novo registro.", "info");
}

function renderizarAprendizados(lista){
    const listaAprendizados = document.getElementById("listaAprendizados");
    const contadorAprendizados = document.getElementById("contadorAprendizados");

    if(!listaAprendizados || !contadorAprendizados){
        return;
    }

    listaAprendizados.innerHTML = "";

    for(let cont = 0; cont < lista.length; cont++){
        const card = document.createElement("article");
        const tema = document.createElement("span");
        const pergunta = document.createElement("h3");
        const resposta = document.createElement("p");
        const entendimento = document.createElement("p");
        const botaoExcluir = document.createElement("button");

        card.classList.add("aprendizado");
        botaoExcluir.classList.add("botao-excluir");
        tema.textContent = lista[cont].tema;
        pergunta.textContent = lista[cont].pergunta;
        resposta.innerHTML = "<strong>Resposta:</strong> ";
        resposta.append(lista[cont].resposta);
        entendimento.innerHTML = "<strong>O que entendi:</strong> ";
        entendimento.append(lista[cont].entendimento);
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.type = "button";
        botaoExcluir.onclick = function(){
            excluirAprendizado(lista[cont]);
        };

        card.append(tema, pergunta, resposta, entendimento, botaoExcluir);
        listaAprendizados.appendChild(card);
    }

    contadorAprendizados.textContent = "Total de Aprendizados: " + lista.length;
}

function atualizarListaAprendizados(){
    if(filtroAtual === "Todos"){
        renderizarAprendizados(aprendizados);
        return;
    }

    const filtrados = aprendizados.filter(function(item){
        return item.tema === filtroAtual;
    });

    renderizarAprendizados(filtrados);
}

function adicionarAprendizado(event){
    event.preventDefault();

    const tema = document.getElementById("tema").value;
    const pergunta = document.getElementById("pergunta").value.trim();
    const resposta = document.getElementById("resposta").value.trim();
    const entendimento = document.getElementById("entendimento").value.trim();

    if(!tema || !pergunta || !resposta || !entendimento){
        mostrarFeedbackFormulario("Preencha todos os campos antes de adicionar o aprendizado.", "erro");
        return false;
    }

    aprendizados.push({
        tema: tema,
        pergunta: pergunta,
        resposta: resposta,
        entendimento: entendimento
    });

    salvarAprendizados();
    event.target.reset();
    filtroAtual = "Todos";
    atualizarListaAprendizados();
    mostrarFeedbackFormulario("Aprendizado cadastrado com sucesso.", "sucesso");

    const listaAprendizados = document.getElementById("listaAprendizados");
    const botaoAprendizados = document.getElementById("botaoAprendizados");

    if(listaAprendizados && botaoAprendizados){
        listaAprendizados.classList.remove("oculto");
        botaoAprendizados.textContent = "Ocultar aprendizados";
    }

    return false;
}

function filtrarAprendizados(tema){
    filtroAtual = tema;
    atualizarListaAprendizados();
}

function excluirAprendizado(aprendizado){
    const confirmarExclusao = confirm("Deseja excluir este aprendizado?");

    if(!confirmarExclusao){
        return;
    }

    const indice = aprendizados.indexOf(aprendizado);

    if(indice >= 0){
        aprendizados.splice(indice, 1);
        salvarAprendizados();
        atualizarListaAprendizados();
        mostrarFeedbackFormulario("Aprendizado excluído com sucesso.", "sucesso");
    }
}

function mostrarOcultarAprendizados(){
    const listaAprendizados = document.getElementById("listaAprendizados");
    const botaoAprendizados = document.getElementById("botaoAprendizados");
    const filtros = document.querySelector(".barra-aprendizados .filtros");

    if(!listaAprendizados || !botaoAprendizados){
        return;
    }

    listaAprendizados.classList.toggle("oculto");

    if(filtros){
        filtros.classList.toggle("oculto");
    }

    if(listaAprendizados.classList.contains("oculto")){
        botaoAprendizados.textContent = "Mostrar aprendizados";
    } else{
        botaoAprendizados.textContent = "Ocultar aprendizados";
    }
}

window.onload = function(){
    carregarTema();
    destacarLinkAtivo();
    atualizarListaAprendizados();
};
