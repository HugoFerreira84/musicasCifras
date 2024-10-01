// script.js

// Hero Section Parallax Effect
document.addEventListener('mousemove', (e) => {
    const hero = document.querySelector('.hero-section');
    const moveX = (e.clientX / window.innerWidth) * 30;
    const moveY = (e.clientY / window.innerHeight) * 30;
    hero.style.backgroundPosition = `${50 + moveX}% ${50 + moveY}%`;
});

// 3D Gallery Effect
const galleryImages = document.querySelectorAll('.gallery img');
galleryImages.forEach((img) => {
    img.addEventListener('mousemove', (e) => {
        const { offsetX, offsetY } = e;
        const { offsetWidth, offsetHeight } = img;
        const moveX = ((offsetX / offsetWidth) - 0.5) * 20;
        const moveY = ((offsetY / offsetHeight) - 0.5) * 20;
        img.style.transform = `rotateY(${moveX}deg) rotateX(${-moveY}deg) scale(1.1)`;
    });
    img.addEventListener('mouseleave', () => {
        img.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1)';
    });
});

// Enhanced 3D Effect for Gallery Images
const galleryItems = document.querySelectorAll('.gallery-item img');

galleryItems.forEach(img => {
    img.addEventListener('mousemove', (e) => {
        const { offsetWidth: width, offsetHeight: height } = img;
        let { offsetX: x, offsetY: y } = e;

        if (img !== e.target) {
            x = x + e.target.offsetLeft;
            y = y + e.target.offsetTop;
        }

        const xMid = width / 2;
        const yMid = height / 2;

        const xOffset = (x - xMid) / xMid * 10;
        const yOffset = (yMid - y) / yMid * 10;

        img.style.transform = `rotateY(${xOffset}deg) rotateX(${yOffset}deg) scale(1.1)`;
    });

    img.addEventListener('mouseleave', () => {
        img.style.transform = `rotateY(0) rotateX(0) scale(1)`;
        img.style.boxShadow = '0 10px 15px rgba(0, 0, 0, 0.2)';
    });
});

// Theme Toggle Script
const themeSwitch = document.getElementById('theme-switch');

if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    themeSwitch.checked = true;
}

themeSwitch.addEventListener('change', () => {
    if (themeSwitch.checked) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }
});

