document.addEventListener('DOMContentLoaded', function() {
    // Initialize page title
    initPageTitle();
    
    // Initialize site logo and avatar
    initSiteLogoAvatar();
    
    // Initialize nickname and hero content
    initNickname();
    initHeroDescription();
    
    // Initialize typing animation
    initTypingAnimation();
    
    // Initialize social icons
    initSocialIcons();
    
    // Initialize about section
    initAboutContent();
    
    // Initialize skills section
    initSkillsContainer();
    
    // Initialize projects section
    initProjectsFilter();
    initProjectsGrid();
    
    // Initialize games section
    initGamesSection();
    
    // Initialize portfolio section
    // initPortfolioSection();
    
    // Initialize footer
    initFooterText();
    
    // Initialize modal
    initModal();
    
    // Observe sections for animation
    // observeSections();
});

// Initialize page title from config
function initPageTitle() {
    document.title = config.siteTitle || 'Developer Portfolio';
    const pageTitleElement = document.getElementById('page-title');
    if (pageTitleElement) {
        pageTitleElement.textContent = config.siteTitle;
    }
}

// Initialize site logo and avatar
function initSiteLogoAvatar() {
    const logoElement = document.getElementById('site-logo');
    if (logoElement && config.logo) {
        logoElement.src = config.logo;
    }
    
    const avatarElement = document.getElementById('user-avatar');
    if (avatarElement && config.avatar) {
        avatarElement.src = config.avatar;
    }
}

// Initialize nickname
function initNickname() {
    const nicknameElement = document.getElementById('nickname');
    if (nicknameElement && config.nickname) {
        nicknameElement.textContent = config.nickname;
        nicknameElement.setAttribute('data-text', config.nickname);
    }
}

// Initialize hero description
function initHeroDescription() {
    const descriptionElement = document.getElementById('hero-description');
    if (descriptionElement && config.description) {
        descriptionElement.textContent = config.description;
    }
}

// Initialize social icons
function initSocialIcons() {
    const socialIconsContainer = document.getElementById('social-icons');
    if (!socialIconsContainer || !config.social || !config.social.length) return;
    
    socialIconsContainer.innerHTML = '';
    
    config.social.forEach(social => {
        const link = document.createElement('a');
        link.href = social.url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.className = 'social-link';
        link.title = social.name;
        
        const icon = document.createElement('i');
        icon.className = social.icon;
        
        link.appendChild(icon);
        socialIconsContainer.appendChild(link);
    });
}

// Initialize about content
function initAboutContent() {
    const aboutContentElement = document.getElementById('about-content');
    if (!aboutContentElement || !config.about || !config.about.length) return;
    
    aboutContentElement.innerHTML = '';
    
    config.about.forEach(paragraph => {
        const p = document.createElement('p');
        p.textContent = paragraph;
        aboutContentElement.appendChild(p);
    });
}

// Initialize skills container
function initSkillsContainer() {
    const skillsContainer = document.getElementById('skills-container');
    if(skillsContainer && config.skills && Array.isArray(config.skills)) {
        // Clear existing content
        skillsContainer.innerHTML = '';
        
        // Create left column
        const leftColumn = document.createElement('div');
        leftColumn.className = 'skill-list';
        
        // Create right column
        const rightColumn = document.createElement('div');
        rightColumn.className = 'skill-list';
        
        // Distribute skills evenly between columns
        config.skills.forEach((skill, index) => {
            const skillItem = createSkillItem(skill);
            
            if(index < config.skills.length / 2) {
                leftColumn.appendChild(skillItem);
            } else {
                rightColumn.appendChild(skillItem);
            }
        });
        
        // Add columns to container
        skillsContainer.appendChild(leftColumn);
        skillsContainer.appendChild(rightColumn);
    }
}

function animatePercentage(percentageElement, targetPercentage) {
    let start = 0;
    const duration = 1000; // продолжительность анимации в миллисекундах
    const stepTime = Math.abs(Math.floor(duration / targetPercentage));
    
    const updatePercentage = () => {
        if (start <= targetPercentage) {
            percentageElement.textContent = start + '%';
            start++;
            setTimeout(updatePercentage, stepTime);
        }
    };
    
    updatePercentage();
}

