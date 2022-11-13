import React from "react";
import { Button } from "react-bootstrap";

const PaginationButton = ({
  PerPage,
  total,
  currentPage,
  nextPage,
  prevPage,
}) => {
  return (
    <div className="pagination mt-3">
      {total > PerPage && (
        <>
          <Button
            variant="secondary"
            onClick={() => prevPage()}
            disabled={currentPage === 1}>
            &laquo; Previous
          </Button>
          <Button
            variant="primary"
            onClick={() => nextPage(currentPage)}
            disabled={currentPage === Math.ceil(total / PerPage)}>
            Next &raquo;
          </Button>
        </>
      )}
    </div>
  );
};

export default PaginationButton;
