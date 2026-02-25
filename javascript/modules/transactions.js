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
export function calcularSaldo(transacoes) {
    return calcularReceitas(transacoes) - calcularDespesas(transacoes);
}

// Calcular total de receitas
export function calcularReceitas(transacoes) {
    // 1) Filtrar apenas receitas
    let resultado = transacoes.filter(transacao => transacao.tipo === 'receita');
    // 2) Somar os valores com reduce(), acc começa em 0
    resultado = resultado.reduce((acc, transacao) => acc + transacao.valor, 0);
    return resultado;
}

// Calcular total de despesas
export function calcularDespesas(transacoes) {
    // 1) Filtrar apenas despesas
    let resultado = transacoes.filter(transacao => transacao.tipo === 'despesa');
    // 2) Somar os valores com reduce(), acc começa em 0
   resultado = resultado.reduce((acc, transacao) => acc + transacao.valor, 0);
    return resultado;
}
