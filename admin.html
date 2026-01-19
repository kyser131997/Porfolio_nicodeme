document.addEventListener('DOMContentLoaded', async () => {
    // SUPABASE CONFIG
    const SUPABASE_URL = 'https://ovocrcrkrnggevzzgqgq.supabase.co';
    const SUPABASE_KEY = 'sb_publishable_PPQyKeDyTRg77nOzg2WXGA_rsCDcD6V';
    const supabase = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY) : null;

    const messagesContainer = document.getElementById('messages-container');
    const clearBtn = document.getElementById('clear-all');

    if (!supabase) {
        console.error("Supabase client not found");
        return;
    }

    async function loadDashboard() {
        // 1. ANALYTICS (DEPUIS LE CLOUD)
        try {
            // Récupération de toutes les visites pour calculer les uniques et le total
            const { data: visitsData, error: vsError } = await supabase
                .from('visits')
                .select('visitor_id');

            if (vsError) throw vsError;

            const totalSessions = visitsData ? visitsData.length : 0;
            const uniqueVisitors = new Set(visitsData?.map(v => v.visitor_id)).size;

            document.getElementById('stat-visitors').textContent = uniqueVisitors;
            document.getElementById('stat-views').textContent = totalSessions;

            // Nombre de projets (local)
            const projectCount = window.portfolioData ? window.portfolioData.projects.length : 0;
            document.getElementById('stat-projects').textContent = projectCount;

        } catch (err) {
            console.error("Error loading analytics", err);
        }

        // 2. MESSAGES (DEPUIS LE CLOUD)
        try {
            const { data: messages, error: mError } = await supabase
                .from('messages')
                .select('*')
                .order('created_at', { ascending: false });

            if (mError) throw mError;

            if (!messages || messages.length === 0) {
                messagesContainer.innerHTML = '<div class="empty-state"><h3>Aucun message pour le moment.</h3></div>';
            } else {
                messagesContainer.innerHTML = messages.map(msg => `
                    <div class="message-card" data-id="${msg.id}">
                        <div class="message-meta">
                            <span><strong>${msg.name}</strong> (${msg.email})</span>
                            <span>${new Date(msg.created_at).toLocaleString('fr-FR')}</span>
                        </div>
                        <div class="message-body">${msg.message}</div>
                        <div style="margin-top: 1rem; text-align: right;">
                            <button class="btn-delete" onclick="deleteMessage(${msg.id})">Supprimer</button>
                        </div>
                    </div>
                `).join('');
            }
        } catch (err) {
            console.error("Error loading messages", err);
            const errorMsg = err.message || "Erreur inconnue";
            const errorCode = err.code || "";
            messagesContainer.innerHTML = `
                <div class="empty-state" style="color: #ef4444;">
                    <h3>Erreur de chargement</h3>
                    <p>${errorMsg} ${errorCode ? `(Code: ${errorCode})` : ''}</p>
                    <p style="font-size: 0.8rem; margin-top: 1rem;">Vérifiez que la table 'messages' existe et que l'accès public (RLS) est activé.</p>
                </div>`;
        }
    }

    // Fonction globale pour supprimer un message
    window.deleteMessage = async (id) => {
        if (confirm('Supprimer ce message définitivement du Cloud ?')) {
            const { error } = await supabase
                .from('messages')
                .delete()
                .eq('id', id);

            if (error) {
                alert("Erreur lors de la suppression");
            } else {
                loadDashboard();
            }
        }
    };

    if (clearBtn) {
        clearBtn.addEventListener('click', async () => {
            if (confirm('Voulez-vous vraiment effacer TOUS les messages du Cloud ?')) {
                const { error } = await supabase
                    .from('messages')
                    .delete()
                    .neq('id', 0); // Supprime tout

                if (error) alert("Erreur");
                else loadDashboard();
            }
        });
    }

    loadDashboard();
});
