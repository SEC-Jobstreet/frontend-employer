import React, { Fragment } from "react";

import SampleData from "./sampleData";

import styles from "./facetlinks.module.css";

function FacetLinks() {
  const [viewMore, setViewMore] = React.useState(() => {
    const newObject = {};
    SampleData.forEach((item) => {
      newObject[item.title] = true;
    });
    return newObject;
  });

  return (
    <div>
      <p style={{ fontSize: "1.68rem" }}>
        <b>Mọi người cũng đã tìm kiếm</b>
      </p>
      <div style={{ fontSize: "1.54rem" }}>
        {SampleData.map((item) => (
          <div key={item.title}>
            <b>{item.title}: </b>
            {item.links.length <= 5 &&
              item.links.map((link, index) => (
                <Fragment key={link.content}>
                  <a href={link.href} className={styles.facetLink}>
                    {link.content}
                  </a>
                  {index !== item.links.length - 1 && (
                    <span className={styles.divider}>·</span>
                  )}
                </Fragment>
              ))}
            {item.links.length > 5 &&
              item.links.map((link, index) => {
                if (index < 4) {
                  return (
                    <Fragment key={link.content}>
                      <a href={link.href} className={styles.facetLink}>
                        {link.content}
                      </a>
                      <span className={styles.divider}>·</span>
                    </Fragment>
                  );
                }
                if (index === 4) {
                  return (
                    <Fragment key={link.content}>
                      <span
                        className={styles.moreButton}
                        onClick={() => {
                          setViewMore((prev) => ({
                            ...prev,
                            [item.title]: false,
                          }));
                        }}
                        aria-hidden="true"
                        hidden={!viewMore[item.title]}
                      >
                        thêm ›
                      </span>
                      <span hidden={viewMore[item.title]}>
                        <span
                          className={styles.divider}
                          hidden={!viewMore[item.title]}
                        >
                          ·
                        </span>
                        <a href={link.href} className={styles.facetLink}>
                          {link.content}
                        </a>
                        <span className={styles.divider}>·</span>
                      </span>
                    </Fragment>
                  );
                }
                return (
                  <span key={link.content} hidden={viewMore[item.title]}>
                    <a href={link.href} className={styles.facetLink}>
                      {link.content}
                    </a>
                    {index !== item.links.length - 1 && (
                      <span className={styles.divider}>·</span>
                    )}
                  </span>
                );
              })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FacetLinks;
