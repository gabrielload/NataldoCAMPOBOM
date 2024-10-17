<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Doação</title>
    <style>
        /* Adicione seu CSS aqui para estilizar o modal e outros elementos */
        #donationModal {
            display: none; /* Oculta o modal inicialmente */
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            justify-content: center;
            align-items: center;
        }
        .hidden {
            display: none;
        }
    </style>
</head>
<body>

<!-- Botão para abrir o modal -->
<div class="volunteer-section">
    <button class="cta-button">Apoie o Natal</button>
</div>

<!-- Modal -->
<div id="donationModal">
    <div class="modal-content">
        <span class="close-button">&times;</span>
        <h2>Doação</h2>
        
        <!-- Formulários de doação -->
        <div>
            <button id="pixButton">Doar via PIX</button>
            <button id="materialsButton">Doar Materiais</button>
        </div>
        
        <form id="pixForm" class="hidden">
            <input type="text" id="name" placeholder="Seu Nome" required>
            <input type="email" id="email" placeholder="Seu Email" required>
            <input type="tel" id="phone" placeholder="Seu Telefone" required>
            <input type="hidden" id="donationType" value="PIX">
            <button type="submit">Enviar</button>
        </form>
        
        <form id="materialsForm" class="hidden">
            <input type="text" id="nameMaterials" placeholder="Seu Nome" required>
            <input type="email" id="emailMaterials" placeholder="Seu Email" required>
            <input type="tel" id="phoneMaterials" placeholder="Seu Telefone" required>
            <input type="hidden" id="donationTypeMaterials" value="Materiais">
            <button type="submit">Enviar</button>
        </form>
    </div>
</div>

<script>
    // Função para enviar dados do formulário
    function submitForm(event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        // Captura os dados do formulário
        const name = document.getElementById('name').value || document.getElementById('nameMaterials').value;
        const email = document.getElementById('email').value || document.getElementById('emailMaterials').value;
        const phone = document.getElementById('phone').value || document.getElementById('phoneMaterials').value;
        const donationType = document.getElementById('donationType').value || document.getElementById('donationTypeMaterials').value;

        // URL do Google Apps Script
        const scriptURL = 'https://script.google.com/macros/s/AKfycbzVpy22ORm3mZRIQej3U0KeKZJHryx8aWEflfTglEST/dev';

        // Dados que serão enviados
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('donationType', donationType);

        // Envia os dados usando fetch()
        fetch(scriptURL, { method: 'POST', body: formData })
            .then(response => response.json())
            .then(response => {
                alert('Formulário enviado com sucesso!');
                document.getElementById('pixForm').reset(); // Limpa o formulário
                document.getElementById('materialsForm').reset(); // Limpa o formulário
                donationModal.style.display = "none"; // Fecha o modal
            })
            .catch(error => {
                alert('Ocorreu um erro ao enviar o formulário.');
                console.error('Erro:', error);
            });
    }

    // Abre o modal ao clicar no botão "Apoie o natal"
    document.querySelector(".volunteer-section .cta-button").addEventListener("click", function() {
        donationModal.style.display = "block";
    });

    // Fecha o modal ao clicar no botão de fechar
    const closeButton = document.querySelector(".close-button");
    closeButton.addEventListener("click", function() {
        donationModal.style.display = "none";
    });

    // Fecha o modal ao clicar fora do modal
    window.addEventListener("click", function(event) {
        if (event.target === donationModal) {
            donationModal.style.display = "none";
        }
    });

    // Alterna entre os formulários de doação
    document.getElementById("pixButton").addEventListener("click", function() {
        document.getElementById("materialsForm").classList.add("hidden");
        document.getElementById("pixForm").classList.remove("hidden");
    });

    document.getElementById("materialsButton").addEventListener("click", function() {
        document.getElementById("pixForm").classList.add("hidden");
        document.getElementById("materialsForm").classList.remove("hidden");
    });

    // Fecha o modal ao submeter o formulário
    document.querySelectorAll("form").forEach(form => {
        form.addEventListener("submit", submitForm);
    });
</script>

</body>
</html>