// Helper function to create skill items
function createSkillItem(skill) {
    const item = document.createElement('div');
    item.className = 'skill-item';
    
    const info = document.createElement('div');
    info.className = 'skill-info';
    
    const name = document.createElement('div');
    name.className = 'skill-name';
    name.textContent = skill.name;
    
    const percentage = document.createElement('div');
    percentage.className = 'skill-percentage';
    percentage.textContent = skill.percentage + '%';
    
    info.appendChild(name);
    info.appendChild(percentage);
    
    const bar = document.createElement('div');
    bar.className = 'skill-bar';
    
    const progress = document.createElement('div');
    progress.className = 'progress';
    progress.style.width = '0%';
    
    bar.appendChild(progress);
    
    const description = document.createElement('div');
    description.className = 'skill-description';
    description.textContent = skill.description;
    
    item.appendChild(info);
    item.appendChild(bar);
    item.appendChild(description);

    // Запуск анимации
    setTimeout(() => {
        progress.style.width = skill.percentage + '%';
        animatePercentage(percentage, parseInt(skill.percentage));
    }, 100);
    
    return item;
}

// Initialize projects filter
function initProjectsFilter() {
    const filterContainer = document.getElementById('projects-filter');
    if (!filterContainer || !config.projectCategories || !config.projectCategories.length) return;
    
    filterContainer.innerHTML = '';
    
    config.projectCategories.forEach((category, index) => {
        const filterBtn = document.createElement('button');
        filterBtn.className = 'filter-btn' + (index === 0 ? ' active' : '');
        filterBtn.setAttribute('data-filter', category.id);
        filterBtn.textContent = category.name;
        
        filterBtn.addEventListener('click', () => {
            // Remove active class from all buttons
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            filterBtn.classList.add('active');
            
            // Filter projects
            filterProjects(category.id);
        });
        
        filterContainer.appendChild(filterBtn);
    });
}

