# 🚀 POS-TECH Fase II - Back-End

## 📋 Descrição
Este repositório contém o código **Back-End** desenvolvido em Node.js com suporte a autenticação JWT, MongoDB e endpoints REST.

---

## 📂 Tecnologias utilizadas
- 🟢 **Node.js**
- ⚡ **Express.js**
- 🍃 **MongoDB**
- 🐳 **Docker Compose**
- 🔐 **JWT (JSON Web Token)**

---

## 🛠️ Configuração do projeto

### 1. **Clone o repositório**
```bash
git clone https://github.com/alexsaviosilva/pos-tech-fase-II.git
cd pos-tech-fase-II

2. Execute o Docker Compose
Certifique-se de que o Docker e o Docker Compose estão instalados:

bash
Copiar código
docker-compose up -d
3. Instale as Dependências
bash
Copiar código
npm install
4. Inicie o Servidor
bash
Copiar código
npm run dev
O servidor estará disponível em:
📍 http://localhost:3000

🌐 Endpoints e Rotas
🔐 Autenticação
1. POST /auth/register - Registro de Usuários
Body:

json
Copiar código
{
  "email": "usuario@gmail.com",
  "name": "Stef",
  "password": "senha123",
  "role": "aluno",
  "disciplina": "Matemática"
}
2. POST /auth/login - Login de Usuários
Body:

json
Copiar código
{
  "email": "usuario@gmail.com",
  "password": "senha123"
}
📝 Publicações
1. POST /posts/publicacoes - Criar Publicação
Body:

json
Copiar código
{
  "titulo": "Minha Publicação",
  "descricao": "Conteúdo da Publicação",
  "autor": "ID do autor"
}
2. GET /posts/publicacoes - Listar Publicações
3. GET /posts/publicacoes/:id - Buscar Publicação por ID
👤 Usuários e Roles
admin - Acesso completo
aluno - Acesso restrito às suas próprias publicações
🚀 Executando o Projeto Completo
Suba os containers com o Docker:

bash
Copiar código
docker-compose up -d
Inicie o servidor:

bash
Copiar código
npm run dev
Acesse o servidor em:

Back-End: http://localhost:3000
📄 Exemplos de JSON
Registro de Usuário
json
Copiar código
{
  "email": "usuario@gmail.com",
  "name": "Stef",
  "password": "123456",
  "role": "aluno",
  "disciplina": "Matemática"
}
Criação de Publicação
json
Copiar código
{
  "titulo": "Minha Publicação",
  "descricao": "Descrição Detalhada",
  "autor": "ID do Autor"
}
📝 Observação
Certifique-se de que o MongoDB esteja rodando no Docker antes de iniciar o servidor.

📢 Licença
Este projeto é licenciado sob a MIT License.

yaml
Copiar código

---

### 📗 **README.md para o Front-End** (`pos-tech-fase-III`)

```markdown
# 🎨 POS-TECH Fase III - Front-End

## 📋 Descrição  
Este repositório contém o código **Front-End** de uma aplicação de gerenciamento de publicações, desenvolvido em **React.js**. Ele consome os endpoints do Back-End para listar, criar e visualizar publicações.

---

## 📂 Tecnologias Utilizadas  
- ⚛️ **React.js**  
- 💻 **JavaScript**  
- 📦 **npm**  

---

## 🛠️ Configuração do Projeto  

### 1. Clone o Repositório  
```bash
git clone https://github.com/alexsaviosilva/pos-tech-fase-III.git
cd pos-tech-fase-III
2. Instale as Dependências
bash
Copiar código
npm install
3. Inicie o Servidor
bash
Copiar código
npm start
O Front-End estará disponível em:
📍 http://localhost:3001

🚀 Executando Back-End e Front-End Juntos
1. Inicie o Back-End
Certifique-se de que o Back-End esteja rodando:

bash
Copiar código
docker-compose up -d
npm run dev
2. Inicie o Front-End
bash
Copiar código
npm start
3. Acesse:
🌐 Back-End: http://localhost:3000
🎨 Front-End: http://localhost:3001
🖥️ Funcionalidades
Autenticação

Registro e login de usuários.
Token JWT armazenado no localStorage.
Gerenciamento de Publicações

Listagem de todas as publicações.
Visualização de uma publicação específica.
Criação de novas publicações autenticadas.
Logout

Remove o token de autenticação e redireciona para o login.
📸 Fluxo da Aplicação
O usuário realiza o login ou registro.
Após autenticado, o sistema consome os endpoints do Back-End.
O usuário pode visualizar, listar ou criar novas publicações.
📝 Observação
Certifique-se de que o Back-End esteja rodando antes de iniciar o Front-End.
🔗 Repositório Back-End: POS-TECH Fase II

📢 Licença
Este projeto é licenciado sob a MIT License.

yaml
Copiar código

---

### Como usar
1. Crie um arquivo `README.md` no repositório do **Back-End** (`pos-tech-fase-II`) e cole o primeiro bloco.
2. Crie outro `README.md` no repositório do **Front-End** (`pos-tech-fase-III`) e cole o segundo bloco.


