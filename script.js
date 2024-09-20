document.addEventListener('DOMContentLoaded', function () {
  const noteSelector = document.getElementById('note');
  const clearBtn = document.getElementById('clear-btn');
  const chordProgressionsDiv = document.getElementById('chord-progressions');
  const pentatonicScalesDiv = document.getElementById('pentatonic-scales');
  const guitarNeckDiv = document.getElementById('guitar-neck');
  const resultSection = document.getElementById('result-section');
  const copyBtn = document.getElementById('copy-btn');

  // Verifica se os elementos existem antes de adicionar event listeners ou manipular DOM
  if (!noteSelector || !clearBtn || !chordProgressionsDiv || !pentatonicScalesDiv || !guitarNeckDiv || !resultSection) {
    console.error('Um ou mais elementos não foram encontrados no DOM.');
    return;
  }

  // Função para gerar progressões harmônicas
  function generateChordProgressions(note) {
    const progressions = {
      'C': ['C - Dm - Em - F - G - Am - Bdim'],
      'C#': ['C# - D#m - E#m - F# - G# - A#m - B#dim'],
      'D': ['D - Em - F#m - G - A - Bm - C#dim'],
      'D#': ['D# - Fm - Gm - G# - A# - Cm - Ddim'],
      'E': ['E - F#m - G#m - A - B - C#m - D#dim'],
      'F': ['F - Gm - Am - Bb - C - Dm - Edim'],
      'F#': ['F# - G#m - A#m - B - C# - D#m - E#dim'],
      'G': ['G - Am - Bm - C - D - Em - F#dim'],
      'G#': ['G# - A#m - B#m - C# - D# - E#m - F##dim'],
      'A': ['A - Bm - C#m - D - E - F#m - G#dim'],
      'A#': ['A# - B#m - C##m - D# - E# - F##m - G##dim'],
      'B': ['B - C#m - D#m - E - F# - G#m - A#dim']
    };
    return progressions[note] || [];
  }

  // Função para gerar escalas pentatônicas
  function generatePentatonicScales(note) {
    const scales = {
      'C': ['C - D - E - G - A'],
      'C#': ['C# - D# - F - G# - A#'],
      'D': ['D - E - F# - A - B'],
      'D#': ['D# - E# - G - A# - B#'],
      'E': ['E - F# - G# - B - C#'],
      'F': ['F - G - A - C - D'],
      'F#': ['F# - G# - A# - B - C#'],
      'G': ['G - A - B - D - E'],
      'G#': ['G# - A# - B - C# - D#'],
      'A': ['A - B - C# - E - F#'],
      'A#': ['A# - B# - C## - D# - E#'],
      'B': ['B - C# - D# - F# - G#']
    };
    return scales[note] || [];
  }

  // Função para gerar visualização do braço da guitarra
  function displayGuitarNeck(note) {
    const intervals = {
      'C': ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
      'C#': ['C#', 'D#', 'F', 'F#', 'G#', 'A#', 'C'],
      'D': ['D', 'E', 'F#', 'G', 'A', 'B', 'C#'],
      'D#': ['D#', 'E#', 'G', 'G#', 'A#', 'B#', 'D'],
      'E': ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#'],
      'F': ['F', 'G', 'A', 'A#', 'C', 'D', 'E'],
      'F#': ['F#', 'G#', 'A#', 'B', 'C#', 'D#', 'E#'],
      'G': ['G', 'A', 'B', 'C', 'D', 'E', 'F#'],
      'G#': ['G#', 'A#', 'B', 'C#', 'D#', 'E#', 'F#'],
      'A': ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#'],
      'A#': ['A#', 'B#', 'C##', 'D#', 'E#', 'F#', 'G#'],
      'B': ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#']
    };

    let intervalsHtml = '';
    if (intervals[note]) {
      intervalsHtml = intervals[note].map(interval => `<div class="fret">${interval}</div>`).join('');
    } else {
      intervalsHtml = '<p>Escolha uma nota para ver os intervalos.</p>';
    }

    guitarNeckDiv.innerHTML = intervalsHtml;
  }

  // Evento para atualizar as progressões harmônicas, escalas pentatônicas e visualização do braço da guitarra
  noteSelector.addEventListener('change', function () {
    const selectedNote = noteSelector.value;
    const chordProgressions = generateChordProgressions(selectedNote);
    const pentatonicScales = generatePentatonicScales(selectedNote);

    chordProgressionsDiv.innerHTML = '<h4>Progressões Harmônicas:</h4>' +
      '<ul class="text-center p-0 m-0">' + chordProgressions.map(p => `<li>${p}</li>`).join('') + '</ul>';

    pentatonicScalesDiv.innerHTML = '<h4 class="text-center">Escalas Pentatônicas:</h4>' +
      '<ul class="text-center p-0 m-0">' + pentatonicScales.map(s => `<li>${s}</li>`).join('') + '</ul>';

    displayGuitarNeck(selectedNote);

    // Exibe a seção de resultados
    resultSection.style.display = 'block'; // Mostra a seção de resultados
  });

  // Evento para limpar os resultados
  clearBtn.addEventListener('click', function () {
    noteSelector.value = ''; // Limpa a seleção de nota
    chordProgressionsDiv.innerHTML = ''; // Limpa as progressões harmônicas
    pentatonicScalesDiv.innerHTML = ''; // Limpa as escalas pentatônicas
    guitarNeckDiv.innerHTML = ''; // Limpa a visualização do braço da guitarra

    // Oculta a seção de resultados
    resultSection.style.display = 'none'; // Esconde a seção de resultados
  });
});

