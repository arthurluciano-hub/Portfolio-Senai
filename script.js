const botaoMensagem = document.getElementById("botaoMensagem")
const mensagem = document.getElementById("mensagem")

function alterarTexto(){
    //mensagem.textContent = "Bem-vindo ao meu portfolio! Este projeto foi criado com HTML, CSS e JavaScript"
    alert("Bem-vindo ao meu portfolio! Este projeto foi criado com HTML, CSS e JavaScript")
}

botaoMensagem.addEventListener("click", alterarTexto())
