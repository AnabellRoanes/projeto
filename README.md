# 🚀 Projeto Integração WhatsApp + IA

Este projeto conecta o **WhatsApp Web** com uma **API de IA (OpenAI)**, salvando mensagens em banco de dados SQLite e exibindo tudo em um **frontend React (Vite)**.

---

## 📂 Estrutura do Projeto

```
projeto/
├── backend/        # API + WhatsApp + Banco de Dados
│   ├── package.json
│   ├── prisma/
│   │   └── schema.prisma
│   └── src/
│       ├── ia.js
│       └── whatsapp.js
│
└── frontend/       # Interface (React + Vite)
    └── src/
        └── App.jsx
```

---

## ✅ 1) Baixar e Preparar

1. Baixe e extraia o projeto em uma pasta, por exemplo:

   ```
   C:\projeto
   ```

2. Confirme que a estrutura esteja como mostrada acima.

---

## ✅ 2) Backend (API + WhatsApp + DB)

No terminal:

```bash
cd backend
```

### 2.1 Instalar dependências
```bash
npm install
```

### 2.2 Instalar SDK da OpenAI
```bash
npm install openai
```

### 2.3 Configurar variáveis de ambiente
Crie/edite o arquivo **`backend/.env`**:

```env
PORT=3001
OPENAI_API_KEY=sua_chave_aqui
DATABASE_URL="file:./dev.db"
```

### 2.4 Configurar banco (SQLite + Prisma)
```bash
npx prisma generate
npx prisma db push
```

### 2.5 Rodar em modo desenvolvimento
```bash
npm run dev
```

Se tudo estiver certo, verá:

```
Backend on http://localhost:3001
```

---

### 💡 Dicas importantes

- O **whatsapp-web.js** abre um Chromium headless.  
- Em **Linux**, pode ser necessário instalar bibliotecas:  
  ```bash
  sudo apt install -y libasound2 libgbm-dev
  ```
- Em **Windows/Mac** costuma funcionar direto.  
- Na primeira execução, será exibido um **QR Code** no frontend (passo 3).  
- Escaneie com o WhatsApp no celular (**Aparelhos Conectados**).  
- Sessões são salvas em `~/.wwebjs_auth`.

---

## ✅ 3) Frontend (Vite + React)

No terminal:

```bash
cd ../frontend
```

### 3.1 Criar o projeto Vite
```bash
npm create vite@latest . -- --template react
```

### 3.2 Instalar dependências
```bash
npm install
```

### 3.3 Instalar libs extras usadas no App.jsx
```bash
npm install socket.io-client axios react-qr-code
```

### 3.4 Substituir o arquivo `src/App.jsx`
Coloque o conteúdo fornecido no passo anterior (versão completa do `App.jsx`).

### 3.5 Rodar o frontend
```bash
npm run dev
```

Abra a URL exibida (geralmente `http://localhost:5173`).

---

## ✅ 4) Fluxo de Uso

1. Suba o **backend**:
   ```bash
   npm run dev
   ```
2. Suba o **frontend**:
   ```bash
   npm run dev
   ```
3. Abra o frontend no navegador.  
4. Escaneie o **QR Code** com o WhatsApp.  
5. Envie mensagens para o número conectado.  
   - O bot salvará no **SQLite**.  
   - As respostas serão geradas pela **OpenAI**.

---

## 🎯 Resumo

- **Backend**: WhatsApp + IA + DB (Node + Express + Prisma).  
- **Frontend**: React (Vite) exibindo QR Code e mensagens.  
- **Banco**: SQLite (simples e local).  
- **IA**: OpenAI (`gpt-4o-mini`).  

Pronto! Agora você tem um **README.md completo e ajustado** ✅