// Function to generate harmonic field and pentatonic scale with chord diagrams
function generateChordField() {
    const key = document.getElementById('chordKey').value;
    const type = document.getElementById('chordType').value;
    const chordFieldResults = document.getElementById('chordFieldResults');
    const pentatonicScaleResults = document.getElementById('pentatonicScaleResults');

    // Clear previous results
    chordFieldResults.innerHTML = '';
    pentatonicScaleResults.innerHTML = '';

    // Data for chords in major and minor key fields
    const majorChordsData = {
        "C": ["C", "Dm", "Em", "F", "G", "Am", "Bdim"],
        "G": ["G", "Am", "Bm", "C", "D", "Em", "F#dim"],
        "D": ["D", "Em", "F#m", "G", "A", "Bm", "C#dim"],
        "A": ["A", "Bm", "C#m", "D", "E", "F#m", "G#dim"],
        "E": ["E", "F#m", "G#m", "A", "B", "C#m", "D#dim"]
    };

    const minorChordsData = {
        "C": ["Cm", "Ddim", "Eb", "Fm", "Gm", "Ab", "Bb"],
        "G": ["Gm", "Adim", "Bb", "Cm", "Dm", "Eb", "F"],
        "D": ["Dm", "Edim", "F", "Gm", "Am", "Bb", "C"],
        "A": ["Am", "Bdim", "C", "Dm", "Em", "F", "G"],
        "E": ["Em", "F#dim", "G", "Am", "Bm", "C", "D"]
    };

    // Data for pentatonic scales
    const pentatonicScales = {
        "C_major": ["C", "D", "E", "G", "A"],
        "C_minor": ["C", "Eb", "F", "G", "Bb"],
        "G_major": ["G", "A", "B", "D", "E"],
        "G_minor": ["G", "Bb", "C", "D", "F"],
        "D_major": ["D", "E", "F#", "A", "B"],
        "D_minor": ["D", "F", "G", "A", "C"],
        "A_major": ["A", "B", "C#", "E", "F#"],
        "A_minor": ["A", "C", "D", "E", "G"],
        "E_major": ["E", "F#", "G#", "B", "C#"],
        "E_minor": ["E", "G", "A", "B", "D"]
    };

    let chords;
    let scale;

    if (type === "major") {
        chords = majorChordsData[key];
        scale = pentatonicScales[`${key}_major`];
    } else {
        chords = minorChordsData[key];
        scale = pentatonicScales[`${key}_minor`];
    }

    // Display harmonic field chords with diagrams
    const chordsList = document.createElement('div');
    chordsList.classList.add('chord-list', 'd-flex', 'justify-content-center', 'flex-wrap');
    chords.forEach(chord => {
        const chordItem = document.createElement('div');
        chordItem.classList.add('chord-item', 'm-2', 'p-3', 'text-white', 'rounded');
        chordItem.style.backgroundColor = '#007bff';
        chordItem.textContent = chord;

        // Add chord diagram image
        const chordDiagram = document.createElement('img');
        chordDiagram.src = `img/diagrams/${chord.replace('#', 'sharp')}.svg`; // Assuming the diagrams are named accordingly
        chordDiagram.alt = `Diagrama do acorde ${chord}`;
        chordDiagram.classList.add('chord-diagram');

        // Append chord diagram to chord item
        chordItem.appendChild(chordDiagram);
        chordsList.appendChild(chordItem);
    });
    chordFieldResults.appendChild(chordsList);

    // Display pentatonic scale with diagrams
    /*const scaleList = document.createElement('div');
    scaleList.classList.add('scale-list', 'd-flex', 'justify-content-center', 'flex-wrap', 'mt-4');
    scale.forEach(note => {
        const scaleItem = document.createElement('div');
        scaleItem.classList.add('scale-item', 'm-2', 'p-3', 'text-white', 'rounded');
        scaleItem.style.backgroundColor = '#28a745';
        scaleItem.textContent = note;

        // Add scale diagram image
        const scaleDiagram = document.createElement('img');
        scaleDiagram.src = `images/diagrams/${note.replace('#', 'sharp')}_scale.png`; // Assuming the diagrams are named accordingly
        scaleDiagram.alt = `Diagrama da nota ${note} na escala pentatônica`;
        scaleDiagram.classList.add('scale-diagram');

        // Append scale diagram to scale item
        scaleItem.appendChild(scaleDiagram);
        scaleList.appendChild(scaleItem);
    });
    pentatonicScaleResults.appendChild(scaleList);*/
}

// Scroll to Top Button Functionality
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

// Show the button when user scrolls down 200px
window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
        scrollToTopBtn.classList.remove("fade-out");
        scrollToTopBtn.classList.add("fade-in");
    } else {
        scrollToTopBtn.classList.remove("fade-in");
        scrollToTopBtn.classList.add("fade-out");
    }
});

// Scroll smoothly to the top when the button is clicked
scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

let cifrasData; // Declare cifrasData globally but do not assign yet

// Fetch the JSON data on page load
fetch('cifrasData.json')
    .then(response => response.json())
    .then(data => {
        cifrasData = data; // Store the data in a global variable
        // Now that we have the data, add the event listener for search input
        document.getElementById('searchInput').addEventListener('input', performSearch);
    })
    .catch(error => console.error('Error fetching the cifras data:', error));

// DOM elements for viewing cifra in modal
const viewCifraModal = document.getElementById('viewCifraModal');
const modalCifraTitle = document.getElementById('modalCifraTitle');
const modalCifraContent = document.getElementById('modalCifraContent');
const modalDownloadButton = document.getElementById('modalDownloadButton');
const closeModal = document.getElementById('closeModal');

