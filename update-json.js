const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'cifras/uploads'); // Caminho para a pasta com os arquivos
const jsonFilePath = path.join(__dirname, 'files.json'); // Caminho para o arquivo JSON

// Função para atualizar o JSON
function updateJSON() {
    // Lê o arquivo JSON existente
    fs.readFile(jsonFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo JSON: ', err);
            return;
        }

        // Faz o parse do JSON existente
        let existingFiles = [];
        try {
            existingFiles = JSON.parse(data);
        } catch (parseError) {
            console.error('Erro ao parsear o JSON: ', parseError);
            return;
        }

        // Lê os arquivos do diretório
        fs.readdir(directoryPath, (err, files) => {
            if (err) {
                console.error('Erro ao ler o diretório: ', err);
                return;
            }

            // Cria um conjunto de nomes de arquivos existentes
            const existingNames = new Set(existingFiles.map(file => file.name));

            // Percorre os arquivos da pasta
            files.forEach(file => {
                if (!existingNames.has(file)) {
                    // Adiciona novo arquivo ao array
                    existingFiles.push({
                        name: file,
                        url: `files/${file}` // URL relativa para o arquivo
                    });
                }
            });

            // Escreve o JSON atualizado no arquivo
            fs.writeFile(jsonFilePath, JSON.stringify(existingFiles, null, 2), (err) => {
                if (err) {
                    console.error('Erro ao escrever o arquivo JSON: ', err);
                    return;
                }
                console.log('Arquivo JSON atualizado com sucesso!');
            });
        });
    });
}

// Executa a função
updateJSON();
