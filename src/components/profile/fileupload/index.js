import React from "react";
import { Button } from "react-bootstrap";
import classNames from "classnames/bind";

import styles from "./fileupload.module.css";

const cx = classNames.bind(styles);
const MAX_SIZE_FILE = 4.3 * 1024 * 1024;

function FileUpload() {
  const [file, setFile] = React.useState(null);
  const fileInputRef = React.useRef();

  const [error, setError] = React.useState("");

  const onFileUpload = async () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      const newFile = e.target.files[0];
      if (newFile.size === 0) {
        setError("Tệp đã gửi không hợp lệ");
      } else if (newFile.size < MAX_SIZE_FILE) {
        setFile(newFile);
        setError("");
      } else {
        setError("Tệp quá lớn");
      }
    }
  };

  return (
    <div className={cx("file-upload-custom")}>
      <input
        type="file"
        multiple={false}
        accept=".pdf,.doc,.docx"
        hidden
        onChange={(e) => handleFileChange(e)}
        ref={fileInputRef}
      />
      {file === null ? (
        <div>
          <Button
            className={cx("upload-btn", "outline-button")}
            onClick={onFileUpload}
          >
            Cập nhật dữ liệu
          </Button>
        </div>
      ) : (
        <div
          onClick={onFileUpload}
          onKeyPress={onFileUpload}
          role="button"
          tabIndex={0}
        >
          <p className={cx("file-upload-name")}>{file.name}</p>
          <div className={cx("upload-another-file", "mb-4")}>
            <span> Tải một tệp khác</span>
          </div>
        </div>
      )}
      <div className={cx("error")}>{error}</div>
    </div>
  );
}

export default FileUpload;
