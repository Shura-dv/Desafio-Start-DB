const letrasChutadas = document.getElementById("letras-chutadas");
const containerDeOpcoes = document.getElementById("opcoes-container");
const entradaDoUsuario = document.getElementById("entrada-do-usuario");
const NovoJogoContainer = document.getElementById("novo-jogo-container");
const BotaoNovoJogo = document.getElementById("botao-novo-jogo");
const canvas = document.getElementById("canvas");
const estadoDoJogo = document.getElementById("estado-do-jogo");

let opcoes = {
  frutas: [
    "Acerola",
    "Banana",
    "Carambola",
    "Damasco",
    "Framboesa",
    "Lichia",
  ],
  
  animais: [
      "Alpaca",
      "Boto",
      "Caramujo",
      "Doninha",
      "Escaravelho",
      "Flamingo"
    ],
  
  países: [
    "Alemanha",
    "Brasil",
    "Canadá",
    "Dinamarca",
    "Eslovénia",
    "Gibraltar",
  ],
};

let vidas = 0;
let vidasPerdidas = 0;

let palavraSecreta = "";

const mostrarOpcoes = () => {
  containerDeOpcoes.innerHTML += `<h3>Por favor, selecione uma opção:</h3>`;
  let botaoContainer = document.createElement("div");
  for (let value in opcoes) {
    botaoContainer.innerHTML += `<button class="opcoes" onclick="gerarPalavra('${value}')">${value}</button>`;
  }
  containerDeOpcoes.appendChild(botaoContainer);
};

const bloquear = () => {
  let botoesDasOpcoes = document.querySelectorAll(".opcoes");
  let botoesDasLetras = document.querySelectorAll(".letras");
  botoesDasOpcoes.forEach((button) => {
    button.disabled = true;
  });

  botoesDasLetras.forEach((button) => {
    button.disabled.true;
  });
  NovoJogoContainer.classList.remove("hide");
};

const gerarPalavra = (valorDasOpcoes) => {
  let botoesDasOpcoes = document.querySelectorAll(".opcoes");
  botoesDasOpcoes.forEach((button) => {
    if (button.innerText.toLowerCase() === valorDasOpcoes) {
      button.classList.add("active");
    }
    button.disabled = true;
  });

  letrasChutadas.classList.remove("hide");
  entradaDoUsuario.innerText = "";

  let opcaoArray = opcoes[valorDasOpcoes];
  palavraSecreta = opcaoArray[Math.floor(Math.random() * opcaoArray.length)];
  palavraSecreta = palavraSecreta.toUpperCase();

  let displayItem = palavraSecreta.replace(/./g, '<span class="tracos">_</span>');

  entradaDoUsuario.innerHTML = displayItem;
};

const inicializador = () => {
  vidas = 0;
  vidasPerdidas = 0;

  entradaDoUsuario.innerHTML = "";
  containerDeOpcoes.innerHTML = "";
  letrasChutadas.classList.add("hide");
  NovoJogoContainer.classList.add("hide");
  letrasChutadas.innerHTML = "";

  
  for (let i = 65; i < 91; i++) {
    let button = document.createElement("button");
    button.classList.add("letras");
    button.innerText = String.fromCharCode(i);
    button.addEventListener("click", () => {
      let palavraSecretaArray = palavraSecreta.split("");
      let tracos = document.getElementsByClassName("tracos");
      
      if (palavraSecretaArray.includes(button.innerText)) {
        palavraSecretaArray.forEach((char, index) => {
          
          if (char === button.innerText) {
            
            tracos[index].innerText = char;
            vidas += 1;
            if (vidas == palavraSecretaArray.length) {
              estadoDoJogo.innerHTML = `<h2 class='msg-vitoria'>Ganhou!!</h2><p>A palavra era <span>${palavraSecreta}</span></p>`;
              
              bloquear();
            }
          }
        });
      } else {
        vidasPerdidas += 1;
        bonequinho(vidasPerdidas);
        if (vidasPerdidas == 6) {
          estadoDoJogo.innerHTML = `<h2 class='msg-derrota'>Perdeu!!</h2><p>A palavra era <span>${palavraSecreta}</span></p>`;
          bloquear();
        }
      }
      button.disabled = true;
    });
    letrasChutadas.append(button);
  }

  mostrarOpcoes();
  let { desenhoInicial } = criarCanvas();
  desenhoInicial();
};

const criarCanvas = () => {
  let context = canvas.getContext("2d");
  context.beginPath();
  context.strokeStyle = "#000";
  context.lineWidth = 2;

  const desenharLinha = (fromX, fromY, toX, toY) => {
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.stroke();
  };

  const cabeca = () => {
    context.beginPath();
    context.arc(70, 30, 10, 0, Math.PI * 2, true);
    context.stroke();
  };

  const corpo = () => {
    desenharLinha(70, 40, 70, 80);
  };

  const bracoEsquerdo = () => {
    desenharLinha(70, 50, 50, 70);
  };

  const bracoDireito = () => {
    desenharLinha(70, 50, 90, 70);
  };

  const pernaEsquerda = () => {
    desenharLinha(70, 80, 50, 110);
  };

  const pernaDireita = () => {
    desenharLinha(70, 80, 90, 110);
  };

  const desenhoInicial = () => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    desenharLinha(10, 130, 130, 130);
    desenharLinha(10, 10, 10, 131);
    desenharLinha(10, 10, 70, 10);
    desenharLinha(70, 10, 70, 20);
  };

  return { desenhoInicial, cabeca, corpo, bracoEsquerdo, bracoDireito, pernaEsquerda, pernaDireita };
};

const bonequinho = (count) => {
  let { cabeca, corpo, bracoEsquerdo, bracoDireito, pernaEsquerda, pernaDireita } = criarCanvas();
  switch (vidasPerdidas) {
    case 1:
      cabeca();
      break;
    case 2:
      corpo();
      break;
    case 3:
      bracoEsquerdo();
      break;
    case 4:
      bracoDireito();
      break;
    case 5:
      pernaEsquerda();
      break;
    case 6:
      pernaDireita();
      break;
    default:
      break;
  }
};

BotaoNovoJogo.addEventListener("click", inicializador);
window.onload = inicializador;