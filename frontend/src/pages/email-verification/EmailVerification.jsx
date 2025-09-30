import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import './EmailVerification.css'

function EmailVerification() {
  const [searchParams] = useSearchParams()
  const [status, setStatus] = useState('verifying') // verifying, success, error
  const [message, setMessage] = useState('')

  useEffect(() => {
    const token = searchParams.get('token')

    if (!token) {
      setStatus('error')
      setMessage('인증 토큰이 없습니다.')
      return
    }

    verifyEmail(token)
  }, [searchParams])

  const verifyEmail = async (token) => {
    try {
      const response = await fetch(`/api/auth/verify-email?token=${token}`)
      const data = await response.json()

      if (data.success) {
        setStatus('success')
        setMessage(data.message)
      } else {
        setStatus('error')
        setMessage(data.message)
      }
    } catch (error) {
      console.error('이메일 인증 실패:', error)
      setStatus('error')
      setMessage('이메일 인증 중 오류가 발생했습니다.')
    }
  }

  const getStatusIcon = () => {
    switch (status) {
      case 'verifying':
        return '⏳'
      case 'success':
        return '✅'
      case 'error':
        return '❌'
      default:
        return '⏳'
    }
  }

  const getStatusClass = () => {
    switch (status) {
      case 'verifying':
        return 'verifying'
      case 'success':
        return 'success'
      case 'error':
        return 'error'
      default:
        return 'verifying'
    }
  }

  return (
    <div className="verification-container">
      <div className="verification-card">
        <div className="verification-header">
          <h1>YouMemories</h1>
          <p>이메일 인증</p>
        </div>

        <div className={`verification-content ${getStatusClass()}`}>
          <div className="status-icon">
            {getStatusIcon()}
          </div>

          <div className="status-message">
            {status === 'verifying' && (
              <>
                <h2>이메일 인증 중...</h2>
                <p>잠시만 기다려주세요.</p>
              </>
            )}

            {status === 'success' && (
              <>
                <h2>인증 완료!</h2>
                <p>{message}</p>
                <div className="action-buttons">
                  <button
                    onClick={() => window.location.href = '/login'}
                    className="login-button"
                  >
                    로그인하기
                  </button>
                </div>
              </>
            )}

            {status === 'error' && (
              <>
                <h2>인증 실패</h2>
                <p>{message}</p>
                <div className="action-buttons">
                  <button
                    onClick={() => window.location.href = '/signup'}
                    className="signup-button"
                  >
                    다시 회원가입
                  </button>
                  <button
                    onClick={() => window.location.href = '/login'}
                    className="login-button"
                  >
                    로그인하기
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmailVerification