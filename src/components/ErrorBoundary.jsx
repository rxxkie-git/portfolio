import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Unhandled runtime error in portfolio app:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#050505',
            color: '#ededed',
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            padding: '2rem',
            textAlign: 'center'
          }}
        >
          <div
            style={{
              padding: '0.4rem 1rem',
              borderRadius: '100px',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              background: 'rgba(239, 68, 68, 0.1)',
              color: '#f87171',
              fontSize: '0.8rem',
              fontFamily: "'JetBrains Mono', monospace",
              marginBottom: '1.5rem',
              letterSpacing: '0.05em'
            }}
          >
            APPLICATION ENCOUNTERED AN ERROR
          </div>

          <h1 style={{ fontSize: '2.5rem', fontWeight: 700, margin: '0 0 1rem 0' }}>
            Something went wrong
          </h1>

          <p
            style={{
              maxWidth: '540px',
              color: 'rgba(255, 255, 255, 0.65)',
              fontSize: '1rem',
              lineHeight: 1.6,
              marginBottom: '2rem'
            }}
          >
            {this.state.error?.message || 'An unexpected error occurred while rendering the page.'}
          </p>

          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '0.85rem 1.8rem',
              borderRadius: '100px',
              background: '#ffffff',
              color: '#000000',
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.9rem',
              transition: 'all 0.2s'
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
