import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TimePaperCreate.css';

function TimePaperCreate() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    lockDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/timepaper', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert('Time Paper가 생성되었습니다!');
        navigate(`/timepaper/${data.data.id}`);
      } else {
        alert(data.message || 'Time Paper 생성에 실패했습니다.');
      }
    } catch (error) {
      console.error('Time Paper 생성 실패:', error);
      alert('Time Paper 생성 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="timepaper-create-container">
      <div className="timepaper-create-content">
        <h1>Time Paper 생성</h1>
        <form onSubmit={handleSubmit} className="timepaper-form">
          <div className="form-group">
            <label htmlFor="title">제목</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Time Paper 제목을 입력하세요"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">설명</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Time Paper에 대한 설명을 입력하세요"
              rows="5"
            />
          </div>

          <div className="form-group">
            <label htmlFor="lockDate">잠금 날짜 (선택사항)</label>
            <input
              type="datetime-local"
              id="lockDate"
              name="lockDate"
              value={formData.lockDate}
              onChange={handleChange}
            />
            <p className="hint">잠금 날짜를 설정하면 해당 날짜까지 내용을 볼 수 없습니다.</p>
          </div>

          <div className="button-group">
            <button type="button" onClick={() => navigate(-1)} className="cancel-button">
              취소
            </button>
            <button type="submit" className="submit-button">
              생성하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TimePaperCreate;