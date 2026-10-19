# Chamado — suporte técnico

Aplicação Angular para abrir e acompanhar solicitações de suporte técnico, com painel de atendimento e chat separado por chamado.

## Executar localmente

```bash
npm install
npm start
```

A aplicação ficará disponível em `http://localhost:4200/`.

## Contas de demonstração

- **Técnico:** `tecnico@chamados.com` / `tecnico123`
- **Cliente:** `cliente@chamados.com` / `cliente123`

Também é possível criar uma conta pela tela de cadastro. Chamados, mensagens e novas contas ficam salvos no `localStorage` deste navegador; esta versão não possui backend ou sincronização entre dispositivos.

## Fluxos disponíveis

- Painel técnico com busca, filtros e atualização de status dos chamados.
- Chat independente para cada solicitação.
- Área do cliente para acompanhar solicitações e responder ao técnico.
- Formulário para abrir novos chamados.
- Navegação responsiva e interface em português.
