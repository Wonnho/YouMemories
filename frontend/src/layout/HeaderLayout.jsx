import { Outlet, useNavigate } from 'react-router-dom';
import './HeaderLayout.css';

function HeaderLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="header-layout">
      <header className="app-header">
        <div className="header-content">
          <h1 onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            YouMemories
          </h1>
          <nav>
            <button onClick={() => navigate('/my')} className="nav-button">
              My Page
            </button>
            <button onClick={handleLogout} className="nav-button logout">
              로그아웃
            </button>
          </nav>
        </div>
      </header>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default HeaderLayout;