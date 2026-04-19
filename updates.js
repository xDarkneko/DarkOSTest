// Updates & Changelogs Page JavaScript

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initDynamicIsland();
    initTabSwitcher();
    initAdminPanel();
    loadChangelogs();
    loadNews();
    initFooterText();
    initColorPicker();
    checkAdminAccess();
});

// Theme Toggle
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    
    const savedTheme = localStorage.getItem('theme') || CONFIG.theme.default;
    html.setAttribute('data-theme', savedTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
}

// Dynamic Island
function initDynamicIsland() {
    const botStatusIndicator = document.getElementById('botStatusIndicator');
    const botStatusText = document.getElementById('botStatusText');
    const versionBadge = document.getElementById('versionBadge');
    const footerVersion = document.getElementById('footerVersion');

    if (botStatusIndicator && botStatusText) {
        if (CONFIG.bot.status === 'online') {
            botStatusIndicator.classList.add('online');
            botStatusText.textContent = 'Bot Online';
        } else {
            botStatusText.textContent = 'Bot Offline';
        }
    }

    if (versionBadge) {
        versionBadge.textContent = `v${CONFIG.bot.version}`;
    }

    if (footerVersion) {
        footerVersion.textContent = CONFIG.bot.version;
    }
}

// Tab Switcher
function initTabSwitcher() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const sections = document.querySelectorAll('.content-section');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.dataset.tab;

            // Update buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update sections
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetTab) {
                    section.classList.add('active');
                }
            });
        });
    });
}

// Admin Panel
function initAdminPanel() {
    const adminTabBtns = document.querySelectorAll('.admin-tab-btn');
    const adminForms = document.querySelectorAll('.admin-form');

    adminTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.dataset.adminTab;

            adminTabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            adminForms.forEach(form => {
                form.classList.remove('active');
                if (form.id === targetTab.replace('-', '')) {
                    form.classList.add('active');
                }
            });
        });
    });

    // Form submissions
    const changelogForm = document.getElementById('changelogForm');
    const newsForm = document.getElementById('newsForm');

    if (changelogForm) {
        changelogForm.addEventListener('submit', handleChangelogSubmit);
    }

    if (newsForm) {
        newsForm.addEventListener('submit', handleNewsSubmit);
    }
}

function handleChangelogSubmit(e) {
    e.preventDefault();

    const changelog = {
        id: Date.now(),
        version: document.getElementById('clVersion').value,
        date: document.getElementById('clDate').value,
        type: document.getElementById('clType').value,
        title: document.getElementById('clTitle').value,
        description: document.getElementById('clDescription').value,
        source: document.getElementById('clSource').value
    };

    // Save to localStorage (for demo purposes)
    // In production, this would send to a backend or GitHub API
    saveChangelog(changelog);

    alert('Changelog added successfully! (Note: This is stored locally for demo. For production, integrate with GitHub API or backend)');
    changelogForm.reset();
    
    // Reload changelogs
    loadChangelogs();
}

function handleNewsSubmit(e) {
    e.preventDefault();

    const news = {
        id: Date.now(),
        title: document.getElementById('newsTitle').value,
        date: document.getElementById('newsDate').value,
        category: document.getElementById('newsCategory').value,
        content: document.getElementById('newsContent').value,
        image: document.getElementById('newsImage').value || null
    };

    // Save to localStorage (for demo purposes)
    saveNews(news);

    alert('News added successfully! (Note: This is stored locally for demo. For production, integrate with GitHub API or backend)');
    newsForm.reset();
    
    // Reload news
    loadNews();
}

function saveChangelog(changelog) {
    const changelogs = JSON.parse(localStorage.getItem('changelogs') || '[]');
    changelogs.unshift(changelog);
    localStorage.setItem('changelogs', JSON.stringify(changelogs));
}

function saveNews(news) {
    const newsItems = JSON.parse(localStorage.getItem('news') || '[]');
    newsItems.unshift(news);
    localStorage.setItem('news', JSON.stringify(newsItems));
}

