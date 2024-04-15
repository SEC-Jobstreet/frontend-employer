import HomeIcon from "../../assets/svg/homeicon";

import "./homepage.css";

function HomePage() {
  return (
    <div className="joraemployer">
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
    </div>
  );
}

export default HomePage;
