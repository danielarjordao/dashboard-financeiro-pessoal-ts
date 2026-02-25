// Imports
import { validarFormulario } from './modules/validation.js';
import {
    initValidacoes,
    initCategorias,
    capturarDadosFormulario,
    limparFormulario,
    getBotao
} from './modules/form.js';
import { renderizarTransacoes, atualizarCards } from './modules/userIterface.js';
import { init, adicionarTransacao, getTransacoes } from './modules/state.js';
import { calcularSaldo, calcularReceitas, calcularDespesas } from './modules/transactions.js';

// Inicialização
init(); // Carregar transações do localStorage
initCategorias();
initValidacoes();

// Renderizar transações existentes ao carregar a página
const transacoesIniciais = getTransacoes();
renderizarTransacoes(transacoesIniciais);

// Atualizar cards com valores iniciais
const saldoInicial = calcularSaldo(transacoesIniciais);
const receitasInicial = calcularReceitas(transacoesIniciais);
const despesasInicial = calcularDespesas(transacoesIniciais);
atualizarCards(saldoInicial, receitasInicial, despesasInicial);

// EVENTO DO BOTÃO
const botao = getBotao();
botao.addEventListener('click', (e) => {
    e.preventDefault();

	// 1) Capturar inputs do formulário.
	// 2) Escutar clique do botão.
    const dados = capturarDadosFormulario();

	// 3) Validar dados.
	// 4) Criar objeto transação.
    const resultado = validarFormulario(dados);
    if (!resultado.valido) {
        console.error('Formulário inválido:', resultado.erros);
        return;
    }

    // 5) Atualizar estado.
    adicionarTransacao(dados);

    // 6) Re-renderizar UI.
    const transacoes = getTransacoes();
    renderizarTransacoes(transacoes);

    // 6.1) Recalcular e atualizar cards
    const saldo = calcularSaldo(transacoes);
    const receitas = calcularReceitas(transacoes);
    const despesas = calcularDespesas(transacoes);
    atualizarCards(saldo, receitas, despesas);

    // 7) Limpar formulário.
    limparFormulario();
});
