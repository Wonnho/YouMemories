import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './TimePaperCreate.css';

function TimePaperCreate() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [isInValidTitle, setIsInValidTitle] = useState(false);
  const [invalidTitleMessage, setInvalidTitleMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('제목을 입력해주세요.');
  const [isButtonEnable, setIsButtonEnable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleTitleChange = (e) => {
    const newValue = e.target.value;
    setTitle(newValue);

    if (newValue === '') {
      setIsInValidTitle(false);
      return;
    }
    if (newValue && newValue.trim().length === 0) {
      setIsInValidTitle(true);
      setInvalidTitleMessage('공백만으로 이루어진 제목은 사용할 수 없습니다.');
      return;
    }
    if (newValue.length > 30) {
      const trimmedValue = newValue.slice(0, 30);
      setTitle(trimmedValue);
      setIsInValidTitle(true);
      setInvalidTitleMessage('제목의 최대 글자 수는 30자 입니다.');
      return;
    }
    setIsInValidTitle(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setIsError(true);
      setErrorMessage('제목을 입력해주세요.');
      return;
    }

    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch('/api/timepaper', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: title
        })
      });

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('백엔드 서버가 실행되지 않았습니다. Spring Boot 서버(포트 8080)를 먼저 시작해주세요.');
      }

      const data = await response.json();
      console.log('타임페이퍼 생성 응답:', data);

      if (response.ok && data.success) {
        alert('타임페이퍼가 생성되었습니다!');
        navigate(`/timepaper/${data.data.timePaperId}`);
      } else {
        setIsError(true);
        setErrorMessage(data.message || '타임페이퍼 생성에 실패했습니다.');
      }
    } catch (error) {
      console.error('타임페이퍼 생성 실패:', error);
      setIsError(true);
      setErrorMessage(error.message || '타임페이퍼 생성 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (title.trim().length !== 0) {
      setIsButtonEnable(true);
    } else {
      setIsButtonEnable(false);
    }
  }, [title]);

  const handleAlertClose = () => {
    setIsError(false);
  };

  return (
    <>
      <form>
        <div className="timepaper-create-container">
          {isError && (
            <div className="alert">
              <div className="alert-message">{errorMessage}</div>
              <button onClick={handleAlertClose} className="alert-button">확인</button>
            </div>
          )}
          <div className="input-container">
            <div className="form-group">
              <label htmlFor="title">제목</label>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={handleTitleChange}
                placeholder="제목을 입력해주세요"
              />
            </div>
            <div
              className="error-container"
              style={{ visibility: isInValidTitle ? 'visible' : 'hidden' }}
            >
              {invalidTitleMessage}
            </div>
          </div>
          <div className="button-group">
            <button type="button" onClick={() => navigate(-1)} className="cancel-button">
              취소
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="submit-button"
              disabled={!isButtonEnable || isLoading}
            >
              {isLoading ? '생성 중...' : '타임페이퍼 생성'}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default TimePaperCreate;