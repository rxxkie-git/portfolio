
const video = document.getElementById('background-video');
const muteBtn = document.getElementById('mute-btn');

muteBtn.addEventListener('click', () => {
    video.muted = !video.muted;
    muteBtn.innerHTML = video.muted ? '<i class="fas fa-volume-mute"></i>' : '<i class="fas fa-volume-up"></i>';
});

function updateClock() {
    const clockElement = document.getElementById("corner-clock");
    if (!clockElement) return;

    const now = new Date();
    const hours = (now.getHours() % 12) || 12; 
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const ampm = now.getHours() >= 12 ? 'PM' : 'AM';

    clockElement.innerHTML = `
        <span id="corner-hours">${hours}</span>:<span id="corner-minutes">${minutes}</span>:<span id="corner-seconds">${seconds}</span>
        <span id="corner-ampm">${ampm}</span>
    `;
}

updateClock();
setInterval(updateClock, 1000);

const scrollToTop = document.getElementById('scroll-to-top');

window.addEventListener('scroll', () => {
    if (scrollToTop) {
        scrollToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
    }
});

scrollToTop?.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

function manageViewCount() {
    const VIEW_COUNT_KEY = 'viewCount';
    const VISIT_FLAG_KEY = 'hasVisited';
    const SESSION_FLAG_KEY = 'sessionActive';
    const viewCountElement = document.getElementById('view-count');

    if (!viewCountElement) return;

    // Check if this is a new session
    const isNewSession = !sessionStorage.getItem(SESSION_FLAG_KEY);
    
    // Initialize storage if needed
    if (!localStorage.getItem(VIEW_COUNT_KEY)) {
        localStorage.setItem(VIEW_COUNT_KEY, '0');
    }

    // Only increment count for new sessions
    if (isNewSession) {
        const currentCount = parseInt(localStorage.getItem(VIEW_COUNT_KEY));
        localStorage.setItem(VIEW_COUNT_KEY, (currentCount + 1).toString());
        sessionStorage.setItem(SESSION_FLAG_KEY, 'true');
    }

    // Format the view count with commas for better readability
    const formattedCount = parseInt(localStorage.getItem(VIEW_COUNT_KEY))
        .toLocaleString('en-US');
    viewCountElement.textContent = formattedCount;
}

// Run on page load
manageViewCount();

const DISCORD_USER_ID = '758602811578646548';
const LANYARD_API_URL = `https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`;
const REFRESH_INTERVAL = 15000; 

const DISCORD_BADGES = {
    DISCORD_STAFF: { flag: 1, name: 'Staff', icon: 'path-to-icons/staff-icon.png' },
    PARTNER: { flag: 2, name: 'Partner', icon: 'path-to-icons/partner-icon.png' },
    HYPESQUAD_BRAVERY: { flag: 64, name: 'HypeSquad Bravery', icon: 'path-to-icons/bravery-icon.png' },
    HYPESQUAD_BRILLIANCE: { flag: 128, name: 'HypeSquad Brilliance', icon: "https://cdn3.emoji.gg/emojis/6936-hypesquad-brilliance.png" },
    HYPESQUAD_BALANCE: { flag: 256, name: 'HypeSquad Balance', icon: 'https://img.icons8.com/?size=100&id=B1RNuFJol4fr&format=png&color=000000' },
    EARLY_SUPPORTER: { flag: 512, name: 'Early Supporter', icon: 'path-to-icons/early-supporter-icon.png' },
    VERIFIED_BOT_DEVELOPER: { flag: 16384, name: 'Verified Bot Developer', icon: 'path-to-icons/verified-icon.png' }
};

async function updateDiscordStatus() {
    try {
        const response = await fetch(LANYARD_API_URL);
        if (!response.ok) throw new Error('Network response was not ok');
        
        const { success, data } = await response.json();
        if (!success) throw new Error('API response indicated failure');

        updateDiscordUI(data);
    } catch (error) {
        console.error('Failed to fetch Discord data:', error);
    }
}

function updateDiscordUI(discordData) {
    const avatarElement = document.getElementById('discord-avatar');
    if (avatarElement) {
        const avatarUrl = discordData.discord_user.avatar
            ? `https://cdn.discordapp.com/avatars/${discordData.discord_user.id}/${discordData.discord_user.avatar}.png`
            : 'default-avatar.png';
        avatarElement.src = avatarUrl;
    }

    const usernameElement = document.getElementById('discord-username');
    if (usernameElement) {
        usernameElement.textContent = discordData.discord_user.username;
    }

    const statusBadgeElement = document.getElementById('discord-status-badge');
    if (statusBadgeElement) {
        statusBadgeElement.textContent = discordData.discord_status;
        statusBadgeElement.className = `status-badge ${discordData.discord_status}`;
    }

    const statusElement = document.getElementById('discord-status');
    if (statusElement) {
        statusElement.textContent = discordData.activities.length > 0
            ? discordData.activities[0].state || 'No activity'
            : 'No custom status';
    }

    updateDiscordBadges(discordData.discord_user.public_flags);
}

function updateDiscordBadges(flags) {
    const badgesContainer = document.getElementById('discord-badges');
    if (!badgesContainer || !flags) return;

    badgesContainer.innerHTML = '';

    Object.entries(DISCORD_BADGES).forEach(([_, badge]) => {
        if (flags & badge.flag) {
            const badgeElement = document.createElement('div');
            badgeElement.className = `badge ${badge.name.toLowerCase().replace(/\s+/g, '-')}`;
            badgeElement.innerHTML = `<img src="${badge.icon}" alt="${badge.name}" title="${badge.name}">`;
            badgesContainer.appendChild(badgeElement);
        }
    });
}

updateDiscordStatus();
setInterval(updateDiscordStatus, REFRESH_INTERVAL);

if (typeof AOS !== 'undefined') {
    AOS.init();
}
