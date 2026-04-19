// Main Application JavaScript for Team Darkness Website

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initCursor();
    initTheme();
    initDynamicIsland();
    initEasterEgg();
    initStats();
    initTwitch();
    initFooterText();
    initScrollAnimations();
    initNavigation();
    initColorPicker();
    checkAdminAccess();
});

// Magical Mouse Cursor
let cursor = document.querySelector('.cursor');
let cursorFollower = document.querySelector('.cursor-follower');

function initCursor() {
    if (!cursor || !cursorFollower) return;

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 50);
    });

    // Add hover effect to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .logo, .nav-link, .bottom-nav-item');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
}

// Theme Toggle with Smooth Animation
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    
    // Load saved theme or use default
    const savedTheme = localStorage.getItem('theme') || CONFIG.theme.default;
    html.setAttribute('data-theme', savedTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Animate transition
            document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        });
    }
}

// Dynamic Island - Bot Status & News
function initDynamicIsland() {
    const botStatusIndicator = document.getElementById('botStatusIndicator');
    const botStatusText = document.getElementById('botStatusText');
    const versionBadge = document.getElementById('versionBadge');
    const newsTicker = document.getElementById('newsTicker');
    const liveStatus = document.getElementById('liveStatus');
    const twitchLiveBadge = document.getElementById('twitchLiveBadge');

    // Update bot status
    if (botStatusIndicator && botStatusText) {
        if (CONFIG.bot.status === 'online') {
            botStatusIndicator.classList.add('online');
            botStatusText.textContent = 'Bot Online';
        } else {
            botStatusText.textContent = 'Bot Offline';
        }
    }

    // Update version
    if (versionBadge) {
        versionBadge.textContent = `v${CONFIG.bot.version}`;
    }

    // Update footer version
    const footerVersion = document.getElementById('footerVersion');
    if (footerVersion) {
        footerVersion.textContent = CONFIG.bot.version;
    }

    // Update live status
    if (liveStatus) {
        if (CONFIG.twitch.live) {
            liveStatus.classList.add('live');
            liveStatus.querySelector('.live-text').textContent = 'NOW LIVE';
        } else {
            liveStatus.querySelector('.live-text').textContent = 'NOW OFFLINE';
        }
    }

    // Update Twitch badge
    if (twitchLiveBadge) {
        if (CONFIG.twitch.live) {
            twitchLiveBadge.classList.add('live');
            twitchLiveBadge.textContent = 'LIVE';
        } else {
            twitchLiveBadge.textContent = 'OFFLINE';
        }
    }

    // News ticker animation
    if (newsTicker && CONFIG.news.length > 0) {
        let newsIndex = 0;
        const tickerText = newsTicker.querySelector('.ticker-text');
        
        setInterval(() => {
            newsIndex = (newsIndex + 1) % CONFIG.news.length;
            tickerText.textContent = CONFIG.news[newsIndex];
        }, 5000);
    }
}

// Easter Egg - Logo Click Handler
let logoClickCount = 0;
let easterEggUnlocked = false;

function initEasterEgg() {
    const logo = document.getElementById('logo');
    const easterEggIndicator = document.getElementById('easterEggIndicator');
    
    if (!logo || !CONFIG.easterEgg.enabled) return;

    logo.addEventListener('click', () => {
        logoClickCount++;
        
        // Show indicator after first click
        if (logoClickCount === 1 && easterEggIndicator) {
            setTimeout(() => {
                easterEggIndicator.classList.add('visible');
            }, 500);
        }

        // Trigger easter egg
        if (logoClickCount >= CONFIG.easterEgg.clicksRequired && !easterEggUnlocked) {
            easterEggUnlocked = true;
            showEasterEgg();
            
            // Save to localStorage
            localStorage.setItem('easterEggUnlocked', 'true');
        }

        // Reset after 2 seconds of no clicks
        clearTimeout(logo.resetTimeout);
        logo.resetTimeout = setTimeout(() => {
            logoClickCount = 0;
            if (easterEggIndicator && !easterEggUnlocked) {
                easterEggIndicator.classList.remove('visible');
            }
        }, 2000);
    });

    // Check if already unlocked
    if (localStorage.getItem('easterEggUnlocked') === 'true') {
        easterEggUnlocked = true;
        if (easterEggIndicator) {
            easterEggIndicator.classList.add('visible');
        }
    }
}

function showEasterEgg() {
    const modal = document.getElementById('easterEggModal');
    if (modal) {
        modal.classList.add('active');
        
        // Add confetti effect
        createConfetti();
    }
}

