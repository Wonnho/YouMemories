import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './SignUp.css'
import TermsOfService from './TermsOfService'
import PrivacyPolicy from './PrivacyPolicy'

function SignUp() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    nickname: '',
    acceptTerms: false,
    acceptPrivacy: false
  })

  const [errors, setErrors] = useState({})
  const [isCheckingEmail, setIsCheckingEmail] = useState(false)
  const [isCheckingNickname, setIsCheckingNickname] = useState(false)
  const [emailAvailable, setEmailAvailable] = useState(null)
  const [nicknameAvailable, setNicknameAvailable] = useState(null)
  const [showTermsModal, setShowTermsModal] = useState(false)
  const [showPrivacyModal, setShowPrivacyModal] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }

    // Reset availability check when email or nickname changes
    if (name === 'email') {
      setEmailAvailable(null)
    }
    if (name === 'nickname') {
      setNicknameAvailable(null)
    }
  }

  const checkEmailAvailability = async () => {
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      return
    }

    setIsCheckingEmail(true)
    try {
      const response = await fetch(`/api/auth/check-email?email=${encodeURIComponent(formData.email)}`)
      const data = await response.json()
      setEmailAvailable(data.success)
      if (!data.success) {
        setErrors(prev => ({ ...prev, email: data.message }))
      }
    } catch (error) {
      console.error('이메일 중복 확인 실패:', error)
    } finally {
      setIsCheckingEmail(false)
    }
  }

  const checkNicknameAvailability = async () => {
    if (!formData.nickname || formData.nickname.length < 2) {
      return
    }

    setIsCheckingNickname(true)
    try {
      const response = await fetch(`/api/auth/check-nickname?nickname=${encodeURIComponent(formData.nickname)}`)
      const data = await response.json()
      setNicknameAvailable(data.success)
      if (!data.success) {
        setErrors(prev => ({ ...prev, nickname: data.message }))
      }
    } catch (error) {
      console.error('닉네임 중복 확인 실패:', error)
    } finally {
      setIsCheckingNickname(false)
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email.trim()) {
      newErrors.email = '이메일은 필수입니다'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식을 입력해주세요'
    } else if (emailAvailable === false) {
      newErrors.email = '이미 사용 중인 이메일입니다'
    }

    if (!formData.nickname.trim()) {
      newErrors.nickname = '닉네임은 필수입니다'
    } else if (formData.nickname.length < 2 || formData.nickname.length > 20) {
      newErrors.nickname = '닉네임은 2자 이상 20자 이하여야 합니다'
    } else if (nicknameAvailable === false) {
      newErrors.nickname = '이미 사용 중인 닉네임입니다'
    }

    if (!formData.password) {
      newErrors.password = '비밀번호는 필수입니다'
    } else if (formData.password.length < 8) {
      newErrors.password = '비밀번호는 8글자 이상이어야 합니다'
    } else if (!/(?=.*[!@#$%^&*(),.?":{}|<>])/.test(formData.password)) {
      newErrors.password = '비밀번호는 특수문자를 최소 1개 포함해야 합니다'
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다'
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = '이용약관에 동의해주세요'
    }

    if (!formData.acceptPrivacy) {
      newErrors.acceptPrivacy = '개인정보 처리방침에 동의해주세요'
    }

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newErrors = validateForm()

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          nickname: formData.nickname,
          acceptTerms: formData.acceptTerms,
          acceptPrivacy: formData.acceptPrivacy
        }),
      })

      const data = await response.json()
      console.log('회원가입 응답:', data)

      if (response.ok && data.success) {
        alert('회원가입이 완료되었습니다. 이메일을 확인하여 인증을 완료해주세요.')
        navigate('/login') // 로그인 페이지로 이동
      } else {
        setErrors({ general: data.message || '회원가입에 실패했습니다.' })
      }
    } catch (error) {
      console.error('회원가입 실패:', error)
      setErrors({ general: '회원가입 중 오류가 발생했습니다.' })
    }
  }

  const handleKakaoLogin = () => {
    // 카카오 로그인 URL로 리다이렉트
    window.location.href = '/api/auth/kakao'
  }

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-header">
          <h1>YouMemories</h1>
          <p>Create your memory collection</p>
        </div>

        <form onSubmit={handleSubmit} className="signup-form">
          {errors.general && <div className="error-message general-error">{errors.general}</div>}

          <div className="form-group">
            <label htmlFor="email">이메일 (아이디)</label>
            <div className="input-with-button">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={checkEmailAvailability}
                className={errors.email ? 'error' : emailAvailable === true ? 'success' : ''}
                placeholder="이메일을 입력하세요"
                required
              />
              <button
                type="button"
                onClick={checkEmailAvailability}
                disabled={isCheckingEmail || !formData.email}
                className="check-button"
              >
                {isCheckingEmail ? '확인중...' : '중복확인'}
              </button>
            </div>
            {errors.email && <span className="error-message">{errors.email}</span>}
            {emailAvailable === true && <span className="success-message">사용 가능한 이메일입니다</span>}
          </div>

          <div className="form-group">
            <label htmlFor="nickname">닉네임</label>
            <div className="input-with-button">
              <input
                type="text"
                id="nickname"
                name="nickname"
                value={formData.nickname}
                onChange={handleChange}
                onBlur={checkNicknameAvailability}
                className={errors.nickname ? 'error' : nicknameAvailable === true ? 'success' : ''}
                placeholder="닉네임을 입력하세요 (2-20자)"
                required
              />
              <button
                type="button"
                onClick={checkNicknameAvailability}
                disabled={isCheckingNickname || !formData.nickname}
                className="check-button"
              >
                {isCheckingNickname ? '확인중...' : '중복확인'}
              </button>
            </div>
            {errors.nickname && <span className="error-message">{errors.nickname}</span>}
            {nicknameAvailable === true && <span className="success-message">사용 가능한 닉네임입니다</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'error' : ''}
              placeholder="비밀번호 (8글자 이상, 특수문자 포함)"
              required
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
            <div className="password-hint">
              비밀번호는 8글자 이상이며 특수문자를 최소 1개 포함해야 합니다.
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">비밀번호 확인</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={errors.confirmPassword ? 'error' : ''}
              placeholder="비밀번호를 다시 입력하세요"
              required
            />
            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
          </div>

          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="terms-link"
                onClick={() => setShowTermsModal(true)}
              >
                이용약관
              </button>에 동의합니다 (필수)
            </label>
            {errors.acceptTerms && <span className="error-message">{errors.acceptTerms}</span>}
          </div>

          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="acceptPrivacy"
                checked={formData.acceptPrivacy}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="terms-link"
                onClick={() => setShowPrivacyModal(true)}
              >
                개인정보 처리방침
              </button>에 동의합니다 (필수)
            </label>
            {errors.acceptPrivacy && <span className="error-message">{errors.acceptPrivacy}</span>}
          </div>

          <button type="submit" className="signup-button">
            회원가입
          </button>

          <div className="kakao-login-section">
            <div className="divider">
              <span>또는</span>
            </div>
            <button type="button" className="kakao-login-button" onClick={handleKakaoLogin}>
              카카오로 로그인
            </button>
          </div>
        </form>

        <div className="signup-footer">
          <p>
            Already have an account?
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="login-link"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>

      <TermsOfService
        isOpen={showTermsModal}
        onClose={() => setShowTermsModal(false)}
        onAgree={() => setFormData(prev => ({ ...prev, acceptTerms: true }))}
      />

      <PrivacyPolicy
        isOpen={showPrivacyModal}
        onClose={() => setShowPrivacyModal(false)}
        onAgree={() => setFormData(prev => ({ ...prev, acceptPrivacy: true }))}
      />
    </div>
  )
}

export default SignUp