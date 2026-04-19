// Configuration file for Team Darkness Bot Website
// Easy to edit - No development knowledge required!

const CONFIG = {
    // Bot Information
    bot: {
        version: '1.0.0',
        name: 'Team Darkness Bot',
        status: 'online', // 'online' or 'offline'
        servers: 150,
        users: 5000,
        commandsUsed: 125000,
        uptime: '15d 8h'
    },

    // Twitch Integration
    twitch: {
        enabled: true,
        channel: 'teamdarkness',
        live: false
    },

    // News Ticker (appears in Dynamic Island)
    news: [
        'Welcome to Team Darkness!',
        'New features coming soon!',
        'Join our Discord server!',
        'Check out the latest updates!'
    ],

    // Footer Text Alternatives (switches every 10 seconds)
    footerTexts: [
        'Made with ❤️ for the Team Darkness community.',
        'Built by the team, for the community.',
        'Empowering darkness, one user at a time.',
        'Where innovation meets community.'
    ],

    // Language Support
    languages: {
        en: {
            flag: '🇬🇧',
            name: 'English'
        },
        de: {
            flag: '🇩🇪',
            name: 'Deutsch'
        }
    },

    // Admin Settings (for Github Owner only)
    admin: {
        // Add your GitHub username here to enable admin panel
        githubUsername: '', // e.g., 'yourusername'
        enabled: false
    },

    // Easter Egg Settings
    easterEgg: {
        clicksRequired: 7, // Number of logo clicks to trigger
        enabled: true
    },

    // Theme Settings
    theme: {
        default: 'dark', // 'dark' or 'light'
        allowCustomColor: true
    },

    // Colors
    colors: {
        primary: '#7c3aed',
        secondary: '#a855f7',
        accent: '#ec4899'
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
