import React from "react";
import { Button } from "reactstrap";

const PaginationBar = ({ currentPage, totalPages, paginate }) => {
    // Calculate pages to show
    let startPage = currentPage - 5;
    let endPage = currentPage + 5;
    if (startPage <= 0) {
        startPage = 1;
    }
    if (endPage > totalPages) {
        endPage = totalPages;
    }
    const pageNumbersToShow = [];
    for (let i = startPage; i <= endPage; i++) {
        pageNumbersToShow.push(i);
    }

    return (
        <div className="pagination-bar" style={{marginTop: '10px'}}>
            <Button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} style={{ width: '100px' }}>Previous</Button>
            {pageNumbersToShow.map(number => (
                <Button key={number} onClick={() => paginate(number)} className={currentPage === number ? 'active' : ''} style={{ marginTop: '10px', marginBottom: '10px', width: '40px', marginLeft: '10px', marginRight: '10px' }}>
                    {number}
                </Button>
            ))}
            <Button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} style={{ width: '100px', marginLeft:'10px' }}>Next</Button>
        </div>
    );
};

export default PaginationBar;
