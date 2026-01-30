document.addEventListener('DOMContentLoaded', () => {
    // SUPABASE CONFIG
    const SUPABASE_URL = 'https://ovocrcrkrnggevzzgqgq.supabase.co';
    const SUPABASE_KEY = 'sb_publishable_PPQyKeDyTRg77nOzg2WXGA_rsCDcD6V';
    const supabase = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY) : null;

    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = document.getElementById('contact-name').value;
            const email = document.getElementById('contact-email-input').value;
            const message = document.getElementById('contact-message').value;

            try {
                if (!supabase) throw new Error("Supabase client not initialized");

                const { error } = await supabase
                    .from('messages')
                    .insert([{ name, email, message }]);

                if (error) throw error;

                showToast('Votre message a été envoyé !', 'success');
                contactForm.reset();
            } catch (error) {
                console.error('Erreur Supabase:', error);

                // Fallback LocalStorage
                const existingMessages = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');
                existingMessages.push({ name, email, message, date: new Date().toISOString() });
                localStorage.setItem('portfolio_messages', JSON.stringify(existingMessages));

                showToast('Message enregistré localement !', 'success');
                contactForm.reset();
            }
        });
    }

    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <div class="toast-icon">${type === 'success' ? '✓' : '✕'}</div>
            <span class="toast-message">${message}</span>
        `;
        document.body.appendChild(toast);
        setTimeout(() => toast.classList.add('show'), 100);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 500);
        }, 4000);
    }
});
