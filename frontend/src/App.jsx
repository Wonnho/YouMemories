import { useState, useEffect } from 'react'
import AuthPage from './components/AuthPage'
import MainPage from './components/MainPage'
import PostIt from './components/PostIt'
import MyPage from './components/MyPage'
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentPage, setCurrentPage] = useState('main')

  useEffect(() => {
    // 로컬 스토리지에서 토큰 확인
    const token = localStorage.getItem('token')
    if (token) {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (token) => {
    localStorage.setItem('token', token)
    setIsAuthenticated(true)
    setCurrentPage('main')
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
    setCurrentPage('main')
  }

  const navigateToPostIt = () => {
    setCurrentPage('postit')
  }

  const navigateToMyPage = () => {
    setCurrentPage('mypage')
  }

  const navigateToMain = () => {
    setCurrentPage('main')
  }

  if (!isAuthenticated) {
    return <AuthPage onLogin={handleLogin} />
  }

  return (
    <>
      {currentPage === 'main' && (
        <MainPage
          onLogout={handleLogout}
          onNavigateToPostIt={navigateToPostIt}
          onNavigateToMyPage={navigateToMyPage}
        />
      )}
      {currentPage === 'postit' && (
        <PostIt onBack={navigateToMain} />
      )}
      {currentPage === 'mypage' && (
        <MyPage onBack={navigateToMain} />
      )}
    </>
  )
}

export default App
