import "./index.css";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const handlePrevious = () => {
    onPageChange(Math.max(1, currentPage - 1));
  };

  const handleNext = () => {
    onPageChange(Math.min(totalPages, currentPage + 1));
  };

  return (
    <ul className="pagination">
      {currentPage > 1 && (
        <li className="page-item">
          <button
            type="button"
            className="page-link text"
            onClick={handlePrevious}
            style={{ fontWeight: "bold" }}
          >
            Trước
          </button>
        </li>
      )}
      {Array.from({ length: totalPages }, (_, index) => (
        <li
          key={index + 1}
          className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
        >
          <button
            type="button"
            className="page-link"
            onClick={() => onPageChange(index + 1)}
            aria-current={currentPage === index + 1 ? "page" : undefined}
          >
            {index + 1}
          </button>
        </li>
      ))}
      {currentPage < totalPages && (
        <li className="page-item next">
          <button
            type="button"
            className="page-link text"
            onClick={handleNext}
            style={{ fontWeight: "bold" }}
          >
            Kế tiếp
          </button>
        </li>
      )}
    </ul>
  );
}
export default Pagination;
