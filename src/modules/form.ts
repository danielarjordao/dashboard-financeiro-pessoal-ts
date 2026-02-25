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

import type { ItemBruto } from './types.js';
import { Categoria } from './types.js';

// Elementos do formulário
// O uso do 'as' é necessário para informar ao TypeScript o tipo específico do elemento,
// já que querySelector pode retornar null ou um tipo genérico.

const form = document.querySelector('.nova-transacao') as HTMLFormElement;
const inputData = document.getElementById('data') as HTMLInputElement;
const inputDescricao = document.getElementById('descricao') as HTMLInputElement;
const inputValor = document.getElementById('quantidade') as HTMLInputElement;
const inputTipo = document.getElementById('tipo-transacao') as HTMLSelectElement;
const inputCategoria = document.getElementById('categoria') as HTMLSelectElement;
const botao = document.querySelector('.adiciona-historia') as HTMLButtonElement;

// Elementos para exibir erros de validação no formulário
const errorData = form.querySelector('.data-form .error') as HTMLElement;
const errorDescricao = form.querySelector('.description-form .error') as HTMLElement;
const errorValor = form.querySelector('.valor-container .error') as HTMLElement;
const errorTipo = form.querySelector('.tipo-transacao-container .error') as HTMLElement;
const errorCategoria = form.querySelector('.categoria-container .error') as HTMLElement;

// Cria array para facilitar iteração e controle dos inputs e mensagens de erro
const allInputs: (HTMLInputElement | HTMLSelectElement)[] = [inputData, inputDescricao, inputValor, inputTipo, inputCategoria];
const allErrors: HTMLElement[] = [errorData, errorDescricao, errorValor, errorTipo, errorCategoria];

// Limpa o formulário e reseta estados de erro
export function limparFormulario(): void {
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
export function initCategorias(): void {
    // Limpar opções existentes
    inputCategoria.innerHTML = '';

    // Adicionar opção padrão desabilitada
    const optionDefault = document.createElement('option');
    optionDefault.value = '';
    optionDefault.textContent = 'Selecione uma categoria';
    optionDefault.disabled = true;
    optionDefault.selected = true;
    inputCategoria.appendChild(optionDefault);

    const listaDeCategorias = Object.values(Categoria);

    // Adicionar cada categoria
    listaDeCategorias.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        inputCategoria.appendChild(option);
    });
}

// Inicializa validações em tempo real e controle do botão
export function initValidacoes(): void {
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
function atualizarEstadoBotao(): void {
    const formularioValido = verificarFormularioCompleto(allInputs, allErrors);
	// Habilita o botão se o formulário for válido, caso contrário, mantém desabilitado
    botao.disabled = !formularioValido;
}

// Captura dados do formulário e retorna como objeto
export function capturarDadosFormulario(): ItemBruto {
    return {
        data: inputData.value,
        descricao: inputDescricao.value,
        valor: inputValor.value,
        tipo: inputTipo.value,
        categoria: inputCategoria.options[inputCategoria.selectedIndex]?.text || ''
    };
}

// Retornar referência do botão para o app.js
export function getBotao(): HTMLButtonElement {
    return botao;
}
