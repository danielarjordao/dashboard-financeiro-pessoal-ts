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
import type { Transacao, ItemBruto } from './modules/types.js';
import { checkTransacaoFormat } from './modules/utils.js';

// Inicialização
init(); // Carregar transações do localStorage
initCategorias();
initValidacoes();

// Renderizar transações existentes ao carregar a página
const transacoesIniciais: Transacao[] = getTransacoes();
renderizarTransacoes(transacoesIniciais);

// Atualizar cards com valores iniciais
const saldoInicial: number = calcularSaldo(transacoesIniciais);
const receitasInicial: number = calcularReceitas(transacoesIniciais);
const despesasInicial: number = calcularDespesas(transacoesIniciais);
atualizarCards(saldoInicial, receitasInicial, despesasInicial);

// EVENTO DO BOTÃO
const botao: HTMLButtonElement = getBotao();
botao.addEventListener('click', (e) => {
    e.preventDefault();

	// 1) Capturar inputs do formulário.
	// 2) Escutar clique do botão.
    const dados: ItemBruto = capturarDadosFormulario();

	// 3) Validar dados.
	// 4) Criar objeto transação.
    const resultado = validarFormulario(dados);
    if (!resultado.valido) {
        console.error('Formulário inválido:', resultado.erros);
        return;
    }

    const transacaoFormatada: Transacao | null = checkTransacaoFormat(dados);
    // 5) Atualizar estado.
    if (transacaoFormatada) {
        adicionarTransacao(transacaoFormatada);
    } else {
        console.error('Erro ao formatar transação. Verifique os dados de entrada.');
        return;
    }

    // 6) Re-renderizar UI.
    const transacoes: Transacao[] = getTransacoes();
    renderizarTransacoes(transacoes);

    // 6.1) Recalcular e atualizar cards
    const saldo: number = calcularSaldo(transacoes);
    const receitas: number = calcularReceitas(transacoes);
    const despesas: number = calcularDespesas(transacoes);
    atualizarCards(saldo, receitas, despesas);

    // 7) Limpar formulário.
    limparFormulario();
});
