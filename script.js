const perguntas = {
  pergunta1: {
    pergunta: "1 - Onde você se vê em cinco anos? E em dez?",
    resposta: "Futuro",
  },
  pergunta2: {
    pergunta: "2 - Quais são suas forças?",
    resposta: "Pessoal",
  },
  pergunta3: {
    pergunta:
      "3 - Conte sobre uma ocasião em que você teve de lidar com uma situação complicada.",
    resposta: "Experiência",
  },
  pergunta4: {
    pergunta: "4 - Fale sobre suas experiências de liderança.",
    resposta: "Experiência",
  },
  pergunta5: {
    pergunta: "5 - O que te motiva?",
    resposta: "Pessoal",
  },
  pergunta6: {
    pergunta: "6 - Quem são nossos competidores?",
    resposta: "Empresa",
  },
  pergunta7: {
    pergunta: "7 - Quais são seus hobbies?",
    resposta: "Pessoal",
  },
  pergunta8: {
    pergunta: "8 - Qual o nome do nosso CEO/Presidente?",
    resposta: "Empresa",
  },
  pergunta9: {
    pergunta:
      "9 - O que você pensa em fazer nos seus primeiros 30/60/90 dias nesse novo emprego?",
    resposta: "Futuro",
  },
  pergunta10: {
    pergunta: "10 - Conte sobre uma vez que você cometeu um erro.",
    resposta: "Experiência",
  },
  pergunta11: {
    pergunta: "11 - Por que você está procurando por outro emprego?",
    resposta: "Pessoal",
  },
  pergunta12: {
    pergunta: "12 - Conte sobre seu currículo.",
    resposta: "Experiência",
  },
};

let indiceAtual = 0; // Rastrea o índice da pergunta atual
let contadorDeAcertos = 0;
const respostasContent = document.querySelector(".respostas");
const finalizacaoContent = document.querySelector(".finalizacao");

// Função para iniciar o jogo com base na primeira pergunta
function iniciarJogo() {
  const chavesPerguntas = Object.keys(perguntas); // Obtem as chaves em ordem
  atualizarPergunta(chavesPerguntas[indiceAtual], chavesPerguntas);
}

// Função para atualizar a pergunta e as alternativas
function atualizarPergunta(chave, chavesPerguntas) {
  const perguntaAtual = perguntas[chave];
  const perguntaElemento = document.querySelector("#Pergunta");
  perguntaElemento.innerText = perguntaAtual.pergunta;

  document.querySelectorAll(".flex p").forEach((alternativa) => {
    // Remover classes antigas
    alternativa.classList.remove("correct", "error");

    // Adicionar evento de clique
    alternativa.onclick = () =>
      verificarResposta(alternativa, perguntaAtual.resposta, chavesPerguntas);
  });
}

// Função para verificar a resposta clicada
// Função para verificar a resposta clicada
function verificarResposta(elemento, respostaCorreta, chavesPerguntas) {
  const alternativaSelecionada = elemento.innerText.trim(); // Captura diretamente o texto da alternativa clicada

  // Resetar classes
  document.querySelectorAll(".flex p").forEach((p) => {
    p.classList.remove("correct", "error");
  });

  // Aplicar classes com base na resposta
  if (alternativaSelecionada === respostaCorreta) {
    elemento.classList.add("correct");
    contadorDeAcertos++;
  } else {
    elemento.classList.add("error");

    // Encontrar e marcar a resposta correta
    document.querySelectorAll(".flex p").forEach((p) => {
      if (p.innerText.includes(respostaCorreta)) {
        p.classList.add("correct");
      }
    });
  }

  // Desabilitar cliques enquanto a transição acontece
  document.querySelectorAll(".flex p").forEach((p) => {
    p.onclick = null;
  });

  // Avançar para a próxima pergunta após um pequeno atraso
  setTimeout(() => {
    indiceAtual++;
    if (indiceAtual < chavesPerguntas.length) {
      atualizarPergunta(chavesPerguntas[indiceAtual], chavesPerguntas);

      // Reabilitar o clique nas alternativas após a transição
      document.querySelectorAll(".flex p").forEach((p) => {
        p.onclick = () =>
          verificarResposta(
            p,
            perguntas[chavesPerguntas[indiceAtual]].resposta,
            chavesPerguntas
          );
      });
    } else {
      finalizarJogo();
    }
  }, 1000); // Atraso de 1 segundo para permitir que o usuário veja o resultado
}

// Função para finalizar o jogo
function finalizarJogo() {
  const perguntaElemento = document.querySelector("#Pergunta");
  const valueCont = document.getElementById("value-cont");
  finalizacaoContent.classList.remove("hidden");
  respostasContent.classList.add("hidden");
  valueCont.textContent = contadorDeAcertos;
  perguntaElemento.innerText = "Parabéns! Você completou todas as perguntas.";

  // Desabilitar cliques nas alternativas
  document.querySelectorAll(".flex p").forEach((p) => {
    p.onclick = null;
  });
}

function playagain() {
  window.location.reload();
}

document.getElementById("play-again").addEventListener("click", () => {
  playagain();
});

// Iniciar o jogo ao carregar a página
document.addEventListener("DOMContentLoaded", iniciarJogo);
