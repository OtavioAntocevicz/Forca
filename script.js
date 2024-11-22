let palavras = [];
let palavra;
let letrasAdvinhadas = [];
let letrasErradas = [];
let tentativas = 6;
let vitorias = 0;
let derrotas = 0;

async function carregarTema(temaSelecionado) {
  try {
    // Esconde o menu e exibe o jogo
    document.getElementById("menu-container").style.display = "none";
    document.getElementById("game-container").style.display = "block";

    // Carrega o tema a partir do arquivo JSON
    const response = await fetch(`temas/${temaSelecionado}.json`);
    const data = await response.json();

    // Atualiza o título com o nome do tema
    document.getElementById("theme-title").textContent = `Tema: ${data.tema}`;

    palavras = data.palavras.map(p => p.toLowerCase());

    // Inicia o jogo com as palavras do tema carregado
    iniciarJogo();
  } catch (error) {
    console.error("Erro ao carregar o tema:", error);
  }
}

function voltarMenu() {
  // Volta para o menu inicial
  document.getElementById("menu-container").style.display = "block";
  document.getElementById("game-container").style.display = "none";
}

// Função para escolher uma palavra aleatória
function escolherPalavra() {
  palavra = palavras[Math.floor(Math.random() * palavras.length)].toLowerCase();
  palavra = removerAcentos(palavra);
}

// Função para exibir o estado atual da palavra
function mostrarEstado() {
  let estado = '';
  for (let i = 0; i < palavra.length; i++) {
    const letra = palavra[i];
    if (letrasAdvinhadas.includes(letra) || letra === '-') {
      estado += letra + ' ';
    } else if (letra === ' ') {
      estado += '- ';
    } else {
      estado += '_ ';
    }
  }
  document.getElementById("word-container").textContent = estado.trim();
}

function mostrarTentativas() {
  document.getElementById("remaining-attempts").textContent = `Tentativas restantes: ${tentativas}`;
}

function mostrarLetrasErradas() {
  document.getElementById("wrong-letters").textContent = `Letras erradas: ${letrasErradas.join(', ')}`;
}

function guessLetter() {
  const input = document.getElementById("letter-input").value.toLowerCase();
  document.getElementById("letter-input").value = '';

  if (!input || input.length !== 1) {
    alert("Por favor, insira apenas uma letra.");
    return;
  }

  const letra = removerAcentos(input);

  if (letrasAdvinhadas.includes(letra) || letrasErradas.includes(letra)) {
    alert("Você já adivinhou essa letra.");
    return;
  }

  if (palavra.includes(letra)) {
    letrasAdvinhadas.push(letra);
    document.getElementById("message").textContent = "Boa! Você adivinhou uma letra.";
  } else {
    letrasErradas.push(letra);
    tentativas--;
    document.getElementById("message").textContent = "Letra errada. Tente novamente.";
  }

  mostrarEstado();
  mostrarTentativas();
  mostrarLetrasErradas();

  if (allLettersGuessed()) {
    document.getElementById("message").textContent = "Parabéns! Você adivinhou a palavra!";
    vitorias++;
    document.getElementById("wins").textContent = vitorias;
    setTimeout(iniciarJogo, 3000); // Reinicia o jogo após 3 segundos
  }

  if (tentativas <= 0) {
    document.getElementById("lost-word").textContent = `Você perdeu! A palavra era: ${palavra}`;
    derrotas++;
    document.getElementById("losses").textContent = derrotas;
    setTimeout(iniciarJogo, 3000); // Reinicia o jogo após 3 segundos
  }
}

function allLettersGuessed() {
  return palavra.split('').every(letra => letrasAdvinhadas.includes(letra) || letra === ' ' || letra === '-' || !/[a-zA-Z]/.test(letra));
}

function iniciarJogo() {
  escolherPalavra();
  letrasAdvinhadas = [];
  letrasErradas = [];
  tentativas = 6;
  document.getElementById("lost-word").textContent = '';
  document.getElementById("message").textContent = '';
  mostrarEstado();
  mostrarTentativas();
  mostrarLetrasErradas();
}

function removerAcentos(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("letter-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      guessLetter();  // Chama a função para adivinhar a letra quando Enter for pressionado
    }
  });
});


// Iniciar jogo ao carregar a página
iniciarJogo();
