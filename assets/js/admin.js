document.addEventListener('DOMContentLoaded', async () => {
    /* SUPABASE CONFIG */
    const SUPABASE_URL = 'https://ovocrcrkrnggevzzgqgq.supabase.co';
    const SUPABASE_KEY = 'sb_publishable_PPQyKeDyTRg77nOzg2WXGA_rsCDcD6V';

    // Initialisation sécurisée
    let supabase = null;
    if (window.supabase) {
        supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    }

    const messagesContainer = document.getElementById('messages-container');
    const clearBtn = document.getElementById('clear-all');

    async function loadDashboard() {
        if (!supabase) return;

        /* 1. ANALYTICS */
        try {
            let { data: visitsData, error: vsError } = await supabase
                .from('visits')
                .select('visitor_id, user_agent');

            let isColumnMissing = false;
            if (vsError) {
                isColumnMissing = true;
                const { data: simpleData, error: sError } = await supabase.from('visits').select('visitor_id');
                if (!sError) visitsData = simpleData;
            }

            const uniqueVisitors = new Set(visitsData?.map(v => v.visitor_id)).size;

            // Appareils
            const deviceMap = {};
            visitsData?.forEach(v => {
                const ua = v.user_agent || "";
                if (!ua) {
                    const label = "❓ Appareil non détecté (ancienne visite)";
                    if (!deviceMap[label]) deviceMap[label] = new Set();
                    deviceMap[label].add(v.visitor_id);
                    return;
                }

                let os = "Autre", browser = "Inconnu", brand = "";
                if (ua.includes("Windows")) os = "💻 Windows";
                else if (ua.includes("iPhone")) { os = "📱 iPhone"; brand = "Apple"; }
                else if (ua.includes("iPad")) { os = "📱 iPad"; brand = "Apple"; }
                else if (ua.includes("Android")) {
                    os = "📱 Android";
                    if (ua.includes("Samsung") || ua.includes("SM-")) brand = "Samsung";
                    else if (ua.includes("Huawei")) brand = "Huawei";
                    else if (ua.includes("Xiaomi") || ua.includes("Mi ")) brand = "Xiaomi";
                    else if (ua.includes("Pixel")) brand = "Google Pixel";
                    else brand = "Smartphone";
                }
                else if (ua.includes("Macintosh")) { os = "💻 MacOS"; brand = "Apple"; }
                else if (ua.includes("Linux")) os = "💻 Linux";

                if (ua.includes("Edg/")) browser = "Edge";
                else if (ua.includes("Chrome/") && !ua.includes("OPR") && !ua.includes("Edg")) browser = "Chrome";
                else if (ua.includes("Firefox/")) browser = "Firefox";
                else if (ua.includes("Safari/") && !ua.includes("Chrome")) browser = "Safari";

                const label = brand ? `${os} (${brand}) - ${browser}` : (os !== "Autre" ? `${os} - ${browser}` : `❓ Inconnu: ${ua.substring(0, 15)}...`);
                if (!deviceMap[label]) deviceMap[label] = new Set();
                deviceMap[label].add(v.visitor_id);
            });

            const devicesContainer = document.getElementById('devices-container');
            if (devicesContainer) {
                if (isColumnMissing) {
                    devicesContainer.innerHTML = '<tr><td colspan="2" style="padding:2rem;text-align:center;color:#f59e0b;">⚠️ Colonne "user_agent" manquante sur Supabase.</td></tr>';
                } else {
                    devicesContainer.innerHTML = Object.entries(deviceMap).sort((a, b) => b[1].size - a[1].size).map(([n, s]) => `
                        <tr style="border-bottom: 1px solid var(--border);">
                            <td style="padding:1rem 0;">${n}</td>
                            <td style="padding:1rem 0;text-align:right;font-weight:700;">${s.size}</td>
                        </tr>
                    `).join('') || '<tr><td colspan="2" style="padding:2rem;text-align:center;opacity:0.5;">Aucun appareil détecté.</td></tr>';
                }
            }

            document.getElementById('stat-visitors').textContent = uniqueVisitors;
            document.getElementById('stat-views').textContent = uniqueVisitors;
            document.getElementById('stat-projects').textContent = window.portfolioData ? window.portfolioData.projects.length : 0;

        } catch (err) { console.error("Stats error", err); }

        /* 2. MESSAGES */
        try {
            const { data: messages, error: mError } = await supabase
                .from('messages')
                .select('*')
                .order('created_at', { ascending: false });

            if (mError) throw mError;

            if (messagesContainer) {
                if (!messages || messages.length === 0) {
                    messagesContainer.innerHTML = '<div class="empty-state"><h3>Aucun message reçu.</h3></div>';
                } else {
                    messagesContainer.innerHTML = messages.map(msg => `
                        <div class="message-card">
                            <div class="message-meta">
                                <span><strong>${msg.name}</strong> (${msg.email})</span>
                                <span>${new Date(msg.created_at).toLocaleString('fr-FR')}</span>
                            </div>
                            <div class="message-body">${msg.message}</div>
                            <div style="margin-top:1rem; text-align:right;">
                                <button class="btn-delete-msg" data-id="${msg.id}" style="background:#ef4444; color:white; border:none; padding:5px 12px; border-radius:4px; cursor:pointer; font-size:0.8rem;">
                                    Supprimer
                                </button>
                            </div>
                        </div>
                    `).join('');
                }
            }
        } catch (err) {
            console.error("Messages error", err);
            if (messagesContainer) messagesContainer.innerHTML = `<p style="color:red;padding:2rem;">Erreur Cloud: ${err.message}</p>`;
        }
    }

    // GESTION SUPPRESSION (Délégation sur DOCUMENT pour être sûr)
    document.addEventListener('click', async (e) => {
        const btn = e.target.closest('.btn-delete-msg');
        if (!btn) return;

        const msgId = btn.getAttribute('data-id');
        if (confirm("Voulez-vous vraiment supprimer ce message ?")) {
            try {
                const { error } = await supabase
                    .from('messages')
                    .delete()
                    .eq('id', parseInt(msgId));

                if (error) {
                    alert("Erreur lors de la suppression Cloud: " + error.message);
                } else {
                    loadDashboard();
                }
            } catch (ex) {
                alert("Exception lors de la suppression: " + ex.message);
            }
        }
    });

    // EFFACER TOUT
    if (clearBtn) {
        clearBtn.addEventListener('click', async () => {
            if (confirm("Voulez-vous effacer TOUS les messages ?")) {
                const { error } = await supabase.from('messages').delete().neq('id', 0);
                if (error) alert("Erreur: " + error.message);
                else loadDashboard();
            }
        });
    }

    // Premier chargement
    loadDashboard();
});
