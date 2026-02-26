import type { Categoria, ItemBruto, TipoTransacao, Transacao, ValidacaoResultado } from "./types.js";

export function validarDescricao(descricao: string): string {
    descricao = descricao.trim();
    if (descricao.length === 0) {
        return 'Descrição é obrigatória.';
    }
    if (descricao.length < 3) {
        return 'Descrição deve ter no mínimo 3 caracteres.';
    }
    if (descricao.length > 50) {
        return 'Descrição deve ter no máximo 50 caracteres.';
    }
    return '';
}

export function validarValor(valor: string | number): string {
    let valorNumerico: number;

    if (typeof valor === 'string')
        valorNumerico = Number(valor);
    else
        valorNumerico = valor;

    if (isNaN(valorNumerico)) {
        return 'Digite um valor válido.';
    }
    if (valorNumerico <= 0) {
        return 'Valor deve ser maior que zero.';
    }
    if (valorNumerico > 9999999.99) {
        return 'Valor não pode ultrapassar 9.999.999,99';
    }
    return '';
}

export function validarTipo(tipo: string) : string {
    if (!tipo) {
        return 'Selecione o tipo de transação.';
    }
    return '';
}

export function validarCategoria(categoria: string): string {
    if (!categoria) {
        return 'Selecione uma categoria.';
    }
    return '';
}

export function validarData(data: string): string {
    if (!data || data === '') {
        return 'Data é obrigatória.';
    }

    // Validar se é uma data válida
    const dataObj: Date = new Date(data);
    if (isNaN(dataObj.getTime())) {
        return 'Data inválida.';
    }

    // validar se a data não é futura
    const hoje: Date = new Date();
    hoje.setHours(0, 0, 0, 0);
    if (dataObj > hoje) {
        return 'Data não pode ser futura.';
    }

    return '';
}

/*
Função para anexar validação a um input específico.
Adiciona event listeners para 'input' e 'blur' que chamam o validador
e atualizam a mensagem de erro correspondente.

(valor: string) => string - tipo da função validadora, que recebe o valor do input e retorna uma mensagem de erro (ou string vazia se válido).
*/
export function attachValidation(input: HTMLInputElement | HTMLSelectElement, validator: (valor: string) => string, errorElement: HTMLElement): void {
    const handler: EventListenerOrEventListenerObject = () => {
		// Chama o validador e obtém a mensagem de erro (se houver)
        const errorMessage: string = validator(input.value);
        errorElement.textContent = errorMessage;

        // Se houver mensagem de erro, adiciona classe de erro;
		// caso contrário, remove para garantir que o estilo volte ao normal
        if (errorMessage) {
            input.classList.add('input-error');
        } else {
            input.classList.remove('input-error');
        }
    };

	// Adiciona event listeners para validar em tempo real e ao perder o foco
    input.addEventListener('input', handler);
    input.addEventListener('blur', handler);
}

// Valida todo o formulário e retorna objeto com status de validação.
export function validarFormulario(dados: ItemBruto): ValidacaoResultado{
    const erros: string[] = [];

    const erroDesc: string = validarDescricao(typeof dados.descricao === 'string' ? dados.descricao : '');
    if (erroDesc)
		erros.push(erroDesc);

    const erroValor: string = validarValor(typeof dados.valor === 'string' || typeof dados.valor === 'number' ? dados.valor.toString() : '');
    if (erroValor)
		erros.push(erroValor);

    const erroTipo: string = validarTipo(typeof dados.tipo === 'string' ? dados.tipo : '');
    if (erroTipo)
		erros.push(erroTipo);

    const erroCat: string = validarCategoria(typeof dados.categoria === 'string' ? dados.categoria : '');
    if (erroCat)
		erros.push(erroCat);

    const erroData: string = validarData(typeof dados.data === 'string' ? dados.data : '');
    if (erroData)
		erros.push(erroData);

    return {
        valido: erros.length === 0,
        erros: erros
    };
}

/*
Verifica se todos os campos têm mensagens de erro e se todos estão preenchidos.
Usado para habilitar/desabilitar o botão de submit.
*/
export function verificarFormularioCompleto(inputs: (HTMLInputElement | HTMLSelectElement)[], errorElements: HTMLElement[]): boolean {
    let hasError: boolean = false;
    let allFilled:boolean = true;

    // Verifica se todos os campos estão preenchidos
    inputs.forEach((input) => {
        if (input.value.trim() === '') {
            allFilled = false;
        }
    });

    // Verifica se há mensagens de erro
    errorElements.forEach((error) => {
        if ((error.textContent || '').trim() !== '') {
            hasError = true;
        }
    });

    return !hasError && allFilled;
}
