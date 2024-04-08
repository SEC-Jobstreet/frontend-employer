import "./footer.css";

function Footer() {
  return (
    <footer>
      <div className="footer">
        <div className="footer-links">
          <a className="footer-link" href="/" target="_blank" rel="noopener">
            Giới thiệu
          </a>
          <a className="footer-link" href="/" target="_blank" rel="noopener">
            Những câu hỏi thường gặp
          </a>
          <a className="footer-link" href="/" target="_blank" rel="noopener">
            Điều khoản và thoả thuận sử dụng
          </a>
          <a className="footer-link" href="/" target="_blank" rel="noopener">
            Chính sách bảo mật
          </a>
        </div>
        <div className="footer-copyright">© 2024 JobStreet.com</div>
      </div>
    </footer>
  );
}

export default Footer;
