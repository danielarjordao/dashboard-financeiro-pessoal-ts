import { type Transacao, TipoTransacao} from './types.js';


/*
1) O saldo começa em 0.
2) Para cada transação:
   - Se for receita, soma.
   - Se for despesa, subtrai.
3) Para calcular totais separados:
   - Filtrar por tipo.
   - Somar valores.
*/

// Calcular o saldo total (receitas - despesas)
export function calcularSaldo(transacoes: Transacao[]): number {
    return calcularReceitas(transacoes) - calcularDespesas(transacoes);
}

// Calcular total de receitas
export function calcularReceitas(transacoes: Transacao[]): number {
    // 1) Filtrar apenas receitas
    let transacoesReceitas: Transacao[] = transacoes.filter(transacao => transacao.tipo === TipoTransacao.Receita);
    // 2) Somar os valores com reduce(), acc começa em 0
    let resultado: number = transacoesReceitas.reduce((acc, transacao) => acc + transacao.valor, 0);
    return resultado;
}

// Calcular total de despesas
export function calcularDespesas(transacoes: Transacao[]): number {
    // 1) Filtrar apenas despesas
    let transacoesDespesas: Transacao[] = transacoes.filter(transacao => transacao.tipo === TipoTransacao.Despesa);
    // 2) Somar os valores com reduce(), acc começa em 0
   let resultado: number = transacoesDespesas.reduce((acc, transacao) => acc + transacao.valor, 0);
    return resultado;
}
