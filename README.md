# MESsias - Front-end React (MVP)

Este é o projeto Front-end React do sistema MESsias, desenvolvido como MVP (Minimum Viable Product) para a disciplina de Desenvolvimento Front-end Avançado.

## Descrição do Projeto

O MESsias é um painel de controle (Manufacturing Execution System) para gerenciar ordens de produção do setor automotivo. A aplicação foi construída com foco na componentização, component-driven design, reusabilidade e UX (experiência do usuário).

Funcionalidades:
- Dashboard de Ordens de Produção (com requisição simulada via JSON mockado).
- Criação de nova OP (simulando delay de rede e sucesso).
- Tela de detalhes com informações específicas.

## Organização e Estrutura

- `src/components/`: Componentes reutilizáveis (Card, Button, Header, FeedbackMessage, Tooltip).
- `src/pages/`: Componentes de páginas que reúnem componentes menores.
- `public/mock/`: Dados JSON simulando a resposta de um servidor.

## Tecnologias Utilizadas

- **React** (via Vite)
- **React Router DOM** (para navegação e hooks `useNavigate`, `useParams`, `useLocation`)
- **Lucide React** (para iconografia)
- **Vanilla CSS** moderno (com variáveis de design system)

## Instruções de Instalação (Local)

Para rodar este projeto na sua máquina, certifique-se de ter o **Node.js** instalado.

1. Clone o repositório ou navegue até a pasta do projeto:
   ```bash
   cd front-react
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicialize o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

4. Acesse no seu navegador o endereço que aparecerá no terminal (geralmente `http://localhost:5173`).

## Executando com Docker (Recomendado)

O projeto está totalmente conteinerizado com um build multi-stage do Nginx para garantir que funcione idêntico em qualquer máquina, servindo o Vite em modo de produção.

Para subir a aplicação através do Docker:

1. Na pasta raiz deste repositório, execute o comando de build e subida do contêiner em segundo plano:
   ```bash
   docker compose up --build -d
   ```
3. A aplicação estará disponível na porta 80 da sua máquina! Basta abrir o navegador e acessar:
   ```text
   http://localhost
   ```

**Para parar a execução:**
```bash
docker-compose down
```
