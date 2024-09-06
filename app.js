import linuxCommands from './dados.js';

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('campo-pesquisa').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            pesquisar();
        }
    });

    // Adiciona um event listener para o botão
    document.getElementById('btn-pesquisar').addEventListener('click', pesquisar);
});

function pesquisar() {
    let termoPesquisa = document.getElementById('campo-pesquisa').value.trim().toLowerCase();
    let divResultados = document.getElementById('resultados-pesquisa');
    
    divResultados.innerHTML = ""; 
    divResultados.classList.remove('visible'); // Remove a visibilidade antes de verificar os resultados

    if (termoPesquisa === "") {
        divResultados.innerHTML = "<p>Por favor, digite um termo para pesquisar.</p>";
        return;
    }

    // Cria uma expressão regular para a pesquisa, tornando-a mais flexível
    let regex = new RegExp(termoPesquisa.split(' ').join('|'), 'i');

    let resultados = linuxCommands.filter(command => {
        return regex.test(command.command) ||
               regex.test(command.description);
    });

    if (resultados.length > 0) {
        resultados.forEach(resultado => {
            let div = document.createElement('div');
            div.classList.add('resultado-item');
            div.innerHTML = `
                <h3>${resultado.command}</h3>
                <p><strong>Descrição:</strong> ${resultado.description}</p>
            `;
            divResultados.appendChild(div);
        });
        divResultados.classList.add('visible'); // Adiciona a visibilidade se houver resultados
    } else {
        divResultados.innerHTML = "<p>Nada encontrado.</p>";
        divResultados.classList.add('visible'); // Mostra a caixa mesmo se não houver resultados
    }
}
