export function validarDescricao(descricao) {
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

export function validarValor(valor) {
    const valorNumerico = parseFloat(valor);

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

export function validarTipo(tipo) {
    if (!tipo || tipo === '') {
        return 'Selecione o tipo de transação.';
    }
    if (tipo !== 'receita' && tipo !== 'despesa') {
        return 'Tipo inválido.';
    }
    return '';
}

export function validarCategoria(categoria) {
    if (!categoria || categoria === '') {
        return 'Selecione uma categoria.';
    }
    return '';
}

export function validarData(data) {
    if (!data || data === '') {
        return 'Data é obrigatória.';
    }

    // Validar se é uma data válida
    const dataObj = new Date(data);
    if (isNaN(dataObj.getTime())) {
        return 'Data inválida.';
    }

    // Opcional: validar se a data não é futura
    const hoje = new Date();
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
*/
export function attachValidation(input, validator, errorElement) {
    const handler = () => {
		// Chama o validador e obtém a mensagem de erro (se houver)
        const errorMessage = validator(input.value);
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
export function validarFormulario(dados) {
    const erros = [];

    const erroDesc = validarDescricao(dados.descricao || '');
    if (erroDesc)
		erros.push(erroDesc);

    const erroValor = validarValor(dados.valor || '');
    if (erroValor)
		erros.push(erroValor);

    const erroTipo = validarTipo(dados.tipo || '');
    if (erroTipo)
		erros.push(erroTipo);

    const erroCat = validarCategoria(dados.categoria || '');
    if (erroCat)
		erros.push(erroCat);

    const erroData = validarData(dados.data || '');
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
export function verificarFormularioCompleto(inputs, errorElements) {
    let hasError = false;
    let allFilled = true;

    // Verifica se todos os campos estão preenchidos
    inputs.forEach((input) => {
        if (input.value.trim() === '') {
            allFilled = false;
        }
    });

    // Verifica se há mensagens de erro
    errorElements.forEach((error) => {
        if (error.textContent.trim() !== '') {
            hasError = true;
        }
    });

    return !hasError && allFilled;
}
