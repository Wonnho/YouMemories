import { useState, useEffect } from 'react'
import './MyPage.css'

function MyPage({ onBack }) {
  const [postits, setPostits] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchPostits()
  }, [])

  const fetchPostits = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/postit/my-postits', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      const data = await response.json()
      console.log('포스트잇 목록:', data)

      if (response.ok && data.success) {
        setPostits(data.data || [])
      } else {
        setError(data.message || '포스트잇 목록을 불러오는데 실패했습니다.')
      }
    } catch (error) {
      console.error('포스트잇 목록 조회 실패:', error)
      setError('포스트잇 목록을 불러오는 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (postitId) => {
    if (!confirm('이 포스트잇을 삭제하시겠습니까?')) {
      return
    }

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/postit/${postitId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      const data = await response.json()

      if (response.ok && data.success) {
        alert('포스트잇이 삭제되었습니다.')
        fetchPostits() // 목록 새로고침
      } else {
        alert(data.message || '포스트잇 삭제에 실패했습니다.')
      }
    } catch (error) {
      console.error('포스트잇 삭제 실패:', error)
      alert('포스트잇 삭제 중 오류가 발생했습니다.')
    }
  }

  return (
    <div className="mypage-container">
      <div className="mypage-header">
        <button onClick={onBack} className="back-button">
          ← 돌아가기
        </button>
        <h1>My Page</h1>
        <div></div>
      </div>

      <div className="mypage-content">
        {loading ? (
          <div className="loading">로딩 중...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : postits.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <h2>아직 작성한 포스트잇이 없습니다</h2>
            <p>Rolling Paper를 생성하여 첫 번째 추억을 만들어보세요!</p>
          </div>
        ) : (
          <div className="postit-grid">
            {postits.map((postit) => (
              <div key={postit.id} className="postit-card">
                {postit.images && postit.images.length > 0 && (
                  <div className="postit-images">
                    {postit.images.slice(0, 3).map((image, index) => (
                      <img
                        key={index}
                        src={image.url || image}
                        alt={`postit ${postit.id} image ${index}`}
                        className="postit-image"
                      />
                    ))}
                    {postit.images.length > 3 && (
                      <div className="image-count">+{postit.images.length - 3}</div>
                    )}
                  </div>
                )}

                <div className="postit-content-preview">
                  <p>{postit.content || '내용 없음'}</p>
                </div>

                <div className="postit-footer">
                  <span className="postit-date">
                    {postit.createdAt ? new Date(postit.createdAt).toLocaleDateString('ko-KR') : '날짜 없음'}
                  </span>
                  <button
                    onClick={() => handleDelete(postit.id)}
                    className="delete-button"
                  >
                    삭제
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyPage