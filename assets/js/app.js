document.addEventListener('DOMContentLoaded', () => {
    // SUPABASE CONFIG
    const SUPABASE_URL = 'https://ovocrcrkrnggevzzgqgq.supabase.co';
    const SUPABASE_KEY = 'sb_publishable_PPQyKeDyTRg77nOzg2WXGA_rsCDcD6V';
    const supabase = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY) : null;

    let currentProject = null;
    let currentImgIndex = 0;

    // --- LOADER LOGIC ---
    const loader = document.getElementById('loader');
    const hideLoader = () => {
        if (loader) {
            loader.style.opacity = '0';
            loader.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
    };

    // --- INITIALIZATION ---
    try {
        if (window.portfolioData) {
            renderHero();
            renderAbout();
            renderProjects();
            renderExperience();
            renderSkills();
        }

        initTheme();
        initMobileNav();
        initScrollEffects();
        initProjectModals();
        initLightbox();
        setupIntersectionObserver();
        initAnalytics();
    } catch (error) {
        console.error("Initialization error:", error);
    } finally {
        hideLoader();
    }

    // --- RENDERING FUNCTIONS ---
    function renderHero() {
        const data = window.portfolioData.identity;
        const nameEl = document.getElementById('hero-name');
        const titleEl = document.getElementById('hero-title');
        const subtitleEl = document.getElementById('hero-subtitle');
        const badgeEl = document.getElementById('hero-badge');

        if (nameEl) nameEl.textContent = data.name;
        if (titleEl) titleEl.textContent = data.title.fr;
        if (subtitleEl) subtitleEl.textContent = data.subtitle.fr;
        if (badgeEl) badgeEl.textContent = data.availability.fr;
    }

    function renderAbout() {
        const data = window.portfolioData;
        const descEl = document.getElementById('about-desc');
        const locEl = document.getElementById('info-location');
        const emailEl = document.getElementById('info-email');
        const phoneEl = document.getElementById('info-phone');
        const langsEl = document.getElementById('info-langs');

        if (descEl) descEl.textContent = data.about.fr;
        if (locEl) locEl.textContent = data.identity.location;
        if (emailEl) emailEl.textContent = data.identity.email;
        if (phoneEl) phoneEl.textContent = data.identity.phone;
        if (langsEl) {
            langsEl.textContent = data.identity.languages.map(l => `${l.name.fr} (${l.level.fr})`).join(', ');
        }
    }

    function renderProjects() {
        const container = document.querySelector('.projects-grid');
        if (!container) return;

        container.innerHTML = window.portfolioData.projects.map(p => `
            <div class="project-card reveal" data-id="${p.id}">
                <div class="project-img" style="background-image: url('${p.images[0]}')"></div>
                <div class="project-info">
                    <h3>${p.title}</h3>
                    <p>${p.shortDescription.fr}</p>
                    <div class="project-tags">
                        ${p.stack.slice(0, 3).map(s => `<span class="badge-tag">${s}</span>`).join('')}
                    </div>
                </div>
            </div>
        `).join('');
    }

    function renderExperience() {
        const container = document.querySelector('.timeline');
        if (!container) return;

        container.innerHTML = window.portfolioData.experiences.map(exp => `
            <div class="timeline-item reveal">
                <span class="timeline-date">${exp.period}</span>
                <div class="timeline-content">
                    <h3>${exp.role.fr}</h3>
                    <p class="company">${exp.company} — ${exp.location}</p>
                    <ul class="timeline-tasks">
                        ${exp.tasks.fr.slice(0, 3).map(t => `<li>${t}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `).join('');
    }

    function renderSkills() {
        const container = document.querySelector('.skills-grid');
        if (!container) return;

        container.innerHTML = window.portfolioData.skills.map(skill => `
            <div class="skill-category reveal">
                <h3>${skill.category.fr}</h3>
                <div class="skill-items">
                    ${skill.items.map(item => `<span class="tag">${item}</span>`).join('')}
                </div>
            </div>
        `).join('');
    }

    // --- LOGIC FUNCTIONS ---
    async function initAnalytics() {
        if (!supabase) return;

        let visitorId = localStorage.getItem('supabase_visitor_id');
        if (!visitorId) {
            visitorId = 'vis_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
            localStorage.setItem('supabase_visitor_id', visitorId);
        }

        if (!sessionStorage.getItem('supabase_visit_logged')) {
            try {
                const { error } = await supabase.from('visits').insert([{ visitor_id: visitorId }]);
                if (!error) {
                    sessionStorage.setItem('supabase_visit_logged', 'true');
                }
            } catch (err) {
                console.error("Analytics Error", err);
            }
        }
    }

    function initTheme() {
        const themeToggle = document.getElementById('theme-toggle');
        if (!themeToggle) return;
        const body = document.body;
        const savedTheme = localStorage.getItem('theme') || 'dark';
        body.setAttribute('data-theme', savedTheme);
        themeToggle.addEventListener('click', () => {
            const newTheme = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    function initMobileNav() {
        const toggle = document.querySelector('.mobile-menu-toggle');
        const menu = document.querySelector('.nav-links');
        if (toggle && menu) {
            toggle.addEventListener('click', () => {
                toggle.classList.toggle('active');
                menu.classList.toggle('active');
            });
        }
    }

    function initScrollEffects() {
        const header = document.querySelector('.navbar');
        window.addEventListener('scroll', () => {
            if (header) {
                if (window.scrollY > 50) header.classList.add('scrolled');
                else header.classList.remove('scrolled');
            }
        });
    }

    function initProjectModals() {
        const modal = document.getElementById('project-modal');
        const modalBody = document.getElementById('modal-body');
        if (!modal || !modalBody) return;

        document.addEventListener('click', (e) => {
            const card = e.target.closest('.project-card');
            if (card) {
                const id = parseInt(card.dataset.id);
                currentProject = window.portfolioData.projects.find(p => p.id === id);
                if (currentProject) {
                    currentImgIndex = 0;
                    renderModalContent(currentProject, modalBody);
                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            }

            // Carousel navigation in modal
            if (e.target.closest('.modal-nav-arrow')) {
                const direction = e.target.closest('.modal-nav-arrow').dataset.dir;
                navigateImages(direction === 'next' ? 1 : -1);
            }

            // Thumbnail click in modal
            if (e.target.classList.contains('modal-img-thumb')) {
                const index = parseInt(e.target.dataset.index);
                setMainImage(index);
            }

            if (e.target.classList.contains('modal-close') || e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    function setMainImage(index) {
        currentImgIndex = index;
        const mainImg = document.querySelector('.main-modal-img');
        const thumbs = document.querySelectorAll('.modal-img-thumb');
        if (mainImg && currentProject) {
            mainImg.src = currentProject.images[currentImgIndex];
            thumbs.forEach((t, i) => {
                t.classList.toggle('active', i === currentImgIndex);
            });
        }
    }

    function navigateImages(step) {
        if (!currentProject) return;
        let newIndex = currentImgIndex + step;
        if (newIndex >= currentProject.images.length) newIndex = 0;
        if (newIndex < 0) newIndex = currentProject.images.length - 1;
        setMainImage(newIndex);
    }

    function renderModalContent(project, container) {
        container.innerHTML = `
            <div class="modal-grid">
                <div class="modal-gallery">
                    <div class="main-img-container">
                        <img src="${project.images[0]}" alt="${project.title}" class="main-modal-img">
                        <button class="modal-nav-arrow prev" data-dir="prev">‹</button>
                        <button class="modal-nav-arrow next" data-dir="next">›</button>
                        <div class="media-expand-btn">🔍</div>
                    </div>
                    <div class="thumb-nails">
                        ${project.images.map((img, i) => `<img src="${img}" class="modal-img-thumb ${i === 0 ? 'active' : ''}" data-index="${i}" alt="thumbnail">`).join('')}
                    </div>
                </div>
                <div class="modal-info">
                    <h2>${project.title}</h2>
                    <div class="meta-row">
                        <span><i class="far fa-calendar"></i> ${project.date || '2026'}</span>
                        <span><i class="fas fa-tag"></i> ${project.role.fr}</span>
                    </div>
                    <div class="modal-desc">
                        <h3>Description</h3>
                        <p>${project.fullDescription.fr.replace(/\n/g, '<br>')}</p>
                    </div>
                    <div class="modal-stack">
                        <h3>Technologies</h3>
                        <div class="tags">
                            ${project.stack.map(s => `<span class="tag">${s}</span>`).join('')}
                        </div>
                    </div>
                    <div class="modal-actions">
                        ${project.links.github !== '#' ? `<a href="${project.links.github}" target="_blank" class="btn btn-secondary">Code GitHub</a>` : ''}
                        ${project.links.demo && project.links.demo !== '#' ? `<a href="${project.links.demo}" target="_blank" class="btn btn-primary">Démo Live</a>` : ''}
                    </div>
                </div>
            </div>
        `;
    }

    function initLightbox() {
        const lb = document.getElementById('lightbox');
        const lbImg = document.getElementById('lightbox-img');
        if (!lb || !lbImg) return;

        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('main-modal-img') || e.target.classList.contains('media-expand-btn')) {
                lbImg.src = currentProject.images[currentImgIndex];
                lb.classList.add('active');
                lbImg.classList.remove('zoomed'); // Reset zoom
            }

            if (e.target.id === 'lightbox-next' || e.target.closest('#lightbox-next')) {
                navigateLightbox(1);
            }
            if (e.target.id === 'lightbox-prev' || e.target.closest('#lightbox-prev')) {
                navigateLightbox(-1);
            }

            // Zoom toggle
            if (e.target === lbImg) {
                lbImg.classList.toggle('zoomed');
            }

            if (e.target.classList.contains('lightbox-close') || (e.target === lb && e.target !== lbImg)) {
                lb.classList.remove('active');
                lbImg.classList.remove('zoomed');
            }
        });

        function navigateLightbox(step) {
            navigateImages(step);
            lbImg.src = currentProject.images[currentImgIndex];
            lbImg.classList.remove('zoomed');
        }
    }

    function setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('active');
            });
        }, { threshold: 0.1 });
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }
});
