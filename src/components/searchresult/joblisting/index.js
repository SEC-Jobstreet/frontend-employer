import React, { Fragment } from "react";
import { Button, Col, Container, Pagination } from "react-bootstrap";

import { SearchResult } from "../../../temp/samplelistjobdata";
import { StateProvider } from "../context";
import EmailAlert from "../emailalert";
import JobDescription from "../jobdescription";
import JobItem from "../jobitem";
import RecentResearch from "../recentresearch";
import RelatedResearch from "../relatedsearches";

import PersonalizedTags from "./personalizedTags";

import styles from "./joblisting.module.css";

const ITEM_PER_PAGE = 15;
const MAX_PAGES_LISTED = 7;

function JobListing() {
  const [jobsListed, setJobsListed] = React.useState([]);
  const [pages, setPages] = React.useState({
    current: 0,
    total: 0,
    start: 0,
    end: 0,
  });
  const [activeTag, setActiveTag] = React.useState(null);
  const [activeJob, setAvticeJob] = React.useState(null);

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
      pageStart = pageEnd - MAX_PAGES_LISTED + 1;
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

  const handleTagButtonClick = (e) => {
    const newTag = e.target.innerText;

    if (newTag !== activeTag) {
      setActiveTag(newTag);
    } else {
      setActiveTag(null);
    }
  };

  const handleJobItemClick = (value) => {
    setAvticeJob(value);
  };

  return (
    <StateProvider>
      <Container className={styles.wrapper}>
        <Col>
          <div className={styles.topPanel}>
            <div
              className="text-start"
              style={{ fontSize: "1.54rem", marginBottom: "1rem" }}
            >
              <p style={{ fontSize: "1.6rem" }}>
                <b>{SearchResult.length} việc làm </b>– tại <b>Hồ Chí Minh</b>
              </p>
              <p>
                Trang
                <b> {pages.current + 1} </b>
                của
                <b> {pages.total}</b>
              </p>
            </div>
            <div className={styles.personalizedTags}>
              {PersonalizedTags.map((tag) => (
                <Button
                  className={
                    activeTag === tag.tagName
                      ? `${styles.tagButton} ${styles.active}`
                      : `${styles.tagButton}`
                  }
                  onClick={handleTagButtonClick}
                  key={tag.tagName}
                >
                  {tag.tagName}
                </Button>
              ))}
            </div>
          </div>
          <div className={styles.jobList}>
            {jobsListed.map((job, index) => {
              if ((index + 1) % 6 === 0) {
                return (
                  <Fragment key={job.id * -1}>
                    <EmailAlert />
                    <Fragment key={job.id}>
                      <JobItem
                        data={job}
                        activeItem={activeJob}
                        handleClick={handleJobItemClick}
                      />
                    </Fragment>
                  </Fragment>
                );
              }
              return (
                <Fragment key={job.id}>
                  <JobItem
                    data={job}
                    activeItem={activeJob}
                    handleClick={handleJobItemClick}
                  />
                </Fragment>
              );
            })}
          </div>
          <Pagination className={styles.paginationContainer}>
            <div className={styles.fullPagination}>
              <Pagination.Prev
                onClick={handlePreviousButtonClick}
                className={pages.current === 0 ? "visually-hidden" : ""}
              >
                <b>Trước</b>
              </Pagination.Prev>
              {[...Array(pages.end - pages.start + 1)].map((item, index) => {
                const page = pages.start + index + 1;
                return (
                  <Fragment key={page}>
                    <Pagination.Item
                      onClick={handlePageNumberClick}
                      className={
                        page === pages.current + 1
                          ? `${styles.pageCurrent} ${styles.pageItem}`
                          : `${styles.pageItem}`
                      }
                    >
                      {page}
                    </Pagination.Item>
                  </Fragment>
                );
              })}
              <Pagination.Next
                onClick={handleNextButtonClick}
                className={
                  pages.current === pages.total - 1 ? "visually-hidden" : ""
                }
              >
                <b>Kế tiếp</b>
              </Pagination.Next>
            </div>
            <div className={styles.smallPagination} style={{ display: "none" }}>
              <Pagination.Next onClick={handleNextButtonClick}>
                <b>Kế tiếp</b>
              </Pagination.Next>
            </div>
          </Pagination>
          <RecentResearch />
          <RelatedResearch />
        </Col>
        <Col style={{ alignSelf: "stretch" }} className={styles.jobDescription}>
          <JobDescription
            data={activeJob === null ? null : SearchResult[activeJob - 1]}
          />
        </Col>
      </Container>
    </StateProvider>
  );
}

export default JobListing;
