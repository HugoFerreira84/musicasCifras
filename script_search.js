document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('search-input');
  const dropdownEstilo = document.getElementById('dropdown-estilo');
  const dropdownArtista = document.getElementById('dropdown-artista');
  const fileList = document.getElementById('file-list');
  const openModalBtn = document.getElementById('open-modal-btn');
  const searchModal = document.getElementById('search-modal');
  const closeModalBtn = document.getElementById('close-modal-btn'); // O botão de fechar do modal
  
  // Elementos do modal de visualização
  const musicModal = new bootstrap.Modal(document.getElementById('music-modal'));
  const musicContent = document.getElementById('music-content');
  const downloadLink = document.getElementById('download-link');
  const musicTitle = document.getElementById('music-title');

  let filesData = {};   // Armazena os dados do arquivo JSON
  let allFiles = [];    // Armazena todas as músicas

  // Função para abrir o modal de busca
  openModalBtn.addEventListener('click', function () {
      searchModal.style.display = 'block';

      // Carrega os arquivos JSON se ainda não foram carregados
      if (Object.keys(filesData).length === 0) {
          fetch('files.json')
              .then(response => response.json())
              .then(data => {
                  filesData = data.estilos;   // Armazena os dados de estilos, artistas e músicas
                  populateDropdownEstilo();   // Preenche o dropdown de estilos
                  allFiles = flattenFiles(filesData);   // Armazena todas as músicas para busca global
              })
              .catch(error => console.error('Erro ao carregar o JSON:', error));
      }
  });

  // Função para fechar o modal de busca quando o botão "Fechar" é clicado
  closeModalBtn.addEventListener('click', function () {
      searchModal.style.display = 'none';
  });

  // Função para fechar o modal se o usuário clicar fora da área do modal
  window.addEventListener('click', function (event) {
      if (event.target === searchModal) {
          searchModal.style.display = 'none';
      }
  });

  // Função para preencher o dropdown de estilos
  function populateDropdownEstilo() {
      dropdownEstilo.innerHTML = '<option value="">Todos os estilos</option>';
      Object.keys(filesData).forEach(estilo => {
          const option = document.createElement('option');
          option.value = estilo;
          option.textContent = estilo;
          dropdownEstilo.appendChild(option);
      });
  }

  // Função para preencher o dropdown de artistas com base no estilo selecionado
  dropdownEstilo.addEventListener('change', function () {
      const selectedEstilo = dropdownEstilo.value;
      if (selectedEstilo) {
          populateDropdownArtista(selectedEstilo);
          dropdownArtista.disabled = false;
      } else {
          dropdownArtista.innerHTML = '<option value="">Selecione um artista</option>';
          dropdownArtista.disabled = true;
      }

      // Limpa os resultados e o campo de busca quando o filtro muda
      searchInput.value = '';
      fileList.innerHTML = '';
  });

  // Função para preencher o dropdown de artistas
  function populateDropdownArtista(estilo) {
      dropdownArtista.innerHTML = '<option value="">Todos os artistas</option>';
      Object.keys(filesData[estilo]).forEach(artista => {
          const option = document.createElement('option');
          option.value = artista;
          option.textContent = artista;
          dropdownArtista.appendChild(option);
      });
  }

  // Função para transformar a estrutura de arquivos em um array plano
  function flattenFiles(filesObj) {
      const flattened = [];
      Object.keys(filesObj).forEach(estilo => {
          Object.keys(filesObj[estilo]).forEach(artista => {
              filesObj[estilo][artista].forEach(musica => {
                  flattened.push({
                      name: musica,
                      estilo: estilo,
                      artista: artista
                  });
              });
          });
      });
      return flattened;
  }

  // Exibe os arquivos em uma lista
  function displayFiles(files) {
      fileList.innerHTML = ''; // Limpa a lista anterior
      if (files.length === 0) {
          fileList.innerHTML = '<li>Nenhum arquivo encontrado.</li>';
      } else {
          files.forEach(file => {
              const li = document.createElement('li');
              li.textContent = `${file.name} (${file.artista} - ${file.estilo})`;
              li.addEventListener('click', function () {
                  loadMusicContent(file);  // Carrega a música no modal ao clicar
              });
              fileList.appendChild(li);
          });
      }
  }

  // Função para carregar e exibir o conteúdo da música no modal
  function loadMusicContent(file) {
      const musicPath = `cifras/uploads/${file.estilo}/${file.artista}/${file.name}`;

      // Define o título do modal e o link para download
      musicTitle.textContent = file.name;
      downloadLink.href = musicPath;

      // Faz o fetch do conteúdo da música
      fetch(musicPath)
          .then(response => {
              if (!response.ok) {
                  throw new Error('Arquivo não encontrado');
              }
              return response.text();
          })
          .then(text => {
              musicContent.textContent = text;  // Exibe o conteúdo da música
              musicModal.show();                // Abre o modal
          })
          .catch(error => {
              musicContent.textContent = 'Erro ao carregar a música.';
              console.error('Erro ao carregar o arquivo de música:', error);
          });
  }

  // Busca músicas com base no texto digitado e filtros selecionados
  searchInput.addEventListener('input', function () {
      const query = searchInput.value.toLowerCase();
      const selectedEstilo = dropdownEstilo.value;
      const selectedArtista = dropdownArtista.value;

      let filteredFiles = allFiles;

      // Filtra por estilo
      if (selectedEstilo) {
          filteredFiles = filteredFiles.filter(file => file.estilo === selectedEstilo);
      }

      // Filtra por artista
      if (selectedArtista) {
          filteredFiles = filteredFiles.filter(file => file.artista === selectedArtista);
      }

      // Filtra pelo texto da busca
      if (query.length > 0) {
          filteredFiles = filteredFiles.filter(file => file.name.toLowerCase().includes(query));
      }

      displayFiles(filteredFiles);  // Exibe os arquivos filtrados
  });

  // Limpa os resultados e o campo de busca quando o artista muda
  dropdownArtista.addEventListener('change', function () {
      searchInput.value = '';
      fileList.innerHTML = '';
  });
});