// Load Changelogs
async function loadChangelogs() {
    const changelogList = document.getElementById('changelogList');
    
    try {
        // Try to load from changelogs.json first
        const response = await fetch('changelogs.json');
        if (response.ok) {
            const changelogs = await response.json();
            renderChangelogs(changelogs);
            return;
        }
    } catch (error) {
        console.log('No changelogs.json found, using local storage');
    }

    // Fallback to localStorage
    const changelogs = JSON.parse(localStorage.getItem('changelogs') || '[]');
    
    if (changelogs.length === 0) {
        // Show sample data
        const sampleChangelogs = [
            {
                id: 1,
                version: '1.0.0',
                date: '2024-01-15',
                type: 'feature',
                title: 'Initial Release',
                description: 'Welcome to the Team Darkness Bot website! This is the initial release with all core features.',
                source: 'web'
            },
            {
                id: 2,
                version: '1.0.0',
                date: '2024-01-14',
                type: 'improvement',
                title: 'Dynamic Island Integration',
                description: 'Added Dynamic Island showing bot status, version, and news ticker.',
                source: 'bot'
            },
            {
                id: 3,
                version: '0.9.0',
                date: '2024-01-10',
                type: 'bugfix',
                title: 'Fixed Mouse Cursor Issues',
                description: 'Resolved issues with the magical mouse cursor on mobile devices.',
                source: 'web'
            }
        ];
        renderChangelogs(sampleChangelogs);
    } else {
        renderChangelogs(changelogs);
    }
}

function renderChangelogs(changelogs) {
    const changelogList = document.getElementById('changelogList');
    
    if (!changelogList) return;

    if (changelogs.length === 0) {
        changelogList.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📝</div>
                <h3>No Changelogs Yet</h3>
                <p>Check back soon for updates!</p>
            </div>
        `;
        return;
    }

    changelogList.innerHTML = changelogs.map(cl => `
        <div class="changelog-item">
            <div class="changelog-header">
                <div class="changelog-version">
                    <span class="version-badge-cl">v${cl.version}</span>
                    <span class="changelog-date">${formatDate(cl.date)}</span>
                </div>
                <div>
                    <span class="changelog-type ${cl.type}">${getTypeIcon(cl.type)} ${capitalizeFirst(cl.type)}</span>
                    <span class="changelog-source">${cl.source === 'web' ? '🌐' : '🤖'} ${cl.source === 'web' ? 'Web' : 'Bot'}</span>
                </div>
            </div>
            <div class="changelog-body">
                <h3 class="changelog-title">${cl.title}</h3>
                <p class="changelog-description">${cl.description}</p>
            </div>
        </div>
    `).join('');
}

// Load News
async function loadNews() {
    const newsList = document.getElementById('newsList');
    
    try {
        // Try to load from news.json first
        const response = await fetch('news.json');
        if (response.ok) {
            const news = await response.json();
            renderNews(news);
            return;
        }
    } catch (error) {
        console.log('No news.json found, using local storage');
    }

    // Fallback to localStorage
    const news = JSON.parse(localStorage.getItem('news') || '[]');
    
    if (news.length === 0) {
        // Show sample data
        const sampleNews = [
            {
                id: 1,
                title: 'Welcome to Team Darkness!',
                date: '2024-01-15',
                category: 'announcement',
                content: 'We\'re excited to launch our new website! Stay tuned for more updates and features coming soon.',
                image: null
            },
            {
                id: 2,
                title: 'Community Event Coming Soon',
                date: '2024-01-12',
                category: 'event',
                content: 'Get ready for our first community event! More details will be announced in the coming days.',
                image: null
            }
        ];
        renderNews(sampleNews);
    } else {
        renderNews(news);
    }
}

function renderNews(news) {
    const newsList = document.getElementById('newsList');
    
    if (!newsList) return;

    if (news.length === 0) {
        newsList.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📰</div>
                <h3>No News Yet</h3>
                <p>Check back soon for the latest updates!</p>
            </div>
        `;
        return;
    }

    newsList.innerHTML = news.map(item => `
        <div class="news-item">
            ${item.image 
                ? `<img src="${item.image}" alt="${item.title}" class="news-image">`
                : `<div class="news-image-placeholder">${getCategoryIcon(item.category)}</div>`
            }
            <div class="news-content">
                <div class="news-header">
                    <span class="news-category ${item.category}">${getCategoryIcon(item.category)} ${capitalizeFirst(item.category)}</span>
                    <span class="news-date">${formatDate(item.date)}</span>
                </div>
                <h3 class="news-title">${item.title}</h3>
                <p class="news-excerpt">${item.content}</p>
            </div>
        </div>
    `).join('');
}

