const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function pedirNum1() {
    rl.question('Digite o primeiro número: ' , (input) => {
        const num1 = parseFloat(input.trim());

        if (isNaN(num1)) {
            console.log('Erro: digite apenas números!\n');
            pedirNum1();
        } else {
            pedirNum2(num1);
        }
    });
}

function pedirNum2(num1) {
    rl.question('Digite o segundo número: ' , (input) => {
        const num2 = parseFloat(input.trim());

        if (isNaN(num2)){
            console.log('Erro: digite apenas números!\n');
            pedirNum2
        } else {
            pedirOperador(num1, num2);
        }
    });
}

function pedirOperador(num1, num2) {
    rl.question('Digite o operador (+, -, *, /): ' , (input) => {
    const operador = input.trim();
    let resultado;

    switch (operador){
        case '+':
            resultado = num1 + num2;
            break;
        case '-':
            resultado = num1 - num2;
            break;
        case '*':
            resultado = num1 * num2;
            break;
        case '/':
            if (num1 === 0){
                console.log('Erro, divisão por 0 não é permitida!\n')
                pedirNum2;
                return;
            }
            resultado = num1 / num2;
            break;
        default:
            console.log('Erro: Operador inválido! Use apenas +, -, * ou /.\n');
            pedirOperador();
            return;
    }
    const resultadoFormatado = Number.isInteger(resultado) ? resultado : resultado.toFixed(2);
    console.log(`\n--- RESULTADO ---`);
    console.log(`Operação: ${num1} ${operador} ${num2} = ${resultadoFormatado}`);

    novoCalculo();
  });
}

function novoCalculo() {
    rl.question('Deseja fazer outra operação? (s/n)\n' , (input) => {
        const resposta = input.trim().toLocaleLowerCase();

        if (resposta === 's' || resposta === 'sim') {
      console.log('\n===================================');
      pedirNum1();
    } else if (resposta === 'n' || resposta === 'nao' || resposta === 'não') {
      console.log('Obrigado por usar a calculadora! Encerrando...');
      rl.close();
    } else {
      console.log('Opção inválida! Digite "s" para sim ou "n" para não.');
      perguntarNovoCalculo();
    }
  });
}

pedirNum1();