const palavras = [
  "Médico", "Advogado", "Engenheiro Civil", "Designer-Gráfico", 'Professor', 'Arquiteto',   'Enfermeiro', 'Psicólogo', 
  'Farmacêutico', 'Veterinário', 'Jornalista', 'Designer Gráfico', 'Contador', 'Chef de Cozinha',
  'Fotógrafo', 'Piloto de Avião', 'Dentista', 'Fisioterapeuta', 'Nutricionista', 'Bibliotecário', 'Assistente Social', 'Biólogo', 'Químico', 'Geólogo',
  'Astrônomo', 'Meteorologista', 'Economista', 'Publicitário', 'Tradutor', 'Ator', 'Músico',  'Dançarino', 'Escritor', 'Editor de Vídeo', 'Produtor de Cinema',
  'Técnico de Informática', 'Analista de Sistemas', 'Desenvolvedor de Software', 'Engenheiro de Redes', 'Especialista em Cibersegurança', 'Administrador de Banco de Dados',
  'Técnico em Radiologia', 'Técnico em Enfermagem', 'Técnico em Eletrônica', 'Técnico em Mecânica', 'Técnico em Automação', 'Técnico em Edificações',
  'Técnico em Meio Ambiente', 'Técnico em Segurança do Trabalho', 'Técnico em Logística', 'Técnico em Telecomunicações'
];

function removerAcentos(str) {
  const mapaDeAcentos = {
    'á': 'a', 'à': 'a', 'ã': 'a', 'â': 'a', 'é': 'e', 'è': 'e', 'ê': 'e', 'í': 'i', 'ì': 'i',
    'ó': 'o', 'ò': 'o', 'õ': 'o', 'ô': 'o', 'ú': 'u', 'ù': 'u', 'û': 'u', 'ç': 'c', 'Á': 'A',
    'À': 'A', 'Ã': 'A', 'Â': 'A', 'É': 'E', 'È': 'E', 'Ê': 'E', 'Í': 'I', 'Ì': 'I', 'Ó': 'O',
    'Ò': 'O', 'Õ': 'O', 'Ô': 'O', 'Ú': 'U', 'Ù': 'U', 'Û': 'U', 'Ç': 'C'
  };
  
  return str.replace(/[áàãâéèêíìóòõôúùûçÁÀÃÂÉÈÊÍÌÓÒÕÔÚÙÛÇ]/g, match => mapaDeAcentos[match]);
}

let palavra;
let letrasAdvinhadas = [];
let tentativas = 6;

function escolherPalavra() {
  palavra = palavras[Math.floor(Math.random() * palavras.length)].toLowerCase();
  palavra = removerAcentos(palavra);
}

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

function guessLetter() {
  const input = document.getElementById("letter-input").value.toLowerCase();
  document.getElementById("letter-input").value = '';
  
  if (!input || input.length !== 1) {
    alert("Por favor, insira apenas uma letra.");
    return;
  }

  const letra = removerAcentos(input);

  if (letrasAdvinhadas.includes(letra)) {
    alert("Você já adivinhou essa letra.");
    return;
  }

  letrasAdvinhadas.push(letra);
  
  if (palavra.includes(letra)) {
    document.getElementById("message").textContent = "Boa! Você adivinhou uma letra.";
  } else {
    tentativas--;
    document.getElementById("message").textContent = "Letra errada. Tente novamente.";
  }

  mostrarEstado();
  mostrarTentativas();

  if (allLettersGuessed()) {
    document.getElementById("message").textContent = "Parabéns! Você adivinhou a palavra!";
  }

  if (tentativas <= 0) {
    document.getElementById("lost-word").textContent = `Você perdeu! A palavra era: ${palavra}`;
  }
}

function allLettersGuessed() {
  return palavra.split('').every(letra => letrasAdvinhadas.includes(letra) || letra === ' ' || letra === '-' || !/[a-zA-Z]/.test(letra));
}

function iniciarJogo() {
  escolherPalavra();
  letrasAdvinhadas = [];
  tentativas = 6;
  document.getElementById("lost-word").textContent = '';
  document.getElementById("message").textContent = '';
  mostrarEstado();
  mostrarTentativas();
}

document.getElementById("letter-input").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    guessLetter();
  }
});

iniciarJogo();