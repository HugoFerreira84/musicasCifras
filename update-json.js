const fs = require('fs');
const path = require('path');

const baseDirectory = path.join(__dirname, 'cifras/uploads'); // Caminho para a pasta com os estilos musicais
const jsonFilePath = path.join(__dirname, 'files.json'); // Caminho para o arquivo JSON

// Função para ler os diretórios de estilos e artistas e gerar a estrutura
function generateFileStructure() {
    const fileStructure = {};

    // Lê todos os estilos (diretórios dentro de 'uploads')
    fs.readdirSync(baseDirectory).forEach(estilo => {
        const estiloPath = path.join(baseDirectory, estilo);
        
        // Verifica se é um diretório
        if (fs.lstatSync(estiloPath).isDirectory()) {
            fileStructure[estilo] = {}; // Inicializa o objeto do estilo

            // Lê todos os artistas (diretórios dentro de cada estilo)
            fs.readdirSync(estiloPath).forEach(artista => {
                const artistaPath = path.join(estiloPath, artista);

                // Verifica se é um diretório
                if (fs.lstatSync(artistaPath).isDirectory()) {
                    fileStructure[estilo][artista] = []; // Inicializa o array de músicas para o artista

                    // Lê todos os arquivos de música dentro de cada diretório de artista
                    fs.readdirSync(artistaPath).forEach(musica => {
                        const musicaPath = path.join(artistaPath, musica);

                        // Verifica se é um arquivo (não uma pasta)
                        if (fs.lstatSync(musicaPath).isFile()) {
                            // Adiciona o nome da música ao array
                            fileStructure[estilo][artista].push(musica);
                        }
                    });
                }
            });
        }
    });

    return fileStructure;
}

// Função para atualizar o JSON
function updateJSON() {
    const fileStructure = generateFileStructure(); // Gera a estrutura de arquivos

    // Escreve o arquivo JSON atualizado
    fs.writeFile(jsonFilePath, JSON.stringify({ estilos: fileStructure }, null, 2), (err) => {
        if (err) {
            console.error('Erro ao escrever o arquivo JSON: ', err);
            return;
        }
        console.log('Arquivo JSON atualizado com sucesso!');
    });
}

// Executa a função para atualizar o JSON
updateJSON();