// Function to perform the search and display results
function performSearch() {
    if (!cifrasData) {
        console.error('Cifras data is not loaded yet.');
        return;
    }

    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = ''; // Clear previous results

    if (searchInput.trim() === '') {
        return; // If input is empty, do nothing
    }

    // Variable to track if any results are found
    let resultsFound = false;

    // Iterate over the categories in the cifras data
    for (const [category, cifras] of Object.entries(cifrasData)) {
        if (Array.isArray(cifras)) {
            const filteredCifras = cifras.filter(cifra => cifra.title.toLowerCase().includes(searchInput));

            if (filteredCifras.length > 0) {
                resultsFound = true;

                // Create a section for each matched category
                const categorySection = document.createElement('div');
                categorySection.classList.add('category-section', 'col-12');

                // Add the category title
                const categoryTitle = document.createElement('h3');
                categoryTitle.textContent = category.toUpperCase();
                categorySection.appendChild(categoryTitle);

                // Add each matched cifra under the category
                filteredCifras.forEach(cifra => {
                    const cifraItem = document.createElement('div');
                    cifraItem.classList.add('cifra-item');

                    const cifraTitle = document.createElement('h4');
                    cifraTitle.textContent = cifra.title.replace(/_/g, ' ');

                    // Create "Visualizar" button
                    const btnVisualizar = document.createElement('button');
                    btnVisualizar.classList.add('btn-view');
                    btnVisualizar.textContent = 'Visualizar';
                    btnVisualizar.style.marginRight = '10px';
                    btnVisualizar.style.background = '#007bff';
                    btnVisualizar.style.color = '#fff';
                    btnVisualizar.style.borderRadius = '10px';
                    btnVisualizar.style.padding = '8px';

                    // Event listener to open the modal with the cifra content
                    btnVisualizar.addEventListener('click', () => {
                        // Set the title of the cifra in the modal
                        modalCifraTitle.textContent = cifra.title.replace(/_/g, ' ');

                        // Fetch the content of the cifra file from the server using filePath
                        fetch(`/cifras/${cifra.filePath}`)
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error('Erro ao carregar o arquivo.');
                                }
                                return response.text();
                            })
                            .then(content => {
                                // Set the content in the modal
                                modalCifraContent.textContent = content;

                                // Set up the download button for the cifra being viewed
                                modalDownloadButton.onclick = () => {
                                    const blob = new Blob([content], { type: 'text/plain' });
                                    const link = document.createElement('a');
                                    link.href = URL.createObjectURL(blob);
                                    link.download = `${cifra.title}.txt`;
                                    link.click();
                                };

                                // Display the modal
                                viewCifraModal.style.display = 'block';
                            })
                            .catch(error => {
                                modalCifraContent.textContent = 'Erro ao carregar a cifra. Por favor, tente novamente.';
                                console.error('Erro:', error);
                            });
                    });

                    // Create "Baixar" button
                    const downloadBtn = document.createElement('button');
                    downloadBtn.classList.add('download-btn');
                    downloadBtn.innerHTML = '<i class="fas fa-download"></i> Baixar';

                    // Event listener to download the cifra directly from the search results
                    downloadBtn.addEventListener('click', () => {
                        fetch(`/cifras/${cifra.filePath}`)
                            .then(response => response.text())
                            .then(content => {
                                const blob = new Blob([content], { type: 'text/plain' });
                                const link = document.createElement('a');
                                link.href = URL.createObjectURL(blob);
                                link.download = `${cifra.title}.txt`;
                                link.click();
                            })
                            .catch(error => console.error('Erro ao baixar a cifra:', error));
                    });

                    // Append buttons and other elements to the cifra item
                    cifraItem.appendChild(cifraTitle);
                    cifraItem.appendChild(btnVisualizar);
                    cifraItem.appendChild(downloadBtn);

                    // Append cifra item to the category section
                    categorySection.appendChild(cifraItem);
                });

                // Append the category section to the search results container
                searchResults.appendChild(categorySection);
            }
        }
    }

    // If no results found, display a message
    if (!resultsFound) {
        const noResultMessage = document.createElement('p');
        noResultMessage.textContent = 'Nenhuma cifra encontrada. Tente um termo diferente.';
        noResultMessage.style.color = "#ccc";
        searchResults.appendChild(noResultMessage);
    }
}

