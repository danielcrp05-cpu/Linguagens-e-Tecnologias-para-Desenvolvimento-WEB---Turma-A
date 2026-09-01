const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Digite o primeiro número: ', (num1Input) => {
  const num1 = parseFloat(num1Input);

  rl.question('Digite o segundo número: ', (num2Input) => {
    const num2 = parseFloat(num2Input);

    rl.question('Digite o operador (+, -, *, /): ', (operador) => {
      let resultado;
      let operacaoValida = true;

      switch (operador) {
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
          if (num2 === 0) {
            console.log('Erro: Divisão por zero não é permitida.');
            operacaoValida = false;
          } else {
            resultado = num1 / num2;
          }
          break;
        default:
          console.log('Erro: Operador inválido! Use apenas +, -, * ou /.');
          operacaoValida = false;
          break;
      }

      if (operacaoValida) {
        console.log(`Resultado: ${num1} ${operador} ${num2} = ${resultado}`);
      }
      
      rl.close();
    });
  });
});