// Initialize projects grid
function initProjectsGrid() {
    const projectsGrid = document.getElementById('projects-grid');
    if (!projectsGrid || !config.projects || !config.projects.length) return;
    
    projectsGrid.innerHTML = '';
    
    config.projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.setAttribute('data-category', project.category);
        
        // Project image
        const projectImage = document.createElement('div');
        projectImage.className = 'project-image';
        
        const projectIcon = document.createElement('div');
        projectIcon.className = 'project-icon';
        
        const icon = document.createElement('i');
        icon.className = project.icon;
        
        projectIcon.appendChild(icon);
        
        const projectOverlay = document.createElement('div');
        projectOverlay.className = 'project-overlay';
        
        const projectTitle = document.createElement('h3');
        projectTitle.className = 'project-title';
        projectTitle.textContent = project.title;
        
        const projectCategory = document.createElement('span');
        projectCategory.className = 'project-category';
        projectCategory.textContent = getCategoryName(project.category);
        
        projectOverlay.appendChild(projectTitle);
        projectOverlay.appendChild(projectCategory);
        
        projectImage.appendChild(projectIcon);
        projectImage.appendChild(projectOverlay);
        
        // Project content
        const projectContent = document.createElement('div');
        projectContent.className = 'project-content';
        
        const projectDescription = document.createElement('p');
        projectDescription.className = 'project-description';
        projectDescription.textContent = project.description;
        
        const projectTechnologies = document.createElement('div');
        projectTechnologies.className = 'project-technologies';
        
        // if (project.technologies && project.technologies.length) {
        //     project.technologies.forEach(tech => {
        //         const techSpan = document.createElement('span');
        //         techSpan.className = 'project-tech';
        //         techSpan.textContent = tech;
        //         projectTechnologies.appendChild(techSpan);
        //     });
        // }
        
        const projectLinks = document.createElement('div');
        projectLinks.className = 'project-links';
        
        // Demo button
        if (project.demo) {
            const demoBtn = document.createElement('a');
            demoBtn.href = 'javascript:void(0)';
            demoBtn.className = 'project-btn demo-btn';
            demoBtn.innerHTML = '<i class="fas fa-eye"></i> Demo';
            
            demoBtn.addEventListener('click', (e) => {
                e.preventDefault();
                
                let modalContent = '';
                if (project.demo.type === 'image') {
                    modalContent = `
                        <div class="modal-image">
                            <img src="${project.demo.url}" alt="${project.title}">
                        </div>
                        <div class="modal-text">
                            ${project.demo.description || ''}
                        </div>
                    `;
                    console.log(project.demo.type)
                } else if (project.demo.type === 'youtube') {
                    modalContent = `
                        <div class="modal-iframe">
                            <iframe src="${project.demo.url}" frameborder="0" allowfullscreen></iframe>
                        </div>
                        <div class="modal-text">
                            ${project.demo.description || ''}
                        </div>
                    `;
                }
                
                openModal(project.title, modalContent);
            });
            
            projectLinks.appendChild(demoBtn);
        }
        
        // Code button
        if (project.code) {
            const codeBtn = document.createElement('a');
            codeBtn.href = 'javascript:void(0)';
            codeBtn.className = 'project-btn code-btn';
            codeBtn.innerHTML = '<i class="fas fa-code"></i> Code';
            
            codeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                
                console.log(project.synthetics);
                const language = getCodeLanguage(project.title);
                const modalContent = `
                    <div class="modal-code">
                        <div class="modal-code-header">
                            <span class="modal-code-language">${language}</span>
                            <div class="modal-code-actions">
                                <button class="modal-code-action copy-btn" onclick="copyToClipboard(\`${escapeHtml(project.code)}\`)">
                                    <i class="fas fa-copy"></i> Copy
                                </button>
                                <button class="modal-code-action download-btn" onclick="downloadTextAsFile(\`${escapeHtml(project.code)}\`, '${project.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.${getFileExtension(language)}')">
                                    <i class="fas fa-download"></i> Download
                                </button>
                            </div>
                        </div>
                        <pre><code class="language-${language.toLowerCase()}">${escapeHtml(project.code)}</code></pre>
                    </div>
                `;
                
                openModal(project.title + ' - Code', modalContent);
                
                // Initialize syntax highlighting
                if (window.hljs) {
                    document.querySelectorAll('pre code').forEach((block) => {
                        hljs.highlightElement(block);
                    });
                }
            });
            
            projectLinks.appendChild(codeBtn);
        }
        
        // Docs button
        if (project.docs) {
            const docsBtn = document.createElement('a');
            docsBtn.href = 'javascript:void(0)';
            docsBtn.className = 'project-btn docs-btn';
            docsBtn.innerHTML = '<i class="fas fa-book"></i> Docs';
            
            docsBtn.addEventListener('click', (e) => {
                e.preventDefault();
                
                const modalContent = `
                    <div class="modal-text">
                        ${project.docs}
                    </div>
                `;
                
                openModal(project.title + ' - Documentation', modalContent);
            });
            
            projectLinks.appendChild(docsBtn);
        }
        
        projectContent.appendChild(projectDescription);
        projectContent.appendChild(projectTechnologies);
        projectContent.appendChild(projectLinks);
        
        projectCard.appendChild(projectImage);
        projectCard.appendChild(projectContent);
        
        projectsGrid.appendChild(projectCard);
    });
}

// Get category name
function getCategoryName(categoryId) {
    if (!config.projectCategories) return '';
    
    const category = config.projectCategories.find(cat => cat.id === categoryId);
    return category ? category.name : '';
}

// Filter projects
function filterProjects(category) {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Initialize games section
function initGamesSection() {
    const gamesGrid = document.getElementById('games-grid');
    if (!gamesGrid || !config.games || !config.games.length) {
        // Hide games section if no games
        const gamesSection = document.getElementById('games');
        if (gamesSection) {
            gamesSection.style.display = 'none';
        }
        return;
    }
    
    gamesGrid.innerHTML = '';
    
    config.games.forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.className = 'game-card';
        
        const gameIcon = document.createElement('div');
        gameIcon.className = 'game-icon';
        
        const icon = document.createElement('i');
        icon.className = game.icon;
        
        gameIcon.appendChild(icon);
        
        const gameInfo = document.createElement('div');
        gameInfo.className = 'game-info';
        
        const gameTitle = document.createElement('h3');
        gameTitle.className = 'game-title';
        gameTitle.textContent = game.title;
        
        const gameDescription = document.createElement('p');
        gameDescription.className = 'game-description';
        gameDescription.textContent = game.description;
        
        const gameMeta = document.createElement('div');
        gameMeta.className = 'game-meta';
        
        const gamePlatform = document.createElement('div');
        gamePlatform.className = 'game-platform';
        gamePlatform.innerHTML = '<i class="fas fa-desktop"></i> ' + game.platform;
        
        const gameHours = document.createElement('div');
        gameHours.className = 'game-hours';
        gameHours.innerHTML = '<i class="fas fa-clock"></i> ' + game.hours;
        
        gameMeta.appendChild(gamePlatform);
        gameMeta.appendChild(gameHours);
        
        gameInfo.appendChild(gameTitle);
        gameInfo.appendChild(gameDescription);
        gameInfo.appendChild(gameMeta);
        
        gameCard.appendChild(gameIcon);
        gameCard.appendChild(gameInfo);
        
        gamesGrid.appendChild(gameCard);
    });
}

