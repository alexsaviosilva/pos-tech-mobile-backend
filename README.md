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


## Instalação

Clone o projeto

```bash
 git clone https://github.com/alexsaviosilva/pos-tech-fase-II.git
  
```
## 1. Acesse o projeto

```bash
cd pos-tech-fase-II
  
```
## 2. Instale as Dependências

```bash
npm install  
```

## 3. Execute o Docker Compose
Certifique-se de que o Docker e o Docker Compose estão instalados:


```bash
docker-compose up -d  
```

## 4. Inicie o servidor


```bash
npm run dev

```

#### O servidor estará disponível em:
📍 http://localhost:3000

📝 Observação
Certifique-se de que o MongoDB esteja rodando no Docker antes de iniciar o servidor.


# 🌐 Endpoints e Rotas



### 1. POST `/auth/register` - Registro de Usuários  
**Body**:  
```json
{
  "email": "usuario@gmail.com",
  "name": "Stef",
  "password": "senha123",
  "role": "aluno",
  "disciplina": "Matemática"
}


```

## 2. POST `/posts/publicacoes` - Registro de Usuários  
**Body**:  
```json
{
  "titulo": "Minha Publicação",
  "descricao": "Conteúdo da Publicação",
  "autor": "ID do autor"
}


```




## 👤 Usuários e Roles

| Role       | Descrição                                         |
|------------|---------------------------------------------------|
| professor  | Pode criar, editar, excluir e publicar conteúdos. |
| aluno      | Pode apenas visualizar conteúdos.                 |

---







