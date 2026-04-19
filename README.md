# Team Darkness - Bot Website

A modern, feature-rich website for the Team Darkness Discord Bot, designed for GitHub Pages.

## ✨ Features

- **Dynamic Island**: Real-time bot status, version, and news ticker
- **Magical Mouse Cursor**: Animated cursor with glow effect
- **Animated Background**: Topographic pattern with blur grid and color picker
- **Easter Egg**: Click the logo 7 times to unlock a secret!
- **Dark/Light Mode**: Smooth theme transitions
- **Stats Cards**: Animated statistics with smooth glow effects
- **Twitch Integration**: Live status and connection features
- **Updates & Changelogs**: Dedicated page for news and updates
- **Admin Panel**: Easy content management for GitHub owners
- **Language Support**: English and German flags
- **Responsive Design**: Works on all devices

## 🚀 Deployment

### GitHub Pages Setup

1. Push these files to your GitHub repository
2. Go to Settings → Pages
3. Select your branch (main/master)
4. Your site will be live at `https://yourusername.github.io/repo-name`

### Configuration

Edit `config.js` to customize:
- Bot information (version, status, stats)
- Twitch channel settings
- News ticker messages
- Footer text alternatives
- Admin GitHub username
- Easter egg settings

### Adding Changelogs & News

**Option 1: Edit JSON files directly**
- `changelogs.json` - Add/edit changelog entries
- `news.json` - Add/edit news articles

**Option 2: Use the Admin Panel**
1. Set your GitHub username in `config.js`
2. Access: `updates.html?github_user=YOUR_USERNAME`
3. Use the forms to add content

## 📁 File Structure

```
├── index.html          # Main homepage
├── updates.html        # Updates & Changelogs page
├── styles.css          # Main stylesheet
├── updates.css         # Updates page styles
├── app.js              # Main application logic
├── updates.js          # Updates page logic
├── config.js           # Easy configuration file
├── changelogs.json     # Changelog data
└── news.json           # News data
```

## 🎨 Customization

### Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --accent-primary: #7c3aed;
    --gradient-start: #7c3aed;
    --gradient-end: #ec4899;
}
```

### Background Color
Use the color picker (bottom right) or edit in `config.js`

### Logo
Replace the emoji in `index.html`:
```html
<span class="logo-icon">🌑</span>
```

## 🔧 Bot Integration

To sync with your actual bot:

1. Create a `bot-api.js` file that fetches real data
2. Update `CONFIG.bot` values in `app.js`
3. Connect to your bot's API endpoint

Example:
```javascript
async function fetchBotStats() {
    const response = await fetch('YOUR_BOT_API/stats');
    const data = await response.json();
    // Update CONFIG values
}
```

## 🐛 Troubleshooting

- **Cursor not showing**: Check browser compatibility
- **Animations not working**: Ensure JavaScript is enabled
- **Admin panel not visible**: Verify GitHub username in config
- **JSON not loading**: Check file paths are correct

## 📝 License

Made with ❤️ for the Team Darkness community.
