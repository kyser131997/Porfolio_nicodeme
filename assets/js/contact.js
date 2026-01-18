document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');

    // Création du conteneur pour le toast s'il n'existe pas
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        document.body.appendChild(toastContainer);
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Récupération des données
            const name = document.getElementById('contact-name').value;
            const email = document.getElementById('contact-email-input').value;
            const message = document.getElementById('contact-message').value;
            const date = new Date().toISOString();

            const newMessage = {
                id: Date.now(),
                name,
                email,
                message,
                date
            };

            // Stockage Local
            try {
                const existingMessages = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');
                existingMessages.push(newMessage);
                localStorage.setItem('portfolio_messages', JSON.stringify(existingMessages));

                // Succès
                showToast('Votre message a été envoyé !', 'success');
                contactForm.reset();
            } catch (error) {
                console.error('Erreur lors de la sauvegarde du message:', error);
                showToast('Une erreur est survenue lors de l\'envoi.', 'error');
            }
        });
    }

    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <span class="toast-icon">${type === 'success' ? '✅' : '❌'}</span>
            <span class="toast-message">${message}</span>
        `;

        document.body.appendChild(toast);

        // Affichage
        setTimeout(() => toast.classList.add('show'), 100);

        // Suppression
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400);
        }, 3000);
    }
});
