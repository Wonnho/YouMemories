import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './TimePaperDetail.css';

function TimePaperDetail() {
  const { timepaperId } = useParams();
  const navigate = useNavigate();
  const [timePaper, setTimePaper] = useState(null);
  const [postits, setPostits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTimePaper();
  }, [timepaperId]);

  const fetchTimePaper = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/timepaper/${timepaperId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setTimePaper(data.data);
        setPostits(data.data.postits || []);
      } else {
        alert(data.message || 'Time Paper를 불러오는데 실패했습니다.');
      }
    } catch (error) {
      console.error('Time Paper 조회 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">로딩 중...</div>;
  }

  if (!timePaper) {
    return <div className="error">Time Paper를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="timepaper-detail-container">
      <div className="timepaper-header">
        <h1>{timePaper.title}</h1>
        <p>{timePaper.description}</p>
        {timePaper.lockDate && (
          <p className="lock-info">🔒 잠금 날짜: {new Date(timePaper.lockDate).toLocaleString('ko-KR')}</p>
        )}
      </div>

      <button
        onClick={() => navigate(`/timepaper/${timepaperId}/postit/create`)}
        className="create-postit-button"
      >
        + 포스트잇 추가
      </button>

      <div className="postits-grid">
        {postits.length === 0 ? (
          <div className="empty-state">
            <p>아직 포스트잇이 없습니다.</p>
            <p>첫 번째 추억을 남겨보세요!</p>
          </div>
        ) : (
          postits.map((postit) => (
            <div key={postit.id} className="postit-card">
              {postit.images && postit.images.length > 0 && (
                <img src={postit.images[0]} alt="postit" className="postit-image" />
              )}
              <div className="postit-content">
                <p>{postit.content}</p>
              </div>
              <div className="postit-footer">
                <span>{new Date(postit.createdAt).toLocaleDateString('ko-KR')}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TimePaperDetail;