# Interactive Portfolio

This is a modern, interactive portfolio built with React (Vite), Framer Motion, and Vanilla CSS.

## Features
- **Black Themed**: Premium dark mode aesthetic.
- **Interactive**: Smooth animations and hover effects using Framer Motion.
- **Discord Status**: Real-time integration with Discord presence via Lanyard API.

## Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

## Customization

### Discord Status
To show your actual Discord status:
1. Join the [Lanyard Discord Server](https://discord.gg/lanyard) (required for the API to track you).
2. Open `src/DiscordStatus.jsx`.
3. Replace the `DISCORD_ID` constant with your Discord User ID.
   ```javascript
   const DISCORD_ID = 'YOUR_ID_HERE';
   ```

### Projects
Edit the `projects` section in `src/App.jsx` to add your own work.