// Close modal when the close button is clicked
closeModal.addEventListener('click', () => {
    viewCifraModal.style.display = 'none';
});

// Close modal when clicking outside of the modal content
window.addEventListener('click', (event) => {
    if (event.target === viewCifraModal) {
        viewCifraModal.style.display = 'none';
    }
});

// Chave PIX a ser copiada
const pixKey = "musicasecifrasgratis@gmail.com";

// Obtém o botão de doação
const donateButton = document.getElementById('donateButton');

// Adiciona um evento de click no botão de doação
donateButton.addEventListener('click', function(event) {
    // Previne o comportamento padrão do link (caso haja algum)
    event.preventDefault();

    // Cria um elemento de input temporário para selecionar e copiar a chave
    const tempInput = document.createElement('input');
    tempInput.value = pixKey;
    document.body.appendChild(tempInput);
    tempInput.select();
    tempInput.setSelectionRange(0, 99999); // Para compatibilidade com dispositivos móveis

    // Tenta copiar o valor selecionado para a área de transferência
    try {
        document.execCommand('copy');
        
        // Exibe uma mensagem de feedback
        alert('Chave PIX copiada com sucesso!');
    } catch (err) {
        console.error('Erro ao copiar a chave PIX:', err);
    }

    // Remove o input temporário
    document.body.removeChild(tempInput);
});