// Initialize footer text
function initFooterText() {
    const footerTextElement = document.getElementById('footer-text');
    if (footerTextElement && config.footerText) {
        const currentYear = new Date().getFullYear();
        footerTextElement.textContent = config.footerText;
    }
}

// Initialize typing animation
function initTypingAnimation() {
    if (!config.typingTexts || !config.typingTexts.length) return;
    
    const typingTextElement = document.getElementById('typing-text');
    if (!typingTextElement) return;
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;
    
    function type() {
        const currentText = config.typingTexts[textIndex];
        
        if (isDeleting) {
            typingTextElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typingTextElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typeSpeed = 1000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % config.typingTexts.length;
            typeSpeed = 500; // Pause before typing next text
        }
        
        setTimeout(type, typeSpeed);
    }
    
    // Start typing animation
    setTimeout(type, 1000);
}

// Initialize modal
function initModal() {
    const modal = document.getElementById('modal');
    const modalClose = document.getElementById('modal-close');
    const modalOverlay = document.querySelector('.modal-overlay');
    
    if (!modal || !modalClose || !modalOverlay) return;
    
    modalClose.addEventListener('click', () => {
        closeModal();
    });
    
    modalOverlay.addEventListener('click', () => {
        closeModal();
    });
    
    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// Open modal
function openModal(title, content) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
    if (!modal || !modalTitle || !modalBody) return;
    
    modalTitle.textContent = title;
    modalBody.innerHTML = content;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
}

// Close modal
function closeModal() {
    const modal = document.getElementById('modal');
    if (!modal) return;
    
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
}


