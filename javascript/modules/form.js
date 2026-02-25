// Importa funções de validação e utilitários do módulo de validação
import {
    validarDescricao,
    validarValor,
    validarTipo,
    validarCategoria,
    validarData,
    attachValidation,
    verificarFormularioCompleto
} from './validation.js';

// Elementos do formulário
const form = document.querySelector('.nova-transacao');
const inputData = document.getElementById('data');
const inputDescricao = document.getElementById('descricao');
const inputValor = document.getElementById('quantidade');
const inputTipo = document.getElementById('tipo-transacao');
const inputCategoria = document.getElementById('categoria');
const botao = document.querySelector('.adiciona-historia');

// Elementos para exibir erros de validação no formulário
const errorData = form?.querySelector('.data-form .error');
const errorDescricao = form?.querySelector('.description-form .error');
const errorValor = form?.querySelector('.valor-container .error');
const errorTipo = form?.querySelector('.tipo-transacao-container .error');
const errorCategoria = form?.querySelector('.categoria-container .error');

// Cria array para facilitar iteração e controle dos inputs e mensagens de erro
const allInputs = [inputData, inputDescricao, inputValor, inputTipo, inputCategoria];
const allErrors = [errorData, errorDescricao, errorValor, errorTipo, errorCategoria];

// Limpa o formulário e reseta estados de erro
export function limparFormulario() {
    inputData.value = '';
    inputDescricao.value = '';
    inputValor.value = '';
    inputTipo.value = '';
    inputCategoria.value = '';

    allErrors.forEach(
		error => error.textContent = '');
    allInputs.forEach(
		// Remove a classe de erro de todos os inputs para resetar o estado visual
		input => input.classList.remove('input-error'));

	// Inicia com o botão desabilitado
    botao.disabled = true;
}

// Preenche o select de categorias com opções definidas
export function initCategorias() {
    const categorias = [
        { valor: 'salario', texto: 'Salário' },
        { valor: 'investimentos', texto: 'Investimentos' },
        { valor: 'moradia', texto: 'Moradia' },
        { valor: 'alimentacao', texto: 'Alimentação' },
        { valor: 'saude', texto: 'Saúde' },
        { valor: 'transporte', texto: 'Transporte' },
        { valor: 'educacao', texto: 'Educação' },
        { valor: 'lazer', texto: 'Lazer' },
        { valor: 'outros', texto: 'Outros' }
    ];

    // Limpar opções existentes
    inputCategoria.innerHTML = '';

    // Adicionar opção padrão desabilitada
    const optionDefault = document.createElement('option');
    optionDefault.value = '';
    optionDefault.textContent = 'Selecione uma categoria';
    optionDefault.disabled = true;
    optionDefault.selected = true;
    inputCategoria.appendChild(optionDefault);

    // Adicionar cada categoria
    categorias.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat.valor;
        option.textContent = cat.texto;
        inputCategoria.appendChild(option);
    });
}

// Inicializa validações em tempo real e controle do botão
export function initValidacoes() {
    attachValidation(inputData, validarData, errorData);
    attachValidation(inputDescricao, validarDescricao, errorDescricao);
    attachValidation(inputValor, validarValor, errorValor);
    attachValidation(inputTipo, validarTipo, errorTipo);
    attachValidation(inputCategoria, validarCategoria, errorCategoria);

    allInputs.forEach(input => {
        input.addEventListener('input', atualizarEstadoBotao);
		// Também escuta o evento 'blur' para garantir que o estado do botão
		// seja atualizado mesmo quando o usuário sai do campo sem digitar nada
        input.addEventListener('blur', atualizarEstadoBotao);
    });

	// Inicia com o botão desabilitado
    botao.disabled = true;
}

// Atualiza estado do botão com base na validação do formulário
// Habilita o botão apenas se o formulário estiver completo e sem erros
function atualizarEstadoBotao() {
    const formularioValido = verificarFormularioCompleto(allInputs, allErrors);
	// Habilita o botão se o formulário for válido, caso contrário, mantém desabilitado
    botao.disabled = !formularioValido;
}

// Captura dados do formulário e retorna como objeto
export function capturarDadosFormulario() {
    return {
        data: inputData.value,
        descricao: inputDescricao.value,
		// Converter string para número
        valor: parseFloat(inputValor.value),
        tipo: inputTipo.value,
        // Captura o texto da opção selecionada para categoria
        categoria: inputCategoria.options[inputCategoria.selectedIndex].text
    };
}

// Retornar referência do botão para o app.js
export function getBotao() {
    return botao;
}