// Helper Functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
}

function getTypeIcon(type) {
    const icons = {
        feature: '✨',
        improvement: '🚀',
        bugfix: '🐛',
        security: '🔒'
    };
    return icons[type] || '📝';
}

function getCategoryIcon(category) {
    const icons = {
        announcement: '📢',
        event: '🎉',
        update: '🔄',
        community: '👥'
    };
    return icons[category] || '📰';
}

function capitalizeFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Footer Text Animation
function initFooterText() {
    const footerText = document.getElementById('footerText');
    
    if (!footerText || CONFIG.footerTexts.length <= 1) return;

    let textIndex = 0;

    setInterval(() => {
        textIndex = (textIndex + 1) % CONFIG.footerTexts.length;
        
        footerText.style.opacity = '0';
        
        setTimeout(() => {
            footerText.textContent = CONFIG.footerTexts[textIndex];
            footerText.style.opacity = '1';
        }, 500);
    }, 10000);
}

// Color Picker
function initColorPicker() {
    const colorPickerPopin = document.getElementById('colorPickerPopin');
    const bgColorPicker = document.getElementById('bgColorPicker');
    
    if (!colorPickerPopin || !bgColorPicker || !CONFIG.theme.allowCustomColor) return;

    colorPickerPopin.addEventListener('mouseenter', () => {
        colorPickerPopin.classList.add('active');
    });

    colorPickerPopin.addEventListener('mouseleave', () => {
        colorPickerPopin.classList.remove('active');
    });

    bgColorPicker.addEventListener('input', (e) => {
        const color = e.target.value;
        document.documentElement.style.setProperty('--bg-primary', color);
        localStorage.setItem('customBgColor', color);
    });

    const savedColor = localStorage.getItem('customBgColor');
    if (savedColor) {
        bgColorPicker.value = savedColor;
        document.documentElement.style.setProperty('--bg-primary', savedColor);
    }
}

// Admin Access Check
function checkAdminAccess() {
    if (!CONFIG.admin.enabled || !CONFIG.admin.githubUsername) return;

    const urlParams = new URLSearchParams(window.location.search);
    const user = urlParams.get('github_user');
    
    if (user === CONFIG.admin.githubUsername) {
        const adminPanel = document.getElementById('adminPanel');
        const adminPanelNav = document.getElementById('adminPanelNav');
        
        if (adminPanel) {
            adminPanel.style.display = 'block';
        }
        if (adminPanelNav) {
            adminPanelNav.style.display = 'flex';
        }
    }
}

// Language Switcher
const langSwitch = document.getElementById('langSwitch');
let currentLang = 'en';

if (langSwitch) {
    langSwitch.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'de' : 'en';
        updateLanguage(currentLang);
    });
}

function updateLanguage(lang) {
    const flagIcon = langSwitch.querySelector('.flag-icon');
    
    if (lang === 'de') {
        flagIcon.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480"%3E%3Cpath fill="%23000" d="M0 0h640v160H0z"/%3E%3Cpath fill="%23D00" d="M0 160h640v160H0z"/%3E%3Cpath fill="%23FFCE00" d="M0 320h640v160H0z"/%3E%3C/svg%3E';
        flagIcon.alt = 'DE';
    } else {
        flagIcon.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480"%3E%3Crect fill="%23012169" width="640" height="480"/%3E%3Cpath fill="%23FFF" d="M0 0L640 0L640 480L0 480z"/%3E%3C/svg%3E';
        flagIcon.alt = 'EN';
    }
}
