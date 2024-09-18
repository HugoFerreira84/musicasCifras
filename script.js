// script.js

document.addEventListener('DOMContentLoaded', function () {
  const noteSelector = document.getElementById('note');
  const clearBtn = document.getElementById('clear-btn');
  const chordProgressionsDiv = document.getElementById('chord-progressions');
  const pentatonicScalesDiv = document.getElementById('pentatonic-scales');
  const guitarNeckDiv = document.getElementById('guitar-neck');
  const resultSection = document.getElementById('result-section');
  const copyBtn = document.getElementById('copy-btn');

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
      '<ul class="text-center p-0 m-0">' + chordProgressions.map(p => `<li">${p}</li>`).join('') + '</ul>';

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

//Seleciona o modal a ser aberto
// Função para abrir o modal com base no botão clicado
document.addEventListener('DOMContentLoaded', function () {
    // Seleciona todos os botões que abrem modais
    const modalButtons = document.querySelectorAll('.modal-btn');

    // Adiciona um evento de clique a cada botão
    modalButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            // Obtém o alvo do modal a partir do atributo data-target
            const modalTarget = button.getAttribute('data-target');
            
            // Usa o seletor jQuery do Bootstrap para abrir o modal
            $(modalTarget).modal('show');
        });
    });
});


// Verifica se o DOM está completamente carregado
/*
document.addEventListener('DOMContentLoaded', function () {
  // Seleciona o botão que abre o modal
  var openModalButton = document.querySelector('[data-bs-toggle="modal"]');

  // Seleciona o modal
  //var contactModal = new bootstrap.Modal(document.getElementById('contactModal'));

  // Adiciona um evento de clique ao botão para abrir o modal
  openModalButton.addEventListener('click', function () {
    contactModal.show();
  });
});
*/

// Alert do Pix
document.addEventListener('DOMContentLoaded', function () {
  const copyBtn = document.getElementById('copy-btn');
  const alertBox = document.getElementById('alert-box');
  const pixText = document.querySelector('.pix-text');

  copyBtn.addEventListener('click', function () {
    // Copiar o texto para a área de transferência
    navigator.clipboard.writeText(pixText.textContent).then(function () {
      // Mostrar o alerta
      alertBox.classList.remove('d-none');

      // Ocultar o alerta após 3 segundos
      setTimeout(function () {
        alertBox.classList.add('d-none');
      }, 3000);
    }).catch(function () {
      console.error('Falha ao copiar o código PIX');
    });
  });
});


