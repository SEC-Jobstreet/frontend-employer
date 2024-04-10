import HomeIcon from "../../assets/svg/homeicon";
import { ReactComponent as Logo } from "../../assets/svg/logo.svg";

import "./joraemployer.css";

function JoraEmployer() {
  return (
    <div className="joraemployer">
      <div className="header">
        <div className="content">
          <a href="/" className="logo-title">
            <Logo className="logo" style={{ fill: "#fff" }} />
            <span className="title">Nhà Tuyển Dụng</span>
          </a>
          <div className="login">
            <a href="/vn/login" className="login-button">
              Đăng nhập
            </a>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="content-title">Đăng tuyển dụng MIỄN PHÍ</div>
        <div className="content-path">
          <div className="content-info">
            <div className="content-info-title">Bắt đầu nào</div>
            <div className="content-info-description">
              Hãy cùng tham gia! Hàng ngàn công ty đã tiết kiệm thời gian và chi
              phí trên nền tảng tuyển dụng JobStreet
            </div>
            <div className="content-signup">
              Đăng ký để đăng việc <span>MIỄN PHÍ</span> ngay hôm nay.
            </div>
            <button type="button" className="rounded-button-primary sign-in">
              Đăng kí ngay
            </button>
            <button type="button" className="rounded-button-primary sign-up">
              Đăng nhập
            </button>
          </div>
          <div className="content-image">
            <HomeIcon />
          </div>
        </div>
        <div className="content-path">
          <div className="content-info">
            <div className="content-info-title">
              Đăng tin tuyển dụng dễ dàng
            </div>
            <div className="content-info-description">
              Sử dụng mẫu đơn giản của chúng tôi để đăng quảng cáo việc miễn phí
              trong vài phút.
            </div>
          </div>
        </div>
        <div className="content-path">
          <div className="content-info">
            <div className="content-info-title">
              Đăng nhiều quảng cáo việc làm miễn phí
            </div>
            <div className="content-info-description">
              Tiết kiệm thời gian và chi phí bằng cách đăng tất cả các quảng cáo
              việc của bạn với chúng tôi.
            </div>
          </div>
        </div>
        <div className="content-path">
          <div className="content-info">
            <div className="content-info-title">
              Tiếp cận hàng triệu người tìm việc
            </div>
            <div className="content-info-description">
              Giúp việc của bạn tiếp cận tới hàng triệu người tìm việc.
            </div>
          </div>
        </div>
        <div className="content-path">
          <div className="content-info">
            <div className="content-info-title">
              Hãy tham gia cùng hàng ngàn công ty khác để tiết kiệm thời gian và
              chi phí với JobStreet.
            </div>
            <div className="content-info-description">
              Đăng ký để đăng việc <span>MIỄN PHÍ</span> ngay hôm nay.
            </div>
            <button type="button" className="rounded-button-primary sign-in">
              Đăng kí ngay
            </button>
          </div>
        </div>
      </div>
      <div className="footer">
        <div className="employer-footer">
          <a href="/">Giới thiệu</a>
          <a href="/">Những câu hỏi thường gặp</a>
          <a href="/">Điều khoản và thoả thuận sử dụng</a>
          <a href="/">Chính sách bảo mật</a>
        </div>
        <div className="employer-copyright">© 2024 JobStreet.com</div>
      </div>
    </div>
  );
}

export default JoraEmployer;
