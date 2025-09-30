import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './PostItCreate.css'

function PostItCreate() {
  const navigate = useNavigate()
  const { timepaperId } = useParams()
  const [content, setContent] = useState('')
  const [images, setImages] = useState([])
  const [previewUrls, setPreviewUrls] = useState([])

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)

    // 이미지 파일 저장
    setImages(prev => [...prev, ...files])

    // 미리보기 URL 생성
    const newPreviewUrls = files.map(file => URL.createObjectURL(file))
    setPreviewUrls(prev => [...prev, ...newPreviewUrls])
  }

  const handleRemoveImage = (index) => {
    // 미리보기 URL 해제
    URL.revokeObjectURL(previewUrls[index])

    setImages(prev => prev.filter((_, i) => i !== index))
    setPreviewUrls(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!content.trim() && images.length === 0) {
      alert('내용을 입력하거나 이미지를 추가해주세요.')
      return
    }

    const formData = new FormData()
    formData.append('content', content)
    images.forEach((image) => {
      formData.append('images', image)
    })

    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/postit', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      })

      const data = await response.json()

      if (response.ok && data.success) {
        alert('포스트잇이 생성되었습니다!')
        setContent('')
        setImages([])
        setPreviewUrls([])
      } else {
        alert(data.message || '포스트잇 생성에 실패했습니다.')
      }
    } catch (error) {
      console.error('포스트잇 생성 실패:', error)
      alert('포스트잇 생성 중 오류가 발생했습니다.')
    }
  }

  return (
    <div className="postit-container">
      <div className="postit-header">
        <button onClick={() => navigate(-1)} className="back-button">
          ← 돌아가기
        </button>
        <h1>포스트잇 작성</h1>
        <div></div>
      </div>

      <div className="postit-content">
        <form onSubmit={handleSubmit} className="postit-form">
          <div className="form-section">
            <label htmlFor="image-upload" className="image-upload-button">
              📷 이미지 첨부
              <input
                type="file"
                id="image-upload"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
            </label>

            {previewUrls.length > 0 && (
              <div className="image-preview-container">
                {previewUrls.map((url, index) => (
                  <div key={index} className="image-preview">
                    <img src={url} alt={`preview ${index}`} />
                    <button
                      type="button"
                      className="remove-image-button"
                      onClick={() => handleRemoveImage(index)}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="form-section">
            <label htmlFor="content">내용</label>
            <textarea
              id="content"
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="추억을 작성해주세요..."
              rows="10"
            />
            <div className="character-count">
              {content.length} / 500
            </div>
          </div>

          <button type="submit" className="submit-button">
            포스트잇 생성
          </button>
        </form>
      </div>
    </div>
  )
}

export default PostItCreate