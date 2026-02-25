import { salvar, carregar} from './storage.js';
import type { Transacao } from './types.js';

// Array em memória (estado da aplicação)
let transacoes: Transacao[] = [];

// 1) Carregar as transações salvas quando o sistema iniciar.
export function init(): void {
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
export function getTransacoes(): Transacao[] {
    return transacoes;
}

// Adicionar nova transação
export function adicionarTransacao(novaTransacao: Transacao): void {
    // Adicionar ao array em memória
    transacoes.push(novaTransacao);

    // Sincronizar com localStorage
    salvar(transacoes);
}

// Remover transação
export function removerTransacao(id: number): void {
    // Filtrar o array para remover a transação com o ID correspondente
    transacoes = transacoes.filter(transacao => transacao.id !== id);

    // Sincronizar com localStorage após remoção
    salvar(transacoes);
}

// Limpar todas as transações
export function limparTodas(): void {
    transacoes = [];
    salvar(transacoes);
}