// Certifique-se de que você só adiciona eventos para elementos que existem
document.addEventListener('DOMContentLoaded', function () {
  const modalButtons = document.querySelectorAll('.modal-btn');

  modalButtons.forEach(function (button) {
    const modalTarget = button.getAttribute('data-target');
    if (modalTarget) {
      button.addEventListener('click', function () {
        $(modalTarget).modal('show');
      });
    }
  });
});

// Certifique-se de verificar se os elementos do PIX existem antes de adicionar eventos
document.addEventListener('DOMContentLoaded', function () {
  const copyBtn = document.getElementById('copy-btn');
  const alertBox = document.getElementById('alert-box');
  const pixText = document.querySelector('.pix-text');

  if (copyBtn && alertBox && pixText) {
    copyBtn.addEventListener('click', function () {
      navigator.clipboard.writeText(pixText.textContent).then(function () {
        alertBox.classList.remove('d-none');
        setTimeout(function () {
          alertBox.classList.add('d-none');
        }, 3000);
      }).catch(function () {
        console.error('Falha ao copiar o código PIX');
      });
    });
  }
});


//Whatsapp Obtém o modal e os botões
var modal = document.getElementById("whatsapp-modal");
var btn = document.getElementById("whatsapp-button");
var span = document.getElementsByClassName("close")[0];
var closeBtn = document.getElementById("close-modal");

// Quando o usuário clicar no botão, abre o modal
btn.onclick = function () {
  modal.style.display = "block";
}

// Quando o usuário clicar no botão de fechar, fecha o modal
span.onclick = function () {
  modal.style.display = "none";
}

// Quando o usuário clicar fora do modal, fecha o modal
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Quando o usuário clicar no botão "Não, Obrigado", fecha o modal
closeBtn.onclick = function () {
  modal.style.display = "none";
}

document.querySelector('.scroll-to-top').addEventListener('click', function (event) {
  event.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Função para rolar suavemente até um elemento INICIO--
const menuLinks = document.querySelectorAll('nav a[href^="#"]');

function getDistanceFromTheTop(element) {
  const id = element.getAttribute("href");
  return document.querySelector(id).offsetTop;
}

/*
function nativeScroll(distanceFromTheTop) {
   window.scroll({
     top: distanceFromTheTop,
     behavior: "smooth",
   });
}
*/

function scrollToSection(event) {
  event.preventDefault();
  const distanceFromTheTop = getDistanceFromTheTop(event.target) - 90;
  smoothScrollTo(0, distanceFromTheTop);
}

menuLinks.forEach((link) => {
  link.addEventListener("click", scrollToSection);
});

menuLinks.forEach((link) => {
  link.addEventListener("click", scrollToSection);
});

function smoothScrollTo(endX, endY, duration) {
  const startX = window.scrollX || window.pageXOffset;
  const startY = window.scrollY || window.pageYOffset;
  const distanceX = endX - startX;
  const distanceY = endY - startY;
  const startTime = new Date().getTime();

  duration = typeof duration !== "undefined" ? duration : 700;

  const easeInOutQuart = (time, from, distance, duration) => {
    if ((time /= duration / 2) < 1)
      return (distance / 2) * time * time * time * time + from;
    return (-distance / 2) * ((time -= 2) * time * time * time - 2) + from;
  };

  const timer = setInterval(() => {
    const time = new Date().getTime() - startTime;
    const newX = easeInOutQuart(time, startX, distanceX, duration);
    const newY = easeInOutQuart(time, startY, distanceY, duration);
    if (time >= duration) {
      clearInterval(timer);
    }
    window.scroll(newX, newY);
  }, 1000 / 60);
}