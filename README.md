# ⚔️ Minimalist Pomodoro RPG

A Neo-Brutalism inspired web application that gamifies the Pomodoro productivity technique. Track your focus sessions, earn XP and gold, and build your inventory with retro pixel items.

## Features:

### State Management
- **GameState Object** - Centralized state tracking for:
  - Timer (remaining time, active status, Work/Break mode)
  - Character Stats (Level, XP, Gold)
  - Inventory (purchased items)

### Core Gameplay
- **25-Minute Pomodoro Timer** - Standard focus session with setInterval
- **Auto-Break Toggle** - Switches to 5-minute break when timer completes
- **Retro Beep Alert** - Web Audio API sound on completion
- **XP & Gold Rewards** - +20 XP and +15 Gold per completed session
- **Level-Up System** - Automatic progression at 100 XP thresholds

### UI & Design
- **Neo-Brutalism Aesthetic**
  - Ultra-bright neon yellow (#FFFF00) and electric blue (#00D9FF)
  - Thick 6px solid black borders
  - Hard crisp geometric drop-shadows (no blur)
  - Oversized bold monospace typography (JetBrains Mono)
  - Asymmetrical grid layout

### Shop System
- **5 Purchasable Items**
  - Pixel Sword (30 Gold)
  - Retro Boots (50 Gold)
  - Magic Shield (75 Gold)
  - Ancient Scroll (100 Gold)
  - Golden Crown (150 Gold)
- **Gold Validation** - Prevents purchase without sufficient funds
- **Inventory Tracking** - Displays quantity of each item

### Data Persistence
- **LocalStorage Auto-Save** - Game state persists across page refreshes
- **Complete State Backup** - All progress preserved (timer, stats, inventory)

## 🚀 Usage

1. **Clone or download** the repository
2. **Open `index.html`** in a modern web browser
3. **Click START** to begin a 25-minute work session
4. **Complete sessions** to earn XP and Gold
5. **Visit the Shop** to purchase items
6. **Check Inventory** to see your collected items

## 📁 File Structure

```
minimalist-pomodoro-rpg/
├── index.html          # Main HTML structure & Neo-Brutalism styles
├── script.js           # Game logic, state management, UI updates
└── README.md           # Documentation
```

## 🛠️ Technologies

- **HTML5** - Semantic markup
- **Vanilla JavaScript** - No frameworks, pure state management
- **Tailwind CSS** - Utility-first styling
- **Web Audio API** - Retro beep sound generation
- **LocalStorage API** - Client-side data persistence

## 🎨 Design System

### Colors
- Primary Yellow: `#FFFF00`
- Primary Cyan: `#00D9FF`
- Text/Borders: `#000000`

### Typography
- Font: JetBrains Mono (700-800 weight)
- Letter Spacing: 2-3px
- Sizes: Oversized and bold for maximum impact

### Components
- **neo-card** - 6px border, hard drop-shadow
- **neo-btn** - 5px border, 8px offset shadow, hover/active states
- **xp-bar** - Gradient fill with live percentage update
- **stat-badge** - Inline display for Level and Gold

## 🎯 Game Mechanics

1. **Start Timer** - Begins 25-minute work session
2. **Focus Work** - Timer counts down in MM:SS format
3. **Completion** - Beep sound + rewards (20 XP, 15 Gold)
4. **Break Mode** - Auto-switches to 5-minute break
5. **Level Up** - At 100 XP, resets to 0 and increases level
6. **Shop** - Spend gold to acquire items
7. **Inventory** - View and track your collection

## 💾 LocalStorage Schema

```json
{
  "timer": {
    "remaining": 1500,
    "active": false,
    "mode": "Work",
    "originalDuration": 1500
  },
  "character": {
    "level": 3,
    "xp": 45,
    "xpNeeded": 100,
    "gold": 95
  },
  "inventory": [
    { "id": 1, "name": "Pixel Sword", "cost": 30, "emoji": "⚔️" }
  ]
}
```

## 🌐 Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Any modern browser with ES6 support

## 📝 License

Open source - feel free to fork, modify, and share!

---

**Stay focused. Level up. Conquer your day.** ⚔️
