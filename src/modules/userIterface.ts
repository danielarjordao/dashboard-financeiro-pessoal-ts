import { formatarData, formatarValor } from './utils.js';
import { removerTransacao, getTransacoes } from './state.js';
import { calcularSaldo, calcularReceitas, calcularDespesas } from './transactions.js';
import { TipoTransacao, type Transacao } from './types.js';

// Renderizar lista completa de transações
export function renderizarTransacoes(transacoes: Transacao[]): void {
    // 1) Selecionar o container da lista.
    const listaTransacoes = document.querySelector('.lista-transacoes') as HTMLElement;

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
    // Ordenar por data (mais recente primeiro) usando getTime() para matemática estrita
    transacoes.sort(function(a, b) {
        return new Date(b.data).getTime() - new Date(a.data).getTime();
    });

    transacoes.forEach(transacao => {
        const itemTransacao = criarElementoTransacao(transacao);
        listaTransacoes.appendChild(itemTransacao);
    });
}

// Criar elemento HTML de uma transação individual
function criarElementoTransacao(transacao: Transacao): HTMLElement {
    const itemTransacao = document.createElement('div');
    itemTransacao.classList.add('item-transacao');
    itemTransacao.dataset.id = String(transacao.id);

    // Criar os spans
    const spanData = document.createElement('span');
    spanData.className = 'data-transacao';
    spanData.textContent = formatarData(transacao.data);

    const spanDescricao = document.createElement('span');
    spanDescricao.className = 'descricao-transacao';
    spanDescricao.textContent = transacao.descricao;

    const spanValor = document.createElement('span');
    // Ternário utilizando o Enum para definir classe de cor
    spanValor.className = 'valor-transacao ' + (transacao.tipo === TipoTransacao.Receita ? 'positivo' : 'negativo');
    spanValor.textContent = formatarValor(transacao.valor);

    const spanTipo = document.createElement('span');
    // Ternário utilizando o Enum para definir classe de estilo
    spanTipo.className = 'etiqueta ' + (transacao.tipo === TipoTransacao.Receita ? 'etiqueta-receita' : 'etiqueta-despesa');

    // Capitaliza a primeira letra para ficar bonito na tela ("Receita" ou "Despesa")
    spanTipo.textContent = transacao.tipo.charAt(0).toUpperCase() + transacao.tipo.slice(1);

    const spanCategoria = document.createElement('span');
    spanCategoria.className = 'categoria-transacao';
    spanCategoria.textContent = transacao.categoria;

    // Criar botão remover garantindo que o ID é número
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

// Criar botão de remover para cada transação com ID estrito
function criarBotaoRemover(id: number): HTMLButtonElement {
    const btn = document.createElement('button');
    btn.className = 'btn-remover';
    btn.dataset.id = String(id);
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
export function atualizarCards(saldo: number, receitas: number, despesas: number): void {
    // Seleciona os elementos dos valores nos cards
    const cards = document.querySelectorAll('.card');

    let valorSaldo: HTMLElement;
    let valorReceitas: HTMLElement;
    let valorDespesas: HTMLElement;


    if (cards[0] !== undefined && cards[1] !== undefined && cards[2] !== undefined) {
        valorSaldo = cards[0].querySelector('.valor') as HTMLElement;
        valorReceitas = cards[1].querySelector('.valor') as HTMLElement;
        valorDespesas = cards[2].querySelector('.valor') as HTMLElement;

        // Formata valores em moeda
        const saldoFormatado = formatarValor(saldo);
        const receitasFormatadas = formatarValor(receitas);
        const despesasFormatadas = formatarValor(despesas);

        // Atualiza o conteúdo dos cards
        valorSaldo.textContent = saldoFormatado;
        valorReceitas.textContent = receitasFormatadas;
        valorDespesas.textContent = despesasFormatadas;

        // Atualiza cor do saldo (verde se positivo, amarelo/vermelho se negativo)
        if (saldo >= 0) {
            valorSaldo.className = 'valor';
        } else {
            valorSaldo.className = 'valor expense-color';
        }
    }
}
