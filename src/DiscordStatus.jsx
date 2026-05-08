import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Disc, Gamepad2, Headphones, Code2 } from 'lucide-react';

const DISCORD_ID = '1116627987404701706';

const DiscordStatus = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`);
                const result = await response.json();
                if (result.success) {
                    setData(result.data);
                }
            } catch (error) {
                console.error("Error fetching Discord status:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 30000);
        return () => clearInterval(interval);
    }, []);

    if (loading) return <div className="text-gray-500">Loading Status...</div>;
    if (!data) return null;

    const { discord_user, discord_status, activities } = data;

    const customStatus = activities.find(act => act.type === 4);
    const primaryActivity = customStatus || activities[0];

    // RGB values for the pulse animation variable
    const statusInfo = {
        online: { color: '#22c55e', rgb: '34, 197, 94' },
        idle: { color: '#eab308', rgb: '234, 179, 8' },
        dnd: { color: '#ef4444', rgb: '239, 68, 68' },
        offline: { color: '#737373', rgb: '115, 115, 115' }
    }[discord_status] || { color: '#737373', rgb: '115, 115, 115' };

    const ActivityIcon = () => {
        if (!primaryActivity) return <Disc size={16} />;
        if (primaryActivity.type === 4 && primaryActivity.emoji) {
            return <span>{primaryActivity.emoji.name}</span>;
        }
        if (primaryActivity.type === 0) return <Gamepad2 size={16} />;
        if (primaryActivity.type === 2) return <Headphones size={16} />;
        return <Code2 size={16} />;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="glass-panel"
            style={{
                borderRadius: '16px',
                padding: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1.25rem',
                maxWidth: '380px',
                margin: '0 auto',
                fontFamily: "'Inter', sans-serif",
                ['--status-rgb']: statusInfo.rgb // CSS Variable for pulse
            }}
        >
            <div style={{ position: 'relative' }}>
                <img
                    src={`https://cdn.discordapp.com/avatars/${discord_user.id}/${discord_user.avatar}.png`}
                    alt={discord_user.username}
                    style={{
                        width: '54px',
                        height: '54px',
                        borderRadius: '50%',
                        border: `2px solid ${statusInfo.color}`,
                        boxShadow: `0 0 15px ${statusInfo.color}40` // Subtle glow
                    }}
                />

                {/* Pulsing Status Dot */}
                <div
                    className="status-indicator"
                    style={{ backgroundColor: statusInfo.color }}
                />
            </div>

            <div style={{ textAlign: 'left', lineHeight: '1.4' }}>
                <div style={{
                    color: '#fff',
                    fontWeight: '700',
                    fontSize: '1.1rem',
                    letterSpacing: '0.01em'
                }}>
                    {discord_user.username}
                </div>

                {primaryActivity ? (
                    <div style={{
                        color: '#bbb',
                        fontSize: '0.9rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginTop: '4px'
                    }}>
                        <ActivityIcon />
                        <span style={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            maxWidth: '190px'
                        }}>
                            {primaryActivity.type === 4
                                ? (primaryActivity.state || "Custom Status")
                                : primaryActivity.name}
                        </span>
                    </div>
                ) : (
                    <div style={{ color: '#666', fontSize: '0.9rem', marginTop: '4px' }}>
                        {discord_status.charAt(0).toUpperCase() + discord_status.slice(1)}
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default DiscordStatus;
