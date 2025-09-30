import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleCreateTimePaper = () => {
    navigate('/timepaper/create');
  };

  const handleMyPage = () => {
    navigate('/my');
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <header className="home-header">
          <h1>YouMemories</h1>
          <p>소중한 추억을 함께 만들어가세요</p>
        </header>

        <div className="home-buttons">
          <button onClick={handleCreateTimePaper} className="home-button create-button">
            <div className="button-icon">📝</div>
            <h2>Time Paper 생성</h2>
            <p>새로운 추억을 만들어보세요</p>
          </button>

          <button onClick={handleMyPage} className="home-button mypage-button">
            <div className="button-icon">👤</div>
            <h2>My Page</h2>
            <p>내 정보와 추억 관리</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;