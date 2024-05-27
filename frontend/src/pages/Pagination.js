const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const btnStyle = {
        fontWeight: 'bold',
        border: 0,
        background: '#1b68ff',
        color: '#fff',
        padding: '5px',
        margin: '2px'
    }
    const pages = [];
  
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  
    return (
      <div>
        
        {currentPage > 1 && (
          <button style={btnStyle} onClick={() => onPageChange(currentPage - 1)}>Previous</button>
        )}
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            style={
                { 
                    fontWeight: page === currentPage ? 'bold' : 'normal', 
                    border: 0,
                    background: '#1b68ff',
                    color: '#fff',
                    padding: '5px 10px',
                    margin: '1px'
                }}
          >
            {page}
          </button>
        ))}
        {currentPage < totalPages && (
          <button style={btnStyle} onClick={() => onPageChange(currentPage + 1)}>Next</button>
        )}
      </div>
    );
  };


export default Pagination;