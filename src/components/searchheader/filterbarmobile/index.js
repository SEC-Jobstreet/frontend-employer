import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Slider from "rc-slider";

import RecentResearch from "../../searchresult/recentresearch";
import SearchForm from "../searchform";

import "rc-slider/assets/index.css";
// import FilterIcon from "../../../assets/svg/filter-icon.svg";
// import LeftArrowIcon from "../../../assets/svg/left-arrow-icon.svg";
// import FilterSelect from "../filterselect";
import "./slider.css";
import styles from "./filterbarmobile.module.css";

const TypeOfSort = ["Độ chính xác", "Ngày"];

const PopularFilter = ["Nộp đơn nhanh"];

const TypeOfJob = [
  "Mọi loại việc",
  "Full time",
  "Part time",
  "Permanent",
  "Internship",
  "Contract",
];
const TypeOfDated = [
  "Mọi thời gian",
  "24 giờ qua",
  "7 ngày qua",
  "14 ngày qua",
  "30 ngày qua",
];
const TypeOfDistance = [0, 5, 10, 25, 50, 100];
const marks = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5 };

function FilterBarMobile() {
  const [isOpenSM, setIsOpenSM] = React.useState(false);
  const [isOpenFM, setIsOpenFM] = React.useState(false);

  const [sortFilter, setSortFilter] = React.useState(TypeOfSort[0]);
  const [popFilter, setPopFilter] = React.useState(null);
  const [timeFilter, setTimeFilter] = React.useState(TypeOfJob[0]);
  const [datedFilter, setDatedFilter] = React.useState(TypeOfDated[0]);
  const [distanceFilterIdx, setDistanceFilterIdx] = React.useState(3);

  const deleteButton = () => {
    setSortFilter(TypeOfSort[0]);
    setPopFilter(null);
    setTimeFilter(TypeOfJob[0]);
    setDatedFilter(TypeOfDated[0]);
  };

  const handleOpenSearchModal = () => {
    setIsOpenSM(true);
  };
  const handleCloseSearchModal = () => {
    setIsOpenSM(false);
  };

  const handleOpenFilterModal = () => {
    setIsOpenFM(true);
  };
  const handleCloseFilterModal = () => {
    setIsOpenFM(false);
  };

  const handleSortFilter = (label) => {
    setSortFilter(label);
  };
  const handlePopFilter = (label) => {
    if (popFilter !== label) {
      setPopFilter(label);
    } else {
      setPopFilter(null);
    }
  };
  const handleTimeFilter = (label) => {
    setTimeFilter(label);
  };
  const handleDatedFilter = (label) => {
    setDatedFilter(label);
  };
  const handleSliderChange = (idx) => {
    setDistanceFilterIdx(idx);
  };

  return (
    <div className={styles.wrapper}>
      <Button
        className={styles.findButton}
        onClick={() => handleOpenSearchModal()}
      >
        Tìm việc làm
      </Button>
      <Button
        className={styles.filterButton}
        onClick={() => handleOpenFilterModal()}
      >
        Sàng lọc
      </Button>
      <Modal
        show={isOpenSM}
        fullscreen
        className={styles.modal}
        onHide={() => handleCloseSearchModal()}
      >
        <Modal.Body className={styles.modalContainer}>
          <Button
            className={styles.backButton}
            onClick={() => handleCloseSearchModal()}
          >
            Trở lại
          </Button>
          <div className={styles.searchForm}>
            <SearchForm />
          </div>
          <div className={styles.recentResearch}>
            <RecentResearch />
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        show={isOpenFM}
        fullscreen
        className={styles.modal}
        onHide={() => handleCloseFilterModal()}
      >
        <Modal.Header className={styles.headerFM}>
          <Button
            className={styles.backButton}
            onClick={() => handleCloseFilterModal()}
          >
            Trở lại
          </Button>
          <Modal.Title>Sàng lọc</Modal.Title>
          <Button
            className={styles.deleteButton}
            onClick={() => deleteButton()}
          >
            Xóa
          </Button>
        </Modal.Header>
        <Modal.Body className={styles.modalContainerFM}>
          <div className={styles.fieldset}>
            <h4>Sắp xếp</h4>
            {TypeOfSort.map((item) => (
              <Form.Check
                inline
                key={item}
                name="SortFilter"
                type="radio"
                checked={sortFilter === item}
                onChange={() => handleSortFilter(item)}
                label={item}
                id={item}
                className={
                  sortFilter === item
                    ? `${styles.option} ${styles.activeOption}`
                    : styles.option
                }
              />
            ))}
          </div>
          <div className={styles.fieldset}>
            <h4>Những sàng lọc phổ biến</h4>
            {PopularFilter.map((item) => (
              <Form.Check
                inline
                key={item}
                name="PopularFilter"
                type="checkbox"
                checked={popFilter === item}
                onChange={() => handlePopFilter(item)}
                label={item}
                id={item}
                className={
                  popFilter === item
                    ? `${styles.option} ${styles.activeOption}`
                    : styles.option
                }
              />
            ))}
          </div>
          <div className={styles.fieldset}>
            <h4>Thời gian</h4>
            {TypeOfJob.map((item) => (
              <Form.Check
                inline
                key={item}
                name="TimeFilter"
                type="radio"
                checked={timeFilter === item}
                onChange={() => handleTimeFilter(item)}
                label={item}
                id={item}
                className={
                  timeFilter === item
                    ? `${styles.option} ${styles.activeOption}`
                    : styles.option
                }
              />
            ))}
          </div>
          <div className={styles.fieldset}>
            <h4>Ngày đăng</h4>
            {TypeOfDated.map((item) => (
              <Form.Check
                inline
                key={item}
                name="DatedFilter"
                type="radio"
                checked={datedFilter === item}
                onChange={() => handleDatedFilter(item)}
                label={item}
                id={item}
                className={
                  datedFilter === item
                    ? `${styles.option} ${styles.activeOption}`
                    : styles.option
                }
              />
            ))}
          </div>
          <div className={styles.fieldset}>
            <div className={styles.distanceHeader}>
              <h4>Khoảng cách</h4>
              <p>{TypeOfDistance[distanceFilterIdx]} km</p>
            </div>

            <div className={styles.distanceContainer}>
              <Slider
                min={0}
                max={TypeOfDistance.length - 1}
                step={1}
                marks={marks}
                className="slider_custom"
                keyboard={false}
                defaultValue={distanceFilterIdx}
                onChangeComplete={handleSliderChange}
              />
            </div>
          </div>
          <div className={styles.actionsContainer}>
            <Button className={styles.applyFilter}>Chỉnh tìm kiếm</Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
export default FilterBarMobile;
