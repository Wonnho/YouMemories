import { useState } from 'react'
import './TermsModal.css'

function PrivacyPolicy({ isOpen, onClose, onAgree }) {
  const [isAgreed, setIsAgreed] = useState(false)

  if (!isOpen) return null

  const handleAgree = () => {
    if (isAgreed) {
      onAgree()
      onClose()
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>개인정보 처리방침</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          <div className="terms-content">
            <h3>1. 개인정보의 처리목적</h3>
            <p>
              YouMemories(이하 "회사")는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는
              다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 관련 법령에 따라
              별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
            </p>
            <ul>
              <li>회원가입 및 관리: 회원 가입의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증, 회원자격 유지·관리</li>
              <li>서비스 제공: 디지털 롤링페이퍼 서비스, 콘텐츠 제공, 맞춤서비스 제공</li>
              <li>고객지원: 고객센터 운영, 민원사무 처리, 공지사항 전달</li>
            </ul>

            <h3>2. 개인정보의 처리 및 보유기간</h3>
            <p>
              회사는 정보주체로부터 개인정보를 수집할 때 동의받은 개인정보 보유·이용기간 또는 법령에 따른
              개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
            </p>
            <ul>
              <li>회원정보: 회원탈퇴 시까지 (단, 관련 법령에 따라 보존 필요시 해당 기간)</li>
              <li>서비스 이용기록: 3년</li>
              <li>로그인 기록: 3개월</li>
            </ul>

            <h3>3. 처리하는 개인정보의 항목</h3>
            <p>회사는 다음의 개인정보 항목을 처리하고 있습니다:</p>
            <ul>
              <li>필수항목: 이메일, 비밀번호, 닉네임</li>
              <li>선택항목: 프로필 사진, 생년월일</li>
              <li>자동수집 항목: 서비스 이용기록, 접속 로그, 쿠키, 접속 IP 정보, 결제기록</li>
            </ul>

            <h3>4. 개인정보의 제3자 제공</h3>
            <p>
              회사는 정보주체의 개인정보를 개인정보의 처리목적에서 명시한 범위 내에서만 처리하며,
              정보주체의 동의, 법률의 특별한 규정 등 관련 법령상 허용되는 경우에만 개인정보를
              제3자에게 제공합니다.
            </p>

            <h3>5. 개인정보처리의 위탁</h3>
            <p>
              회사는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다:
            </p>
            <ul>
              <li>이메일 발송 서비스: Google (Gmail)</li>
              <li>클라우드 서비스: AWS</li>
            </ul>

            <h3>6. 정보주체의 권리·의무 및 행사방법</h3>
            <p>
              정보주체는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다:
            </p>
            <ul>
              <li>개인정보 처리현황 통지요구</li>
              <li>개인정보 열람요구</li>
              <li>개인정보 정정·삭제요구</li>
              <li>개인정보 처리정지요구</li>
            </ul>

            <h3>7. 개인정보의 파기</h3>
            <p>
              회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는
              지체없이 해당 개인정보를 파기합니다.
            </p>

            <h3>8. 개인정보의 안전성 확보조치</h3>
            <p>
              회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다:
            </p>
            <ul>
              <li>관리적 조치: 내부관리계획 수립·시행, 정기적 직원 교육 등</li>
              <li>기술적 조치: 개인정보처리시스템 등의 접근권한 관리, 접근통제시스템 설치, 개인정보의 암호화, 보안프로그램 설치</li>
              <li>물리적 조치: 전산실, 자료보관실 등의 접근통제</li>
            </ul>

            <h3>9. 개인정보보호책임자</h3>
            <p>
              회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의
              불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보보호책임자를 지정하고 있습니다:
            </p>
            <ul>
              <li>개인정보보호책임자: YouMemories 개발팀</li>
              <li>연락처: privacy@youmemories.com</li>
            </ul>

            <p className="effective-date">
              <strong>시행일자: 2025년 1월 1일</strong>
            </p>
          </div>
        </div>

        <div className="modal-footer">
          <label className="agreement-checkbox">
            <input
              type="checkbox"
              checked={isAgreed}
              onChange={(e) => setIsAgreed(e.target.checked)}
            />
            위 개인정보 처리방침에 동의합니다.
          </label>
          <div className="modal-buttons">
            <button className="cancel-button" onClick={onClose}>취소</button>
            <button
              className={`agree-button ${isAgreed ? 'active' : ''}`}
              onClick={handleAgree}
              disabled={!isAgreed}
            >
              동의
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy