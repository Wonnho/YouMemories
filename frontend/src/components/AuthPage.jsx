import { useState } from 'react'
import Login from './Login'
import SignUp from './SignUp'

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)

  const toggleAuthMode = () => {
    setIsLogin(!isLogin)
  }

  return (
    <>
      {isLogin ? (
        <Login onToggleSignUp={toggleAuthMode} />
      ) : (
        <SignUp onToggleLogin={toggleAuthMode} />
      )}
    </>
  )
}

export default AuthPage