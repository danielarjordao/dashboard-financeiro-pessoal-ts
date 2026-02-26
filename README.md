# Dashboard Financeiro Pessoal

Um aplicativo web de controle financeiro pessoal desenvolvido com foco em boas práticas de arquitetura, modularização e tipagem estrita.

**[Acessar a Aplicação ao Vivo (GitHub Pages)](https://danielarjordao.github.io/dashboard-financeiro-pessoal-ts/)**

## Funcionalidades

* **Registro de Transações:** Adicione receitas e despesas detalhadas (descrição, valor, data, categoria).
* **Cálculos Automáticos:** Atualização em tempo real do saldo total, despesas e receitas.
* **Persistência de Dados:** Utilização do `localStorage` para garantir que as informações não sejam perdidas ao fechar ou recarregar a página.
* **Validação Rigorosa:** Tratamento de erros e bloqueio de entradas inválidas no formulário (ex: datas futuras, letras em campos de valor, campos obrigatórios).
* **Segurança:** Manipulação de DOM defensiva para evitar vulnerabilidades como XSS.

## Tecnologias Utilizadas

* **TypeScript:** Interfaces, Enums, Type Narrowing e módulos para uma arquitetura segura.
* **JavaScript (ES6+):** Programação funcional (`filter`, `reduce`, `every`, `some`) e APIs nativas (`Intl.NumberFormat` para moedas).
* **HTML5 & CSS3:** Estrutura semântica e interface limpa.
