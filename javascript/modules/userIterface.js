import { formatarData, formatarValor} from './utils.js';
import { removerTransacao, getTransacoes } from './state.js';
import { calcularSaldo, calcularReceitas, calcularDespesas } from './transactions.js';

// Renderizar lista completa de transações
export function renderizarTransacoes(transacoes) {
    // 1) Selecionar o container da lista.
    const listaTransacoes = document.querySelector('.lista-transacoes');

    // 2) Limpar o conteúdo antes de renderizar novamente.
    listaTransacoes.innerHTML = '';

    // Se não houver transações, mostrar mensagem
    if (transacoes.length === 0) {
        listaTransacoes.innerHTML = '<p class="mensagem-vazia">Nenhuma transação registrada ainda.</p>';
        return;
    }

    /*
    3) Para cada transação:
   - Criar elemento HTML dinamicamente.
   - Inserir no DOM.
    */
    // Ordenar por data (mais recente primeiro)
    transacoes.sort(function(a, b) {
        return new Date(b.data) - new Date(a.data);
    });
    transacoes.forEach(transacao => {
        const itemTransacao = criarElementoTransacao(transacao);
        listaTransacoes.appendChild(itemTransacao);
    });
}

// Criar elemento HTML de uma transação individual
function criarElementoTransacao(transacao) {
    const itemTransacao = document.createElement('div');
    itemTransacao.classList.add('item-transacao');
    itemTransacao.dataset.id = transacao.id;

    // Criar os spans
    const spanData = document.createElement('span');
    spanData.className = 'data-transacao';
    spanData.textContent = formatarData(transacao.data);

    const spanDescricao = document.createElement('span');
    spanDescricao.className = 'descricao-transacao';
    spanDescricao.textContent = transacao.descricao;

    const spanValor = document.createElement('span');
    // Ternário para definir classe de cor com base no tipo (receita ou despesa)
    spanValor.className = 'valor-transacao ' + (transacao.tipo === 'receita' ? 'positivo' : 'negativo');
    spanValor.textContent = formatarValor(transacao.valor);

    const spanTipo = document.createElement('span');
    // Ternário para definir classe de estilo com base no tipo (receita ou despesa)
    spanTipo.className = 'etiqueta ' + (transacao.tipo === 'receita' ? 'etiqueta-receita' : 'etiqueta-despesa');
    spanTipo.textContent = transacao.tipo;

    const spanCategoria = document.createElement('span');
    spanCategoria.className = 'categoria-transacao';
    spanCategoria.textContent = transacao.categoria;


    // Criar botão remover
    const btnRemover = criarBotaoRemover(transacao.id);

    // Adicionar todos ao itemTransacao
    itemTransacao.appendChild(spanData);
    itemTransacao.appendChild(spanDescricao);
    itemTransacao.appendChild(spanValor);
    itemTransacao.appendChild(spanTipo);
    itemTransacao.appendChild(spanCategoria);
    itemTransacao.appendChild(btnRemover);

    return itemTransacao;
}

// Criar botão de remover para cada transação
function criarBotaoRemover(id) {
    const btn = document.createElement('button');
    btn.className = 'btn-remover';
    btn.dataset.id = id;
    btn.title = 'Remover transação';
    btn.textContent = '×';
    btn.addEventListener('click', () => {
        if (confirm('Tem certeza que deseja remover esta transação?')) {
            removerTransacao(id);
            const transacoesAtualizadas = getTransacoes();
            renderizarTransacoes(transacoesAtualizadas);
            const saldo = calcularSaldo(transacoesAtualizadas);
            const receitas = calcularReceitas(transacoesAtualizadas);
            const despesas = calcularDespesas(transacoesAtualizadas);
            atualizarCards(saldo, receitas, despesas);
        }
    });
    return btn;
}

// 4) Atualizar os cards com os valores calculados.
export function atualizarCards(saldo, receitas, despesas) {
    // Seleciona os elementos dos valores nos cards
    const cards = document.querySelectorAll('.card');
    const valorSaldo = cards[0].querySelector('.valor');
    const valorReceitas = cards[1].querySelector('.valor');
    const valorDespesas = cards[2].querySelector('.valor');

    // Formata valores em moeda
    const saldoFormatado = formatarValor(saldo);
    const receitasFormatadas = formatarValor(receitas);
    const despesasFormatadas = formatarValor(despesas);

    // Atualiza o conteúdo dos cards
    valorSaldo.textContent = saldoFormatado;
    valorReceitas.textContent = receitasFormatadas;
    valorDespesas.textContent = despesasFormatadas;

    // Atualiza cor do saldo (verde se positivo, amarelo se negativo)
    if (saldo >= 0) {
        valorSaldo.className = 'valor';
    } else {
        valorSaldo.className = 'valor expense-color';
    }
}
