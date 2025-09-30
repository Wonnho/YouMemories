import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './TimePaperSetLock.css';

function TimePaperSetLock() {
  const navigate = useNavigate();
  const { timepaperId } = useParams();
  const [lockDate, setLockDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/timepaper/${timepaperId}/lock`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ lockDate })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert('잠금 설정이 완료되었습니다!');
        navigate(`/timepaper/${timepaperId}`);
      } else {
        alert(data.message || '잠금 설정에 실패했습니다.');
      }
    } catch (error) {
      console.error('잠금 설정 실패:', error);
      alert('잠금 설정 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="setlock-container">
      <div className="setlock-content">
        <h1>🔒 Time Capsule 설정</h1>
        <p>Time Paper를 특정 날짜까지 잠글 수 있습니다.</p>
        <form onSubmit={handleSubmit} className="setlock-form">
          <div className="form-group">
            <label htmlFor="lockDate">잠금 해제 날짜</label>
            <input
              type="datetime-local"
              id="lockDate"
              value={lockDate}
              onChange={(e) => setLockDate(e.target.value)}
              required
            />
            <p className="hint">선택한 날짜가 되면 자동으로 잠금이 해제됩니다.</p>
          </div>

          <div className="button-group">
            <button type="button" onClick={() => navigate(-1)} className="cancel-button">
              취소
            </button>
            <button type="submit" className="submit-button">
              잠금 설정
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TimePaperSetLock;