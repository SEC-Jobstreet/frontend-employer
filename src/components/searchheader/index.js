import FilterBar from "./filterbar";
import FilterBarMobile from "./filterbarmobile";
import SearchForm from "./searchform";

import styles from "./searchheader.module.css";

function SearchHeader() {
  return (
    <div className={styles.border}>
      <div className={styles.wrapper}>
        <div className={styles.searchFormWrapper}>
          <SearchForm />
        </div>
        <div className={styles.filterBarWrapper}>
          <FilterBar />
        </div>
        <div className={styles.filterBarMobileWrapper}>
          <FilterBarMobile />
        </div>
      </div>
    </div>
  );
}

export default SearchHeader;
