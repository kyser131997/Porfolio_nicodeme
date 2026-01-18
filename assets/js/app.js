// Use global portfolioData loaded from data.js
const portfolioData = window.portfolioData;

document.addEventListener('DOMContentLoaded', () => {
    // STATE
    let currentLang = localStorage.getItem('lang') || 'fr';
    let currentTheme = localStorage.getItem('theme') || 'dark';
    let currentProjectIndex = 0;
    let filteredProjects = [...portfolioData.projects];
    let activeTag = 'all';
    let searchString = '';

    // SELECTORS
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');
    const langToggle = document.getElementById('lang-toggle');
    const loader = document.getElementById('loader');
    const projectsContainer = document.getElementById('projects-container');
    const filterContainer = document.getElementById('filter-container');
    const searchInput = document.getElementById('project-search');
    const sortSelect = document.getElementById('project-sort');
    const resultsCount = document.getElementById('results-count');

    const timelineContainer = document.getElementById('timeline-container');
    const skillsContainer = document.getElementById('skills-container');
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    const closeModal = document.querySelector('.modal-close');
    const nextBtn = document.getElementById('modal-next');
    const prevBtn = document.getElementById('modal-prev');
    const navLinks = document.querySelectorAll('.nav-links a');
    const navbar = document.querySelector('.navbar');

    // LIGHTBOX SELECTORS
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxVideo = document.getElementById('lightbox-video-container');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');

    // INITIALIZATION
    init();

    function init() {
        setTheme(currentTheme);
        setLanguage(currentLang);
        renderAll();
        setupEventListeners();
        setupIntersectionObserver();

        // Hide loader
        setTimeout(() => {
            if (loader) {
                loader.style.opacity = '0';
                setTimeout(() => loader.style.display = 'none', 500);
            }
        }, 800);
    }

    // THEME & LANG
    function setTheme(theme) {
        body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        currentTheme = theme;
    }

    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('lang', lang);
        if (langToggle) langToggle.textContent = lang.toUpperCase();
        translateUI();
        renderAll(); // Re-render dynamic content
    }

    function translateUI() {
        const d = portfolioData.identity;
        // Hero
        const badge = document.getElementById('hero-badge');
        if (badge) badge.textContent = d.availability[currentLang];

        const hName = document.getElementById('hero-name');
        if (hName) hName.textContent = d.name;

        const hTitle = document.getElementById('hero-title');
        if (hTitle) hTitle.textContent = d.title[currentLang];

        const hSub = document.getElementById('hero-subtitle');
        if (hSub) hSub.textContent = d.subtitle[currentLang];

        // About
        const abHeading = document.getElementById('about-heading');
        if (abHeading) abHeading.textContent = currentLang === 'fr' ? 'À propos' : 'About Me';

        const abDesc = document.getElementById('about-desc');
        if (abDesc) abDesc.textContent = portfolioData.about[currentLang];

        const loc = document.getElementById('info-location');
        if (loc) loc.textContent = d.location;

        const mail = document.getElementById('info-email');
        if (mail) mail.textContent = d.email;

        const phone = document.getElementById('info-phone');
        if (phone) phone.textContent = d.phone;

        const langs = document.getElementById('info-langs');
        if (langs) langs.textContent = d.languages.map(l => `${l.name[currentLang]} (${l.level[currentLang]})`).join(', ');

        // Navbar
        const navMap = {
            home: { fr: 'Accueil', en: 'Home' },
            about: { fr: 'À propos', en: 'About' },
            projects: { fr: 'Projets', en: 'Projects' },
            experience: { fr: 'Expériences', en: 'Experience' },
            skills: { fr: 'Compétences', en: 'Skills' },
            contact: { fr: 'Contact', en: 'Contact' }
        };
        navLinks.forEach(link => {
            const key = link.getAttribute('data-nav');
            if (navMap[key]) link.textContent = navMap[key][currentLang];
        });

        // Other headings
        const updateText = (id, text) => {
            const el = document.getElementById(id);
            if (el) el.textContent = text;
        };

        updateText('projects-heading', currentLang === 'fr' ? 'Mes Projets' : 'My Projects');
        updateText('exp-heading', currentLang === 'fr' ? 'Expériences Professionnelles' : 'Professional Experience');
        updateText('skills-heading', currentLang === 'fr' ? 'Compétences' : 'Skills');
        updateText('edu-heading', currentLang === 'fr' ? 'Formation' : 'Education');
        updateText('cert-heading', currentLang === 'fr' ? 'Certifications' : 'Certifications');
        updateText('test-heading', currentLang === 'fr' ? 'Témoignages' : 'Testimonials');

        updateText('edu-cert-main-heading', currentLang === 'fr' ? 'Formation & Certifications' : 'Education & Certifications');
        updateText('contact-heading', currentLang === 'fr' ? 'Me Contacter' : 'Contact Me');

        updateText('btn-send', currentLang === 'fr' ? 'Envoyer le message' : 'Send Message');
        if (searchInput) searchInput.placeholder = currentLang === 'fr' ? 'Rechercher un projet...' : 'Search for a project...';

        updateText('contact-email', d.email);
        updateText('contact-phone', d.phone);

        // Update reset button if present
        const resetBtn = document.getElementById('reset-filters');
        if (resetBtn) resetBtn.textContent = currentLang === 'fr' ? 'Réinitialiser' : 'Reset';
    }

    // RENDERING
    function renderAll() {

        renderProjects();
        renderFilters();
        renderTimeline();
        renderSkills();
        renderEducation();
        renderCertifications();
        renderTestimonials();

    }



    function renderFilters() {
        if (!filterContainer) return;
        const allTags = new Set();
        portfolioData.projects.forEach(p => p.tags.forEach(t => allTags.add(t)));

        let tagsHTML = `<button class="tag ${activeTag === 'all' ? 'active' : ''}" data-filter="all">${currentLang === 'fr' ? 'Tous' : 'All'}</button>`;

        Array.from(allTags).forEach(t => {
            tagsHTML += `<button class="tag ${activeTag === t ? 'active' : ''}" data-filter="${t}">${t}</button>`;
        });

        // Add Reset button (Bonus requirement)
        tagsHTML += `<button id="reset-filters" class="btn-text" style="margin-left: 10px; font-size: 0.8rem; cursor: pointer; color: var(--primary); background: none; border: none;">${currentLang === 'fr' ? 'Réinitialiser' : 'Reset'}</button>`;

        filterContainer.innerHTML = tagsHTML;

        filterContainer.querySelectorAll('.tag').forEach(btn => {
            btn.addEventListener('click', () => {
                activeTag = btn.getAttribute('data-filter');
                filterAndRender();
                // Rerender filters to update active state without full renderAll
                renderFilters();
            });
        });

        const resetBtn = document.getElementById('reset-filters');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                activeTag = 'all';
                if (searchInput) searchInput.value = '';
                searchString = '';
                filterAndRender();
                renderFilters();
            });
        }
    }

    function renderProjects() {
        if (!projectsContainer) return;
        projectsContainer.innerHTML = filteredProjects.map((p, index) => `
            <div class="project-card reveal" data-id="${p.id}">
                <div class="project-img" style="background-image: url('${p.images[0]}')"></div>
                <div class="project-info">
                    <h3>${p.title}</h3>
                    <p>${p.shortDescription[currentLang]}</p>
                    <div class="project-tags">
                        ${p.tags.slice(0, 4).map(t => `<span class="badge-tag">${t}</span>`).join('')}
                    </div>
                </div>
            </div>
        `).join('');

        if (resultsCount) resultsCount.textContent = `${filteredProjects.length} ${currentLang === 'fr' ? 'projet(s) trouvé(s)' : 'project(s) found'}`;

        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('click', () => {
                const id = parseInt(card.getAttribute('data-id'));
                openProjectModal(id);
            });
        });

        // Re-run animation observer for new cards
        setupIntersectionObserver();
    }

    function filterAndRender() {
        if (!searchInput) return;
        searchString = searchInput.value.toLowerCase();

        filteredProjects = portfolioData.projects.filter(p => {
            const matchesSearch = p.title.toLowerCase().includes(searchString) ||
                p.shortDescription[currentLang].toLowerCase().includes(searchString) ||
                p.tags.some(t => t.toLowerCase().includes(searchString));
            const matchesTag = activeTag === 'all' || p.tags.includes(activeTag);
            return matchesSearch && matchesTag;
        });

        const sortBy = sortSelect ? sortSelect.value : 'recent';
        filteredProjects.sort((a, b) => {
            return sortBy === 'recent' ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date);
        });

        renderProjects();
    }

    function renderTimeline() {
        if (!timelineContainer) return;
        timelineContainer.innerHTML = portfolioData.experiences.map(exp => `
            <div class="timeline-item reveal">
                <span class="timeline-date">${exp.period}</span>
                <div class="timeline-content">
                    <h3>${exp.role[currentLang]}</h3>
                    <h4>${exp.company} - ${exp.location}</h4>
                    <ul class="timeline-tasks">
                        ${exp.tasks[currentLang].map(t => `<li>${t}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `).join('');
    }

    function renderSkills() {
        if (!skillsContainer) return;
        skillsContainer.innerHTML = portfolioData.skills.map(cat => `
            <div class="skill-category reveal">
                <h3>${cat.category[currentLang]}</h3>
                <div class="skill-items">
                    ${cat.items.map(s => `<span class="tag">${s}</span>`).join('')}
                </div>
            </div>
        `).join('');
    }

    function renderEducation() {
        const el = document.getElementById('education-container');
        if (!el) return;
        el.innerHTML = portfolioData.formation.map(edu => `
            <div class="edu-card reveal">
                <div class="edu-icon">🎓</div>
                <div class="edu-details">
                    <h4>${edu.degree[currentLang]}</h4>
                    <p class="school-name"><strong>${edu.school}</strong></p>
                    <p class="edu-period">📅 ${edu.period}</p>
                    <p class="edu-info text-muted">${edu.details[currentLang] || edu.details}</p>
                </div>
            </div>
        `).join('');
    }

    function renderCertifications() {
        const el = document.getElementById('certifications-container');
        if (!el) return;
        el.innerHTML = portfolioData.certifications.map(cert => `
            <div class="cert-card reveal">
                <div class="cert-icon">🏅</div>
                <div class="cert-details">
                    <p class="cert-name">${cert.name}</p>
                    <p class="cert-year">📅 ${cert.year}</p>
                </div>
            </div>
        `).join('');
    }

    function renderTestimonials() {
        const el = document.getElementById('testimonials-container');
        if (!el) return;
        el.innerHTML = portfolioData.testimonials.map(t => `
            <div class="testimonial-card">
                <p>"${t.text[currentLang]}"</p>
                <div class="testimonial-author">
                    <strong>${t.name}</strong>
                    <span>${t.role}</span>
                </div>
            </div>
        `).join('');
    }





    // MODAL LOGIC
    function formatDescription(text) {
        if (!text) return '';
        // Convert **bold** to <strong>
        let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        // Convert newlines to <br> or wrap in <p>
        formatted = formatted.replace(/\n/g, '<br>');
        return formatted;
    }

    function openProjectModal(id) {
        const project = portfolioData.projects.find(p => p.id === id);
        currentProjectIndex = portfolioData.projects.indexOf(project);

        if (!modalBody) return;

        modalBody.innerHTML = `
            <div class="modal-grid">
                <div class="modal-gallery">
                    ${project.video ? `
                        <div class="video-container" id="main-video-trigger">
                            <iframe src="${project.video}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            <div class="media-expand-btn">🔍</div>
                        </div>
                    ` : ""}
                    <div class="main-img-container" id="main-img-trigger" ${project.video ? 'style="margin-top: 1rem;"' : ""}>
                        <img id="modal-main-img" src="${project.images[0]}" alt="${project.title}">
                        <div class="media-expand-btn">🔍</div>
                    </div>
                    <div class="thumb-nails">
                        ${project.images.map((img, idx) => `
                            <img class="thumb ${idx === 0 ? 'active' : ''}" src="${img}" data-full="${img}" alt="Project View ${idx + 1}">
                        `).join('')}
                    </div>
                </div>
                <div class="modal-info">
                    <h2>${project.title}</h2>
                    <div class="meta-row">
                        <span><strong>Role:</strong> ${project.role[currentLang]}</span>
                        <span><strong>Date:</strong> ${project.date}</span>
                    </div>
                    <div class="modal-desc">
                        <h3>Description</h3>
                        <div class="description-text">${formatDescription(project.fullDescription[currentLang])}</div>
                    </div>
                    <div class="modal-stack">
                        <h3>Stack</h3>
                        <div class="project-tags">
                            ${project.stack.map(s => `<span class="badge-tag">${s}</span>`).join('')}
                        </div>
                    </div>
                    <div class="modal-impact">
                        <h3>Impact</h3>
                        <p>✅ ${project.impact[currentLang]}</p>
                    </div>
                    <div class="modal-actions">
                        <a href="${project.links.github}" target="_blank" class="btn btn-primary">Voir le projet entier sur GitHub</a>
                        <!-- <a href="${project.links.demo}" target="_blank" class="btn btn-primary">Live Demo</a> -->
                    </div>
                </div>
            </div>
        `;

        // Gallery Interactivity
        const mainImg = document.getElementById('modal-main-img');
        const thumbs = modalBody.querySelectorAll('.thumb');

        thumbs.forEach(t => {
            t.addEventListener('click', () => {
                // Update Main Image
                mainImg.style.opacity = '0';
                setTimeout(() => {
                    mainImg.src = t.getAttribute('data-full');
                    mainImg.style.opacity = '1';
                }, 200);

                // Update Active State
                thumbs.forEach(th => th.classList.remove('active'));
                t.classList.add('active');
            });
        });

        // Lightbox Triggers
        const imgTrigger = document.getElementById('main-img-trigger');
        if (imgTrigger) {
            imgTrigger.addEventListener('click', () => {
                const mediaList = [];
                if (project.video) mediaList.push({ type: 'video', src: project.video });
                project.images.forEach(img => mediaList.push({ type: 'image', src: img }));

                // Find index of current main image in the list
                const idx = mediaList.findIndex(m => m.src === mainImg.src);
                openLightbox(mediaList, idx !== -1 ? idx : 0);
            });
        }

        const videoTrigger = document.getElementById('main-video-trigger');
        if (videoTrigger) {
            videoTrigger.addEventListener('click', () => {
                const mediaList = [];
                if (project.video) mediaList.push({ type: 'video', src: project.video });
                project.images.forEach(img => mediaList.push({ type: 'image', src: img }));
                openLightbox(mediaList, 0); // Video is first
            });
        }

        if (modal) modal.style.display = 'block';
        body.style.overflow = 'hidden';
    }

    function openLightbox(mediaList, startIndex) {
        if (!lightbox) return;
        currentProjectMedia = mediaList;
        currentMediaIndex = startIndex;

        updateLightboxContent();
        lightbox.classList.add('active');
    }

    function updateLightboxContent() {
        const media = currentProjectMedia[currentMediaIndex];
        if (!media) return;

        if (media.type === 'image') {
            lightboxImg.src = media.src;
            lightboxImg.style.display = 'block';
            lightboxVideo.style.display = 'none';
            lightboxVideo.innerHTML = '';
        } else {
            lightboxImg.style.display = 'none';
            lightboxVideo.style.display = 'block';
            lightboxVideo.innerHTML = `
                <div class="video-container">
                    <iframe src="${media.src}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
            `;
        }
    }

    function nextMedia() {
        currentMediaIndex = (currentMediaIndex + 1) % currentProjectMedia.length;
        updateLightboxContent();
    }

    function prevMedia() {
        currentMediaIndex = (currentMediaIndex - 1 + currentProjectMedia.length) % currentProjectMedia.length;
        updateLightboxContent();
    }

    function closeLightboxFunc() {
        if (!lightbox) return;
        lightbox.classList.remove('active');
        lightboxVideo.innerHTML = ''; // Stop video when closing
    }

    // EVENT LISTENERS
    function setupEventListeners() {
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const navLinksList = document.querySelector('.nav-links');

        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener('click', () => {
                mobileMenuToggle.classList.toggle('active');
                if (navLinksList) navLinksList.classList.toggle('active');
                body.classList.toggle('no-scroll');
            });
        }

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (mobileMenuToggle) mobileMenuToggle.classList.remove('active');
                if (navLinksList) navLinksList.classList.remove('active');
                body.classList.remove('no-scroll');
            });
        });

        if (themeToggle) themeToggle.addEventListener('click', () => {
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });

        if (langToggle) langToggle.addEventListener('click', () => {
            const newLang = currentLang === 'fr' ? 'en' : 'fr';
            setLanguage(newLang);
        });

        if (closeModal) closeModal.addEventListener('click', () => {
            if (modal) modal.style.display = 'none';
            body.style.overflow = 'auto';
        });

        if (lightboxClose) lightboxClose.addEventListener('click', closeLightboxFunc);
        if (lightboxPrev) lightboxPrev.addEventListener('click', prevMedia);
        if (lightboxNext) lightboxNext.addEventListener('click', nextMedia);

        window.addEventListener('keydown', (e) => {
            if (!lightbox || !lightbox.classList.contains('active')) return;
            if (e.key === 'ArrowRight') nextMedia();
            if (e.key === 'ArrowLeft') prevMedia();
            if (e.key === 'Escape') closeLightboxFunc();
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                body.style.overflow = 'auto';
            }
            if (e.target === lightbox) {
                closeLightboxFunc();
            }
        });

        if (searchInput) searchInput.addEventListener('input', filterAndRender);
        if (sortSelect) sortSelect.addEventListener('change', filterAndRender);

        if (nextBtn) nextBtn.addEventListener('click', () => {
            currentProjectIndex = (currentProjectIndex + 1) % portfolioData.projects.length;
            openProjectModal(portfolioData.projects[currentProjectIndex].id);
        });

        if (prevBtn) prevBtn.addEventListener('click', () => {
            currentProjectIndex = (currentProjectIndex - 1 + portfolioData.projects.length) % portfolioData.projects.length;
            openProjectModal(portfolioData.projects[currentProjectIndex].id);
        });

        document.querySelectorAll('.copy-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const text = btn.getAttribute('data-copy');
                navigator.clipboard.writeText(text);
                const originalText = btn.textContent;
                btn.textContent = '✅';
                setTimeout(() => btn.textContent = originalText, 2000);
            });
        });

        window.addEventListener('scroll', () => {
            if (navbar) {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            }
            updateActiveLink();
        });
    }

    function updateActiveLink() {
        let current = "";
        const sections = document.querySelectorAll("section");
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 150) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((a) => {
            a.classList.remove("active");
            if (a.getAttribute("href") === `#${current} `) {
                a.classList.add("active");
            }
        });
    }

    function setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.reveal:not(.active)').forEach(el => observer.observe(el));
    }

    // ANALYTICS TRACKING
    initAnalytics();

    function initAnalytics() {
        // Données persistantes : visitors (uniques par navigateur), views (uniques par session), totalTime
        let stats = JSON.parse(localStorage.getItem('portfolio_analytics') || '{"visitors":0, "views":0, "totalTime":0}');

        let statsUpdated = false;

        // 1. Visiteurs Uniques (Une fois par navigateur)
        if (!localStorage.getItem('visitor_confirmed')) {
            stats.visitors++;
            localStorage.setItem('visitor_confirmed', 'true');
            statsUpdated = true;
        }

        // 2. Pages Vues Uniques (Une fois par session / utilisateur actuel)
        if (!sessionStorage.getItem('view_counted')) {
            stats.views++;
            sessionStorage.setItem('view_counted', 'true');
            statsUpdated = true;
        }

        if (statsUpdated) {
            localStorage.setItem('portfolio_analytics', JSON.stringify(stats));
        }

        // 3. Suivi du temps (Heartbeat toutes les 5 secondes)
        let startTime = Date.now();
        setInterval(() => {
            let currentStats = JSON.parse(localStorage.getItem('portfolio_analytics') || '{"visitors":0, "views":0, "totalTime":0}');
            currentStats.totalTime += 5;
            localStorage.setItem('portfolio_analytics', JSON.stringify(currentStats));
        }, 5000);
    }
});

