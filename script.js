document.addEventListener('DOMContentLoaded', () => {
    const addEmpresaForm = document.getElementById('addEmpresaForm');
    const updateEmpresaForm = document.getElementById('updateEmpresaForm');
    const deleteEmpresaForm = document.getElementById('deleteEmpresaForm');

    // Adicionar Empresa
    addEmpresaForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const idEmpresa = document.getElementById('addEmpresa').value;
        const nome = document.getElementById('addNome').value;
        const cnpj = document.getElementById('addcnpj').value;
        const contato = document.getElementById('addContato').value;

        console.log('Dados do formulário de adição:', idEmpresa, nome, cnpj, contato);

        try {
            const response = await fetch('http://localhost:3000/addEmpresa', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ idEmpresa, nome, cnpj, contato })
            });

            const result = await response.text();
            document.getElementById('addResult').innerText = result;
        } catch (error) {
            console.error('Erro ao adicionar empresa:', error);
        }

        addEmpresaForm.reset();
    });

    // Atualizar Empresa
    updateEmpresaForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const idEmpresa = document.getElementById('updateIDempresa').value;
        const nome = document.getElementById('updateNome').value;
        const cnpj = document.getElementById('updateCNPJ').value;
        const contato = document.getElementById('updateContato').value;

        console.log('Dados do formulário de atualização:', idEmpresa, nome, cnpj, contato);

        try {
            const response = await fetch('http://localhost:3000/updateEmpresa', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ idEmpresa, nome, cnpj, contato })
            });

            const result = await response.text();
            document.getElementById('updateResult').innerText = result;
        } catch (error) {
            console.error('Erro ao atualizar empresa:', error);
        }

        updateEmpresaForm.reset();
    });

    // Deletar Empresa
    deleteEmpresaForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const idEmpresa = document.getElementById('deleteidempresa').value;

        console.log('ID da empresa a ser deletada:', idEmpresa);

        try {
            const response = await fetch('http://localhost:3000/deleteEmpresa', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ idEmpresa })
            });

            const result = await response.text();
            document.getElementById('deleteResult').innerText = result;
        } catch (error) {
            console.error('Erro ao deletar empresa:', error);
        }

        deleteEmpresaForm.reset();
    });
});

function openTab(tabName) {
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach((tab) => {
        tab.classList.remove('active');
    });

    const selectedTab = document.getElementById(tabName);
    selectedTab.classList.add('active');
}
