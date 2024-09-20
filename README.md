# 🎶 Plataforma de Busca de Cifras Interativas

Este projeto é uma plataforma web para **busca e visualização de cifras musicais**. Ele oferece aos usuários a possibilidade de pesquisar músicas com filtros opcionais de **estilo** e **artista**, além de visualizar e baixar as cifras diretamente em um modal interativo. A interface é totalmente responsiva e foi projetada para funcionar perfeitamente em dispositivos móveis.

## 🛠️ Funcionalidades

- **Pesquisa Dinâmica**: Permite a busca por músicas através de um campo de pesquisa. Os resultados são atualizados em tempo real conforme o usuário digita.
- **Filtros de Estilo e Artista**: Possibilidade de filtrar músicas por estilo musical e por artista. Caso o usuário não selecione filtros, a pesquisa ocorre em todas as músicas.
- **Visualização de Cifras**: Ao clicar em uma música, o conteúdo da cifra é carregado em um modal, onde o usuário pode visualizar e baixar o arquivo.
- **Responsividade**: A interface foi otimizada para uma excelente experiência em dispositivos móveis, com um modal de busca adaptado para telas pequenas.

## 🚀 Tecnologias Utilizadas

- **HTML5**: Estrutura da página web.
- **CSS3**: Estilos e responsividade com Media Queries.
- **JavaScript**: Lógica para busca dinâmica e interação com o usuário.
- **Bootstrap**: Framework CSS para estilização dos modais e componentes.
- **JSON**: Armazenamento de dados das cifras em `files.json`.

## 📂 Estrutura de Diretórios

```bash
.
├── cifras
│   └── uploads
│       ├── pop
│       │   ├── artist1
│       │   │   ├── musica1.txt
│       │   │   └── musica2.txt
│       ├── rock
│       │   ├── artist2
│       │   │   ├── musica1.txt
│       │   │   └── musica2.txt
├── css
│   └── styles.css
├── js
│   └── script_search.js
├── index.html
└── files.json

Principais Arquivos:
index.html: Página principal da plataforma.
script_search.js: Script JavaScript responsável pela lógica de busca e manipulação dos modais.
files.json: Arquivo que contém os dados organizados de estilo, artista e músicas.
🎯 Como Usar
Clone este repositório:
bash
Copiar código
git clone https://github.com/seu-usuario/seu-repositorio.git
Abra o arquivo index.html no seu navegador.

Utilize o campo de busca para procurar músicas ou aplique filtros de estilo e artista para refinar sua pesquisa.

Clique em uma música da lista para visualizá-la e ter a opção de baixá-la.

🖼️ Visualização Responsiva
Este projeto inclui suporte completo para dispositivos móveis. O modal de busca e a lista de músicas foram otimizados para funcionar bem em telas pequenas, com foco na usabilidade em smartphones e tablets.

📄 Licença
Este projeto é licenciado sob a licença MIT. Consulte o arquivo LICENSE para obter mais detalhes.

Contribua com o projeto, abrindo issues ou enviando pull requests. Sinta-se à vontade para enviar melhorias, sugestões ou relatórios de bugs.

Esse conteúdo descreve o propósito do projeto, as funcionalidades, a estrutura de diretórios e como utilizar o sistema. Além disso, inclui informações sobre como contribuir e personalizar o repositório.
