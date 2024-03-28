import React, { Fragment } from "react";
import { Col, Container, Pagination } from "react-bootstrap";

import JobItem from "../../components/searchresult/jobitem";

import { SearchResult } from "./sampleData";

import styles from "./search.module.css";

const ITEM_PER_PAGE = 15;
const MAX_PAGES_LISTED = 7;

function Search() {
  const [jobsListed, setJobsListed] = React.useState([]);
  const [pages, setPages] = React.useState({
    current: 0,
    total: 0,
    start: 0,
    end: 0,
  });

  React.useEffect(() => {
    const totalPageNumber = Math.ceil(
      (1.0 * SearchResult.length) / ITEM_PER_PAGE
    );
    const pageEnd =
      totalPageNumber < MAX_PAGES_LISTED
        ? totalPageNumber
        : MAX_PAGES_LISTED - 1;

    setPages((prev) => ({
      ...prev,
      total: totalPageNumber,
      start: 0,
      end: pageEnd,
    }));
  }, []);

  React.useEffect(() => {
    const listJobs = SearchResult.slice(
      ITEM_PER_PAGE * pages.current,
      ITEM_PER_PAGE * (pages.current + 1)
    );
    setJobsListed(listJobs);
  }, [pages]);

  const setCurrentPage = (newPage) => {
    // logic
    const halfMaxPages = Math.floor(MAX_PAGES_LISTED / 2);
    let pageStart = 0;
    let pageEnd = MAX_PAGES_LISTED - 1;
    if (newPage < halfMaxPages) {
      pageStart = 0;
      pageEnd = MAX_PAGES_LISTED - 1;
    } else if (newPage + halfMaxPages > pages.total) {
      pageEnd = pages.total - 1;
      pageStart = pageEnd - MAX_PAGES_LISTED;
    } else {
      pageStart = newPage - halfMaxPages;
      pageEnd = newPage + 3;
    }

    // set new pages
    setPages((prev) => ({
      ...prev,
      current: newPage,
      start: pageStart,
      end: pageEnd,
    }));

    // scroll to top
    // window.scrollTo({
    //   top: 0,
    //   behavior: "smooth",
    // });
  };

  const handlePageNumberClick = (e) => {
    const newPage = e.target.text;
    setCurrentPage(parseInt(newPage, 10) - 1);
  };

  const handleNextButtonClick = () => {
    if (pages.current !== pages.total - 1) {
      setCurrentPage(pages.current + 1);
    }
  };

  const handlePreviousButtonClick = () => {
    if (pages.current !== 0) {
      setCurrentPage(pages.current - 1);
    }
  };

  return (
    <Container className={styles.wrapper}>
      <Col>
        <div
          className="text-start"
          style={{ marginInline: "1.6rem", fontSize: "1.5rem" }}
        >
          <b>{SearchResult.length} </b>
          việc - Trang
          <b> {pages.current + 1} </b>
          của
          <b> {pages.total}</b>
        </div>
        <div>
          {jobsListed.map((job) => (
            <Fragment key={job.id}>
              <JobItem data={job} />
            </Fragment>
          ))}
        </div>
        <Pagination className={styles.paginationContainer}>
          <Pagination.Prev onClick={handlePreviousButtonClick}>
            <b>Trước</b>
          </Pagination.Prev>
          {[...Array(pages.end - pages.start + 1)].map((item, index) => {
            const page = pages.start + index + 1;
            return (
              <Fragment key={page}>
                <Pagination.Item
                  onClick={handlePageNumberClick}
                  className={
                    page === pages.current + 1 ? styles.pageCurrent : ""
                  }
                >
                  {page}
                </Pagination.Item>
              </Fragment>
            );
          })}
          <Pagination.Next onClick={handleNextButtonClick}>
            <b>Kế tiếp</b>
          </Pagination.Next>
        </Pagination>
      </Col>
      <Col>
        <h2>job detail</h2>
      </Col>
    </Container>
  );
}

export default Search;
