// 1) Precisamos definir uma chave fixa para armazenar os dados.
const chaveStorage = 'transacoes_financeiras';

/*
2) Quando salvar:
- Converter array de objetos para JSON.
- Usar localStorage.setItem().
*/
export function salvar(transacoes) {
    // Converter array de objetos para string JSON
    const transacoesJSON = JSON.stringify(transacoes);

    // Salvar no localStorage
    localStorage.setItem(chaveStorage, transacoesJSON);
}

/*
3) Quando carregar:
- Buscar com localStorage.getItem().
- Se existir, converter de volta com JSON.parse().
- Se não existir, retornar array vazio.
*/
export function carregar() {
    // Buscar dados salvos
    const transacoesJSON = localStorage.getItem(chaveStorage);

    // Se não existir nada, retornar array vazio
    if (!transacoesJSON) {
        return [];
    }

    // Se existir, converter de JSON para array de objetos
    const transacoes = JSON.parse(transacoesJSON);

    // Corrigir valores que possam estar como string (dados antigos)
    return transacoes.map(transacao => {
        // Verificar se o valor é uma string
        if (typeof transacao.valor === 'string') {
            // Se for string, converter para número
            return {
                ...transacao,
                valor: parseFloat(transacao.valor)
            };
        }
        // Se já for número, retornar sem alteração
        return transacao;
    });
}

// Limpar todas as transações para teste
export function limparStorage() {
    localStorage.removeItem(chaveStorage);
}
