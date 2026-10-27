import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, Smartphone, QrCode } from 'lucide-react';

const UPI_ID = '5420380.x.srinand-1@okhdfcbank';
const PAYEE_NAME = 'Srinand Nihal';

const PaymentModal = ({ isOpen, onClose }) => {
    const [copied, setCopied] = useState(false);

    const upiLink = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(PAYEE_NAME)}&cu=INR`;
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&background=ffffff&color=000000&margin=2&data=${encodeURIComponent(upiLink)}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(UPI_ID);
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
    };

    if (!isOpen) return null;

    return createPortal(
        <AnimatePresence>
            <div
                style={{
                    position: 'fixed',
                    inset: 0,
                    background: 'rgba(0, 0, 0, 0.85)',
                    backdropFilter: 'blur(16px)',
                    zIndex: 99999,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1.5rem'
                }}
                onClick={onClose}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 15 }}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        padding: '2.5rem',
                        borderRadius: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        maxWidth: '420px',
                        width: '100%',
                        position: 'relative',
                        fontFamily: "'Space Grotesk', sans-serif",
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        background: '#090909',
                        boxShadow: '0 25px 80px rgba(0, 0, 0, 0.95)'
                    }}
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        style={{
                            position: 'absolute',
                            top: '1.5rem',
                            right: '1.5rem',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '50%',
                            width: '36px',
                            height: '36px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#ffffff',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                    >
                        <X size={18} />
                    </button>

                    {/* Header */}
                    <div style={{ width: '100%', textAlign: 'left', marginBottom: '1.75rem' }}>
                        <span
                            style={{
                                fontSize: '0.72rem',
                                fontFamily: "'JetBrains Mono', monospace",
                                color: '#38bdf8',
                                letterSpacing: '0.08em',
                                textTransform: 'uppercase'
                            }}
                        >
                            SUPPORT THE CRAFT
                        </span>
                        <h3
                            style={{
                                fontSize: '1.8rem',
                                fontWeight: 700,
                                color: '#ffffff',
                                margin: '0.4rem 0 0.3rem 0',
                                letterSpacing: '-0.02em'
                            }}
                        >
                            Support Srinand
                        </h3>
                        <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.85rem', fontFamily: "'Inter', sans-serif", margin: 0 }}>
                            Direct UPI contribution towards open-source work and AI experiments.
                        </p>
                    </div>

                    {/* QR Code Container */}
                    <div
                        style={{
                            background: '#ffffff',
                            padding: '1rem',
                            borderRadius: '12px',
                            boxShadow: '0 10px 30px rgba(255, 255, 255, 0.05)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: '1.5rem'
                        }}
                    >
                        <img
                            src={qrCodeUrl}
                            alt="Scan to pay UPI"
                            style={{ width: '200px', height: '200px', display: 'block' }}
                        />
                    </div>

                    {/* Payee Details */}
                    <div
                        style={{
                            width: '100%',
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            borderRadius: '12px',
                            padding: '1rem',
                            marginBottom: '1.25rem'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                            <span style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.5)', fontFamily: "'JetBrains Mono', monospace" }}>
                                PAYEE:
                            </span>
                            <span style={{ fontSize: '0.85rem', color: '#ffffff', fontWeight: 600, fontFamily: "'Inter', sans-serif" }}>
                                {PAYEE_NAME}
                            </span>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.5)', fontFamily: "'JetBrains Mono', monospace" }}>
                                UPI ID:
                            </span>
                            <span style={{ fontSize: '0.8rem', color: '#4ade80', fontFamily: "'JetBrains Mono', monospace" }}>
                                {UPI_ID}
                            </span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div style={{ display: 'flex', width: '100%', gap: '0.75rem' }}>
                        <button
                            onClick={handleCopy}
                            style={{
                                flex: 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem',
                                padding: '0.8rem',
                                borderRadius: '100px',
                                background: copied ? '#22c55e' : '#ffffff',
                                color: copied ? '#ffffff' : '#000000',
                                border: 'none',
                                fontSize: '0.85rem',
                                fontWeight: 600,
                                fontFamily: "'Inter', sans-serif",
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                        >
                            {copied ? <Check size={16} /> : <Copy size={16} />}
                            <span>{copied ? 'Copied' : 'Copy UPI ID'}</span>
                        </button>

                        <a
                            href={upiLink}
                            style={{
                                flex: 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem',
                                padding: '0.8rem',
                                borderRadius: '100px',
                                background: 'transparent',
                                color: '#ffffff',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                fontSize: '0.85rem',
                                fontWeight: 500,
                                fontFamily: "'Inter', sans-serif",
                                textDecoration: 'none'
                            }}
                        >
                            <Smartphone size={16} />
                            <span>Open App</span>
                        </a>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>,
        document.body
    );
};

export default PaymentModal;
