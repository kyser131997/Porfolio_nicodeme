document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('messages-container');
    const clearBtn = document.getElementById('clear-all');

    function loadMessages() {
        // --- ANALYTICS ---
        const stats = JSON.parse(localStorage.getItem('portfolio_analytics') || '{"visitors":0, "views":0, "totalTime":0}');
        document.getElementById('stat-visitors').textContent = stats.visitors;
        document.getElementById('stat-views').textContent = stats.views;

        // Calcul durée moyenne
        const avgSec = stats.visitors > 0 ? Math.floor(stats.totalTime / stats.visitors) : 0;
        const mins = Math.floor(avgSec / 60);
        const secs = avgSec % 60;
        document.getElementById('stat-duration').textContent = mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
        // -----------------

        const messages = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');

        if (messages.length === 0) {
            container.innerHTML = '<div class="empty-state"><h3>Aucun message pour le moment.</h3></div>';
            return;
        }

        // Trier du plus récent au plus ancien
        messages.sort((a, b) => new Date(b.date) - new Date(a.date));

        container.innerHTML = messages.map(msg => `
            <div class="message-card" data-id="${msg.id}">
                <div class="message-meta">
                    <span><strong>${msg.name}</strong> (${msg.email})</span>
                    <span>${new Date(msg.date).toLocaleString('fr-FR')}</span>
                </div>
                <div class="message-body">${msg.message}</div>
                <div style="margin-top: 1rem; text-align: right;">
                    <button class="btn-delete" onclick="deleteMessage(${msg.id})">Supprimer</button>
                </div>
            </div>
        `).join('');
    }

    // Fonction globale pour être accessible via onclick
    window.deleteMessage = (id) => {
        if (confirm('Supprimer ce message ?')) {
            let messages = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');
            messages = messages.filter(m => m.id !== id);
            localStorage.setItem('portfolio_messages', JSON.stringify(messages));
            loadMessages();
        }
    };

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            if (confirm('Êtes-vous sûr de vouloir tout effacer ? Cette action est irréversible.')) {
                localStorage.removeItem('portfolio_messages');
                loadMessages();
            }
        });
    }

    loadMessages();
});