//Script do gerador de acords
// Base de dados completa dos acordes de violão
const ACORDES = {
    // Acordes Maiores
    "C": [{ corda: 5, casa: 3 }, { corda: 4, casa: 2 }, { corda: 2, casa: 1 }],
    "C#": [{ corda: 5, casa: 4 }, { corda: 4, casa: 3 }, { corda: 2, casa: 2 }],
    "D": [{ corda: 3, casa: 2 }, { corda: 2, casa: 3 }, { corda: 1, casa: 2 }],
    "D#": [{ corda: 1, casa: 3 }, { corda: 2, casa: 4 }, { corda: 3, casa: 3 }],
    "E": [{ corda: 5, casa: 2 }, { corda: 4, casa: 2 }, { corda: 3, casa: 1 }],
    "F": [{ casa: 1, pestana: true }, { corda: 5, casa: 3 }, { corda: 4, casa: 3 }, {corda: 3, casa: 2}],
    "F#": [{ casa: 2, pestana: true }, { corda: 5, casa: 4 }, { corda: 4, casa: 4 }, {corda: 3, casa: 3}],
    "G": [{ corda: 6, casa: 3 }, { corda: 5, casa: 2 }, { corda: 1, casa: 3 }],
    "G#": [{ casa: 4, pestana: true }, { corda: 5, casa: 6 }, { corda: 4, casa: 6 }, {corda: 3, casa: 5}],
    "A": [{ corda: 4, casa: 2 }, { corda: 3, casa: 2 }, { corda: 2, casa: 2 }],
    "A#": [{ corda: 5, casa: 1, pestana: true }, { corda: 4, casa: 3 }, { corda: 3, casa: 3 }, {corda: 2, casa: 3}],
    "B": [{ corda: 5, casa: 2, pestana: true }, { corda: 4, casa: 4 }, { corda: 3, casa: 4 }, {corda: 2, casa: 4}],

    // Acordes Menores
    "Cm": [{ corda: 5, casa: 3, pestana: true }, {corda: 4, casa: 5 }, {corda: 3, casa: 5}],
    "C#m": [{ corda: 5, casa: 4, pestana: true }, {corda: 4, casa: 6 }, {corda: 3, casa: 6}, {corda: 2, casa: 5}],
    "Dm": [{ corda: 1, casa: 1 }, { corda: 3, casa: 2 }, { corda: 2, casa: 3 }],
    "D#m": [{ casa: 5, pestana: true},{corda: 4, casa: 7 }, {corda: 3, casa: 7}, {corda: 2, casa: 6}],
    "Em": [{ corda: 5, casa: 2 }, { corda: 4, casa: 2 }],
    "Fm": [{ casa: 1, pestana: true }, { corda: 5, casa: 3 }, { corda: 4, casa: 3 }],
    "F#m": [{ casa: 2, pestana: true }, { corda: 5, casa: 4 }, { corda: 4, casa: 4 }],
    "Gm": [{ casa: 3, pestana: true }, { corda: 5, casa: 5 }, { corda: 4, casa: 5 }],
    "G#m": [{ casa: 4, pestana: true }, {corda: 5, casa: 6 }, {corda: 4, casa: 6}],
    "Am": [{ corda: 2, casa: 1 }, { corda: 4, casa: 2 }, { corda: 3, casa: 2 }],
    "A#m": [{ corda: 5, casa: 5, pestana: true }, {corda: 5, casa: 7 }, {corda: 4, casa: 7}],
    "Bm": [{ corda: 5, casa: 2, pestana: true }, {corda: 4, casa: 4 }, {corda: 3, casa: 4}, {casa:3, corda: 2}],

    // Acordes com Sétima
    "C7": [{ corda: 5, casa: 3 }, { corda: 4, casa: 2 }, { corda: 3, casa: 3 }, {corda: 2, casa: 1}],
    "Cmaj7": [{ corda: 5, casa: 3 }, {corda: 4, casa: 2}, {corda: 2, casa: 0}],
    "Cm7": [{ corda: 5, casa: 3, pestana: true }, {corda: 4, casa: 5}, {corda: 2, casa: 4}],
    // ... (Replicar lógica para os demais acordes com sétima, maior e menor)

    // Acordes de Nona, Décima Primeira, e Décima Terceira
    "C9": [{corda: 5, casa: 3}, {corda: 4, casa: 2}, {corda: 2, casa: 3}, {corda: 3, casa: 3}],
    "Cm9": [{corda: 5, casa: 3, pestana: true}, {corda: 4, casa: 5}, {corda: 3, casa: 3}, {corda: 2, casa: 4}],
     // Acordes com Nona (9)
     "C9": [{corda: 5, casa: 3}, {corda: 4, casa: 2}, {corda: 3, casa: 3}, {corda: 2, casa: 3}],
     "D9": [{corda: 5, casa: 5}, {corda: 4, casa: 4}, {corda: 3, casa: 5}, {corda: 2, casa: 5}],
     "G9": [{corda: 6, casa: 3}, {corda: 5, casa: 2}, {corda: 3, casa: 3}, {corda: 2, casa: 3}],
     
    // ... (Adicionar exemplos dos acordes restantes com 9, 11, 13)

    // Acordes Aumentados
    "Caug": [{corda: 5, casa: 3}, {corda: 4, casa: 2}, {corda: 3, casa: 1}],
    "Gaug": [{corda: 6, casa: 3}, {corda: 5, casa: 3}, {corda: 3, casa: 4}],

    // Acordes Diminutos
    "Cdim": [{corda: 5, casa: 3}, {corda: 3, casa: 4}, {corda: 2, casa: 4}],
    "Ddim": [{corda: 4, casa: 1}, {corda: 2, casa: 2}, {corda: 1, casa: 1}],
    "Cm7b5": [{corda: 5, casa: 3, pestana: true}, {corda: 4, casa: 4}, {corda: 3, casa: 3}],
    "Edim": [{corda: 5, casa: 7}, {corda: 4, casa: 8}, {corda: 3, casa: 7}],
    "Bdim": [{corda: 5, casa: 2},{corda: 3, casa: 4},{corda:2, casa: 3},{corda:1, casa: 1}],
    "Bbdim":[{corda: 5, casa: 1}, {corda: 4, casa: 2}, {corda: 3, casa: 3}, {corda: 2, casa: 2}],

    // Acordes Suspensos
    "Csus2": [{corda: 5, casa: 3}, {corda: 4, casa: 0}, {corda: 3, casa: 0}, {corda: 2, casa: 1}],
    "Csus4": [{corda: 5, casa: 3}, {corda: 4, casa: 3}, {corda: 3, casa: 0}, {corda: 2, casa: 1}],

    // Acordes Power Chords (5)
    "C5": [{corda: 5, casa: 3}, {corda: 4, casa: 5}],
    "D5": [{corda: 5, casa: 5}, {corda: 4, casa: 7}],
    "E5": [{corda: 5, casa: 7}, {corda: 4, casa: 9}],
    "F5": [{corda: 6, casa: 1}, {corda: 5, casa: 3}],
    "G5": [{corda: 6, casa: 3}, {corda: 5, casa: 5}],
    "A5": [{corda: 6, casa: 5}, {corda: 5, casa: 7}],
    "B5": [{corda: 6, casa: 7}, {corda: 5, casa: 9}],

    // Acordes Suspensos (Sus)
    "Csus2": [{corda: 5, casa: 3}, {corda: 2, casa: 3}, {corda: 1, casa:3}],
    "Csus4": [{corda: 5, casa: 3}, {corda: 4, casa: 3}, {corda: 2, casa: 1}, {corda: 1, casa: 1}],
    "Dsus2": [{corda: 3, casa: 1}, {corda: 2, casa: 3}],
    "Dsus4": [{corda: 2, casa: 3}, {corda: 1, casa: 5}],
    "Esus2": [{corda: 5, casa: 2}, {corda: 4, casa: 2}, {corda: 3, casa: 4}, {corda:2, casa:5}, {corda:1, casa: 2}],
    "Esus4": [{corda: 4, casa: 2}, {corda: 3, casa: 2}],

     // Acordes de Sétima Menor com Nona Menor (m7b5)
     "Cm7b5": [{corda: 5, casa: 4,}, {corda: 3, casa:2}],
     "Dm7b5": [{corda: 3, casa: 1}, {corda: 2, casa: 1}, {corda: 1, casa: 1}, {corda: 2, casa: 6}],
     
     // Acordes de Décima Primeira e Décima Terceira
     "C11": [{corda: 5, casa: 3}, {corda: 4, casa: 2}, {corda: 3, casa: 3}, {corda: 2, casa: 1}, {corda: 1, casa: 3}],
     "G13": [{corda: 6, casa: 3}, {corda: 4, casa: 4}]
};


