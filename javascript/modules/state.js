import { salvar, carregar} from './storage.js';

// Array em memória (estado da aplicação)
let transacoes = [];

// 1) Carregar as transações salvas quando o sistema iniciar.
export function init() {
    transacoes = carregar();
}

/*
2) Criar função para:
- Retornar lista atual.
- Adicionar nova transação.

3) Sempre que alterar o estado:
   - Atualizar o localStorage.
*/

// Retornar a lista atual de transações
export function getTransacoes() {
    return transacoes;
}

// Adicionar nova transação
export function adicionarTransacao(novaTransacao) {
    // Adicionar ID único baseado em timestamp
    const transacaoComId = {
        id: Date.now(),
        // Spread operator para copiar as propriedades da novaTransacao
        ...novaTransacao
    };

    // Adicionar ao array em memória
    transacoes.push(transacaoComId);

    // Sincronizar com localStorage
    salvar(transacoes);
}

// Remover transação
export function removerTransacao(id) {
    // Filtrar o array para remover a transação com o ID correspondente
    transacoes = transacoes.filter(transacao => transacao.id !== id);

    // Sincronizar com localStorage após remoção
    salvar(transacoes);
}

// Limpar todas as transações
export function limparTodas() {
    transacoes = [];
    salvar(transacoes);
}

