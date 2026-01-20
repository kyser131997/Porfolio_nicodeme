document.addEventListener('DOMContentLoaded', () => {
    // SUPABASE CONFIG
    const SUPABASE_URL = 'https://ovocrcrkrnggevzzgqgq.supabase.co';
    const SUPABASE_KEY = 'sb_publishable_PPQyKeDyTRg77nOzg2WXGA_rsCDcD6V';

    let supabase = null;
    const initSupabase = () => {
        if (window.supabase && !supabase) {
            supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
            return true;
        }
        return !!supabase;
    };
    initSupabase();

    let currentProject = null;
    let currentImgIndex = 0;
    let activeFilter = 'all';
    let searchQuery = '';
    let currentSort = 'recent';

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
            renderEducation();
        }

        initTheme();
        initMobileNav();
        initScrollEffects();
        initProjectModals();
        initLightbox();
        initSearchAndFilters();
        setupIntersectionObserver();

        // Initialisation immédiate de l'analytics
        if (initSupabase()) {
            initAnalytics();
        }

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

        let filteredProjects = window.portfolioData.projects.filter(p => {
            const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.shortDescription.fr.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.stack.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

            const matchesFilter = activeFilter === 'all' || p.stack.includes(activeFilter);

            return matchesSearch && matchesFilter;
        });

        // Sorting
        filteredProjects.sort((a, b) => {
            if (currentSort === 'recent') return b.id - a.id;
            return a.id - b.id;
        });

        container.innerHTML = filteredProjects.map(p => `
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

        // Trigger intersection observer for new items
        setupIntersectionObserver();
    }

    function initSearchAndFilters() {
        const searchInput = document.getElementById('project-search');
        const filterContainer = document.getElementById('filter-container');
        const sortSelect = document.getElementById('project-sort');

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                searchQuery = e.target.value;
                renderProjects();
            });
        }

        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                currentSort = e.target.value;
                renderProjects();
            });
        }

        // Generate dynamic tags
        const allStacks = new Set();
        window.portfolioData.projects.forEach(p => p.stack.forEach(s => allStacks.add(s)));

        // Pick top 5-6 most common or interesting tags to avoid clutter
        const topTags = Array.from(allStacks).slice(0, 8);

        if (filterContainer) {
            filterContainer.innerHTML = `<button class="tag ${activeFilter === 'all' ? 'active' : ''}" data-filter="all">Tous</button>` +
                topTags.map(tag => `<button class="tag ${activeFilter === tag ? 'active' : ''}" data-filter="${tag}">${tag}</button>`).join('');

            filterContainer.addEventListener('click', (e) => {
                if (e.target.classList.contains('tag')) {
                    document.querySelectorAll('.filter-tags .tag').forEach(t => t.classList.remove('active'));
                    e.target.classList.add('active');
                    activeFilter = e.target.dataset.filter;
                    renderProjects();
                }
            });
        }
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

    function renderEducation() {
        const eduContainer = document.getElementById('education-container');
        const certContainer = document.getElementById('certifications-container');
        const data = window.portfolioData;

        if (eduContainer) {
            eduContainer.innerHTML = data.formation.map(edu => `
                <div class="edu-card reveal">
                    <div class="edu-icon">🎓</div>
                    <div class="edu-details">
                        <h4>${edu.degree.fr}</h4>
                        <p class="school-name">${edu.school}</p>
                        <span class="edu-period">${edu.period}</span>
                        <p class="edu-info">${typeof edu.details === 'object' ? edu.details.fr : edu.details}</p>
                    </div>
                </div>
            `).join('');
        }

        if (certContainer) {
            certContainer.innerHTML = data.certifications.map(cert => `
                <div class="cert-card reveal">
                    <div class="cert-icon">🏆</div>
                    <div class="cert-details">
                        <span class="cert-name">${cert.name}</span>
                        <span class="cert-year">${cert.year}</span>
                    </div>
                </div>
            `).join('');
        }
    }

    // --- LOGIC FUNCTIONS ---
    async function initAnalytics() {
        if (!supabase) return;

        let visitorId = localStorage.getItem('supabase_visitor_id');
        if (!visitorId) {
            visitorId = 'vis_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
            localStorage.setItem('supabase_visitor_id', visitorId);
        }

        // Utilisation du LocalStorage pour ne logger l'utilisateur qu'une seule fois à vie (ou jusqu'au nettoyage du cache)
        const logFlag = 'supabase_visitor_logged';
        if (!localStorage.getItem(logFlag)) {
            try {
                const { error } = await supabase.from('visits').insert([{
                    visitor_id: visitorId,
                    user_agent: navigator.userAgent
                }]);

                if (!error) {
                    localStorage.setItem(logFlag, 'true');
                    console.log("Analytics: Premier passage enregistré !");
                }
            } catch (err) {
                console.error("Analytics Exception:", err);
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
            ${project.video ? `
                <div class="modal-video-section">
                    <div class="video-container" id="modal-video-wrapper">
                        <video class="main-video" autoplay muted loop playsinline controls>
                            <source src="${project.video}" type="video/mp4">
                            Votre navigateur ne supporte pas la lecture de vidéos.
                        </video>
                        <div class="media-expand-btn video-expand">🔍</div>
                    </div>
                </div>
            ` : ''}
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
                        ${project.links.github !== '#' ? `<a href="${project.links.github}" target="_blank" class="btn btn-primary">Code GitHub</a>` : ''}
                        ${project.links.demo && project.links.demo !== '#' ? `<a href="${project.links.demo}" target="_blank" class="btn btn-secondary">Démo Live</a>` : ''}
                    </div>
                </div>
            </div>
        `;
    }

    function initLightbox() {
        const lb = document.getElementById('lightbox');
        const lbImg = document.getElementById('lightbox-img');
        const lbVideoContainer = document.getElementById('lightbox-video-container');
        if (!lb || !lbImg) return;

        document.addEventListener('click', (e) => {
            // Check for image expand or main image click
            if (e.target.classList.contains('main-modal-img') || (e.target.classList.contains('media-expand-btn') && !e.target.classList.contains('video-expand'))) {
                lbImg.style.display = 'block';
                lbVideoContainer.style.display = 'none';
                lbImg.src = currentProject.images[currentImgIndex];
                lb.classList.add('active');
                lbImg.classList.remove('zoomed');
            }

            // Check for video expand
            if (e.target.closest('.video-expand') || e.target.classList.contains('main-video')) {
                lbImg.style.display = 'none';
                lbVideoContainer.style.display = 'block';
                lbVideoContainer.innerHTML = `
                    <video controls autoplay class="lightbox-video">
                        <source src="${currentProject.video}" type="video/mp4">
                    </video>
                `;
                lb.classList.add('active');
            }

            if (e.target.id === 'lightbox-next' || e.target.closest('#lightbox-next')) {
                navigateLightbox(1);
            }
            if (e.target.id === 'lightbox-prev' || e.target.closest('#lightbox-prev')) {
                navigateLightbox(-1);
            }

            // Zoom toggle for image only
            if (e.target === lbImg) {
                lbImg.classList.toggle('zoomed');
            }

            if (e.target.classList.contains('lightbox-close') || (e.target === lb && !e.target.closest('.lightbox-content'))) {
                lb.classList.remove('active');
                lbImg.classList.remove('zoomed');
                lbVideoContainer.innerHTML = ''; // Stop video
            }
        });

        function navigateLightbox(step) {
            navigateImages(step);
            lbImg.style.display = 'block';
            lbVideoContainer.style.display = 'none';
            lbVideoContainer.innerHTML = '';
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
