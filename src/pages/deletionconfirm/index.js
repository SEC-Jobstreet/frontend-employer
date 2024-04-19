import { useNavigate } from "react-router-dom";

import CustomButton from "../../components/custombutton";

import "./index.css";

function DeletionConfirmation() {
  const navigate = useNavigate();

  return (
    <div className="deletion-confirmation-container">
      <div className="deletion-confirmation-header">Xóa tài khoản</div>
      <div className="deletion-confirmation-content">
        <div className="question-line">
          Bạn có chắc rằng bạn muốn xóa tài khoản của mình?
        </div>
        <div className="warning-line">
          Tất cả dữ liệu của bạn sẽ bị xóa vĩnh viễn và bạn sẽ không thể khôi
          phục lại dữ liệu đó.
        </div>
        <div className="btns-container">
          <CustomButton color="green" onClick={() => {}}>
            Xóa tài khoản
          </CustomButton>
          <CustomButton onClick={() => navigate("/account")}>
            Huỷ bỏ
          </CustomButton>
        </div>
      </div>
    </div>
  );
}

export default DeletionConfirmation;
