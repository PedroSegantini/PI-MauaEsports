# Portal Mauá Esports - Projeto Integrador

Este é o repositório do novo portal web para a Mauá Esports. O projeto foi desenvolvido como parte do Projeto Integrador e visa substituir a antiga presença online da entidade, fornecendo um site moderno, um painel administrativo para gerenciamento de membros e um portal para que os jogadores possam acompanhar suas horas de atividades complementares (Horas-Pai).

## ✨ Funcionalidades Principais

O projeto é dividido em três áreas principais:

#### 1. Site Público (`/frontend/index.html`)
- **Página Institucional:** Apresenta a entidade, seus times e campeonatos.
- **Design Responsivo:** Adaptado para funcionar em desktops e dispositivos móveis.
- **Identidade Visual:** Segue a nova identidade da Mauá Esports, com um tema futurista e modo escuro.

#### 2. Painel de Administração (`/frontend/admin.html`)
- **Acesso Seguro:** Rota protegida por autenticação baseada em token (JWT), acessível apenas para usuários com o cargo de `admin`.
- **Gerenciamento de Usuários (CRUD):**
    - **Criar:** Adicionar novos membros (jogadores, capitães, admins) ao banco de dados, incluindo nome, RA, ID do Discord e senha.
    - **Ler:** Visualizar todos os membros cadastrados em uma tabela.
    - **Atualizar:** Editar as informações de um membro.
    - **Deletar:** Remover um membro do sistema.

#### 3. Área do Jogador (`/frontend/minhas-horas.html`)
- **Acesso Seguro:** Rota protegida por login.
- **Visualização de Horas-Pai:**
    - O jogador logado pode ver o total de horas de treino que acumulou no semestre.
    - O cálculo é feito no backend, que busca os dados da API de treinos da Mauá Esports em tempo real, garantindo que a informação esteja sempre atualizada.

---

## 🛠️ Tecnologias Utilizadas

- **Backend:**
    - **Node.js:** Ambiente de execução JavaScript.
    - **Express.js:** Framework para a criação da API.
    - **MongoDB:** Banco de dados NoSQL para armazenar dados de jogadores e conteúdos.
    - **Mongoose:** ODM para modelar e interagir com o MongoDB.
    - **JSON Web Token (JWT):** Para gerar tokens de autenticação seguros.
    - **Bcrypt.js:** Para criptografar as senhas dos usuários.

- **Frontend:**
    - **HTML5**
    - **CSS3:** Com variáveis e design moderno.
    - **JavaScript (ES6+):** Para toda a lógica de interação e dinamismo.
    - **Bootstrap 5:** Framework para agilizar a criação de layouts responsivos.
    - **Axios:** Cliente HTTP para fazer requisições ao backend.

---

## 🚀 Instalação e Configuração

Siga os passos abaixo para rodar o projeto localmente.

### Pré-requisitos
- **Node.js:** (versão 18 ou superior).
- **MongoDB:** Uma instância do MongoDB rodando (pode ser local ou um serviço em nuvem como o MongoDB Atlas, que já está configurado).
- **VS Code** com a extensão **Live Server**.

### 1. Configuração do Backend
Primeiro, vamos configurar e iniciar o servidor.

```bash
# 1. Navegue até a pasta do backend
cd backend

# 2. Instale todas as dependências necessárias
npm install

# 3. Crie um arquivo .env na pasta 'backend' e adicione suas variáveis de ambiente.
# Substitua os valores conforme necessário.