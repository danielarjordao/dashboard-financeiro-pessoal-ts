import type { Categoria, ItemBruto, TipoTransacao, Transacao } from "./types.js";

export function formatarData(dataString: string): string {
	// O constructor do Date aceita o formato 'YYYY-MM-DD' e interpreta o horário como UTC (Universal time coordinated),
	// então adicionar 'T00:00:00' garante que a data seja interpretada corretamente.
    const data: Date  = new Date(dataString + 'T00:00:00');
	// padStart é usado para garantir que o dia e o mês tenham sempre dois dígitos (ex: 01, 02, ..., 10, 11, 12)
    const dia: string = String(data.getDate()).padStart(2, '0');
	// getMonth() retorna o mês de 0 a 11, então adicionamos 1 para obter o número do mês correto
    const mes: string = String(data.getMonth() + 1).padStart(2, '0');
    const ano: number = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
}


export function formatarValor(valor: number): string {
	// Intl.NumberFormat é uma API nativa do JavaScript que formata números de acordo com a localidade e opções especificadas.
	// Neste caso, o primeiro argumento 'pt-pt' indica que a localidade é português de Portugal,
	// o segundo argumento é um objeto de opções que define o estilo como 'currency'
	// e a moeda como 'EUR'. O .format() é chamado para formatar o valor de acordo com essas configurações.
    return new Intl.NumberFormat('pt-pt', {
        style: 'currency',
        currency: 'EUR'
    }).format(valor);
}

// Função para verificar e converter o formato dos dados carregados
export function checkTransacoesFormat(dadosBrutos: ItemBruto[]): Transacao[] {
    // Confirma se realmente é uma lista antes de tentar fazer o loop
    if (!Array.isArray(dadosBrutos)) {
        return [];
    }

    const transacoesValidadas: Transacao[] = [];

    // Percorre a lista bruta e valida cada item passo a passo
    for (let i = 0; i < dadosBrutos.length; i++) {
        // dadosBrutos[i] as
        const item: ItemBruto = dadosBrutos[i] as ItemBruto;
        // Montagem do objeto final estritamente tipado
        const novaTransacao: Transacao | null = checkTransacaoFormat(item);
        if (novaTransacao)
            transacoesValidadas.push(novaTransacao);
    }
    return transacoesValidadas;
}

export function checkTransacaoFormat(item: ItemBruto): Transacao | null {
    if (typeof item === 'object' && item !== null) {
        // Verifica se todas as propriedades realmente existem
         if (item.id !== undefined && item.data !== undefined &&
            item.descricao !== undefined && item.valor !== undefined &&
            item.tipo !== undefined && item.categoria !== undefined) {

            // Conversão dos tipos de ID e valor para garantir que sejam numéricos.
            let idNumerico: number = typeof item.id === 'string' ? parseInt(item.id as string) : item.id as number;
            let valorNumerico: number = typeof item.valor === 'string' ? parseFloat(item.valor as string) : item.valor as number;

            // Se a conversão falhar (resultar em NaN), ignora este item
            if (isNaN(idNumerico) || isNaN(valorNumerico)) {
                return null;
            }

            // Montagem do objeto final estritamente tipado
            const novaTransacao: Transacao = {
                id: idNumerico,
                data: item.data as string,
                descricao: item.descricao as string,
                valor: valorNumerico,
                tipo: item.tipo as TipoTransacao,
                categoria: item.categoria as Categoria
            };
        return novaTransacao;
        }
    }
    return null;
}
