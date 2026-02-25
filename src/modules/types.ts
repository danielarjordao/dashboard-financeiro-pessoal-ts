export enum Categoria {
    Salario = 'Salário',
    Alimentacao = 'Alimentação',
    Transporte = 'Transporte',
    Saude = 'Saúde',
    Moradia = 'Moradia',
    Educacao = 'Educação',
    Lazer = 'Lazer',
    Outros = 'Outros'
}

export enum TipoTransacao {
    Receita = 'receita',
    Despesa = 'despesa'
}

export interface Transacao {
    id: number;
    data: string;
    descricao: string;
    valor: number;
    tipo: TipoTransacao;
    categoria: Categoria;
}

// Interface para receber o dado bruto
export interface ItemBruto {
    id?: unknown;
    data?: unknown;
    descricao?: unknown;
    valor?: unknown;
    tipo?: unknown;
    categoria?: unknown;
}

export interface ValidacaoResultado {
    valido: boolean;
    erros: string[];
}