function closeEasterEgg() {
    const modal = document.getElementById('easterEggModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Make closeEasterEgg globally available
window.closeEasterEgg = closeEasterEgg;

// Confetti Effect for Easter Egg
function createConfetti() {
    const colors = ['#7c3aed', '#a855f7', '#ec4899', '#6366f1', '#8b5cf6'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-10px';
        confetti.style.zIndex = '9999';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        
        document.body.appendChild(confetti);
        
        const animation = confetti.animate([
            { transform: `translateY(0) rotate(0deg)`, opacity: 1 },
            { transform: `translateY(100vh) rotate(${Math.random() * 720}deg)`, opacity: 0 }
        ], {
            duration: 2000 + Math.random() * 2000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
        
        animation.onfinish = () => confetti.remove();
    }
}

// Stats Animation
function initStats() {
    const serverCount = document.getElementById('serverCount');
    const userCount = document.getElementById('userCount');
    const commandCount = document.getElementById('commandCount');
    const uptime = document.getElementById('uptime');

    // Animate numbers
    if (serverCount) animateNumber(serverCount, CONFIG.bot.servers);
    if (userCount) animateNumber(userCount, CONFIG.bot.users);
    if (commandCount) animateNumber(commandCount, CONFIG.bot.commandsUsed);
    if (uptime) uptime.textContent = CONFIG.bot.uptime;
}

function animateNumber(element, target) {
    const duration = 2000;
    const start = 0;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + (target - start) * easeOutQuart);
        
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

// Twitch Integration
function initTwitch() {
    // This can be enhanced later with actual Twitch API integration
    const twitchContent = document.getElementById('twitchContent');
    
    if (CONFIG.twitch.enabled && twitchContent) {
        // Future: Fetch real Twitch status
        console.log('Twitch integration enabled for channel:', CONFIG.twitch.channel);
    }
}

// Footer Text Animation (10 second interval)
function initFooterText() {
    const footerText = document.getElementById('footerText');
    
    if (!footerText || CONFIG.footerTexts.length <= 1) return;

    let textIndex = 0;

    setInterval(() => {
        textIndex = (textIndex + 1) % CONFIG.footerTexts.length;
        
        // Smooth fade transition
        footerText.style.opacity = '0';
        
        setTimeout(() => {
            footerText.textContent = CONFIG.footerTexts[textIndex];
            footerText.style.opacity = '1';
        }, 500);
    }, 10000);
}

// Scroll Animations
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe elements with animate-on-scroll class
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // Add navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });
}

// Navigation Active State
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link, .bottom-nav-item');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            if (link.classList.contains('nav-link')) {
                link.classList.add('active');
                
                // Also update bottom nav
                const href = link.getAttribute('href');
                document.querySelectorAll('.bottom-nav-item').forEach(item => {
                    if (item.getAttribute('href') === href) {
                        item.classList.add('active');
                    } else {
                        item.classList.remove('active');
                    }
                });
            } else if (link.classList.contains('bottom-nav-item')) {
                link.classList.add('active');
                
                // Also update top nav
                const href = link.getAttribute('href');
                document.querySelectorAll('.nav-link').forEach(item => {
                    if (item.getAttribute('href') === href) {
                        item.classList.add('active');
                    } else {
                        item.classList.remove('active');
                    }
                });
            }
        });
    });

    // Update active state on scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// Color Picker
function initColorPicker() {
    const colorPickerPopin = document.getElementById('colorPickerPopin');
    const bgColorPicker = document.getElementById('bgColorPicker');
    
    if (!colorPickerPopin || !bgColorPicker || !CONFIG.theme.allowCustomColor) return;

    // Show color picker on hover
    colorPickerPopin.addEventListener('mouseenter', () => {
        colorPickerPopin.classList.add('active');
    });

    colorPickerPopin.addEventListener('mouseleave', () => {
        colorPickerPopin.classList.remove('active');
    });

    // Apply custom color
    bgColorPicker.addEventListener('input', (e) => {
        const color = e.target.value;
        document.documentElement.style.setProperty('--bg-primary', color);
        localStorage.setItem('customBgColor', color);
    });

    // Load saved color
    const savedColor = localStorage.getItem('customBgColor');
    if (savedColor) {
        bgColorPicker.value = savedColor;
        document.documentElement.style.setProperty('--bg-primary', savedColor);
    }
}

// Admin Panel Access Check
function checkAdminAccess() {
    if (!CONFIG.admin.enabled || !CONFIG.admin.githubUsername) return;

    // Simple check - in production, you'd want proper authentication
    const urlParams = new URLSearchParams(window.location.search);
    const user = urlParams.get('github_user');
    
    if (user === CONFIG.admin.githubUsername) {
        const adminPanel = document.getElementById('adminPanel');
        if (adminPanel) {
            adminPanel.style.display = 'flex';
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
        // German flag
        flagIcon.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480"%3E%3Cpath fill="%23000" d="M0 0h640v160H0z"/%3E%3Cpath fill="%23D00" d="M0 160h640v160H0z"/%3E%3Cpath fill="%23FFCE00" d="M0 320h640v160H0z"/%3E%3C/svg%3E';
        flagIcon.alt = 'DE';
    } else {
        // UK flag
        flagIcon.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480"%3E%3Crect fill="%23012169" width="640" height="480"/%3E%3Cpath fill="%23FFF" d="M0 0L640 0L640 480L0 480z"/%3E%3C/svg%3E';
        flagIcon.alt = 'EN';
    }
}

// Console Easter Egg
console.log('%c🌑 Team Darkness Bot Website', 'font-size: 20px; font-weight: bold; color: #7c3aed;');
console.log('%cWelcome developer! Looking for secrets?', 'font-size: 14px; color: #a855f7;');
console.log('%cTry clicking the logo 7 times...', 'font-size: 12px; color: #ec4899;');
