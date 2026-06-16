// ========== GAME STATE MANAGEMENT ==========
const GameState = {
    timer: {
        remaining: 25 * 60, // 25 minutes in seconds
        active: false,
        mode: 'Work', // 'Work' or 'Break'
        originalDuration: 25 * 60
    },
    character: {
        level: 1,
        xp: 0,
        xpNeeded: 100,
        gold: 0
    },
    inventory: [],
    intervalId: null
};

// ========== SHOP ITEMS ==========
const SHOP_ITEMS = [
    { id: 1, name: 'Pixel Sword', cost: 30, emoji: '⚔️' },
    { id: 2, name: 'Retro Boots', cost: 50, emoji: '👢' },
    { id: 3, name: 'Magic Shield', cost: 75, emoji: '🛡️' },
    { id: 4, name: 'Ancient Scroll', cost: 100, emoji: '📜' },
    { id: 5, name: 'Golden Crown', cost: 150, emoji: '👑' }
];

// ========== LOCAL STORAGE ==========
const saveGame = () => {
    localStorage.setItem('pomodoroRPG', JSON.stringify(GameState));
};

const loadGame = () => {
    const saved = localStorage.getItem('pomodoroRPG');
    if (saved) {
        const loaded = JSON.parse(saved);
        Object.assign(GameState, loaded);
    }
};

// ========== SOUND ALERT ==========
const playBeep = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
};

// ========== UI UPDATES ==========
const updateTimerDisplay = () => {
    const mins = Math.floor(GameState.timer.remaining / 60);
    const secs = GameState.timer.remaining % 60;
    document.getElementById('timerDisplay').textContent = 
        `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

const updateCharacterDisplay = () => {
    document.getElementById('levelDisplay').textContent = GameState.character.level;
    document.getElementById('goldDisplay').textContent = GameState.character.gold;
    
    const xpPercent = (GameState.character.xp / GameState.character.xpNeeded) * 100;
    document.getElementById('xpFill').style.width = xpPercent + '%';
    document.getElementById('xpText').textContent = `${GameState.character.xp}/${GameState.character.xpNeeded}`;
};

const updateModeDisplay = () => {
    const modeDisplay = document.getElementById('modeDisplay');
    if (GameState.timer.mode === 'Work') {
        modeDisplay.textContent = '🔴 WORK MODE';
    } else {
        modeDisplay.textContent = '🟢 BREAK MODE';
    }
};

const renderShop = () => {
    const shopContainer = document.getElementById('shopContainer');
    shopContainer.innerHTML = SHOP_ITEMS.map(item => `
        <div class="neo-card p-4" style="display: flex; justify-content: space-between; align-items: center;">
            <div>
                <div style="font-size: 1.5rem; margin-bottom: 4px;">${item.emoji}</div>
                <div style="font-size: 0.9rem; font-weight: 800;">${item.name}</div>
                <div style="font-size: 0.8rem; color: #666;">💰 ${item.cost}</div>
            </div>
            <button class="neo-btn neo-btn-blue" onclick="buyItem(${item.id})" style="padding: 8px 12px; font-size: 0.9rem;">BUY</button>
        </div>
    `).join('');
};

const renderInventory = () => {
    const inventoryContainer = document.getElementById('inventoryContainer');
    
    if (GameState.inventory.length === 0) {
        inventoryContainer.innerHTML = '<div style="color: #666; font-size: 0.9rem;">EMPTY</div>';
        return;
    }

    const itemCounts = {};
    GameState.inventory.forEach(item => {
        itemCounts[item.name] = (itemCounts[item.name] || 0) + 1;
    });

    inventoryContainer.innerHTML = Object.entries(itemCounts).map(([name, count]) => {
        const item = SHOP_ITEMS.find(i => i.name === name);
        return `
            <div class="inventory-item inventory-item-blue" style="flex: 1; min-width: 150px; text-align: center;">
                <div style="font-size: 1.8rem; margin-bottom: 4px;">${item.emoji}</div>
                <div style="font-size: 0.8rem; font-weight: 800;">${name}</div>
                <div style="font-size: 1rem; font-weight: 800; color: #000;">×${count}</div>
            </div>
        `;
    }).join('');
};

// ========== GAME LOGIC ==========
const rewardCompletion = () => {
    GameState.character.xp += 20;
    GameState.character.gold += 15;

    // Level up check
    if (GameState.character.xp >= GameState.character.xpNeeded) {
        GameState.character.xp = 0;
        GameState.character.level += 1;
    }

    saveGame();
    updateCharacterDisplay();
};

const toggleTimer = () => {
    GameState.timer.active = !GameState.timer.active;

    if (GameState.timer.active) {
        document.getElementById('startBtn').textContent = 'RUNNING...';
        GameState.intervalId = setInterval(() => {
            GameState.timer.remaining--;

            if (GameState.timer.remaining <= 0) {
                clearInterval(GameState.intervalId);
                playBeep();
                rewardCompletion();

                // Toggle mode
                if (GameState.timer.mode === 'Work') {
                    GameState.timer.mode = 'Break';
                    GameState.timer.remaining = 5 * 60;
                    GameState.timer.originalDuration = 5 * 60;
                } else {
                    GameState.timer.mode = 'Work';
                    GameState.timer.remaining = 25 * 60;
                    GameState.timer.originalDuration = 25 * 60;
                }

                GameState.timer.active = false;
                updateModeDisplay();
                updateTimerDisplay();
                document.getElementById('startBtn').textContent = 'START';
            }

            updateTimerDisplay();
            saveGame();
        }, 1000);
    } else {
        clearInterval(GameState.intervalId);
        document.getElementById('startBtn').textContent = 'START';
    }
};

const pauseTimer = () => {
    if (GameState.timer.active) {
        clearInterval(GameState.intervalId);
        GameState.timer.active = false;
        document.getElementById('startBtn').textContent = 'START';
    }
};

const resetTimer = () => {
    if (GameState.timer.active) {
        clearInterval(GameState.intervalId);
        GameState.timer.active = false;
    }
    GameState.timer.remaining = GameState.timer.originalDuration;
    GameState.timer.mode = 'Work';
    GameState.timer.originalDuration = 25 * 60;
    GameState.timer.remaining = 25 * 60;
    updateTimerDisplay();
    updateModeDisplay();
    document.getElementById('startBtn').textContent = 'START';
    saveGame();
};

const buyItem = (itemId) => {
    const item = SHOP_ITEMS.find(i => i.id === itemId);
    
    if (GameState.character.gold >= item.cost) {
        GameState.character.gold -= item.cost;
        GameState.inventory.push(item);
        updateCharacterDisplay();
        renderInventory();
        saveGame();
    } else {
        alert('NOT ENOUGH GOLD!');
    }
};

// ========== EVENT LISTENERS ==========
document.getElementById('startBtn').addEventListener('click', toggleTimer);
document.getElementById('pauseBtn').addEventListener('click', pauseTimer);
document.getElementById('resetBtn').addEventListener('click', resetTimer);

// ========== INITIALIZATION ==========
const init = () => {
    loadGame();
    updateTimerDisplay();
    updateCharacterDisplay();
    updateModeDisplay();
    renderShop();
    renderInventory();
};

init();