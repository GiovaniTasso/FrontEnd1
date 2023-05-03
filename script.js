const BASE_URL = 'http://localhost:8080/cliente';

document.getElementById('btn-cadastrar').addEventListener('click', cadastrarCliente);
document.getElementById('btn-buscar').addEventListener('click', buscarCliente);

function formatarCpf(cpf) {
	return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

async function cadastrarCliente() {
	const nome = document.getElementById('nome').value;
	const cpf = document.getElementById('cpf').value;
	const profissao = document.getElementById('profissao').value;
	const endereco = document.getElementById('endereco').value;

	

	const data = { nome, cpf, profissao, endereco };

	try {
		const response = await fetch(BASE_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});

		const cliente = await response.json();

		alert(`Cliente cadastrado com sucesso! ID: ${cliente.id}`);
	} catch (error) {
		console.error(error);
		alert('Erro ao cadastrar cliente!');
	}
}
async function buscarCliente() {
    const id = document.getElementById('id').value;

    try {
        const response = await fetch(`${BASE_URL}/${id}`);
        const cliente = await response.json();
        const resultadoDiv = document.getElementById('resultado');

        resultadoDiv.innerHTML = `
            <p>ID: ${cliente.id}</p>
            <p>Nome: ${cliente.nome}</p>
            <p>CPF: ${formatarCpf(cliente.cpf)}</p>
            <p>Profissão: ${cliente.profissao}</p>
            <p>Endereço: ${cliente.endereco}</p>
        `;
    } catch (error) {
        console.error(error);
        alert('Erro ao buscar cliente!');
    }
}