// Sugestões de acordes se o acorde não for encontrado
function sugerirAcordes(input) {
    const sugestoesContainer = document.getElementById("sugestoes");
    sugestoesContainer.innerHTML = '';

    Object.keys(ACORDES).forEach(acorde => {
        if (acorde.toLowerCase().startsWith(input.toLowerCase())) {
            const listItem = document.createElement("li");
            listItem.textContent = acorde;
            listItem.onclick = () => {
                document.getElementById("acorde-input").value = acorde;
                sugestoesContainer.innerHTML = '';
                gerarAcorde();
            };
            sugestoesContainer.appendChild(listItem);
        }
    });

    if (sugestoesContainer.innerHTML === '') {
        sugestoesContainer.innerHTML = '<li>Nenhum acorde encontrado</li>';
    }
}

function gerarAcorde() {
    const acorde = document.getElementById("acorde-input").value;
    const diagramaContainer = document.getElementById("diagrama-container");

    // Limpar diagrama existente
    diagramaContainer.innerHTML = '';

    if (!ACORDES[acorde]) {
        sugerirAcordes(acorde);
        return;
    }

    // Criar o SVG para o diagrama do acorde
    const svgNS = "http://www.w3.org/2000/svg";
    const width = 200;
    const height = 300;

    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", width);
    svg.setAttribute("height", height);
    svg.setAttribute("viewBox", "-30 -5 200 300");

    // Adicionar título ao SVG
    const title = document.createElementNS(svgNS, "text");
    title.setAttribute("x", width / 2);
    title.setAttribute("y", 15);
    title.setAttribute("text-anchor", "middle");
    title.setAttribute("font-size", "16");
    title.setAttribute("font-weight", "bold");
    title.textContent = acorde;
    svg.appendChild(title);

    // Encontrar a casa mínima e máxima do acorde
    const casas = ACORDES[acorde].map(pos => pos.casa);
    const casaMin = Math.min(...casas);
    const casaMax = Math.max(...casas);

    // Desenhar o número da casa (onde o acorde começa)
    if (casaMin > 1) {
        const casaText = document.createElementNS(svgNS, "text");
        casaText.setAttribute("x", -20);
        casaText.setAttribute("y", 70);
        casaText.setAttribute("font-size", "12");
        casaText.textContent = `Casa ${casaMin}`;
        svg.appendChild(casaText);
    }

    // Desenhar as cordas (invertidas)
    for (let i = 0; i < 6; i++) {
        const x = 20 + (5 - i) * 30; // As cordas vão da sexta (esquerda) para a primeira (direita)
        const linha = document.createElementNS(svgNS, "line");
        linha.setAttribute("x1", x);
        linha.setAttribute("y1", 30);
        linha.setAttribute("x2", x);
        linha.setAttribute("y2", 270);
        linha.setAttribute("stroke", "black");
        svg.appendChild(linha);
    }

    // Desenhar os trastes
    for (let i = 0; i < 5; i++) {
        const y = 30 + i * 50;
        const linha = document.createElementNS(svgNS, "line");
        linha.setAttribute("x1", 20);
        linha.setAttribute("y1", y);
        linha.setAttribute("x2", 170);
        linha.setAttribute("y2", y);
        linha.setAttribute("stroke", "black");

        svg.appendChild(linha);
    }

    // Desenhar as posições dos dedos e pestanas
    const acordeData = ACORDES[acorde];
    acordeData.forEach(pos => {
        if (pos.pestana) {
            // Desenhar pestana
            const x1 = 20;
            const x2 = 170;
            const y = 30 + (pos.casa - casaMin + 1) * 50;
            const linhaPestana = document.createElementNS(svgNS, "line");
            linhaPestana.setAttribute("x1", x1);
            linhaPestana.setAttribute("y1", y - 25);
            linhaPestana.setAttribute("x2", x2);
            linhaPestana.setAttribute("y2", y - 25);
            linhaPestana.setAttribute("stroke", "black");
            linhaPestana.setAttribute("stroke-width", 8);
            svg.appendChild(linhaPestana);
        } else {
            // Desenhar círculo para as posições dos dedos, ajustando para o centro da casa
            const x = 20 + (6 - pos.corda) * 30; // Inverter a posição da corda (da sexta para a primeira)
            const y = 30 + (pos.casa - casaMin + 1) * 50 - 25; // Ajuste para centralizar o ponto na casa
            const circle = document.createElementNS(svgNS, "circle");
            circle.setAttribute("cx", x);
            circle.setAttribute("cy", y);
            circle.setAttribute("r", 8);
            circle.setAttribute("fill", "black");
            svg.appendChild(circle);
        }
    });

    // Adicionar o SVG ao container
    diagramaContainer.appendChild(svg);

    // Ativar o botão de download
    const downloadButton = document.getElementById("download-button");
    downloadButton.style.display = 'block';
    downloadButton.onclick = () => salvarSvg(svg, `${acorde}.svg`);
}

function salvarSvg(svgElement, filename) {
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgElement);
    const blob = new Blob([svgString], { type: "image/svg+xml" });
    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = filename;

    // Simular o clique para iniciar o download
    link.click();
}
