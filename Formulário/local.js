function preencherFormulario(endereco) {
    document.getElementById('endereco').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('ibge').value = endereco.ibge;
    document.getElementById('estado').value = endereco.uf;
    document.getElementById('ddd').value = endereco.ddd;
}

function limparFormulario(endereco) {
    document.getElementById('endereco').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('ibge').value = '';
    document.getElementById('estado').value = '';
    document.getElementById('ddd').value = '';
    document.getElementById('grama').innerHTML="";
}

function reticencias(endereco) {
    document.getElementById('endereco').value = "...";
    document.getElementById('bairro').value = "...";
    document.getElementById('cidade').value = "...";
    document.getElementById('ibge').value = "...";
    document.getElementById('estado').value = "...";
    document.getElementById('ddd').value = "...";
    document.getElementById('grama').innerHTML="";
}

const cepValido = (cep) => cep.length == 8 && /^[0-9]+$/.test(cep); 

async function cepp() {
    limparFormulario();
    const cep = document.getElementById('cep').value;
    const url = `http://viacep.com.br/ws/${cep}/json/`;
    if (cepValido(cep)) {
        reticencias();
        const dados = await fetch(url);
        const endereco = await dados.json();
        if (endereco.hasOwnProperty('erro')) {
            limparFormulario();
            document.getElementById('grama').innerHTML="CEP não encontrado!";
            document.forms["brita"]["cep"].classList.remove("correct");
            document.forms["brita"]["cep"].classList.add("error");
        } else {
            preencherFormulario(endereco);
            document.forms["brita"]["cep"].classList.remove("error");
            document.forms["brita"]["cep"].classList.add("correct");
        }
    } else {
        document.getElementById('grama').innerHTML="CEP incorreto!";
        document.forms["brita"]["cep"].classList.remove("correct");
        document.forms["brita"]["cep"].classList.add("error");
    }
    
    
}