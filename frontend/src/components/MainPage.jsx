import './MainPage.css'

function MainPage({ onLogout, onNavigateToPostIt, onNavigateToMyPage }) {
  const handleCreateRollingPaper = () => {
    onNavigateToPostIt()
  }

  const handleMyPage = () => {
    onNavigateToMyPage()
  }

  return (
    <div className="main-container">
      <div className="main-content">
        <header className="main-header">
          <h1>YouMemories</h1>
          <button onClick={onLogout} className="logout-button">
            로그아웃
          </button>
        </header>

        <div className="main-buttons">
          <button onClick={handleCreateRollingPaper} className="main-button create-button">
            <div className="button-icon">📝</div>
            <h2>Rolling Paper 생성</h2>
            <p>새로운 추억을 만들어보세요</p>
          </button>

          <button onClick={handleMyPage} className="main-button mypage-button">
            <div className="button-icon">👤</div>
            <h2>My Page</h2>
            <p>내 정보와 추억 관리</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default MainPage