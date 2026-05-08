import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, Smartphone, ScanLine } from 'lucide-react';

// !!! UPDATE THIS TO YOUR ACTUAL UPI ID !!!
const UPI_ID = '5420380.x.srinand-1@okhdfcbank';
const PAYEE_NAME = 'Srinand Nihal';

const PaymentModal = ({ isOpen, onClose }) => {
    const [copied, setCopied] = useState(false);

    // Generate UPI Intent Link
    // pa = Payee Address (VPA), pn = Payee Name, cu = Currency
    const upiLink = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(PAYEE_NAME)}&cu=INR`;

    // Generate QR Code using a public API (no backend needed)
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&background=ffffff&color=000000&margin=2&data=${encodeURIComponent(upiLink)}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(UPI_ID);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (!isOpen) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        background: 'rgba(0,0,0,0.8)',
                        backdropFilter: 'blur(5px)',
                        zIndex: 9999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '1rem'
                    }}
                >
                    <motion.div
                        onClick={(e) => e.stopPropagation()}
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 1 }}
                        className="glass-panel"
                        style={{
                            padding: '2rem',
                            borderRadius: '0px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            maxWidth: '380px',
                            width: '100%',
                            position: 'relative',
                            fontFamily: "'Outfit', sans-serif",
                            border: '1px solid rgba(255, 255, 255, 0.05)',
                            background: '#050505',
                            boxShadow: '0 0 50px rgba(0,0,0,0.8)'
                        }}
                    >
                        {/* Decorative Corner Brackets for the Modal */}
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '20px', height: '20px', borderTop: '2px solid #fff', borderLeft: '2px solid #fff' }} />
                        <div style={{ position: 'absolute', top: 0, right: 0, width: '20px', height: '20px', borderTop: '2px solid #fff', borderRight: '2px solid #fff' }} />
                        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '20px', height: '20px', borderBottom: '2px solid #fff', borderLeft: '2px solid #fff' }} />
                        <div style={{ position: 'absolute', bottom: 0, right: 0, width: '20px', height: '20px', borderBottom: '2px solid #fff', borderRight: '2px solid #fff' }} />

                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            style={{
                                position: 'absolute',
                                top: '1.5rem',
                                right: '1.5rem',
                                background: 'transparent',
                                border: 'none',
                                color: '#fff',
                                cursor: 'pointer',
                                padding: '5px',
                                opacity: 0.7,
                                transition: 'opacity 0.2s'
                            }}
                            onMouseEnter={(e) => e.target.style.opacity = 1}
                            onMouseLeave={(e) => e.target.style.opacity = 0.7}
                        >
                            <X size={24} />
                        </button>

                        <div style={{ width: '100%', textAlign: 'left', marginBottom: '2rem', paddingLeft: '0.5rem' }}>
                            <h3 style={{
                                fontFamily: "'Outfit', sans-serif",
                                fontSize: '2rem',
                                fontWeight: 800,
                                margin: 0,
                                background: 'linear-gradient(to right, #fff, #888)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                letterSpacing: '-0.02em'
                            }}>
                                Buy Me A Coffee🍵
                            </h3>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.2rem' }}>
                                <div style={{ height: '1px', width: '30px', background: '#333' }}></div>
                                <p style={{ color: '#666', fontSize: '0.85rem', margin: 0, textTransform: 'uppercase', letterSpacing: '0.1em' }}>

                                </p>
                            </div>
                        </div>

                        {/* QR Code Container with Scanner Effect */}
                        <div style={{
                            position: 'relative',
                            padding: '10px',
                            border: '1px solid rgba(255,255,255,0.1)',
                            background: 'rgba(0,0,0,0.3)',
                            marginBottom: '2rem'
                        }}>
                            {/* QR Corner Markers */}
                            <div style={{ position: 'absolute', top: -1, left: -1, width: '10px', height: '10px', borderTop: '1px solid #888', borderLeft: '1px solid #888' }} />
                            <div style={{ position: 'absolute', top: -1, right: -1, width: '10px', height: '10px', borderTop: '1px solid #888', borderRight: '1px solid #888' }} />
                            <div style={{ position: 'absolute', bottom: -1, left: -1, width: '10px', height: '10px', borderBottom: '1px solid #888', borderLeft: '1px solid #888' }} />
                            <div style={{ position: 'absolute', bottom: -1, right: -1, width: '10px', height: '10px', borderBottom: '1px solid #888', borderRight: '1px solid #888' }} />

                            <div style={{
                                background: 'white',
                                padding: '1rem',
                                display: 'block',
                            }}>
                                <img
                                    src={qrCodeUrl}
                                    alt="UPI QR Code"
                                    style={{ width: '100%', height: 'auto', display: 'block', maxWidth: '200px' }}
                                />
                            </div>

                            {/* Scanning Line Animation */}
                            <motion.div
                                style={{
                                    position: 'absolute',
                                    top: '10px',
                                    left: '10px',
                                    right: '10px',
                                    height: '2px',
                                    background: 'rgba(255, 0, 0, 0.8)',
                                    boxShadow: '0 0 10px red'
                                }}
                                animate={{ top: ['10px', 'calc(100% - 10px)', '10px'] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            />
                        </div>

                        {/* UPI ID Display & Copy */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            background: '#000',
                            border: '1px solid #222',
                            padding: '1rem',
                            width: '100%',
                            justifyContent: 'space-between',
                            marginBottom: '1rem'
                        }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', overflow: 'hidden' }}>
                                <span style={{ fontSize: '0.65rem', color: '#444', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '4px' }}>Target VPA</span>
                                <span style={{ fontSize: '0.9rem', fontFamily: 'monospace', color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '180px' }}>{UPI_ID}</span>
                            </div>
                            <button
                                onClick={handleCopy}
                                style={{
                                    background: copied ? '#fff' : '#111',
                                    border: '1px solid #333',
                                    padding: '0.6rem',
                                    color: copied ? '#000' : '#fff',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                {copied ? <Check size={16} /> : <Copy size={16} />}
                            </button>
                        </div>

                        {/* Mobile: Pay Button */}
                        <div className="mobile-only-btn" style={{ width: '100%' }}>
                            <a
                                href={upiLink}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.8rem',
                                    width: '100%',
                                    padding: '1rem',
                                    background: '#fff',
                                    color: '#000',
                                    textDecoration: 'none',
                                    fontWeight: '700',
                                    fontSize: '0.9rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    border: '1px solid #fff',
                                    transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.background = '#000';
                                    e.target.style.color = '#fff';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.background = '#fff';
                                    e.target.style.color = '#000';
                                }}
                            >
                                <Smartphone size={18} /> Pay via App
                            </a>
                        </div>

                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default PaymentModal;
