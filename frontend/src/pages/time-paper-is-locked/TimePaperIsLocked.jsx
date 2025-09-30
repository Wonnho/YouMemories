import { useNavigate, useParams } from 'react-router-dom';
import './TimePaperIsLocked.css';

function TimePaperIsLocked() {
  const navigate = useNavigate();
  const { timepaperId } = useParams();

  return (
    <div className="locked-container">
      <div className="locked-content">
        <div className="lock-icon">🔒</div>
        <h1>Time Paper가 잠겨있습니다</h1>
        <p>이 Time Paper는 아직 공개되지 않았습니다.</p>
        <p>설정된 날짜가 되면 자동으로 열립니다.</p>
        <button onClick={() => navigate('/')} className="home-button">
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );
}

export default TimePaperIsLocked;