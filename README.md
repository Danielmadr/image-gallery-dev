# Image Gallery (Visual Gallery) 🐳

![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Docker Compose](https://img.shields.io/badge/Docker%20Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Apache](https://img.shields.io/badge/Apache-D22128?style=for-the-badge&logo=apache&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## 📋 Sobre o Projeto

Este projeto é um **desafio educacional completo** que demonstra como executar uma aplicação web HTML em um container Docker usando servidor Apache HTTPD. A aplicação consiste em uma galeria de imagens que apresenta paisagens brasileiras organizadas em categorias: cidades, natureza e cachoeiras.

## 🎯 Principais pontos

- Conteúdo do site: pasta `app/` (contém `index.html`, `css/`, `js/`, `images/`).
- Imagem base: `httpd:2.4-alpine` (Apache HTTPD).
- Dois modos de uso comuns: desenvolvimento (montar o código do host) e produção (build da imagem via `Dockerfile`).

## 🏗️ Estrutura do projeto

- `Dockerfile` – instruções de build para gerar uma imagem com os arquivos estáticos copiados.
- `docker-compose.yml` – configura o serviço `image-gallery` (ports, volumes).
- `app/` – código do site:
  - `index.html`
  - `css/styles.css`
  - `js/app.js`, `js/database.js`
  - `images/` (subpastas com fotos)

## 📁 Estrutura do Projeto

```
docker-image-gallery/
├── 📄 README.md                    # Documentação principal
├── 📄 docker-compose.yml           # Configuração principal
├── 📄 .gitignore                   # Arquivos ignorados pelo Git
│
├── 📁 app/                         # Aplicação web
│   ├── 📄 index.html              # Página principal
│   ├── 📁 css/
│   │   └── 📄 styles.css          # Estilos responsivos
│   ├── 📁 js/
│   │   ├── 📄 database.js         # Simulação do banco
│   │   └── 📄 app.js              # Lógica da aplicação
│   └── 📁 images/                 # Repositório de imagens
│       ├── 📁 cidades/            # Imagens de cidades
│       ├── 📁 natureza/           # Imagens de natureza
│       └── 📁 cachoeiras/         # Imagens de cachoeiras
```

## ⚡ Como rodar (modo desenvolvimento — recomendado localmente)

### Pré-requisitos

- **Docker**: Versão 20.10 ou superior
- **Docker Compose**: Versão 2.0 ou superior
- **Git**: Para clonar o repositório
- **Navegador Web**: Chrome, Firefox, Safari ou Edge

### 1. Clone o Repositório

```bash
git clone https://github.com/Danielmadr/image-gallery-dev
cd image-gallery-dev
```

### 2. Execute com Docker Compose

```bash
# Inicia todos os serviços
docker-compose up -d

# Verifica o status dos containers
docker-compose ps

# Visualiza os logs
docker-compose logs -f
```

### 3. Acesse a Aplicação

http://localhost:8080

## 🐳 Comandos Docker Úteis

### Gerenciamento de Containers

```bash
# Iniciar serviços
docker-compose up -d

# Parar serviços
docker-compose down

# Reiniciar um serviço específico
docker-compose restart web

# Visualizar logs de um serviço
docker-compose logs -f database
```
## 📚 Recursos Adicionais

### Documentação

- [Docker Compose Reference](https://docs.docker.com/compose/)
- [Apache HTTPD Documentation](https://httpd.apache.org/docs/)

### Tutoriais

- [Docker para Iniciantes](https://docker-curriculum.com/)
- [Apache Configuration](https://httpd.apache.org/docs/2.4/configuring.html)

## 📄 Licença

Este projeto está licenciado sob a **MIT License** - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

*Este projeto foi desenvolvido como parte do Bootcamp .NET da DIO.*
