
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

function blackhole(element) {
    const container = document.querySelector(element);
    const h = container.offsetHeight;
    const w = container.offsetWidth;
    const cw = w;
    const ch = h;
    const maxorbit = 255; // distance from center
    const centery = ch / 2;
    const centerx = cw / 2;

    const startTime = new Date().getTime();
    let currentTime = 0;

    const stars = [];
    let collapse = false; // if hovered
    let expanse = false; // if clicked
    let returning = false; // if particles are returning to orbit

    // Create canvas
    const canvas = document.createElement('canvas');
    canvas.width = cw;
    canvas.height = ch;
    container.appendChild(canvas);
    const context = canvas.getContext("2d");

    context.globalCompositeOperation = "multiply";

    function setDPI(canvas, dpi) {
        // Set up CSS size if it's not set up already
        if (!canvas.style.width)
            canvas.style.width = canvas.width + 'px';
        if (!canvas.style.height)
            canvas.style.height = canvas.height + 'px';

        const scaleFactor = dpi / 96;
        canvas.width = Math.ceil(canvas.width * scaleFactor);
        canvas.height = Math.ceil(canvas.height * scaleFactor);
        const ctx = canvas.getContext('2d');
        ctx.scale(scaleFactor, scaleFactor);
    }

    function rotate(cx, cy, x, y, angle) {
        const radians = angle;
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);
        const nx = (cos * (x - cx)) + (sin * (y - cy)) + cx;
        const ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
        return [nx, ny];
    }

    setDPI(canvas, 192);

    class Star {
        constructor() {
            // Get a weighted random number, so that the majority of stars will
            // form in the center of the orbit
            const rands = [];
            rands.push(Math.random() * (maxorbit / 2) + 1);
            rands.push(Math.random() * (maxorbit / 2) + maxorbit);

            this.orbital = (rands.reduce((p, c) => p + c, 0) / rands.length);

            this.x = centerx; // All of these stars are at the center x position at all times
            this.y = centery + this.orbital; // Set Y position starting at the center y + the position in the orbit

            this.yOrigin = centery + this.orbital; // this is used to track the particles origin

            this.speed = (Math.floor(Math.random() * 2.5) + 1.5) * Math.PI / 180; // The rate at which this star will orbit
            this.rotation = 0; // current Rotation
            this.startRotation = (Math.floor(Math.random() * 360) + 1) * Math.PI / 180; // Starting rotation

            this.id = stars.length; // This will be used when expansion takes place

            this.collapseBonus = this.orbital - (maxorbit * 0.7); // This "bonus" is used to randomly place some stars outside of the blackhole on hover
            if (this.collapseBonus < 0) { // if the collapse "bonus" is negative
                this.collapseBonus = 0; // set it to 0, this way no stars will go inside the blackhole
            }

            this.color = 'rgba(255,255,255,' + (1 - ((this.orbital) / 255)) + ')'; // Color the star white, but make it more transparent the further out it is generated

            this.hoverPos = centery + (maxorbit / 2) + this.collapseBonus; // Where the star will go on hover of the blackhole
            this.expansePos = centery + (this.id % 100) * -10 + (Math.floor(Math.random() * 20) + 1); // Where the star will go when expansion takes place

            this.prevR = this.startRotation;
            this.prevX = this.x;
            this.prevY = this.y;

            // Store original position for returning
            this.originalY = this.yOrigin;

            stars.push(this);
        }

        draw() {
            if (!expanse && !returning) {
                this.rotation = this.startRotation + (currentTime * this.speed);
                if (!collapse) { // not hovered
                    if (this.y > this.yOrigin) {
                        this.y -= 2.5;
                    }
                    if (this.y < this.yOrigin - 4) {
                        this.y += (this.yOrigin - this.y) / 10;
                    }
                } else { // on hover
                    this.trail = 1;
                    if (this.y > this.hoverPos) {
                        this.y -= (this.hoverPos - this.y) / -5;
                    }
                    if (this.y < this.hoverPos - 4) {
                        this.y += 2.5;
                    }
                }
            } else if (expanse && !returning) {
                this.rotation = this.startRotation + (currentTime * (this.speed / 2));
                if (this.y > this.expansePos) {
                    this.y -= Math.floor(this.expansePos - this.y) / -80; // Slower expansion for better visibility
                }
            } else if (returning) {
                // Returning to original orbit slowly
                this.rotation = this.startRotation + (currentTime * this.speed);
                if (Math.abs(this.y - this.originalY) > 2) {
                    this.y += (this.originalY - this.y) / 50; // Much slower return
                } else {
                    this.y = this.originalY;
                    this.yOrigin = this.originalY;
                }
            }

            context.save();
            context.fillStyle = this.color;
            context.strokeStyle = this.color;
            context.beginPath();
            const oldPos = rotate(centerx, centery, this.prevX, this.prevY, -this.prevR);
            context.moveTo(oldPos[0], oldPos[1]);
            context.translate(centerx, centery);
            context.rotate(this.rotation);
            context.translate(-centerx, -centery);
            context.lineTo(this.x, this.y);
            context.stroke();
            context.restore();

            this.prevR = this.rotation;
            this.prevX = this.x;
            this.prevY = this.y;
        }
    }

    // Event listeners
    const centerHover = document.querySelector('.centerHover');

    centerHover.addEventListener('click', function() {
        collapse = false;
        expanse = true;
        returning = false;
        this.classList.add('open');

        document.querySelector('.navbar').classList.add('visible');
        document.querySelector('main').classList.add('visible');
    });

    centerHover.addEventListener('mouseover', function() {
        if (expanse === false) {
            collapse = true;
        }
    });

    centerHover.addEventListener('mouseout', function() {
        if (expanse === false) {
            collapse = false;
        }
    });

    // Animation loop
    function loop() {
        const now = new Date().getTime();
        currentTime = (now - startTime) / 50;

        context.fillStyle = 'rgba(25,25,25,0.2)'; // somewhat clear the context, this way there will be trails behind the stars
        context.fillRect(0, 0, cw, ch);

        for (let i = 0; i < stars.length; i++) { // For each star
            if (stars[i] !== undefined) {
                stars[i].draw(); // Draw it
            }
        }

        requestAnimationFrame(loop);
    }

    function init() {
        context.fillStyle = 'rgba(25,25,25,1)'; // Initial clear of the canvas
        context.fillRect(0, 0, cw, ch);
        for (let i = 0; i < 2500; i++) { // create 2500 stars
            new Star();
        }
        loop();
    }

    init();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    blackhole('#blackhole');
});