document.addEventListener('DOMContentLoaded', function() {
    // We get the elements
    const typingText = document.getElementById('typing-text');
    const sections = document.querySelectorAll('.section');
    const skillItems = document.querySelectorAll('.skill-item');
    const projectCards = document.querySelectorAll('.project-card');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const demoModal = document.getElementById('demo-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const demoBtns = document.querySelectorAll('.demo-btn');
    const codeBtns = document.querySelectorAll('.code-btn');
    const docsBtns = document.querySelectorAll('.docs-btn');
    const toggleThemeBtn = document.getElementById('toggle-theme');
    const mediaSection = document.getElementById('media');
    const mediaGrid = document.getElementById('media-grid');
    
    // Initialization
    observeSections();
    setupFilterButtons();
    setupProjectButtons();
    applyThemeFromConfig();
    initBackgroundEffects();
    createMediaContent();

    // Section watcher for scrolling animation
    function observeSections() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    
                    // Activate the internal elements of the section
                    if (entry.target.querySelector('.skill-item')) {
                        animateSkillItems(entry.target);
                    }
                    if (entry.target.querySelector('.project-card')) {
                        animateProjectCards(entry.target);
                    }
                    if (entry.target.querySelector('.game-card')) {
                        animateGameCards(entry.target);
                    }
                    if (entry.target.querySelector('.portfolio-item')) {
                        animatePortfolioItems(entry.target);
                    }
                    if (entry.target.querySelector('.media-item')) {
                        animateMediaItems(entry.target);
                    }
                    if (entry.target.querySelector('.progress')) {
                        animateSkillBars(entry.target);
                    }
                }
            });
        }, { threshold: 0.1 });
        
        sections.forEach(section => {
            observer.observe(section);
        });
    }
    
    // Animation of skill elements
    function animateSkillItems(container) {
        const items = container.querySelectorAll('.skill-item');
        items.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('active');
            }, 100 * index);
        });
    }
    
    // Animation of project cards
    function animateProjectCards(container) {
        const cards = container.querySelectorAll('.project-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('active');
            }, 150 * index);
        });
    }

    // Animation of game cards
    function animateGameCards(container) {
        const cards = container.querySelectorAll('.game-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('active');
            }, 150 * index);
        });
    }
    
    // Animation of portfolio elements
    function animatePortfolioItems(container) {
        const items = container.querySelectorAll('.portfolio-item');
        items.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('active');
            }, 200 * index);
        });
    }
    
    // Media Elements Animation
    function animateMediaItems(container) {
        const items = container.querySelectorAll('.media-item');
        items.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('active');
            }, 200 * index);
        });
    }
    
    // Skill Bars Animation
    function animateSkillBars(container) {
        const bars = container.querySelectorAll('.progress');
        bars.forEach((bar, index) => {
            const skill = bar.closest('.skill-item');
            const percentage = skill.querySelector('.skill-percentage').textContent;
            const value = percentage.replace('%', '');
            
            setTimeout(() => {
                bar.style.width = `${value}%`;
            }, 100 * index);
        });
    }
    
    // Customizing project filter buttons
    function setupFilterButtons() {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to the pressed button
                button.classList.add('active');
                
                // Filter projects
                const category = button.getAttribute('data-filter');
                filterProjects(category);
            });
        });
    }
    
    // Filtering projects by category
    function filterProjects(category) {
        const projects = document.querySelectorAll('.project-card');
        
        projects.forEach(project => {
            if (category === 'all' || project.getAttribute('data-category') === category) {
                project.style.display = 'block';
                setTimeout(() => {
                    project.classList.add('active');
                }, 100);
            } else {
                project.classList.remove('active');
                setTimeout(() => {
                    project.style.display = 'none';
                }, 300);
            }
        });
    }
    
    // Customizing project buttons (Demo, Code, Docs)
    function setupProjectButtons() {
        // Handler for Demo buttons
        demoBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                
                const projectId = parseInt(btn.getAttribute('data-project')) - 1;
                const project = config.projects[projectId];
                
                if (!project) return;
                
                modalTitle.textContent = `${project.title} - Demo`;
                
                if (project.demo) {
                    let demoContent = '';
                    
                    if (project.demo.type === 'image') {
                        demoContent = `
                            <img src="${project.demo.url}" alt="${project.title}" class="demo-image">
                            <p>${project.demo.description || project.description}</p>
                        `;
                    } else if (project.demo.type === 'video') {
                        demoContent = `
                            <div class="video-container">
                                <iframe src="${project.demo.url}" 
                                    title="${project.title}" frameborder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowfullscreen></iframe>
                            </div>
                            <p>${project.demo.description || project.description}</p>
                        `;
                    }
                    
                    modalContent.innerHTML = demoContent;
                } else {
                    modalContent.innerHTML = `<p>No demo available for this project.</p>`;
                }
                
                demoModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
        
        // Handler for Code buttons
        codeBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                
                const projectId = parseInt(btn.getAttribute('data-project')) - 1;
                const project = config.projects[projectId];
                
                if (!project || !project.code) return;
                
                const codeLanguage = getCodeLanguage(project.title);
                
                modalTitle.textContent = `${project.title} - Code`;
                
                const codeContent = `
                    <div class="code-actions-bar">
                        <button class="code-action-btn copy-btn">
                            <i class="fas fa-copy"></i> Copy Code
                        </button>
                        <button class="code-action-btn download-btn">
                            <i class="fas fa-download"></i> Download
                        </button>
                    </div>
                    <pre><code class="${codeLanguage}">${escapeHtml(project.code)}</code></pre>
                    <p>${project.description}</p>
                `;
                
                modalContent.innerHTML = codeContent;
                
                // Highlight code
                document.querySelectorAll('pre code').forEach((block) => {
                    hljs.highlightElement(block);
                });
                
                // Copy code functionality
                const copyBtn = modalContent.querySelector('.copy-btn');
                if (copyBtn) {
                    copyBtn.addEventListener('click', () => {
                        copyToClipboard(project.code);
                        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
                        setTimeout(() => {
                            copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy Code';
                        }, 2000);
                    });
                }
                
                // Download code functionality
                const downloadBtn = modalContent.querySelector('.download-btn');
                if (downloadBtn) {
                    downloadBtn.addEventListener('click', () => {
                        const extension = getFileExtension(codeLanguage);
                        const filename = `${project.title.toLowerCase().replace(/\s+/g, '-')}.${extension}`;
                        downloadTextAsFile(project.code, filename);
                    });
                }
                
                demoModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
        
        // Handler for Docs buttons
        docsBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                
                const projectId = parseInt(btn.getAttribute('data-project')) - 1;
                const project = config.projects[projectId];
                
                if (!project || !project.docs) return;
                
                modalTitle.textContent = `${project.title} - Documentation`;
                modalContent.innerHTML = project.docs;
                
                demoModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
        
        // Closing a modal window
        modalCloseBtn.addEventListener('click', () => {
            demoModal.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        // Closing a modal window when clicking on an overlay
        demoModal.querySelector('.modal-overlay').addEventListener('click', () => {
            demoModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Get code language based on project title
    function getCodeLanguage(title) {
        if (title.toLowerCase().includes('javascript') || title.toLowerCase().includes('js')) {
            return 'JavaScript';
        } else if (title.toLowerCase().includes('python')) {
            return 'Python';
        } else if (title.toLowerCase().includes('java')) {
            return 'Java';
        } else if (title.toLowerCase().includes('c#') || title.toLowerCase().includes('c-sharp')) {
            return 'C#';
        } else if (title.toLowerCase().includes('php')) {
            return 'PHP';
        } else if (title.toLowerCase().includes('ruby')) {
            return 'Ruby';
        } else if (title.toLowerCase().includes('html')) {
            return 'HTML';
        } else if (title.toLowerCase().includes('css')) {
            return 'CSS';
        } else {
            return 'JavaScript'; // Default to JavaScript
        }
    }
    
    // Get file extension for code download
    function getFileExtension(language) {
        switch (language.toLowerCase()) {
            case 'javascript':
                return 'js';
            case 'python':
                return 'py';
            case 'java':
                return 'java';
            case 'c#':
                return 'cs';
            case 'php':
                return 'php';
            case 'ruby':
                return 'rb';
            case 'html':
                return 'html';
            case 'css':
                return 'css';
            default:
                return 'txt';
        }
    }
    
    // HTML shielding to prevent XSS
    function escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
    
    // Copy text to clipboard
    function copyToClipboard(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        return true;
    }
    
    // Download the text as a file
    function downloadTextAsFile(content, filename, contentType = 'text/plain') {
        const a = document.createElement('a');
        const file = new Blob([content], {type: contentType});
        a.href = URL.createObjectURL(file);
        a.download = filename;
        a.click();
        URL.revokeObjectURL(a.href);
    }
    
    // Dynamically create and add media content
    function createMediaContent() {
        if (!config.mediaContent || config.mediaContent.length === 0 || !mediaGrid) return;
        
        // Clean up current content
        mediaGrid.innerHTML = '';
        
        // Add each media item
        config.mediaContent.forEach((item, index) => {
            const mediaItem = document.createElement('div');
            mediaItem.className = 'media-item';
            
            let mediaContent = '';
            
            if (item.type === 'image') {
                mediaContent = `
                    <div class="media-image">
                        <img src="${item.url}" alt="${item.title}">
                        <div class="media-overlay"></div>
                    </div>
                `;
            } else if (item.type === 'video') {
                mediaContent = `
                    <div class="media-image">
                        <img src="${item.thumbnail}" alt="${item.title}">
                        <div class="media-overlay"></div>
                        <div class="media-play">
                            <i class="fas fa-play"></i>
                        </div>
                    </div>
                `;
            } else if (item.type === 'youtube') {
                mediaContent = `
                    <div class="media-image">
                        <img src="${item.thumbnail}" alt="${item.title}">
                        <div class="media-overlay"></div>
                        <div class="media-play">
                            <i class="fab fa-youtube"></i>
                        </div>
                    </div>
                `;
            }
            
            mediaItem.innerHTML = `
                ${mediaContent}
                <div class="media-content">
                    <h3 class="media-title">${item.title}</h3>
                    <p class="media-description">${item.description}</p>
                </div>
            `;
            
            // Add a click handler to the media element
            mediaItem.addEventListener('click', () => {
                openMediaModal(item);
            });
            
            mediaGrid.appendChild(mediaItem);
        });
        
        // If there is a section, display it
        if (mediaSection) {
            mediaSection.style.display = 'block';
        }
    }
    
    // Opening a modal window for media
    function openMediaModal(item) {
        modalTitle.textContent = item.title;
        
        let modalHtml = '';
        
        if (item.type === 'image') {
            modalHtml = `
                <img src="${item.url}" alt="${item.title}" class="demo-image">
                <p>${item.description}</p>
            `;
        } else if (item.type === 'video') {
            modalHtml = `
                <div class="video-container">
                    <video controls src="${item.url}"></video>
                </div>
                <p>${item.description}</p>
            `;
        } else if (item.type === 'youtube') {
            modalHtml = `
                <div class="video-container">
                    <iframe src="${item.url}" 
                        title="${item.title}" frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen></iframe>
                </div>
                <p>${item.description}</p>
            `;
        }
        
        modalContent.innerHTML = modalHtml;
        demoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Applying a theme from the configuration
    function applyThemeFromConfig() {
        const root = document.documentElement;
        
        // Applying colors from configuration
        if (config.theme) {
            if (config.theme.primary) {
                root.style.setProperty('--primary', config.theme.primary);
                root.style.setProperty('--primary-light', lightenColor(config.theme.primary, 50));
                root.style.setProperty('--primary-dark', darkenColor(config.theme.primary, 50));
            }
            
            if (config.theme.secondary) {
                root.style.setProperty('--secondary', config.theme.secondary);
                root.style.setProperty('--secondary-light', lightenColor(config.theme.secondary, 50));
                root.style.setProperty('--secondary-dark', darkenColor(config.theme.secondary, 50));
            }
        }
    }
    
    // Initializing background effects
    function initBackgroundEffects() {
        if (!config.background) return;
        
        const backgroundContainer = document.querySelector('.background-container');
        
        // Apply background type
        if (config.background.type === 'gradient') {
            backgroundContainer.style.background = `linear-gradient(45deg, ${darkenColor(config.theme.primary, 20)}, ${darkenColor(config.theme.secondary, 20)})`;
        } else if (config.background.type === 'image' && config.background.image) {
            backgroundContainer.style.backgroundImage = `url(${config.background.image})`;
            backgroundContainer.style.backgroundSize = 'cover';
            backgroundContainer.style.backgroundPosition = 'center';
        } else if (config.background.type === 'video' && config.background.video) {
            backgroundContainer.innerHTML += `
                <video autoplay muted loop id="background-video">
                    <source src="${config.background.video}" type="video/mp4">
                </video>
            `;
            const video = document.getElementById('background-video');
            video.style.position = 'absolute';
            video.style.width = '100%';
            video.style.height = '100%';
            video.style.objectFit = 'cover';
        } else if (config.background.type === 'particles') {
            initParticles();
        }
        
        // Apply blur
        if (config.background.blur) {
            // Blur only the background content, not the overlays
            const blurElements = backgroundContainer.querySelectorAll('video, #particles-container');
            blurElements.forEach(el => {
                el.style.filter = `blur(${config.background.blur}px)`;
            });
            
            if (config.background.type === 'image') {
                backgroundContainer.style.filter = `blur(${config.background.blur}px)`;
                // Adjust to prevent white edges when blurring
                backgroundContainer.style.transform = 'scale(1.1)';
            }
        }
        
        // Apply weather effects
        if (config.background.effects) {
            if (config.background.effects.snow) {
                initSnowEffect();
            }
            if (config.background.effects.rain) {
                initRainEffect();
            }
        }
        
        // Theme switch handler
        toggleThemeBtn.addEventListener('click', () => {
            // Cyclically change the main color
            const colors = ['#0078D7', '#00B894', '#9B59B6', '#E74C3C', '#F39C12'];
            const currentColor = config.theme.primary;
            const currentIndex = colors.indexOf(currentColor);
            const nextIndex = (currentIndex + 1) % colors.length;
            const nextColor = colors[nextIndex];
            
            config.theme.primary = nextColor;
            localStorage.setItem('themeColor', nextColor);
            
            // Update theme without reloading
            applyThemeFromConfig();
        });
    }
    
    // Initialization of the particle effect
    function initParticles() {
        const particlesContainer = document.getElementById('particles-container');
        
        // Simple particle realization
        const particleCount = 50;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 5 + 1}px;
                height: ${Math.random() * 5 + 1}px;
                background-color: ${config.theme.primary};
                opacity: ${Math.random() * 0.5 + 0.1};
                border-radius: 50%;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: float ${Math.random() * 30 + 10}s linear infinite;
                animation-delay: -${Math.random() * 40}s;
            `;
            particlesContainer.appendChild(particle);
        }
        
        // Add animation style
        const styleSheet = document.createElement('style');
        styleSheet.textContent = `
            @keyframes float {
                0% {
                    transform: translateY(0) translateX(0);
                }
                25% {
                    transform: translateY(-${Math.random() * 30 + 10}px) translateX(${Math.random() * 30 + 10}px);
                }
                50% {
                    transform: translateY(-${Math.random() * 20 + 10}px) translateX(-${Math.random() * 20 + 10}px);
                }
                75% {
                    transform: translateY(${Math.random() * 20 + 10}px) translateX(${Math.random() * 20 + 10}px);
                }
                100% {
                    transform: translateY(0) translateX(0);
                }
            }
        `;
        document.head.appendChild(styleSheet);
    }
    
    // Initializing the snow effect
    function initSnowEffect() {
        const snowContainer = document.createElement('div');
        snowContainer.className = 'snow-container';
        snowContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 2;
        `;
        document.querySelector('.background-container').appendChild(snowContainer);
        
        const snowflakeCount = 50;
        for (let i = 0; i < snowflakeCount; i++) {
            const snowflake = document.createElement('div');
            snowflake.className = 'snowflake';
            snowflake.style.cssText = `
                position: absolute;
                width: ${Math.random() * 5 + 2}px;
                height: ${Math.random() * 5 + 2}px;
                background-color: white;
                opacity: ${Math.random() * 0.7 + 0.3};
                border-radius: 50%;
                top: -10px;
                left: ${Math.random() * 100}%;
                animation: snowfall ${Math.random() * 5 + 5}s linear infinite;
                animation-delay: -${Math.random() * 5}s;
            `;
            snowContainer.appendChild(snowflake);
        }
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = `
            @keyframes snowfall {
                0% {
                    transform: translateY(0) translateX(0);
                }
                50% {
                    transform: translateY(50vh) translateX(${Math.random() * 100 - 50}px);
                }
                100% {
                    transform: translateY(100vh) translateX(${Math.random() * 150 - 75}px);
                }
            }
        `;
        document.head.appendChild(styleSheet);
    }
    
    // Initializing the rain effect
    function initRainEffect() {
        const rainContainer = document.createElement('div');
        rainContainer.className = 'rain-container';
        rainContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 2;
        `;
        document.querySelector('.background-container').appendChild(rainContainer);
        
        const raindropCount = 100;
        for (let i = 0; i < raindropCount; i++) {
            const raindrop = document.createElement('div');
            raindrop.className = 'raindrop';
            raindrop.style.cssText = `
                position: absolute;
                width: 1px;
                height: ${Math.random() * 15 + 5}px;
                background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0.7));
                opacity: ${Math.random() * 0.4 + 0.3};
                top: -20px;
                left: ${Math.random() * 100}%;
                animation: rainfall ${Math.random() * 0.5 + 0.5}s linear infinite;
                animation-delay: -${Math.random() * 2}s;
            `;
            rainContainer.appendChild(raindrop);
        }
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = `
            @keyframes rainfall {
                0% {
                    transform: translateY(0) rotate(15deg);
                }
                100% {
                    transform: translateY(100vh) rotate(15deg);
                }
            }
        `;
        document.head.appendChild(styleSheet);
    }
    
    // Auxiliary functions for working with colors
    function lightenColor(color, amount) {
        return adjustColor(color, amount);
    }
    
    function darkenColor(color, amount) {
        return adjustColor(color, -amount);
    }
    
    function adjustColor(color, amount) {
        let usePound = false;
        
        if (color[0] == "#") {
            color = color.slice(1);
            usePound = true;
        }
        
        const num = parseInt(color, 16);
        let r = (num >> 16) + amount;
        let g = ((num >> 8) & 0x00FF) + amount;
        let b = (num & 0x0000FF) + amount;
        
        if (r > 255) r = 255;
        else if (r < 0) r = 0;
        
        if (g > 255) g = 255;
        else if (g < 0) g = 0;
        
        if (b > 255) b = 255;
        else if (b < 0) b = 0;
        
        return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16).padStart(6, '0');
    }
    
    function hexToRgb(hex) {
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function(m, r, g, b) {
            return r + r + g + g + b + b;
        });
        
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
});