import { useState } from 'react'
import './TermsModal.css'

function TermsOfService({ isOpen, onClose, onAgree }) {
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
          <h2>이용약관</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          <div className="terms-content">
            <h3>제1조 (목적)</h3>
            <p>
              이 약관은 YouMemories(이하 "회사")가 제공하는 디지털 롤링페이퍼 서비스(이하 "서비스")의 이용과 관련하여
              회사와 이용자 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
            </p>

            <h3>제2조 (정의)</h3>
            <p>
              1. "서비스"란 회사가 제공하는 YouMemories 디지털 롤링페이퍼 플랫폼을 의미합니다.<br/>
              2. "이용자"란 이 약관에 따라 회사가 제공하는 서비스를 받는 회원 및 비회원을 의미합니다.<br/>
              3. "회원"이란 서비스에 개인정보를 제공하여 회원등록을 한 자로서, 서비스를 지속적으로 이용할 수 있는 자를 의미합니다.<br/>
              4. "콘텐츠"란 이용자가 서비스를 이용하면서 게시한 부호, 문자, 음성, 음향, 화상, 동영상 등의 정보를 의미합니다.
            </p>

            <h3>제3조 (약관의 효력 및 변경)</h3>
            <p>
              1. 이 약관은 서비스 화면에 게시하거나 기타의 방법으로 이용자에게 공지함으로써 효력을 발생합니다.<br/>
              2. 회사는 필요한 경우 관련 법령을 위배하지 않는 범위에서 이 약관을 변경할 수 있습니다.<br/>
              3. 약관이 변경되는 경우, 회사는 변경된 약관을 그 적용일자 7일 이전부터 공지합니다.
            </p>

            <h3>제4조 (서비스의 제공)</h3>
            <p>
              1. 회사는 다음과 같은 서비스를 제공합니다:<br/>
              - 디지털 롤링페이퍼 작성 및 공유<br/>
              - 추억 및 메시지 저장<br/>
              - 사진 및 동영상 업로드<br/>
              - 기타 회사가 정하는 서비스<br/>
              2. 서비스는 연중무휴, 1일 24시간 제공함을 원칙으로 합니다. 단, 시스템 점검 등의 사유로 서비스가 중단될 수 있습니다.
            </p>

            <h3>제5조 (이용자의 의무)</h3>
            <p>
              1. 이용자는 다음 행위를 하여서는 안 됩니다:<br/>
              - 타인의 개인정보, 저작권, 명예, 신용 등을 침해하는 내용의 전송 또는 게시<br/>
              - 범죄와 결부된다고 객관적으로 판단되는 내용의 전송 또는 게시<br/>
              - 서비스의 안정적인 운영에 지장을 주거나 줄 우려가 있는 일체의 행위<br/>
              - 기타 관련 법령에 위배되는 행위
            </p>

            <h3>제6조 (개인정보보호)</h3>
            <p>
              회사는 관련 법령이 정하는 바에 따라 이용자의 개인정보를 보호하기 위해 노력하며,
              개인정보의 보호 및 사용에 대해서는 별도의 개인정보 처리방침에 따릅니다.
            </p>

            <h3>제7조 (면책조항)</h3>
            <p>
              1. 회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다.<br/>
              2. 회사는 이용자의 귀책사유로 인한 서비스 이용의 장애에 대하여는 책임을 지지 않습니다.<br/>
              3. 회사는 이용자가 서비스를 이용하여 기대하는 수익을 상실한 것에 대하여 책임을 지지 않습니다.
            </p>

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
            위 이용약관에 동의합니다.
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

export default TermsOfService