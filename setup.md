# Preparação do ambiente TypeScript

## 1. Criar o repositório do projeto

* Criar um repositório no GitHub (ex: `dashboard-financeiro-pessoal-ts`).
* Clonar o repositório para a máquina local.

## 2. Inicializar o projeto

Dentro da pasta do projeto, inicialize o Node.js usando o comando:

```bash
npm init -y

```

* **-y**: Aceita as configurações padrão sem solicitar perguntas, criando o `package.json`.

No arquivo `package.json`, adicione o campo `type` para permitir o uso de Módulos ES (ES Modules) nativos:

```json
{
  "name": "dashboard-financeiro-pessoal-ts",
  "version": "1.0.0",
  "type": "module"
}

```

## 3. Instalar as dependências do TypeScript

Instale o compilador como dependência de desenvolvimento usando o comando:

```bash
npm install typescript --save-dev

```

* **--save-dev**: Indica que a dependência atua apenas no desenvolvimento (transpilando o código) e não será enviada para o ambiente final de produção.

## 4. Inicializar o TypeScript

Crie o arquivo de regras do TypeScript rodando:

```bash
npx tsc --init

```

Isso criará o arquivo `tsconfig.json`.

## 5. Configurar o `tsconfig.json`

Dentro do `tsconfig.json`, certifique-se de configurar e descomentar as seguintes opções para organizar as pastas e garantir que o TypeScript entenda o ambiente do navegador:

```json
{
  "compilerOptions": {
    /* Mapeamento de Pastas */
    "rootDir": "./src",
    "outDir": "./dist",

    /* Ambiente do Navegador */
    "lib": ["esnext", "dom"],

    /* Limpeza de Saída (Opcional - para gerar apenas os arquivos .js essenciais) */
    "sourceMap": false,
    "declaration": false,
    "declarationMap": false
  }
}

```

## 6. Regras Práticas de Integração

* **No HTML:** O arquivo JavaScript final deve ser importado da pasta `dist` com o atributo de módulo.

```html
<script type="module" src="./dist/app.js"></script>

```

* **Nos arquivos .ts (Imports):** Ao importar funções de outros arquivos TypeScript, utilize a extensão `.js` no caminho, pois o compilador não altera o texto dos imports para o navegador.

```typescript
import { minhaFuncao } from './utils.js';

```

## 7. Compilar o Código

Sempre que quiser atualizar o JavaScript final, rode o compilador no terminal:

```bash
npx tsc

```

## 8. Criar o .gitignore

Crie um arquivo `.gitignore` na raiz do projeto e adicione a pasta `dist` e a pasta `node_modules` para evitar que arquivos gerados e dependências sejam enviados para o repositório:

```bash
dist/
node_modules/
```

## 9. Commit Inicial

Faça um commit inicial com a configuração do TypeScript:

```bash
git add .
git commit -m "Configuração inicial do TypeScript"
git push origin main
```
