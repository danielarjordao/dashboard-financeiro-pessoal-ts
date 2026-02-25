
export function formatarData(dataString) {
	// O constructor do Date aceita o formato 'YYYY-MM-DD' e interpreta o horário como UTC (Universal time coordinated),
	// então adicionar 'T00:00:00' garante que a data seja interpretada corretamente.
    const data = new Date(dataString + 'T00:00:00');
	// padStart é usado para garantir que o dia e o mês tenham sempre dois dígitos (ex: 01, 02, ..., 10, 11, 12)
    const dia = String(data.getDate()).padStart(2, '0');
	// getMonth() retorna o mês de 0 a 11, então adicionamos 1 para obter o número do mês correto
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
}


export function formatarValor(valor) {
	// Intl.NumberFormat é uma API nativa do JavaScript que formata números de acordo com a localidade e opções especificadas.
	// Neste caso, o primeiro argumento 'pt-pt' indica que a localidade é português de Portugal,
	// o segundo argumento é um objeto de opções que define o estilo como 'currency'
	// e a moeda como 'EUR'. O .format() é chamado para formatar o valor de acordo com essas configurações.
    return new Intl.NumberFormat('pt-pt', {
        style: 'currency',
        currency: 'EUR'
    }).format(valor);
}