document.querySelector('.scroll-to-top').addEventListener('click', function (event) {
  event.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
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

//Reederizar dinamicamente
/*
document.addEventListener('DOMContentLoaded', function() {
  const readMoreLinks = document.querySelectorAll('.read-more');

  // Conteúdos dinâmicos para os cards
  const cardContents = {
      1: {
          title: '10 Dicas Essenciais para Melhorar no Violão',
          content: `
              <div data-target="#dynamic-content-1">
              <h2>10 Dicas para Melhorar no Violão</h2>
              <p>Aprenda a melhorar suas habilidades no violão com essas dicas práticas:</p>
              <ul>
                  <li><strong>→ Pratique Regularmente:</strong> A prática constante é essencial para a melhoria.</li>
                  <li><strong>→ Estude Teoria Musical:</strong> Conhecer os fundamentos da música ajuda a tocar melhor.</li>
                  <li><strong>→ Aperfeiçoe Técnica de Acordes:</strong> Pratique acordes básicos e avançados para um melhor desempenho.</li>
                  <li><strong>Desenvolva o Senso de Ritmo:</strong> Use metrônomos e práticas de ritmo para aprimorar seu tempo.</li>
                  <!-- Mais dicas aqui -->
              </ul>
              </div>
              `,
          videoSrc: 'https://www.youtube.com/embed/VIDEO_ID_1'
      },
      2: {
          title: 'Guia Completo de Acordes de Violão',
          content: `
              <div id="dynamic-content-2></div>
              <h2">Guia Completo de Acordes</h2>
              <p>Domine os acordes fundamentais com este guia abrangente:</p>
              <ul>
                  <li><strong>→ Acorde de Dó Maior (C):</strong> Aprenda a formar e tocar o acorde de Dó maior.</li>
                  <li><strong>→ Acorde de Sol Maior (G):</strong> Explore a formação e aplicação do acorde de Sol maior.</li>
                  <li><strong>→ Acorde de Ré Menor (Dm):</strong> Compreenda a formação e uso do acorde de Ré menor.</li>
                  <!-- Mais acordes aqui -->
              </ul>`,
          videoSrc: 'https://www.youtube.com/embed/VIDEO_ID_2'
      },
      3: {
          title: 'Como Criar Solos Incríveis na Guitarra',
          content: `
              <div id="dynamic-content-></div>
              <h2>Criar Solos Incríveis</h2>
              <p>Descubra técnicas para criar solos impressionantes na guitarra:</p>
              <ul>
                  <li><strong>→ Escala Pentatônica Menor:</strong> Use esta escala para criar solos cativantes.</li>
                  <li><strong>→ Escala Maior e Modos:</strong> Explore diferentes modos e escalas para solos variados.</li>
                  <li><strong>→ Técnicas de Bend e Slide:</strong> Aprenda a usar bend e slide para adicionar expressão aos solos.</li>
                  <!-- Mais técnicas aqui -->
              </ul>`,
          videoSrc: 'https://www.youtube.com/embed/VIDEO_ID_3'
      }
  };

  // Função para renderizar o conteúdo dinâmico
  function renderCardContent(cardId) {
      const existingSection = document.querySelector('.dynamic-section');
      
      if (existingSection) {
          existingSection.classList.add('fade-out');
          setTimeout(() => {
              existingSection.remove();
          }, 300); // Tempo de transição
      }

      const cardData = cardContents[cardId];
      
      if (!cardData) {
          console.error('Conteúdo não encontrado para o ID do card:', cardId);
          return;
      }

      const newSection = document.createElement('section');
      newSection.classList.add('dynamic-section');
      newSection.innerHTML = `
          <div class="container">
              <div class="row">
                  <div class="col-md-8">
                      <h1>${cardData.title}</h1>
                      <div>${cardData.content}</div>
                  </div>
                  <div class="col-md-4">
                      <div class="video-container">
                          <iframe src="${cardData.videoSrc}" frameborder="0" allowfullscreen></iframe>
                      </div>
                  </div>
              </div>
          </div>
      `;

      const mainContent = document.querySelector('main');
      const donationSection = document.getElementById('donations');
      const contactSection = document.getElementById('contact');

      mainContent.insertBefore(newSection, donationSection);
      newSection.classList.add('fade-in');
  }

  readMoreLinks.forEach(link => {
      link.addEventListener('click', function(event) {
          event.preventDefault();
          const cardId = this.getAttribute('data-card-id');
          if (cardId) {
              renderCardContent(cardId);
          } else {
              console.error('ID do card não encontrado');
          }
      });
  });
});
*/

//Reenderiza o conteudo dos cards
document.addEventListener('DOMContentLoaded', function () {
  const cards = document.querySelectorAll('.read-more');
  const resourcesSection = document.getElementById('resources');
  const dynamicSection = document.getElementById('dynamic-section');
  const dynamicTitle = document.getElementById('dynamic-title');
  const dynamicImage = document.getElementById('dynamic-image');
  const dynamicContent = document.getElementById('dynamic-content');
  const downloadButton = document.getElementById('download-button');
  const backButton = document.getElementById('back-button');
  const downloadModal = new bootstrap.Modal(document.getElementById('downloadModal'));
  const confirmDownloadButton = document.getElementById('confirm-download');

  let currentDownloadUrl = '';

  // Exibe a seção dinâmica ao clicar em um card
  cards.forEach(card => {
    card.addEventListener('click', function (event) {
      event.preventDefault(); // Evita o comportamento padrão do link
      const cardId = this.getAttribute('data-card-id');
      showDynamicContent(cardId);
    });
  });

  // Função para mostrar o conteúdo dinâmico
  function showDynamicContent(cardId) {
    dynamicTitle.textContent = `Título do Card ${cardId}`;
    dynamicImage.src = `images/card-${cardId}.jpg`; // Ajuste o caminho da imagem
    dynamicContent.textContent = `Conteúdo detalhado do Card ${cardId}. Aqui você pode colocar informações relevantes.`;

    // Define o link para download
    currentDownloadUrl = `uploads/cards-${cardId}.txt`; // Caminho para o arquivo de download
    downloadButton.href = currentDownloadUrl; // Configura o link

    resourcesSection.style.display = 'none';
    dynamicSection.style.display = 'block';
  }

  // Ação ao clicar no botão de download
  downloadButton.addEventListener('click', function (event) {
    event.preventDefault(); // Evita o comportamento padrão do link
    confirmDownloadButton.href = currentDownloadUrl; // Atualiza o link de download no modal
    downloadModal.show(); // Abre o modal de confirmação
  });

  // Voltar para a seção de recursos
  backButton.addEventListener('click', function () {
    dynamicSection.style.display = 'none';
    resourcesSection.style.display = 'block';
  });
});

/*Modal Cifras*/
document.addEventListener('DOMContentLoaded', function () {
  const searchModal = document.getElementById('search-modal');
  const viewModal = document.getElementById('view-modal');
  const openModalBtn = document.getElementById('open-modal-btn');
  const closeBtns = document.querySelectorAll('.close-btn');
  const fileList = document.getElementById('file-list');
  const searchInput = document.getElementById('search-input');
  const fileContent = document.getElementById('file-content');
  const downloadBtn = document.getElementById('download-btn');

  let currentFileUrl = '';

  // Abre o modal de busca
  openModalBtn.addEventListener('click', function () {
    searchModal.style.display = 'block';
  });

  // Fecha os modais
  closeBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      const modalId = this.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      modal.style.display = 'none';

      // Limpa o modal de busca
      if (modalId === 'search-modal') {
        searchInput.value = ''; // Limpa o campo de busca
        fileList.innerHTML = ''; // Limpa a lista de arquivos
        fileList.style.display = 'none'; // Oculta a lista
      }

      // Limpa o modal de visualização
      if (modalId === 'view-modal') {
        fileContent.textContent = ''; // Limpa o conteúdo do arquivo
        currentFileUrl = ''; // Limpa a URL do arquivo
      }
    });
  });

  // Fecha o modal se o usuário clicar fora dele
  window.addEventListener('click', function (event) {
    if (event.target === searchModal || event.target === viewModal) {
      searchModal.style.display = 'none';
      viewModal.style.display = 'none';
    }
  });

  // Função para buscar arquivos
  searchInput.addEventListener('input', function () {
    const query = searchInput.value;
    fetch('files.json')
      .then(response => response.json())
      .then(files => {
        const filteredFiles = files.filter(file => file.name.toLowerCase().includes(query.toLowerCase()));
        if (filteredFiles.length === 0) {
          fileList.innerHTML = '<li>Nenhum arquivo encontrado.</li>';
          fileList.style.display = 'block';
        } else {
          fileList.innerHTML = filteredFiles.map(file => `
                      <li>
                          <a href="#" data-url="${file.url}">${file.name}</a>
                      </li>
                  `).join('');
          fileList.style.display = 'block';
        }
      })
      .catch(error => {
        console.error('Erro ao buscar arquivos:', error);
      });
  });

  // Evento de clique no link do arquivo
  fileList.addEventListener('click', function (event) {
    if (event.target.tagName === 'A') {
      event.preventDefault();
      const url = event.target.getAttribute('data-url');
      currentFileUrl = url;

      // Limpa a pesquisa
      searchInput.value = '';

      viewFile(url); // Visualiza o arquivo
    }
  });

  // Função para visualizar o arquivo
  function viewFile(url) {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Arquivo não encontrado');
        }
        return response.text();
      })
      .then(text => {
        fileContent.textContent = text;
        viewModal.style.display = 'block';
        downloadBtn.setAttribute('href', url);
        downloadBtn.setAttribute('download', url.split('/').pop()); // Define o nome do arquivo para download
      })
      .catch(error => {
        console.error('Erro ao carregar o arquivo:', error);
      });
  }
});

// Função para rolar suavemente até um elemento
const menuLinks = document.querySelectorAll('nav a[href^="#"]');

function getDistanceFromTheTop(element) {
  const id = element.getAttribute("href");
  return document.querySelector(id).offsetTop;
}

// function nativeScroll(distanceFromTheTop) {
//   window.scroll({
//     top: distanceFromTheTop,
//     behavior: "smooth",
//   });
// }

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
